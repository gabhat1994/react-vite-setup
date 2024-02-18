import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { PaymentMainWrapper, CQTokenWrapper, WalletWrapper } from './styles';
import Wallet from '../Wallets';
import CapitalQuotient from '../CapitalQuotient';
import Tokens from '../Tokens';

const PaymentMain = () => {
  const deviceType = useDeviceType();

  return (
    <PaymentMainWrapper>
      <WalletWrapper isTablet={deviceType === DeviceTypeEnum.TABLET}>
        <Wallet />
      </WalletWrapper>
      <CQTokenWrapper isTablet={deviceType === DeviceTypeEnum.TABLET}>
        <CapitalQuotient />
        <Tokens />
      </CQTokenWrapper>
    </PaymentMainWrapper>
  );
};

export default PaymentMain;
