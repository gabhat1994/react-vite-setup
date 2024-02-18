import { useContext } from 'react';
import { t } from 'i18next';
import { Button } from '@/components/Button';
import { SetupPinContext } from './types';

const ContinueButton = () => {
  const { handleNext, shouldDisable } = useContext(SetupPinContext);
  return (
    <Button
      data-testid="step-four-submit-button"
      type="submit"
      primary
      size="full"
      disabled={shouldDisable}
      onClick={handleNext}
    >
      {t('noumena.continue')}
    </Button>
  );
};

export default ContinueButton;
