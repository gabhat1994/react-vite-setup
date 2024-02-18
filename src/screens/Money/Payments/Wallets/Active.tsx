import { t } from 'i18next';
import { type FC, useCallback } from 'react';
import { useNavigate } from 'react-router';
import ROUTES from '@/constants/routes';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { Spacer, Stack } from '@/layout';
import { TransactionModalType } from '@/features/TransactionModal/types';
import { type CurrencyEnum } from '@/apollo/generated/types';
import convertToCurrency from '@/utils/currencyToCurrency';
import { TSpan } from '@/components/Typography';
import * as Styles from '../styles';

interface ActiveWalletProps {
  handlePayment: (
    type: TransactionModalType.TRANSFER | TransactionModalType.PAY,
  ) => void;
  total:
    | {
        __typename?: 'CurrencyData' | undefined;
        currency?: CurrencyEnum | null | undefined;
        value?: number | null | undefined;
      }
    | null
    | undefined;
}

const Active: FC<ActiveWalletProps> = ({ total, handlePayment }) => {
  const navigate = useNavigate();
  const handleNavigation = useCallback(async () => {
    navigate(ROUTES.MONEY_DETAILS);
  }, [navigate]);

  return (
    <Styles.CardWrapper>
      <Styles.CardHeader>
        <Styles.CardInformation
          font="body-l-bold"
          colorToken="--text-card-header-neutral-highlighted"
        >
          {t('noumena.money.wallet.title')}
        </Styles.CardInformation>
        <Button
          size="small"
          style={{ width: '40px', height: '40px' }}
          leftIcon={
            <Icon
              name="arrow_right_m"
              size={24}
              color="--icon-button-neutral-default"
            />
          }
          data-testid="stepTwoBackButton"
          tertiary
          onClick={() => handleNavigation()}
        />
      </Styles.CardHeader>
      <Styles.ContentWrapper>
        <TSpan font="footnote" colorToken="--text-card-neutral-default">
          {t('noumena.money.wallet.verification.total.balance')}
        </TSpan>
        <Spacer height={2} />
        <TSpan font="heading-m" colorToken="--text-card-neutral-highlighted">
          {convertToCurrency(total ? total.value! : 0, total?.currency!, 2)}
        </TSpan>
        <Spacer height={16} />
        <Stack
          fullWidth
          gap={10}
          align="center"
          justify="center"
          style={{ paddingLeft: '16px', paddingRight: '16px' }}
        >
          <Button
            size="full_small"
            secondary
            leftIcon={
              <Icon
                name="transfer_m"
                size={24}
                color="--icon-button-brand-secondary-default"
              />
            }
            onClick={() => handlePayment(TransactionModalType.TRANSFER)}
          >
            {t('noumena.money.transer')}
          </Button>
          <Button
            onClick={() => handlePayment(TransactionModalType.PAY)}
            size="full_small"
            secondary
            leftIcon={
              <Icon
                name="pay"
                size={24}
                color="--icon-button-brand-secondary-default"
              />
            }
            data-testid="active-wallet-pay"
          >
            {t('noumena.money.pay')}
          </Button>
        </Stack>
      </Styles.ContentWrapper>
    </Styles.CardWrapper>
  );
};

export default Active;
