import { t } from 'i18next';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/Button';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { SecurityQuestionContext, type FormValues } from './types';

const ContinueButton = () => {
  const deviceType = useDeviceType();
  const { handleSubmit } = useContext(SecurityQuestionContext);
  const {
    formState: { isDirty, isValid },
  } = useFormContext<FormValues>();
  return (
    <Button
      data-testid="step-five-submit-button"
      type="submit"
      primary
      size={deviceType !== DeviceTypeEnum.MOBILE ? 'full' : undefined}
      style={
        deviceType === DeviceTypeEnum.MOBILE ? { width: '100%' } : undefined
      }
      disabled={!isDirty || !isValid}
      onClick={handleSubmit}
    >
      {t('noumena.continue')}
    </Button>
  );
};

export default ContinueButton;
