import { type FC } from 'react';
import { t } from 'i18next';
import { Icon } from '@/components/Icon';
import { Wrapper, Name } from './styles';

interface PayByCardProps {
  selected?: boolean;
}

const PayByCard: FC<PayByCardProps> = ({ selected = false }) => (
  <Wrapper selected={selected} data-testid="pay-by-card-wrapper">
    <Icon
      name="creadit_card_m"
      size={24}
      color="--icon-tablecell-neutral-highlighted"
    />
    <Name selected={selected}>{t('noumena.money.pay.by.card')}</Name>
  </Wrapper>
);

export default PayByCard;
