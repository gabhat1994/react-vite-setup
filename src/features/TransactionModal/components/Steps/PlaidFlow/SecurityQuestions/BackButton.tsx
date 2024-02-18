import { useContext } from 'react';
import { t } from 'i18next';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { SecurityQuestionContext } from './types';

const BackButton = () => {
  const deviceType = useDeviceType();
  const { handlePreviousStep } = useContext(SecurityQuestionContext);

  return (
    <Button
      data-testid="step-five-back-button"
      type="button"
      style={
        deviceType === DeviceTypeEnum.MOBILE ? { width: '100%' } : undefined
      }
      size={deviceType !== DeviceTypeEnum.MOBILE ? 'large' : undefined}
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
  );
};

export default BackButton;
