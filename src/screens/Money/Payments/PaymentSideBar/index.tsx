import PaymentSideBarWrapper from './styles';
import Wallet from '../Wallets';
import CapitalQuotient from '../CapitalQuotient';
import Tokens from '../Tokens';

const PaymentSideBar = () => (
  <PaymentSideBarWrapper>
    <Wallet />
    <CapitalQuotient />
    <Tokens />
  </PaymentSideBarWrapper>
);

export default PaymentSideBar;
