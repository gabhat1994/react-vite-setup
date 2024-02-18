import { useState } from 'react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { delay } from 'lodash';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { useAuth } from '@/features/auth/contexts';
import { useLaunchDarkly, useWindowDimensions } from '@/hooks';
import { TSpan } from '@/components/Typography';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { type NoumFile } from '@/apollo/generated/types';
import { UserUtil } from '@/utils/user';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import useModalWidth from '@/hooks/modal/useModalWidth';
import { Stack } from '@/layout';
import { ButtonUtils } from '@/components/Button/utils';
import { cleanList } from '@/utils/list';
import { getNoumRoleName } from '@/screens/Chamber/components/elements/FileManagerElement/utils';
import { bytesToMegabytes } from '../FileUploadModal/utils';
import FilePreview from './FilePreview';
import { useFileManagerElementContext } from '../../elements/FileManagerElement/providers/FileManagerElementProvider';
import FileManagerEllipsisMenu from '../../elements/FileManagerElement/components/FileManagerEllipsisMenu';
import S from './styles';

type FilePreviewModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  file?: NoumFile;
};

const FilePreviewModal = (props: FilePreviewModalProps) => {
  const {
    flags: { elementPermission },
  } = useLaunchDarkly();
  const { file, isOpen, handleClose } = props;
  const { isDesktop, isTablet, isMobile } = useBreakpoints();
  const { t } = useTranslation();
  const { user } = useAuth();
  const modalWidth = useModalWidth(ModalSize.XXL);

  const [activeTab, setActiveTab] = useState('preview');
  const windowSize = useWindowDimensions();

  const isFileOwner = file?.owner?._id === user?._id;

  const {
    setShowEditFileModalId,
    setShowDeleteFileModalId,
    isOwner,
    markNoumFileAsDownloaded,
    hasDownloadAnyFilePermission,
    hasDownloadFilesOnlyUploadedBySelfPermission,
    noumFileRoleOptions,
  } = useFileManagerElementContext();

  const enabledToDownload =
    hasDownloadAnyFilePermission ||
    (isFileOwner && hasDownloadFilesOnlyUploadedBySelfPermission);

  if (!file) {
    return null;
  }

  const visibilityRolesStr = cleanList(
    elementPermission
      ? file.visibilityRoles.map((roleId) =>
          getNoumRoleName(noumFileRoleOptions, roleId),
        )
      : file.visibilityRoles.map((role) =>
          t(`noumena.file_manager.visibility_roles.${role.toLowerCase()}`),
        ),
  ).join(', ');

  const DownloadButton = (
    <a
      style={{
        flexGrow: 1,
        display: 'flex',
        textDecoration: 'none',
      }}
      href={file.fileUrl ?? ''}
      download
      onClick={() => {
        // workaround for browser which triggers network request twice
        delay(() => markNoumFileAsDownloaded(file._id), 150);
      }}
      rel="noreferrer"
    >
      <Button
        primary
        size={isMobile || isTablet ? 'large' : 'small'}
        leftIcon={<Icon size={18} name="download_m" />}
        grow
        disabled={!enabledToDownload}
        {...ButtonUtils.getTooltipProps({
          message: t('noumena.file_manager.no_permission.download_file'),
          visible: !enabledToDownload,
        })}
      >
        {t('noumena.file_manager.action_buttons.download')}
      </Button>
    </a>
  );

  return (
    <Modal
      isFullScreen={!isDesktop}
      testId="file-preview-modal"
      open={isOpen}
      onClose={handleClose}
      enableCloseButton
      size={ModalSize.XXL}
      disableBackdropClick
    >
      <ModalHeader isFullScreen={!isDesktop} maxTitleWidth={modalWidth! - 300}>
        <TSpan font="heading-xs">{file.name}</TSpan>
        {isTablet && (
          <BasicChipsTabsForm
            onChange={(tab) => setActiveTab(tab)}
            inputList={[
              {
                id: 'preview',
                name: 'preview',
                text: t('noumena.file_manager.preview_modal.tabs.preview'),
                labelSize: 'auto',
              },
              {
                id: 'info',
                name: 'info',
                text: t('noumena.file_manager.preview_modal.tabs.info'),
                labelSize: 'auto',
              },
            ]}
            tabWidth={isTablet ? `${windowSize.width - 32}px` : '100%'}
            selectedId={activeTab}
            mode="isUnderline"
            isWithoutImage
            windowSize={windowSize.width}
            fontSize={
              isTablet ? '--font-input-small-size' : '--font-button-small-size'
            }
            isMobile={isMobile}
          />
        )}
      </ModalHeader>
      <ModalBody
        isFullScreen={!isDesktop}
        noFooter={!isTablet}
        style={{ alignItems: 'stretch', flexDirection: 'unset' }}
      >
        <S.ModalBodyInnerWrapper>
          <S.ModalBody>
            {(!isTablet || (isTablet && activeTab === 'preview')) && (
              <FilePreview file={file} />
            )}

            {(!isTablet || (isTablet && activeTab === 'info')) && (
              <Stack vertical fullWidth justify="space-between" gap={16}>
                <Stack vertical fullWidth>
                  {file.description ? (
                    <S.DescriptionWrapper>
                      <S.LabelText font="footnote">
                        {t('noumena.file_manager.preview_modal.description')}
                      </S.LabelText>
                      <S.ValueText font="body-m">
                        {file.description}
                      </S.ValueText>
                    </S.DescriptionWrapper>
                  ) : null}

                  <S.FileInfoWrapper>
                    <S.TableRowItem>
                      <S.LabelText font="footnote">
                        {t('noumena.file_manager.preview_modal.size')}
                      </S.LabelText>
                      <S.ValueText font="footnote">
                        {bytesToMegabytes(file.fileSize)} MB
                      </S.ValueText>
                    </S.TableRowItem>

                    <S.TableRowItem>
                      <S.LabelText font="footnote">
                        {t('noumena.file_manager.preview_modal.date_added')}
                      </S.LabelText>
                      <S.ValueText font="footnote">
                        {format(new Date(file.uploadedAt), 'dd MMM yyyy')}
                      </S.ValueText>
                    </S.TableRowItem>

                    <S.TableRowItem>
                      <S.LabelText font="footnote">
                        {t('noumena.file_manager.preview_modal.uploaded_by')}
                      </S.LabelText>
                      <S.ValueText font="footnote">
                        {UserUtil.renderFullName(file.owner)}
                      </S.ValueText>
                    </S.TableRowItem>

                    <S.TableRowItem>
                      <S.LabelText font="footnote">
                        {t('noumena.file_manager.preview_modal.file_type')}
                      </S.LabelText>
                      <S.ValueText font="footnote">
                        {file.extension}
                      </S.ValueText>
                    </S.TableRowItem>

                    <S.TableRowItem>
                      <S.LabelText font="footnote">
                        {t(
                          'noumena.file_manager.preview_modal.downloads_count',
                        )}
                      </S.LabelText>
                      <S.ValueText font="footnote">
                        {file.downloadsCount}
                      </S.ValueText>
                    </S.TableRowItem>

                    <S.TableRowItem>
                      <S.LabelText font="footnote">
                        {t('noumena.file_manager.preview_modal.visible_for')}
                      </S.LabelText>
                      <S.ValueText font="footnote">
                        {visibilityRolesStr}
                      </S.ValueText>
                    </S.TableRowItem>
                  </S.FileInfoWrapper>
                </Stack>

                {isDesktop && (
                  <Stack fullWidth gap={16}>
                    {DownloadButton}

                    <FileManagerEllipsisMenu
                      onDelete={() => {
                        setShowDeleteFileModalId(file._id);
                      }}
                      onEdit={() => {
                        handleClose();
                        setShowEditFileModalId(file._id);
                      }}
                      fileOwnerId={file.owner?._id}
                    />
                  </Stack>
                )}
              </Stack>
            )}
          </S.ModalBody>
        </S.ModalBodyInnerWrapper>
      </ModalBody>

      {(isTablet || isMobile) && (
        <ModalFooter isFullScreen={isMobile}>
          {isMobile ? (
            <S.FooterButtons>
              {isOwner || isFileOwner ? (
                <>
                  <Button
                    intent="negative"
                    secondary
                    size="large"
                    leftIcon={<Icon size={18} name="delete_m" />}
                    onClick={() => setShowDeleteFileModalId(file._id)}
                  />
                  <S.ButtonsWrapper>
                    <Button
                      tertiary
                      size="large"
                      onClick={() => {
                        handleClose();
                        setShowEditFileModalId(file._id);
                      }}
                      leftIcon={<Icon size={18} name="edit_m" />}
                    />
                  </S.ButtonsWrapper>
                  {DownloadButton}
                </>
              ) : (
                DownloadButton
              )}
            </S.FooterButtons>
          ) : (
            <S.FooterButtons>
              {isOwner || isFileOwner ? (
                <Stack justify="space-between" fullWidth>
                  <Button
                    intent="negative"
                    secondary
                    size="large"
                    leftIcon={<Icon size={18} name="delete_m" />}
                    onClick={() => setShowDeleteFileModalId(file._id)}
                  />
                  <Stack gap={16}>
                    <Button
                      tertiary
                      size="large"
                      onClick={() => {
                        handleClose();
                        setShowEditFileModalId(file._id);
                      }}
                      leftIcon={<Icon size={18} name="edit_m" />}
                    >
                      {t('noumena.file_manager.preview_modal.edit')}
                    </Button>
                    {DownloadButton}
                  </Stack>
                </Stack>
              ) : (
                DownloadButton
              )}
            </S.FooterButtons>
          )}
        </ModalFooter>
      )}
    </Modal>
  );
};

export default FilePreviewModal;
