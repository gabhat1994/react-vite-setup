import { memo, useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Trans } from 'react-i18next';
import { Icon } from '@/components/Icon';
import { Modal, ModalCloseButton } from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Button } from '@/components/Button';
import { Spinner } from '@/components/Spinner';
import { useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import { type DocSuccess, type DocViewerProps } from './types';
import {
  DocContent,
  DocFooterWrapper,
  DocModalHeaderAddOnContainer,
} from './styles';

pdfjs.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.js`;

export const DocViewer = memo((props: DocViewerProps) => {
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState('');
  const windowSize = useWindowDimensions();
  const isMobile = windowSize.width < breakpoints.TABLET;

  const onDocumentLoadSuccess = ({ numPages }: DocSuccess) => {
    setTotalPages(numPages);
    setPageNumber(1);
    setLoading(false);
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  };

  const previousPage = () => {
    changePage(-1);
  };

  const nextPage = () => {
    changePage(1);
  };

  useEffect(() => {
    setFile(props.url);
  }, [props.url]);

  const ViewerButtons = () => (
    <DocFooterWrapper data-testid="doc-navigation-buttons-container">
      <Button
        tertiary
        size="small"
        testId="previous-button"
        disabled={pageNumber <= 1}
        onClick={previousPage}
      >
        <Trans i18nKey="noumena.component.lightbox.nopreview.doc.modal.button.previous" />
      </Button>
      <>
        <TSpan font="body-l" colorToken="--text-card-neutral-alt-default">
          <Trans i18nKey="noumena.component.lightbox.nopreview.doc.modal.label.page" />
          {pageNumber || (totalPages ? 1 : '--')}
          <Trans i18nKey="noumena.component.lightbox.nopreview.doc.modal.label.of" />
          {totalPages || '--'}
        </TSpan>
      </>
      <Button
        tertiary
        size="small"
        testId="next-button"
        disabled={pageNumber >= totalPages}
        onClick={nextPage}
      >
        <Trans i18nKey="noumena.component.lightbox.nopreview.doc.modal.button.next" />
      </Button>
    </DocFooterWrapper>
  );

  const ActionButtons = () => (
    <>
      <DocModalHeaderAddOnContainer data-testid="doc-modalHeaderAddonButtons">
        {props.handleDownload ? (
          <Button
            tertiary
            size="small"
            onClick={props.handleDownload}
            testId="download-button"
            icon={
              <Icon
                name="download_m"
                size={24}
                color="--icon-button-neutral-default"
              />
            }
          />
        ) : null}
      </DocModalHeaderAddOnContainer>
      <ModalCloseButton
        top={32}
        horizontal={isMobile ? 16 : 40}
        enforceRight
        onClose={props.handleClose}
        defaultBtnForMobile
      />
    </>
  );

  return (
    <>
      <Modal
        isFullScreen={false}
        testId="light-box-doc-viewer"
        open={props.isOpen}
        onClose={props.handleClose}
        disableBackdropClick
        disableEscapeKeyDown
        overlayVariant="dark"
        modalHeaderAddonButtons={<ActionButtons />}
        modalFooterAddonButtons={<ViewerButtons />}
        noPaddingNoBorder
      >
        <DocContent data-testid="modal-content-lightbox">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={() => {
                  setLoading(false);
                  props.setDocError(true);
                }}
              >
                <Page pageNumber={pageNumber} />
              </Document>
            </>
          )}
        </DocContent>
      </Modal>
    </>
  );
});
