import { Button } from '@/components/Button';
import { type DropdownValueType } from '@/components/Dropdown';
import * as EM from '@/components/ExtendedModal';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';
import { t } from 'i18next';
import { DocumentHeading } from './DocumentHeading';
import { UploadComponent } from './UploadComponent';
import { type UploadComponentProps } from './types';

type DwollaDocumentModalProps = {
  contextData: DropdownValueType<string, string> | null;
  uploadedFrontSideFile: UploadComponentProps['uploadedFile'];
  uploadedBackSideFile: UploadComponentProps['uploadedFile'];
  disable: boolean;
  isXLSize: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isSingleSideUpload: boolean;
  onConfirmAndSave: () => void;
  onFrontSideUpload: UploadComponentProps['onUploadFile'];
  onBackSideUpload: UploadComponentProps['onUploadFile'];
  clearFrontSideFile: () => void;
  clearBackSideFile: () => void;
  maxUploadSize: number;
} & Required<Pick<EM.IModal, 'open' | 'onClose'>>;

export const DwollaDocumentModal = ({
  contextData,
  uploadedBackSideFile,
  uploadedFrontSideFile,
  onClose,
  open,
  disable,
  isMobile,
  isTablet,
  isXLSize,
  isSingleSideUpload,
  onFrontSideUpload,
  onBackSideUpload,
  clearBackSideFile,
  clearFrontSideFile,
  onConfirmAndSave,
  maxUploadSize,
}: DwollaDocumentModalProps) => (
  <EM.Modal
    open={open}
    enableCloseButton
    size={isXLSize ? EM.ModalSize.XL : EM.ModalSize.XXL}
    onClose={onClose}
  >
    <EM.ModalHeader>
      <TSpan
        font="heading-xs-bold"
        colorToken="--text-modal-header-neutral-default"
      >
        Upload Scan/Photo of Your {contextData ? contextData.label : ''}
      </TSpan>
    </EM.ModalHeader>
    <EM.ModalBody
      flexDirection={isMobile ? 'column' : 'row'}
      gap={16}
      maxHeight={600}
    >
      <div style={{ width: '100%' }}>
        {!isSingleSideUpload && (
          <DocumentHeading index={1} heading="Front side of your document" />
        )}
        <Spacer height={16} />
        <UploadComponent
          type="wallet"
          url=""
          onUploadFile={onFrontSideUpload}
          maximumFileSize={maxUploadSize}
          defaultPlaceHolder={
            isTablet || isMobile
              ? t('noumena.money.application.review.add.file.touch')
              : t('noumena.money.application.review.add.file.non.touch')
          }
          onDragOverText="Drag your file here"
          linkPlaceHolder={isTablet || isMobile ? '' : 'browse'}
          defaultSubPlaceHolder={t(
            'noumena.money.application.review.add.file.placeholder',
            { maxUploadSize: String(maxUploadSize) },
          )}
          isUploadStarted={false}
          isUploadComplete={false}
          uploadedFile={uploadedFrontSideFile}
          clearFile={clearFrontSideFile}
          isMobile={isMobile}
          isTablet={isTablet}
          isSingleSideUpload={isSingleSideUpload}
        />
      </div>
      {!isSingleSideUpload && (
        <div style={{ width: '100%' }}>
          <DocumentHeading index={2} heading="Back side of your document" />
          <Spacer height={16} />
          <UploadComponent
            type="wallet"
            url=""
            onUploadFile={onBackSideUpload}
            maximumFileSize={maxUploadSize}
            defaultPlaceHolder={
              isTablet || isMobile
                ? t('noumena.money.application.review.add.file.touch')
                : t('noumena.money.application.review.add.file.non.touch')
            }
            onDragOverText="Drag your file here, or"
            linkPlaceHolder={isTablet || isMobile ? '' : 'browse'}
            defaultSubPlaceHolder={t(
              'noumena.money.application.review.add.file.placeholder',
              { maxUploadSize: String(maxUploadSize) },
            )}
            isUploadStarted={false}
            isUploadComplete={false}
            uploadedFile={uploadedBackSideFile}
            clearFile={clearBackSideFile}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </div>
      )}
    </EM.ModalBody>
    <EM.ModalFooter flexDirection="row" gap={16}>
      <Button size="full" onClick={onClose}>
        Cancel
      </Button>
      <Button
        onClick={onConfirmAndSave}
        disabled={disable}
        size="full"
        leftIcon={<Icon name="tick_m" size={24} />}
        primary
        intent="positive"
      >
        Confirm & Save
      </Button>
    </EM.ModalFooter>
  </EM.Modal>
);
