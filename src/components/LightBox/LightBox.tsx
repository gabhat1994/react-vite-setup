import { memo, useCallback, useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import { Modal } from '@/components/ExtendedModal';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { Icon } from '@/components/Icon';
import { Spacer } from '@/layout';
import { downloadFileFromUrl } from '@/utils/file';
import ImageViewer from './ImageViewer';
import VideoViewer from './VideoViewer';
import { DocViewer } from './DocViewer';
import { DocFileName, NoPreviewWrapper } from './styles';
import { type LightBoxProps, ViewType } from './types';

export const LightBox = memo((props: LightBoxProps) => {
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [docError, setDocError] = useState(false);
  const [fileName, setFileName] = useState('file');
  const handleClose = useCallback(() => {
    props.handleClose(true);
  }, [props]);

  useEffect(() => {
    setImageError(false);
    setDocError(false);
    const fileParts = props.url.split('/');
    const name = fileParts[fileParts.length - 1];
    setFileName(name);
  }, [props.url]);

  const handleDownload = useCallback(() => {
    downloadFileFromUrl(
      props.url,
      'application/pdf',
      props.downloadFileName ?? fileName,
    );
  }, [fileName, props.downloadFileName, props.url]);

  const NoPreview = () => (
    <Modal
      isFullScreen={false}
      testId="light-box"
      open={props.isOpen}
      onClose={handleClose}
      disableBackdropClick
    >
      <NoPreviewWrapper>
        <TSpan
          font="heading-s-bold"
          data-testid="heading"
          colorToken="--text-modal-header-neutral-default"
        >
          <Trans i18nKey="noumena.component.lightbox.nopreview.modal.unavailable" />
        </TSpan>
        <Spacer height="28px" />
        <Button
          tertiary
          size="full"
          onClick={handleClose}
          testId="secondaryBtn"
          textTestId="secondaryBtnLabel"
        >
          <Trans i18nKey="noumena.component.lightbox.nopreview.modal.close" />
        </Button>
      </NoPreviewWrapper>
    </Modal>
  );

  const NoDocPreview = () => (
    <Modal
      isFullScreen={false}
      testId="light-box"
      open={props.isOpen}
      onClose={handleClose}
      disableBackdropClick
    >
      <NoPreviewWrapper data-testid="no-doc-preview">
        <DocFileName
          font="heading-s-bold"
          colorToken="--text-modal-header-neutral-default"
          data-testid="file-name"
        >
          {fileName}
        </DocFileName>
        <Spacer height="16px" />
        <TSpan font="body-l" colorToken="--text-modal-neutral-default">
          <Trans i18nKey="noumena.component.lightbox.nopreview.modal.unavailable" />
        </TSpan>
        <Spacer height="16px" />
        <Button
          secondary
          size="full"
          testId="secondaryBtn"
          textTestId="secondaryBtnLabel"
          onClick={handleDownload}
          leftIcon={
            <Icon
              name="download_m"
              size={24}
              color="--button-card-neutral-default"
            />
          }
        >
          <Trans i18nKey="noumena.component.lightbox.nopreview.doc.modal.button.download" />
        </Button>
        <Spacer height="16px" />
        <Button
          tertiary
          size="full"
          onClick={handleClose}
          testId="secondaryBtn"
          textTestId="secondaryBtnLabel"
        >
          <Trans i18nKey="noumena.component.lightbox.nopreview.modal.close" />
        </Button>
      </NoPreviewWrapper>
    </Modal>
  );
  if (imageError || videoError) {
    return <NoPreview />;
  }

  if (docError) {
    return <NoDocPreview />;
  }

  return (
    <>
      {props.type === ViewType.IMAGE && (
        <ImageViewer
          url={props.url}
          isOpen={props.isOpen}
          handleClose={handleClose}
          setImageError={setImageError}
        />
      )}
      {props.type === ViewType.VIDEO && (
        <VideoViewer
          url={props.url}
          contentType={props.contentType}
          isOpen={props.isOpen}
          handleClose={handleClose}
          setVideoError={setVideoError}
        />
      )}
      {props.type === ViewType.PDF && (
        <DocViewer
          url={props.url}
          isOpen={props.isOpen}
          handleClose={handleClose}
          setDocError={setDocError}
          handleDownload={handleDownload}
        />
      )}
    </>
  );
});
