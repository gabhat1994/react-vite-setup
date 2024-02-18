import {
  createContext,
  type FC,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { type NetworkStatus } from '@apollo/client';
import {
  useGetNoumRolesQuery,
  useNoumFilesQuery,
} from '@/apollo/graphql/queries';
import {
  useUpdateNoumFileMutation,
  useDeleteNoumFileMutation,
  useAddNoumFileMutation,
  useMarkNoumFileAsDownloadedMutation,
} from '@/apollo/graphql/mutations';
import {
  type AddNoumFileInput,
  type Maybe,
  type NoumFile,
  NoumFilesFilterType,
  type UpdateNoumFileInput,
  PermissibleElementType,
  NoumFileRole,
  ConnectionPermissionTypeEnum,
} from '@/apollo/generated/types';
import { cleanList } from '@/utils/list';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { useAuth } from '@/features/auth/contexts';
import { useLaunchDarkly } from '@/hooks';
import { compact } from 'lodash';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import {
  type NoumFileRoleOption,
  type FileManagerElementProps,
} from '../types';

type FileActionType = 'edit-file' | 'delete-file';

type FileManagerElementContextType = FileManagerElementProps & {
  showAddFileModal: boolean;
  files: NoumFile[];
  showFilePreviewModalId: string | null;
  loading: boolean;
  isOwner?: boolean;
  filterType: NoumFilesFilterType;
  setFilterType: (value: NoumFilesFilterType) => void;
  setShowFilePreviewModalId: (value: string | null) => void;
  setShowAddFileModal: (value: boolean) => void;
  showEditFileModalId: string | null;
  setShowEditFileModalId: (value: string | null) => void;
  showDeleteFileModalId: string | null;
  setShowDeleteFileModalId: (value: string | null) => void;
  addFile: (input: AddNoumFileInput) => Promise<Maybe<NoumFile> | undefined>;
  updateFile: (
    input: UpdateNoumFileInput,
  ) => Promise<Maybe<NoumFile> | undefined>;
  deleteFile: (fieldId: string) => Promise<Maybe<boolean> | undefined>;
  markNoumFileAsDownloaded: (fileId: string) => Promise<boolean | undefined>;
  networkStatus: NetworkStatus;
  showAllFilesModal: boolean;
  setShowAllFilesModal: (value: boolean) => void;
  hasFiles?: boolean;
  setSearchQuery: (value: string) => void;
  searchQuery: string;
  hasUploadFilePermission?: boolean;
  hasDownloadAnyFilePermission?: boolean;
  hasDownloadFilesOnlyUploadedBySelfPermission?: boolean;
  getFilePermissionByActionType: (
    actionType: FileActionType,
    fileOwnerId: string | undefined,
  ) => boolean;
  noumFileRoleOptions: NoumFileRoleOption[];
  loadingNoumRoles?: boolean;
};

const FileManagerElementContext = createContext<FileManagerElementContextType>(
  {} as FileManagerElementContextType,
);

type FileManagerElementProviderProps = {
  children: ReactNode;
} & FileManagerElementProps;

export const FileManagerElementProvider: FC<
  FileManagerElementProviderProps
> = ({ children, ...props }) => {
  const {
    flags: { elementPermission },
  } = useLaunchDarkly();
  const { user } = useAuth();
  const [showAddFileModal, setShowAddFileModal] = useState(false);
  const [showAllFilesModal, setShowAllFilesModal] = useState(false);
  const [showDeleteFileModalId, setShowDeleteFileModalId] = useState<
    string | null
  >(null);
  const [showEditFileModalId, setShowEditFileModalId] = useState<string | null>(
    null,
  );
  const [showFilePreviewModalId, setShowFilePreviewModalId] = useState<
    string | null
  >(null);
  const [filterType, setFilterType] = useState<NoumFilesFilterType>(
    NoumFilesFilterType.All,
  );
  const [searchQuery, setSearchQuery] = useState('');

  const { connectionRole } = useNoumUserConnectionContext();

  const { data, refetch, loading, networkStatus } = useNoumFilesQuery({
    variables: {
      input: {
        filesManagerElementId: props.element._id ?? '',
        filterType,
        offset: 0,
        limit: 50,
        query: searchQuery,
      },
    },
    skip: !props.element._id,
    fetchPolicy: 'cache-and-network',
  });

  const [addNoumFileMutation] = useAddNoumFileMutation({
    onCompleted: () => {
      refetch();
    },
  });

  const [updateNoumFileMutation] = useUpdateNoumFileMutation({
    onCompleted: () => {
      refetch();
    },
  });

  const [deleteNoumFileMutation] = useDeleteNoumFileMutation({
    onCompleted: () => {
      refetch();
    },
  });

  const [markNoumFileAsDownloadedMutation] =
    useMarkNoumFileAsDownloadedMutation({
      onCompleted: () => {
        refetch();
      },
    });

  const addFile = useCallback(
    async (input: AddNoumFileInput) => {
      const res = await addNoumFileMutation({ variables: { input } });
      return res.data?.addNoumFile;
    },
    [addNoumFileMutation],
  );

  const updateFile = useCallback(
    async (input: UpdateNoumFileInput) => {
      const res = await updateNoumFileMutation({ variables: { input } });
      return res.data?.updateNoumFile;
    },
    [updateNoumFileMutation],
  );

  const deleteFile = useCallback(
    async (fileId: string) => {
      const res = await deleteNoumFileMutation({ variables: { fileId } });
      return res.data?.deleteNoumFile;
    },
    [deleteNoumFileMutation],
  );

  const markNoumFileAsDownloaded = useCallback(
    async (fileId: string) => {
      const res = await markNoumFileAsDownloadedMutation({
        variables: { fileId },
      });
      return res.data?.markNoumFileAsDownloaded;
    },
    [markNoumFileAsDownloadedMutation],
  );

  const files = useMemo(
    () => cleanList(data?.noumFiles.data ?? []),
    [data?.noumFiles.data],
  );

  const { hasElementPermission } = useNoumAuthorization();

  const hasUploadFilePermission = hasElementPermission(
    PermissibleElementType.FileManager,
    'upload-file',
    true,
  );
  const hasDownloadAnyFilePermission = hasElementPermission(
    PermissibleElementType.FileManager,
    'download-any-file',
    true,
  );

  const hasDownloadFilesOnlyUploadedBySelfPermission = hasElementPermission(
    PermissibleElementType.FileManager,
    'download-files-only-uploaded-by-self',
    true,
  );

  const getFilePermissionByActionType = useCallback(
    (actionType: FileActionType, fileOwnerId: string | undefined) =>
      fileOwnerId === user?._id ||
      hasElementPermission(
        PermissibleElementType.FileManager,
        actionType,
        props.isOwner,
      ),
    [hasElementPermission, props.isOwner, user?._id],
  );

  const { data: noumRolesData, loading: loadingNoumRoles } =
    useGetNoumRolesQuery({
      fetchPolicy: 'cache-and-network',
      variables: {
        limit: 50,
        offset: 0,
      },
    });

  const noumFileRoleOptions: NoumFileRoleOption[] = useMemo(
    () =>
      elementPermission
        ? noumRolesData?.noumRoles.data || []
        : compact([
            (props.isOwner ||
              connectionRole === ConnectionPermissionTypeEnum.Favorite) && {
              _id: NoumFileRole.Favorite,
              name: NoumFileRole.Favorite,
            },
            (props.isOwner ||
              connectionRole === ConnectionPermissionTypeEnum.Guest) && {
              _id: NoumFileRole.Guest,
              name: NoumFileRole.Guest,
            },
          ]),
    [
      elementPermission,
      noumRolesData?.noumRoles.data,
      connectionRole,
      props.isOwner,
    ],
  );

  const value = useMemo(
    () => ({
      showAddFileModal,
      showEditFileModalId,
      showDeleteFileModalId,
      setShowAddFileModal,
      setShowEditFileModalId,
      setShowDeleteFileModalId,
      addNoumFileMutation,
      files,
      showFilePreviewModalId,
      setShowFilePreviewModalId,
      addFile,
      updateFile,
      deleteFile,
      loading,
      filterType,
      setFilterType,
      networkStatus,
      markNoumFileAsDownloaded,
      showAllFilesModal,
      setShowAllFilesModal,
      hasFiles: files.length > 0,
      setSearchQuery,
      searchQuery,
      hasUploadFilePermission,
      hasDownloadAnyFilePermission,
      hasDownloadFilesOnlyUploadedBySelfPermission,
      noumFileRoleOptions,
      loadingNoumRoles,
      getFilePermissionByActionType,
      ...props,
    }),
    [
      showAddFileModal,
      showEditFileModalId,
      showDeleteFileModalId,
      addNoumFileMutation,
      files,
      showFilePreviewModalId,
      addFile,
      updateFile,
      deleteFile,
      loading,
      filterType,
      networkStatus,
      markNoumFileAsDownloaded,
      showAllFilesModal,
      searchQuery,
      hasUploadFilePermission,
      hasDownloadAnyFilePermission,
      hasDownloadFilesOnlyUploadedBySelfPermission,
      noumFileRoleOptions,
      loadingNoumRoles,
      getFilePermissionByActionType,
      props,
    ],
  );

  return (
    <FileManagerElementContext.Provider value={value}>
      {children}
    </FileManagerElementContext.Provider>
  );
};

export const useFileManagerElementContext = () =>
  useContext(FileManagerElementContext);
