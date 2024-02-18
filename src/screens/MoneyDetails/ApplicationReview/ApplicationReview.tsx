import { useTranslation } from 'react-i18next';
import { useBreakpoints } from '@/hooks';

import Layout from '@/layout/ApplicationReviewLayoutV2';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';
import {
  DwollaDocumentDropDown,
  DwollaDocumentModal,
  useApplicationReview,
} from '@/features/wallet';

import { Container, UploadContainer, ContinueButton } from './styles';
import { MAX_UPLOAD_SIZE } from './constants';

type ApplicationReviewV2props = {
  onSuccessfulUpload: () => void;
};

export const ApplicationReview = ({
  onSuccessfulUpload,
}: ApplicationReviewV2props) => {
  const { documentOptions, modal, file, button } = useApplicationReview({
    onSuccessfulUpload,
  });
  const devices = useBreakpoints();
  const { t } = useTranslation();

  return (
    <Layout data-testid="application-layout">
      <Container>
        <Spacer height={16} />
        <TSpan
          font="heading-s-bold"
          colorToken="--text-card-header-neutral-highlighted"
          textAlign="center"
        >
          {t('noumena.application_review_heading')}
        </TSpan>
        <Spacer height={16} />
        <TSpan
          font="body-l"
          textAlign="center"
          colorToken="--text-body-neutral-default"
        >
          {t('noumena.application_review_sub_heading')}
        </TSpan>
        <Spacer height={64} />
        <UploadContainer>
          <Spacer height={16} />
          <DwollaDocumentDropDown
            documentOptions={documentOptions}
            onSelect={modal.handleOpen}
            isMobile={devices.isMobile}
            variant={file.frontSide ? 'success' : 'primary'}
          />
        </UploadContainer>

        <ContinueButton>
          <Button
            loading={file.updatingIsInProgress}
            disabled={file.updatingIsInProgress || !file.frontSide}
            onClick={file.handleContinue}
            size="full"
            primary
          >
            {t('noumena.application_review_btn')}
          </Button>
        </ContinueButton>

        {modal.isOpen && (
          <DwollaDocumentModal
            open={modal.isOpen}
            onClose={modal.handleClose}
            contextData={modal.contextData}
            disable={button.disable}
            onConfirmAndSave={file.confirmAndSave}
            isMobile={devices.isMobile}
            isTablet={devices.isTablet}
            isSingleSideUpload={file.isSingleSideUpload}
            isXLSize={file.isSingleSideUpload}
            onFrontSideUpload={file.updateFront}
            onBackSideUpload={file.updateBack}
            uploadedFrontSideFile={file.frontSide}
            uploadedBackSideFile={file.backSide}
            clearFrontSideFile={file.updateFront}
            clearBackSideFile={file.updateBack}
            maxUploadSize={MAX_UPLOAD_SIZE}
          />
        )}
      </Container>
    </Layout>
  );
};
