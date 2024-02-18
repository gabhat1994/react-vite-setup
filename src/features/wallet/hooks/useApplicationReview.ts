import { useCallback, useMemo, useState } from 'react';

import {
  useUpdateCustomerDocumentMutation,
  useUploadDocumentLazyQuery,
} from '@/apollo/graphql';

import { type DropdownValueType } from '@/components/Dropdown';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { ApplicationReviewFileServices } from '@/services/rest/ApplicationReviewfile';
import { useError, useToast } from '@/hooks';

import {
  type DocumentInput,
  DocumentType,
  UploadFor,
} from '@/apollo/generated/types';

import {
  type State,
  type ModalType,
  type Files,
} from '../components/DwollaDocumentUploader/types';
import { Utils } from '../utils/utils';

type UseApplicationReviewProps = {
  onSuccessfulUpload: () => void;
};

export const useApplicationReview = ({
  onSuccessfulUpload,
}: UseApplicationReviewProps) => {
  const [state, setState] = useState<State>({ updatingIsInProgress: false });
  const services = useMemo(() => new ApplicationReviewFileServices(), []);
  const logger = useError();
  const toast = useToast();
  const allowedFileSizeInMB = 10;

  const { openModal, closeModal, contextData, modalType } = useModalManager<
    ModalType,
    DropdownValueType<string, string>
  >();

  const [uploadDocumentMutation] = useUploadDocumentLazyQuery({
    fetchPolicy: 'network-only',
    onError: (error) => {
      logger.logError(error, 'upload-document-v2');
    },
  });

  const [updateDocument] = useUpdateCustomerDocumentMutation({
    fetchPolicy: 'network-only',
    onCompleted: onSuccessfulUpload,
    onError: (error) => {
      logger.logError(error, 'update-document-v2');
    },
  });

  const documentOptions: DropdownValueType<DocumentType>[] = [
    {
      key: 'passport',
      value: DocumentType.Passport,
      type: 'value',
      label: 'U.S. Passport',
    },
    {
      key: 'license',
      value: DocumentType.License,
      type: 'value',
      label: 'Driving License',
    },
    {
      key: 'idcard',
      value: DocumentType.IdCard,
      type: 'value',
      label: 'U.S. Government-issued Identification Card',
    },
  ];

  const clearDocuments = () => {
    setState({
      frontSideFile: undefined,
      backSideFile: undefined,
      documentName: null,
      documentUrl: '',
      updatingIsInProgress: false,
    });
  };

  const handleOpen = useCallback(
    (option: DropdownValueType<DocumentType, string>) => {
      if (state.documentType !== option.value) {
        clearDocuments();
      }
      setState((previousState) => ({
        ...previousState,
        documentType: option.value,
      }));
      openModal('upload-document', option);
    },
    [openModal, state.documentType],
  );

  const updateFront = useCallback(
    (frontSideFile?: File) => {
      if (!frontSideFile) {
        setState((s) => ({ ...s, frontSideFile }));
        return;
      }
      const uploadFileSizeInMB = frontSideFile.size / 1024 / 1024;
      if (uploadFileSizeInMB > allowedFileSizeInMB) {
        toast.addErrorToast(
          `file should be less than ${allowedFileSizeInMB} Mb`,
        );
        return;
      }
      setState((s) => ({ ...s, frontSideFile }));
    },
    [toast],
  );
  const updateBack = useCallback(
    (backSideFile?: File) => {
      if (!backSideFile) {
        setState((s) => ({ ...s, backSideFile }));
        return;
      }
      const uploadFileSizeInMB = backSideFile.size / 1024 / 1024;
      if (uploadFileSizeInMB > allowedFileSizeInMB) {
        toast.addErrorToast(
          `file should be less than ${allowedFileSizeInMB} Mb`,
        );
        return;
      }
      setState((s) => ({ ...s, backSideFile }));
    },
    [toast],
  );

  const getNameAndUrl = useCallback(
    (documentName: string, contentType: string) =>
      uploadDocumentMutation({
        variables: {
          input: {
            documentName,
            contentType,
          },
        },
      }),
    [uploadDocumentMutation],
  );

  const handleClose = useCallback(() => {
    clearDocuments();
    closeModal();
  }, [closeModal]);

  const confirmAndSave = useCallback(async () => {
    const { frontSideFile, backSideFile } = state;

    if (frontSideFile && backSideFile) {
      const mergedFile = await Utils.mergeImages([frontSideFile, backSideFile]);
      setState((previousState) => ({ ...previousState, mergedFile }));
    }

    closeModal();
  }, [closeModal, state]);

  const generateDocumentInputForAllFiles = useCallback(
    async (files: Files): Promise<DocumentInput[]> => {
      let documents: DocumentInput[] = [];
      const { frontSideFile, backSideFile, mergedFile } = files;
      const front = await getNameAndUrl(frontSideFile.name, frontSideFile.type);
      const back = await getNameAndUrl(backSideFile.name, backSideFile.type);
      const merged = await getNameAndUrl(mergedFile.name, mergedFile.type);

      const { name: frontFileName, url: frontFileUrl } =
        Utils.getFileDetails(front);

      const { name: backFileName, url: backFileUrl } =
        Utils.getFileDetails(back);

      const { name: mergedFileName, url: mergedFileUrl } =
        Utils.getFileDetails(merged);

      const isAllDataAvailable =
        !!frontFileName &&
        !!frontFileUrl &&
        !!backFileName &&
        !!backFileUrl &&
        !!mergedFileName &&
        !!mergedFileUrl;

      if (isAllDataAvailable) {
        const frontFileResponse = await services.uploadFileWithSignedUrl(
          frontFileUrl,
          frontSideFile,
        );

        const backFileResponse = await services.uploadFileWithSignedUrl(
          backFileUrl,
          backSideFile,
        );

        const mergedFileResponse = await services.uploadFileWithSignedUrl(
          mergedFileUrl,
          mergedFile,
        );

        const isResponseSuccessful =
          frontFileResponse === 200 &&
          backFileResponse === 200 &&
          mergedFileResponse === 200;

        if (isResponseSuccessful) {
          documents = [
            { name: frontFileName, uploadFor: UploadFor.Front },
            { name: backFileName, uploadFor: UploadFor.Back },
            { name: mergedFileName, uploadFor: UploadFor.Merged },
          ];
        }
      }

      return documents;
    },
    [getNameAndUrl, services],
  );

  const generateDocumentInputForFrontFile = useCallback(
    async (frontSideFile: File): Promise<DocumentInput[]> => {
      let documents: DocumentInput[] = [];
      const front = await getNameAndUrl(frontSideFile.name, frontSideFile.type);
      const { name: frontFileName, url: frontFileUrl } =
        Utils.getFileDetails(front);
      if (frontFileName && frontFileUrl) {
        const frontFileResponse = await services.uploadFileWithSignedUrl(
          frontFileUrl,
          frontSideFile,
        );

        if (frontFileResponse === 200) {
          documents = [{ name: frontFileName, uploadFor: UploadFor.Front }];
        }
      }

      return documents;
    },
    [getNameAndUrl, services],
  );

  const handleContinue = useCallback(async () => {
    let documents: DocumentInput[] = [];
    setState((previousState) => ({
      ...previousState,
      updatingIsInProgress: true,
    }));
    const { frontSideFile, backSideFile, mergedFile, documentType } = state;

    const allFilesAreAvailable =
      !!frontSideFile && !!backSideFile && !!mergedFile;
    const onlyFrontFileIsAvailable =
      !!frontSideFile && !backSideFile && !mergedFile;

    try {
      if (allFilesAreAvailable) {
        documents = await generateDocumentInputForAllFiles({
          frontSideFile,
          backSideFile,
          mergedFile,
        });
      }
      if (onlyFrontFileIsAvailable) {
        documents = await generateDocumentInputForFrontFile(frontSideFile);
      }

      if (documents.length && documentType) {
        await updateDocument({
          variables: {
            input: {
              documents,
              type: documentType,
            },
          },
        });
      }
    } catch (error) {
      logger.logError(error, 'upload-document-mutation', true);
    } finally {
      setState((previousState) => ({
        ...previousState,
        updatingIsInProgress: false,
      }));
    }
  }, [
    generateDocumentInputForAllFiles,
    generateDocumentInputForFrontFile,
    logger,
    state,
    updateDocument,
  ]);

  const isOpen = modalType === 'upload-document';

  const disable = !state.frontSideFile;

  const isSingleSideUpload = contextData?.value === DocumentType.IdCard;

  return {
    documentOptions,
    services,
    button: {
      disable,
    },
    file: {
      updateFront,
      updateBack,
      confirmAndSave,
      isSingleSideUpload,
      handleContinue,
      updatingIsInProgress: state.updatingIsInProgress,
      frontSide: state.frontSideFile,
      backSide: state.backSideFile,
    },
    modal: {
      isOpen,
      handleOpen,
      contextData,
      handleClose,
    },
  };
};
