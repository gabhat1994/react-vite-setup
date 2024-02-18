import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import TransactionsMainWrapper from './styles';
import Transactions from '../Transactions';

const TransactionsMain = () => {
  const device = useDeviceType();
  return (
    <TransactionsMainWrapper isTablet={device === DeviceTypeEnum.TABLET}>
      <Transactions />
    </TransactionsMainWrapper>
  );
};

export default TransactionsMain;
