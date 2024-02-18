import { t } from 'i18next';
import { type FC, useContext } from 'react';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { PaymentStateContext } from '@/features/TransactionModal/contexts/PaymentStateContext';
import { useAuth } from '@/features/auth/contexts';
import CardWrapper from './style';
import { TransactionModalType } from '../../types';

interface AddPayeeCardProps {
  handleAddAccount: () => void;
}

const AddAccountCard: FC<AddPayeeCardProps> = ({ handleAddAccount }) => {
  const { type } = useContext(PaymentStateContext);
  const { isUnauthenticated } = useAuth();
  const showAddButton =
    type !== TransactionModalType.TRANSFER && !isUnauthenticated;

  return (
    <CardWrapper fullWidth align="center">
      <Stack fullWidth align="center" justify="space-between">
        <TSpan
          font="body-m-bold"
          colorToken="--text-tablecell-header-neutral-highlighted"
        >
          Accounts
        </TSpan>
        {showAddButton && (
          <Stack
            style={{ cursor: 'pointer' }}
            align="center"
            justify="space-between"
            maxWidth={120}
            fullWidth
            onClick={handleAddAccount}
          >
            <div style={{ paddingBottom: 5.3 }}>
              <Icon
                name="add_m"
                size={24}
                color="--icon-button-brand-primary-default"
              />
            </div>
            <TSpan
              font="body-m"
              colorToken="--text-button-brand-primary-default"
            >
              {t('noumena.payment.add.account')}
            </TSpan>
          </Stack>
        )}
      </Stack>
    </CardWrapper>
  );
};

export default AddAccountCard;
