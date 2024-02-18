import Layout from '@/layout/MoneyLayout';
import { useAccounts, useRedirectToMoneyPage } from '@/features/money/hooks';
import { Spacer } from '@/layout/Stack/Spacer';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import Balance from './Balance';
import Wallets from './Wallets';
import LinkedAccounts from './LinkedAccounts';
import TransactionsMain from './Transactions/TransactionsMain';
import MoneyWrapper from './styles';
import PaymentSideBar from './Transactions/TransactionsSideBar';
import Loading from './Loading';

const MoneyDetails = () => {
  const { accountData, refresh } = useAccounts();
  const { isMobile, isSmallerThanLaptop } = useBreakpoints();

  useRedirectToMoneyPage();

  if (accountData.loading) {
    return (
      <Layout type="Chambers" data-testid="money-layout" hideLeftMenu={false}>
        <Loading />
      </Layout>
    );
  }
  return (
    <Layout
      type="Chambers"
      rightContent={<PaymentSideBar />}
      data-testid="money-layout"
    >
      <MoneyWrapper>
        {isMobile && <Spacer height={16} />}
        <Balance total={accountData.total} refresh={refresh} />
        <Spacer height={isSmallerThanLaptop ? 16 : 24} />
        <Wallets
          mainWallets={accountData.mainWallet}
          subWallets={accountData.subWallet}
          refresh={refresh}
        />
        <Spacer height={isSmallerThanLaptop ? 16 : 24} />
        <LinkedAccounts accounts={accountData.bankAccounts} refresh={refresh} />
        <TransactionsMain />
      </MoneyWrapper>
    </Layout>
  );
};

export default MoneyDetails;
