import {
  ElementTypeEnum,
  NoumLayoutStatus,
  type ElementInput,
  type ElementOutput,
  type NoumCustomPreviewElementInput,
  type NoumLayoutSection,
} from '@/apollo/generated/types';
import {
  useDuplicateNoumLayoutSectionHelper,
  useDuplicateNoumLayoutToolHelper,
  useSetNoumLayoutToolMetaValueHelper,
  useUpdateElementHelper,
} from '@/features/noums/hooks/spaceQuery';
import { useLaunchDarkly } from '@/hooks/launchDarkly';
import { CustomPreviewUtils } from '@/utils/customPreview';
import { ElementUtils } from '@/utils/element';
import { SpaceUtils } from '@/utils/space';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FC,
  type ReactNode,
  type RefObject,
} from 'react';

import { SectionToolType } from '@/features/noums/noumEditor/shared/constants';
import { type SpaceOutputFragment } from '@/apollo/graphql';
import { type NoumLayoutToolMetaValues } from '../components/ElementWrapper';
import { type SectionToolProps } from '../components/SectionElementRearrange/types';
import { type SectionSideBarProps } from './types';
import { defaultMediaElementMetaValue } from './constants';
import { useNoumContext } from '../ViewChamber/ChamberProvider';

interface IEditChamberContext {
  space: SpaceOutputFragment | undefined;
  isOwner: boolean;
  elements: ElementOutput[];
  sections: NoumLayoutSection[];
  hasWalletElement: boolean;
  lastRerenderEvent: string | undefined;
  noumSidePanelId: string | undefined;
  sendRerenderEvent: () => void;
  hasUnsavedCustomPreview?: boolean;
  customPreviewElements: NoumCustomPreviewElementInput[];
  updateCustomPreviewElements?: (
    elements: NoumCustomPreviewElementInput[],
  ) => void;
  handleDeleteModal?: (value: SectionToolProps, deleteId: string) => void;
  handleEditModal?: (
    value: SectionToolProps,
    sectionToolId: string,
    tool?: ElementOutput,
  ) => void;
  setNoumSidePanelId?: (value: string | undefined) => void;
  refetchSpaceById?: () => void;
  section: NoumLayoutSection | undefined;
  hoverId: string | undefined;
  setHoverId?: (value: string | undefined) => void;
  activeEditingTool?: ElementOutput;
  sectionStatus: NoumLayoutStatus | undefined;
  setSectionStatus?: (value: NoumLayoutStatus | undefined) => void;
  setActiveEditingTool?: (value: ElementOutput | undefined) => void;
  setSectionSideBarOptions: (value: SectionSideBarProps) => void;
  sectionSideBarOptions: SectionSideBarProps;
  useHeightRef?: RefObject<HTMLDivElement>;
  setHeight?: (value: number | undefined) => void;
  height?: number | undefined;
  setLayoutLoading?: (value: boolean) => void;
  layoutLoading?: boolean;
  handleChangeToolMetaValue?: (
    value: NoumLayoutToolMetaValues | undefined,
  ) => void;
  toolMetaValue?: NoumLayoutToolMetaValues;
  updateToolMetaValue?: () => void;
  updateToolMutation?: (input: ElementInput) => void;
  duplicateHandler?: (noumLayoutComponentId: string, isTool?: boolean) => void;
  isDuplicating: boolean;
  noumLayoutToolUpdating?: boolean;
  mediaUploadPercentage?: number;
  setMediaUploadPercentage?: (value: number) => void;
  mediaUploadTempFile?: File;
  setMediaUploadTempFile?: (mFile?: File) => void;
}

const EditChamberContext = createContext<IEditChamberContext>({
  space: undefined,
  elements: [],
  sections: [],
  noumSidePanelId: undefined,
  hasWalletElement: false,
  lastRerenderEvent: undefined,
  sendRerenderEvent: () => {},
  hasUnsavedCustomPreview: false,
  customPreviewElements: [],
  updateCustomPreviewElements: () => {},
  handleDeleteModal: () => {},
  handleEditModal: () => {},
  setNoumSidePanelId: () => {},
  refetchSpaceById: () => {},
  section: undefined,
  hoverId: undefined,
  setHoverId: () => {},
  activeEditingTool: undefined,
  setSectionStatus: () => {},
  setActiveEditingTool: () => {},
  setSectionSideBarOptions: () => {},
  sectionSideBarOptions: {},
  setHeight: () => {},
  height: undefined,
  setLayoutLoading: () => {},
  layoutLoading: undefined,
  handleChangeToolMetaValue: () => {},
  toolMetaValue: undefined,
  updateToolMetaValue: () => {},
  updateToolMutation: () => {},
  duplicateHandler: () => {},
  isDuplicating: false,
  noumLayoutToolUpdating: false,
  mediaUploadPercentage: 0,
  setMediaUploadPercentage: () => {},
  mediaUploadTempFile: undefined,
  setMediaUploadTempFile: () => {},
  isOwner: false,
  sectionStatus: undefined,
});

export const EditChamberProvider: FC<{
  children: ReactNode;
  setisDeleteModal?: (value: boolean) => void;
  setNoumSectionToolType?: (value: SectionToolProps) => void;
  setNoumSidePanelId?: (value: string | undefined) => void;
  noumSidePanelId?: string | undefined;
  refetchSpaceById?: () => void;
  setDeletedId?: (value: string) => void;
}> = ({
  children,
  noumSidePanelId,
  setisDeleteModal,
  setNoumSectionToolType,
  setNoumSidePanelId,
  refetchSpaceById,
  setDeletedId,
}) => {
  const { space, loading, isOwner } = useNoumContext();

  const { flags } = useLaunchDarkly();
  const useHeightRef = useRef<HTMLDivElement>(null);
  const [toolMetaValue, setToolMetaValue] = useState<
    NoumLayoutToolMetaValues | undefined
  >(undefined);
  const [lastRerenderEvent, setForceRenderDateTime] = useState<
    string | undefined
  >();
  const [hoverId, setHoverId] = useState<string | undefined>();
  const [activeEditingTool, setActiveEditingTool] = useState<
    ElementOutput | undefined
  >();
  const [height, setHeight] = useState<number>();
  const [layoutLoading, setLayoutLoading] = useState<boolean>(false);
  const [mediaUploadPercentage, setMediaUploadPercentage] = useState(0);
  const [mediaUploadTempFile, setMediaUploadTempFile] = useState<
    File | undefined
  >(undefined);
  const [customPreviewElements, setCustomPreviewElements] = useState<
    NoumCustomPreviewElementInput[]
  >([]);
  const [sectionStatus, setSectionStatus] = useState<NoumLayoutStatus>();

  const { setNoumLayoutToolMetaValueHelper } =
    useSetNoumLayoutToolMetaValueHelper();

  const { updateElementHelper, loading: updateElementLoading } =
    useUpdateElementHelper();

  const [sectionSideBarOptions, setSectionSideBarOptions] =
    useState<SectionSideBarProps>({
      selectedAlignItem: undefined,
      selectedLayout: undefined,
      sectionBackgroud: undefined,
      columnBackground: undefined,
    });

  useEffect(() => {
    if (customPreviewElements.length === 0 && space && !loading)
      setCustomPreviewElements(
        CustomPreviewUtils.getCustomPreviewElements(space),
      );
  }, [customPreviewElements.length, loading, space]);
  const updateCustomPreviewElements = useCallback(
    (elements: NoumCustomPreviewElementInput[]) => {
      if (elements?.length === 0) setCustomPreviewElements([]);
      const newElements = customPreviewElements?.map(
        (x: NoumCustomPreviewElementInput) => {
          const element = elements.find((e) => e._id === x._id);
          return { ...x, ...element };
        },
      );
      setCustomPreviewElements(newElements);
    },
    [customPreviewElements],
  );

  const elements = useMemo(
    () => ElementUtils.filterAndSortUnpublished(SpaceUtils.getElements(space)),
    [space],
  );

  const sections = useMemo(
    () => ElementUtils.filterAndsortedPublished(SpaceUtils.getSections(space)),
    [space],
  );

  const renderableElements = useMemo(() => {
    if (flags.contractTool === false) {
      return elements.filter(
        (elem) => elem.elementType !== ElementTypeEnum.ContractManager,
      );
    }
    return elements;
  }, [elements, flags]);

  const hasWalletElement = useMemo(
    () => ElementUtils.hasWalletElement(elements),
    [elements],
  );

  const hasUnsavedCustomPreview = useMemo(
    () =>
      space && !loading
        ? CustomPreviewUtils.hasUnsavedCustomPreview(
            space,
            customPreviewElements,
          )
        : false,
    [customPreviewElements, loading, space],
  );

  const section = useMemo(
    () =>
      space?.layout?.sections.find(
        (sectionItem) => sectionItem._id === noumSidePanelId,
      ),
    [noumSidePanelId, space?.layout?.sections],
  );

  const sendRerenderEvent = useCallback(() => {
    setForceRenderDateTime(Date.now().toString());
  }, []);

  // noumeditor2.0 Functionality
  const handleDeleteModal = useCallback(
    (value: SectionToolProps, deleteId: string) => {
      setisDeleteModal?.(true);
      setNoumSectionToolType?.(value);
      setDeletedId?.(deleteId);
    },
    [setDeletedId, setNoumSectionToolType, setisDeleteModal],
  );

  const handleEditModal = useCallback(
    (value: SectionToolProps, sectionToolId: string, tool?: ElementOutput) => {
      setNoumSidePanelId?.(sectionToolId);
      setNoumSectionToolType?.(value);
      setActiveEditingTool?.(tool);
      setMediaUploadPercentage(0);
      setToolMetaValue?.(
        tool ? ElementUtils.getUnpublished(tool).meta : undefined,
      );
      if (value === SectionToolType.SECTION_TYPE)
        setHeight(useHeightRef.current?.offsetHeight);
    },
    [setNoumSectionToolType, setNoumSidePanelId, setToolMetaValue],
  );

  const handleChangeToolMetaValue = useCallback(
    (metaValue) => {
      const newMetaValue: NoumLayoutToolMetaValues = {
        ...toolMetaValue,
        ...metaValue,
      };
      setToolMetaValue(newMetaValue);
    },
    [toolMetaValue],
  );

  const updateToolMetaValue = useCallback(async () => {
    if (!activeEditingTool || !activeEditingTool._id) return;
    setSectionStatus?.(NoumLayoutStatus.Unsaved);
    setNoumLayoutToolMetaValueHelper(
      {
        toolId: activeEditingTool._id,
        metaValues: toolMetaValue,
      },
      space?._id,
    );
  }, [
    activeEditingTool,
    setNoumLayoutToolMetaValueHelper,
    setSectionStatus,
    space?._id,
    toolMetaValue,
  ]);

  const { duplicateNoumLayoutSection, loading: isDuplicatingSection } =
    useDuplicateNoumLayoutSectionHelper(
      setNoumSidePanelId,
      setNoumSectionToolType,
    );

  const { duplicateNoumLayoutTool, loading: isDuplicatingTool } =
    useDuplicateNoumLayoutToolHelper(
      setNoumSidePanelId,
      setNoumSectionToolType,
      setActiveEditingTool,
      setToolMetaValue,
    );

  const duplicateHandler = useCallback(
    async (noumLayoutComponentId: string, isTool?: boolean) => {
      if (!space?._id) return;
      let newId;
      if (isTool) {
        newId = await duplicateNoumLayoutTool(
          noumLayoutComponentId,
          space?._id,
        );
      } else {
        newId = await duplicateNoumLayoutSection(
          noumLayoutComponentId,
          space?._id,
        );
      }
      if (newId) {
        const sourceElement = document.getElementById(newId);
        if (sourceElement && !loading) {
          sourceElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }
      }
    },
    [duplicateNoumLayoutSection, duplicateNoumLayoutTool, loading, space?._id],
  );

  const updateToolMutation = useCallback(
    async (input: ElementInput) => {
      if (!space?._id || !activeEditingTool?._id) return;
      setActiveEditingTool({
        ...activeEditingTool,
        unSaved: {
          ...activeEditingTool?.unSaved,
          ...input,
          meta: defaultMediaElementMetaValue,
        },
      });
      await updateElementHelper(space?._id, {
        ...input,
        meta: defaultMediaElementMetaValue,
      });
    },
    [activeEditingTool, space?._id, updateElementHelper],
  );

  const value = useMemo<IEditChamberContext>(
    () => ({
      space,
      isOwner,
      elements: renderableElements,
      hasWalletElement,
      lastRerenderEvent,
      sendRerenderEvent,
      customPreviewElements,
      hasUnsavedCustomPreview,
      noumSidePanelId,
      updateCustomPreviewElements,
      handleDeleteModal,
      handleEditModal,
      refetchSpaceById,
      section,
      sections,
      hoverId,
      setHoverId,
      activeEditingTool,
      sectionStatus,
      setSectionStatus,
      setActiveEditingTool,
      setSectionSideBarOptions,
      sectionSideBarOptions,
      useHeightRef,
      setHeight,
      height,
      setLayoutLoading,
      layoutLoading,
      toolMetaValue,
      handleChangeToolMetaValue,
      updateToolMetaValue,
      updateToolMutation,
      duplicateHandler,
      isDuplicating: isDuplicatingSection || isDuplicatingTool,
      updateElementLoading,
      noumLayoutToolUpdating: updateElementLoading,
      mediaUploadPercentage,
      setMediaUploadPercentage,
      mediaUploadTempFile,
      setMediaUploadTempFile,
    }),
    [
      space,
      isOwner,
      renderableElements,
      hasWalletElement,
      lastRerenderEvent,
      sendRerenderEvent,
      customPreviewElements,
      hasUnsavedCustomPreview,
      noumSidePanelId,
      updateCustomPreviewElements,
      handleDeleteModal,
      handleEditModal,
      refetchSpaceById,
      section,
      sections,
      hoverId,
      activeEditingTool,
      sectionStatus,
      sectionSideBarOptions,
      height,
      layoutLoading,
      toolMetaValue,
      handleChangeToolMetaValue,
      updateToolMetaValue,
      updateToolMutation,
      duplicateHandler,
      isDuplicatingSection,
      isDuplicatingTool,
      updateElementLoading,
      mediaUploadPercentage,
      mediaUploadTempFile,
    ],
  );

  return (
    <EditChamberContext.Provider value={value}>
      {children}
    </EditChamberContext.Provider>
  );
};

export const useEditChamberState = () => {
  const value = useContext(EditChamberContext);
  return value;
};
