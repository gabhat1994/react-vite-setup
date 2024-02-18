import { useTranslation } from 'react-i18next';
import { TSpan } from '@/components/Typography';
import convertToCurrency from '@/utils/currencyToCurrency';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { CurrencyEnum } from '@/apollo/generated/types';
import { type BalanceType } from '../types';
import { FormHelperText } from '../styles';
import {
  BalanceContainer,
  Amount,
  SmallBalanceContainer,
  SmallAmount,
  AmountContainer,
} from './styles';

const formatter = (amount: null | undefined | number) => {
  if (amount === undefined || amount === null) {
    return '--';
  }
  return convertToCurrency(amount, CurrencyEnum.Usd, 2);
};
export const BalanceComponentMain = (props: BalanceType) => {
  const deviceType = useDeviceType();
  const { t } = useTranslation();
  return (
    <BalanceContainer isMobile={deviceType === DeviceTypeEnum.MOBILE}>
      <FormHelperText font="body-xl" colorToken="--text-card-neutral-default">
        {t(`noumena.money.money-detail.labelProps,{
      label :${props.label}`)}
      </FormHelperText>
      <Amount
        font="heading-xxl"
        colorToken="--text-card-header-neutral-highlighted"
      >
        {formatter(props.amount)}
      </Amount>
    </BalanceContainer>
  );
};

export const BalanceComponentWallet = (props: BalanceType) => {
  const { t } = useTranslation();

  return (
    <SmallBalanceContainer>
      <TSpan
        font="footnote"
        colorToken="--text-card-neutral-default"
        style={{ alignSelf: 'flex-end' }}
      >
        {' '}
        {t(`noumena.money.money-detail.labelProps,{
      label :${props.label}`)}
      </TSpan>
      <AmountContainer>
        <SmallAmount
          font="heading-xs"
          colorToken="--text-card-header-neutral-highlighted"
        >
          {formatter(props.amount)}
        </SmallAmount>
      </AmountContainer>
    </SmallBalanceContainer>
  );
};
