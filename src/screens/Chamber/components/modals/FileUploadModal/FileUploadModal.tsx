import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Button } from '@/components/Button';
import { UploadMedia } from '@/features/upload/components';
import { allTypes } from '@/constants/fileTypes';
import { TextField } from '@/components/TextField';
import { Icon } from '@/components/Icon';
import { Spinner } from '@/components/Spinner';
import { type NoumFile } from '@/apollo/generated/types';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { TSpan } from '@/components/Typography';
import { useToast } from '@/hooks';
import { Stack } from '@/layout';
import { useFileManagerElementContext } from '../../elements/FileManagerElement/providers/FileManagerElementProvider';
import { getIconColorByExtension } from '../../elements/FileManagerElement/utils';
import { bytesToMegabytes, schema } from './utils';
import DiscardChangesModal from '../DiscardChangesModal';
import S from './styles';
import RoleList from './RoleList';

type FileUploadModalProps = {
  isOpen: boolean;
  file?: NoumFile;
  handleClose: () => void;
};

type FileUploadValues = {
  fileName: string;
  description: string;
  visibilityRoles: string[];
};

const FileUploadModal = (props: FileUploadModalProps) => {
  const { isOpen, handleClose, file } = props;
  const { t } = useTranslation();
  const { element, addFile, updateFile } = useFileManagerElementContext();
  const { isMobile } = useBreakpoints();
  const [uploadedFile, setUploadedFile] = useState(file?.fileUrl ?? '');
  const [isUploading, setIsUploading] = useState(false);
  const [showDiscardChangesModal, setShowDiscardChangesModal] = useState(false);
  const [mediaDetail, setMediaDetail] = useState({
    name: file?.name ?? '',
    type: '',
    size: file?.fileSize ?? 0,
    extension: file?.extension ?? '',
  });

  const { addSuccessIconToast } = useToast();
  const isEditMode = !!file;
  const [uploadError, setUploadError] = useState(false);

  const closeModal = () => {
    setShowDiscardChangesModal(false);
    handleClearMedia();
    handleClose();
  };

  const onClose = () => {
    if (isDirty || uploadedFile) {
      setShowDiscardChangesModal(true);
    } else {
      closeModal();
    }
  };

  const handleSetMediaDetails = (e: File) => {
    setMediaDetail({
      name: e.name,
      type: e.type,
      size: e.size,
      extension: e.name.substring(e.name.lastIndexOf('.') + 1),
    });
  };

  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid, errors, isSubmitting, isDirty },
  } = useForm<FileUploadValues>({
    mode: 'onChange',
    defaultValues: {
      fileName: file?.name ?? '',
      description: file?.description ?? '',
      visibilityRoles: file?.visibilityRoles ?? [],
    },
    resolver: yupResolver(schema),
  });

  const submit = async (values: FileUploadValues) => {
    if (isEditMode) {
      await updateFile({
        name: values.fileName,
        visibilityRoles: values.visibilityRoles,
        description: values.description,
        fileId: file?._id,
        fileUrl: uploadedFile ?? file.fileUrl,
      });
      addSuccessIconToast(t('noumena.file_manager.toast.file_updated'));
    } else {
      await addFile({
        fileSize: mediaDetail.size,
        fileUrl: uploadedFile,
        name: values.fileName,
        visibilityRoles: values.visibilityRoles,
        description: values.description,
        filesManagerElementId: element._id ?? '',
      });
      addSuccessIconToast(t('noumena.file_manager.toast.file_uploaded'));
    }
    handleClose();
  };

  const onUploadChange = (fileUrl: string) => {
    if (fileUrl) {
      setUploadedFile(fileUrl);
      setIsUploading(false);
    }
  };

  const handleClearMedia = () => {
    setUploadedFile('');
    setUploadError(false);
    setMediaDetail({ name: '', type: '', size: 0, extension: '' });
  };

  const handleCheckboxChange = (roleId: string, value: boolean) => {
    const visibilityRoles = getValues('visibilityRoles');
    if (value) {
      setValue('visibilityRoles', [...visibilityRoles, roleId], {
        shouldValidate: true,
        shouldDirty: true,
      });
    } else {
      setValue(
        'visibilityRoles',
        visibilityRoles.filter((r) => roleId !== r),
        {
          shouldValidate: true,
          shouldDirty: true,
        },
      );
    }
  };

  return (
    <>
      <Modal
        isFullScreen={isMobile}
        testId="file-upload-modal"
        open={isOpen}
        onClose={onClose}
        enableCloseButton
        size={ModalSize.L}
        disableBackdropClick
      >
        <form onSubmit={handleSubmit(submit)}>
          <ModalHeader isFullScreen={isMobile}>
            {isEditMode
              ? t('noumena.file_manager.upload_modal.title_edit')
              : t('noumena.file_manager.upload_modal.title_create')}
          </ModalHeader>
          <ModalBody isFullScreen={isMobile}>
            <S.ModalBody>
              <S.FormContainer>
                <UploadMedia
                  type="noum"
                  acceptedFileTypes={allTypes}
                  allTypesSupported
                  onUploading={setIsUploading}
                  maxSize={20}
                  setMediaDetail={handleSetMediaDetails}
                  onContentChange={onUploadChange}
                  onError={setUploadError}
                  marginTop={0}
                  isHidden={!!mediaDetail.name}
                  keepOriginalName
                />
                {mediaDetail.name ? (
                  <S.UploadedItem>
                    <S.UploadedItemLeftWrapper>
                      {isUploading ? (
                        <S.SpinnerContainer>
                          <Spinner />
                        </S.SpinnerContainer>
                      ) : (
                        <S.UploadedItemIconContainer>
                          <Icon
                            name="file_m"
                            size={24}
                            color={getIconColorByExtension(
                              mediaDetail.extension ?? file?.extension,
                            )}
                          />
                        </S.UploadedItemIconContainer>
                      )}
                      <S.UploadedItemTextContainer>
                        <S.UploadedItemFileName font="body-m">
                          {mediaDetail.name ?? file?.name}
                        </S.UploadedItemFileName>
                        <S.UploadedItemSizeText font="footnote">
                          {t('noumena.file_manager.size_in_mb', {
                            size: bytesToMegabytes(
                              mediaDetail.size ?? file?.fileSize,
                            ),
                          })}
                          {isUploading ? (
                            <S.UploadingText font="footnote">
                              {` · ${t(
                                'noumena.file_manager.upload_modal.uploading',
                              )}`}
                            </S.UploadingText>
                          ) : uploadError ? (
                            <TSpan
                              font="footnote"
                              colorToken="--text-card-danger-primary-default"
                            >
                              {` · ${t('Upload failed')}`}
                            </TSpan>
                          ) : null}
                        </S.UploadedItemSizeText>
                      </S.UploadedItemTextContainer>
                    </S.UploadedItemLeftWrapper>
                    <Button
                      size="small"
                      tertiary
                      disabled={isUploading || isSubmitting}
                      icon={
                        <Icon
                          name="delete_m"
                          size={20}
                          color="--button-card-neutral-default"
                        />
                      }
                      onClick={handleClearMedia}
                      neutral
                    />
                  </S.UploadedItem>
                ) : null}
                <TextField
                  {...register('fileName')}
                  label={t('noumena.file_manager.upload_modal.file_name')}
                  value={getValues('fileName')}
                  error={!!errors.fileName}
                  helperText={errors.fileName?.message}
                />

                <TextField
                  {...register('description', { required: false })}
                  label={t('noumena.file_manager.upload_modal.description')}
                  value={getValues('description')}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />

                <Stack vertical>
                  <S.VisibleForLabel font="footnote-bold">
                    {t('noumena.file_manager.upload_modal.visible_for')}
                  </S.VisibleForLabel>

                  <TSpan
                    colorToken="--text-modal-neutral-default"
                    font="footnote"
                  >
                    {t(
                      'noumena.file_manager.upload_modal.visible_for_helper_text',
                    )}
                  </TSpan>
                </Stack>
                <RoleList
                  handleCheckboxChange={handleCheckboxChange}
                  selectedRoleIds={watch('visibilityRoles')}
                />
              </S.FormContainer>
            </S.ModalBody>
          </ModalBody>
          <ModalFooter isFullScreen={isMobile}>
            <S.FooterButtons>
              <Button tertiary size="large" grow onClick={onClose}>
                {t('noumena.file_manager.upload_modal.cancel')}
              </Button>
              <Button
                primary
                size="large"
                grow
                disabled={!isValid || !uploadedFile}
                type="submit"
                loading={isSubmitting}
              >
                {t('noumena.file_manager.upload_modal.save')}
              </Button>
            </S.FooterButtons>
          </ModalFooter>
        </form>
      </Modal>
      <DiscardChangesModal
        isOpen={showDiscardChangesModal}
        handleClose={(isSuccess) =>
          isSuccess ? closeModal() : setShowDiscardChangesModal(false)
        }
      />
    </>
  );
};

export default FileUploadModal;
