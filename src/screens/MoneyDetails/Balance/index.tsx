import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Stack } from '@/layout';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { TransactionModal } from '@/features/TransactionModal';
import { TransactionModalType } from '@/features/TransactionModal/types';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { Container, LeftItem, RightItem } from '../styles';
import { BalanceComponentMain } from '../common';
import { BalanceWrapper } from './styles';

const Balance = (props: { total: number; refresh?: () => void }) => {
  const { t } = useTranslation();
  const deviceType = useDeviceType();
  const [state, setState] = useState<{
    open: boolean;
    modalType: TransactionModalType.TRANSFER | TransactionModalType.PAY;
    defaultFrom: string | undefined;
  }>({
    open: false,
    modalType: TransactionModalType.PAY,
    defaultFrom: undefined,
  });
  return (
    <BalanceWrapper
      data-testid="balance"
      isMobile={deviceType === DeviceTypeEnum.MOBILE}
    >
      <Container isMobile={deviceType === DeviceTypeEnum.MOBILE}>
        <LeftItem isMobile={deviceType === DeviceTypeEnum.MOBILE}>
          <BalanceComponentMain
            label={t(`noumena.money.wallet.verification.total.balance`)}
            amount={props.total}
          />
        </LeftItem>
        <RightItem isMobile={deviceType === DeviceTypeEnum.MOBILE}>
          <Stack
            gap={8}
            align="center"
            justify="center"
            style={
              deviceType === DeviceTypeEnum.MOBILE
                ? { padding: '0px' }
                : { padding: '12px 12px 0' }
            }
          >
            <Button
              size={
                deviceType === DeviceTypeEnum.MOBILE ? 'full_small' : 'large'
              }
              style={{
                width: deviceType === DeviceTypeEnum.MOBILE ? '100%' : '126px',
              }}
              secondary
              leftIcon={
                <Icon
                  color="--icon-button-brand-secondary-default"
                  name="transfer_m"
                  size={24}
                />
              }
              onClick={() => {
                setState({
                  open: true,
                  modalType: TransactionModalType.TRANSFER,
                  defaultFrom: undefined,
                });
              }}
            >
              {t('noumena.money.transer')}
            </Button>
            <Button
              size={
                deviceType === DeviceTypeEnum.MOBILE ? 'full_small' : 'large'
              }
              style={{
                width: deviceType === DeviceTypeEnum.MOBILE ? '100%' : '91px',
              }}
              secondary
              leftIcon={
                <Icon
                  name="pay"
                  color="--icon-button-brand-secondary-default"
                  size={24}
                />
              }
              onClick={() => {
                setState({
                  open: true,
                  modalType: TransactionModalType.PAY,
                  defaultFrom: undefined,
                });
              }}
            >
              {t('noumena.money.pay')}
            </Button>
          </Stack>
        </RightItem>
      </Container>
      {state.open && (
        <TransactionModal
          type={state.modalType}
          open={state.open}
          handleClose={() => {
            setState({ ...state, open: false });
            props.refresh?.();
          }}
          // onSuccessfulTransaction={props.refresh}
        />
      )}
    </BalanceWrapper>
  );
};

export default Balance;
