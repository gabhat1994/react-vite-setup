import { useContext } from 'react';
import { t } from 'i18next';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { SetupPinContext } from './types';

const BackButton = () => {
  const { handleBack } = useContext(SetupPinContext);
  return (
    <Button
      data-testid="step-four-back-button"
      type="button"
      size="full"
      onClick={handleBack}
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
