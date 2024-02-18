import { t } from 'i18next';
import { useNavigate } from 'react-router';
import ROUTES from '@/constants/routes';
import { Button } from '@/components/Button';
import { Spacer } from '@/layout';
import DoneLogo from '@/assets/images/done.svg';
import {
  FormHelperText,
  FormText,
  FormWrapper,
  FormHelperTextBold,
} from '../styles';

const Done = () => {
  const navigetTo = useNavigate();
  const handleContinue = () => {
    navigetTo(ROUTES.MONEY);
  };

  return (
    <FormWrapper>
      <FormText
        font="heading-s-bold"
        colorToken="--text-body-header-neutral-default"
        textAlign="center"
      >
        {t('noumena.money.setupWallet.retry.done.text')}
      </FormText>
      <Spacer height={64} />
      <img src={DoneLogo} alt="done=logo" />
      <Spacer height={64} />
      <FormHelperText
        font="body-l"
        colorToken="--text-body-neutral-default"
        textAlign="center"
      >
        {t('noumena.money.setupWallet.done.sub_text_one')}
        <FormHelperTextBold
          font="body-l-bold"
          colorToken="--text-body-header-neutral-default"
        >
          {` ${t('noumena.money.setupWallet.done.sub_text_Money.home.page')}`}
        </FormHelperTextBold>
      </FormHelperText>
      <Spacer height={16} />
      <FormHelperText
        font="body-l"
        colorToken="--text-body-neutral-default"
        textAlign="center"
      >
        {t('noumena.money.setupWallet.done.sub_text_two')}
      </FormHelperText>
      <Spacer height={64} />

      <Button
        data-testid="done-submit-button"
        type="submit"
        primary
        size="full"
        onClick={handleContinue}
      >
        {t('noumena.application_review_completed_btn')}
      </Button>
    </FormWrapper>
  );
};

export default Done;
