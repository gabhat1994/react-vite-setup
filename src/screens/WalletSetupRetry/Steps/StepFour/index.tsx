import { useBreakpoints } from '@/hooks';
import { t } from 'i18next';
import { Spacer, Stack } from '@/layout';
import {
  DwollaDocumentDropDown,
  DwollaDocumentModal,
  useApplicationReview,
} from '@/features/wallet';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { useContext } from 'react';
import { FormHelperText, FormText, FormWrapper, FormButtons } from '../styles';
import { SetupWalletContext } from '../../context';
import { MAX_UPLOAD_SIZE } from '../../constants';

const VerifyYourIdentity = () => {
  const devices = useBreakpoints();
  const { handleNextStep, handlePreviousStep } = useContext(SetupWalletContext);

  const { documentOptions, modal, file, button } = useApplicationReview({
    onSuccessfulUpload: handleNextStep,
  });
  return (
    <FormWrapper>
      <FormText
        font="heading-s-bold"
        colorToken="--text-body-header-neutral-default"
        textAlign="center"
      >
        {t('noumena.money.retryWallet.verify_your_identity.form_text')}
      </FormText>
      <Spacer height={16} />
      <FormHelperText
        font="body-l"
        colorToken="--text-body-neutral-default"
        textAlign="center"
      >
        {t('noumena.money.retryWallet.verify_your_identity.form_sub_text')}
      </FormHelperText>
      <Spacer height={64} />
      <DwollaDocumentDropDown
        documentOptions={documentOptions}
        onSelect={modal.handleOpen}
        isMobile={devices.isMobile}
        variant={file.frontSide ? 'success' : 'primary'}
      />

      <Spacer height={64} />

      <FormButtons>
        <Stack fullWidth gap={16}>
          <Button
            onClick={handlePreviousStep}
            leftIcon={
              <Icon
                name="arrow_left_m"
                size={24}
                color="--icon-button-neutral-default"
              />
            }
          >
            {t('noumena.back.text')}
          </Button>

          <Button
            primary
            loading={file.updatingIsInProgress}
            disabled={file.updatingIsInProgress || !file.frontSide}
            onClick={file.handleContinue}
            style={{ width: '90%' }}
          >
            {t('noumena.next.text')}
          </Button>
        </Stack>
      </FormButtons>

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
    </FormWrapper>
  );
};

export default VerifyYourIdentity;
