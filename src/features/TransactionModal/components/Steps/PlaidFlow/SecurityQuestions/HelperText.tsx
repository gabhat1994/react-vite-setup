import { t } from 'i18next';
import { TSpan } from '@/components/Typography';

const HelperText = () => (
  <TSpan
    textAlign="center"
    font="body-l"
    colorToken="--text-body-neutral-default"
  >
    {t('noumena.money.setupWallet.security_question.sub_text')}
  </TSpan>
);

export default HelperText;
