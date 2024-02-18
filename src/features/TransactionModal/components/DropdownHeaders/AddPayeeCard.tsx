import { t } from 'i18next';
import { type FC, useContext } from 'react';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { Button } from '@/components/Button';
import CardWrapper from './style';
import { PaymentStateContext } from '../../contexts/PaymentStateContext';
import { TransactionModalType } from '../../types';

interface AddPayeeCardProps {
  handleAddPayee: () => void;
}

const AddPayeeCard: FC<AddPayeeCardProps> = ({ handleAddPayee }) => {
  const { type } = useContext(PaymentStateContext);
  return (
    <CardWrapper fullWidth align="center">
      <Stack fullWidth align="center" justify="space-between">
        <TSpan
          font="body-m-bold"
          colorToken="--text-tablecell-header-neutral-highlighted"
        >
          {t('noumena.money.payment.your_payees')}
        </TSpan>
        {type !== TransactionModalType.TRANSFER && (
          <Button
            onClick={handleAddPayee}
            neutral
            size="small"
            leftIcon={
              <Icon
                name="add_m"
                size={24}
                color="--text-tablecell-body-neutral-default"
              />
            }
          >
            <TSpan
              font="body-m-bold"
              colorToken="--text-tablecell-body-neutral-default"
            >
              {t('noumena.money.payment.add.new')}
            </TSpan>
          </Button>
        )}
      </Stack>
    </CardWrapper>
  );
};

export default AddPayeeCard;
