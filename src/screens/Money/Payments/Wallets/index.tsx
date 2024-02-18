import { Spinner } from '@/components/Spinner';
import { t } from 'i18next';
import { useState } from 'react';
import { TransactionModal } from '@/features/TransactionModal';
import { TransactionModalType } from '@/features/TransactionModal/types';
import Setup from './Setup';
import Processing from './Processing';
import Verification from './Verification';
import Rejected from './Rejected';
import Active from './Active';

import { WalletWrapper, EmptyWalletCard } from '../styles';
import { useWallets } from './useWallets';
import { Error } from './Error';

const Wallet = () => {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<
    TransactionModalType.TRANSFER | TransactionModalType.PAY
  >(TransactionModalType.PAY);
  const { refetch, render, loading, goTo, wallet, canRefreshWallet } =
    useWallets();

  const handlePayment = (
    paymentType: TransactionModalType.TRANSFER | TransactionModalType.PAY,
  ) => {
    setModalType(paymentType);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    refetch();
  };

  const getWallet = () => {
    let walletComponent = null;

    if (render.errorScreen.show) {
      walletComponent = <Error message={render.errorScreen.errorMessage} />;
    } else if (render.createWallet) {
      walletComponent = <Setup />;
    } else if (render.showWallet) {
      walletComponent = (
        <Active handlePayment={handlePayment} total={wallet.balance} />
      );
    } else if (render.walletRejected) {
      walletComponent = <Rejected />;
    } else if (render.uploadDocument) {
      walletComponent = (
        <Verification
          helperText={t('noumena.money.wallet.verification.helper.text')}
          buttonText={t('noumena.money.wallet.verification.button.title')}
          onNavigate={goTo.applicationReview}
        />
      );
    } else if (render.walletRetry) {
      walletComponent = (
        <Verification
          helperText={t('noumena.money.wallet.verification.retry_helper.text')}
          onNavigate={goTo.walletSetupRetry}
          buttonText={t('noumena.money.wallet.verification.button.retry_title')}
        />
      );
    } else {
      walletComponent = (
        <Processing refetchWallet={refetch} allowRefetch={canRefreshWallet} />
      );
    }

    return walletComponent;
  };
  return (
    <WalletWrapper>
      {loading ? (
        <EmptyWalletCard>
          <Spinner />
        </EmptyWalletCard>
      ) : (
        getWallet()
      )}
      {open && (
        <TransactionModal
          type={modalType}
          open={open}
          handleClose={handleClose}
        />
      )}
    </WalletWrapper>
  );
};

export default Wallet;
