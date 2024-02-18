import { t } from 'i18next';
import { TSpan } from '@/components/Typography';
import { type TProps } from '@/components/Typography/Typography';

const Header = (props: TProps) => (
  <TSpan {...props}>
    {t('noumena.money.setupWallet.security_question.text')}
  </TSpan>
);

export default Header;
