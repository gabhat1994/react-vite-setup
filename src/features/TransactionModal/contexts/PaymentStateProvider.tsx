import { type FC, useState, useMemo, useCallback } from 'react';
import { ComponentStates } from '@/features/TransactionModal/types';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { ModalSize } from '@/components/ExtendedModal';
import {
  PaymentStateContext,
  type TPaymentStateContext,
  type TTransactionModalPartialProps,
} from './PaymentStateContext';

const PaymentStateProvider: FC<TTransactionModalPartialProps> = ({
  children,
  type,
  onSuccessfulTransaction = () => null,
  handleClose = () => null,
  disableFromDropDown = false,
  hideToDropdownIcon = false,
  hideFromDropdownIcon = false,
  ...rest
}) => {
  const [paymentState, setPaymentState] = useState<ComponentStates>(
    ComponentStates.PAYMENT_SELECT,
  );

  const [modalSize, setModalSize] = useState<ModalSize>(ModalSize.M);

  const deviceType = useDeviceType();
  const isMobile = deviceType === DeviceTypeEnum.MOBILE;

  const handleForwardStateChange = useCallback(() => {
    if (paymentState === ComponentStates.PAYMENT_SELECT) {
      setPaymentState(ComponentStates.PAYMENT_DESCRIPTION);
    } else if (paymentState === ComponentStates.PAYMENT_DESCRIPTION) {
      setPaymentState(ComponentStates.PAYMENT_REVIEW);
    } else if (paymentState === ComponentStates.PAYMENT_REVIEW) {
      setPaymentState(ComponentStates.PAYMENT_CONFIRM);
    } else if (paymentState === ComponentStates.PAYMENT_CONFIRM) {
      setPaymentState(ComponentStates.PAYMENT_DONE);
    }
  }, [paymentState]);
  const handleBackwardsStateChange = useCallback(() => {
    if (paymentState === ComponentStates.PAYMENT_DESCRIPTION) {
      setPaymentState(ComponentStates.PAYMENT_SELECT);
    } else if (paymentState === ComponentStates.PAYMENT_REVIEW) {
      setPaymentState(ComponentStates.PAYMENT_DESCRIPTION);
    } else if (paymentState === ComponentStates.PAYMENT_CONFIRM) {
      setPaymentState(ComponentStates.PAYMENT_REVIEW);
    } else if (paymentState === ComponentStates.PAYMENT_STRIPE) {
      setPaymentState(ComponentStates.PAYMENT_DONE);
    }
  }, [paymentState]);

  const handleChangePaymentState = useCallback((state: ComponentStates) => {
    setPaymentState(state);
  }, []);

  const stateContextValue: TPaymentStateContext = useMemo(
    () => ({
      type,
      modalSize,
      setModalSize,
      handleForwardStateChange,
      handleBackwardsStateChange,
      paymentState,
      setPaymentState: handleChangePaymentState,
      onSuccessfulTransaction,
      isMobile,
      disableFromDropDown,
      hideToDropdownIcon,
      hideFromDropdownIcon,
      handleClose,
      ...rest,
    }),
    [
      type,
      modalSize,
      setModalSize,
      paymentState,
      handleForwardStateChange,
      handleBackwardsStateChange,
      handleChangePaymentState,
      onSuccessfulTransaction,
      isMobile,
      disableFromDropDown,
      hideToDropdownIcon,
      hideFromDropdownIcon,
      handleClose,
      rest,
    ],
  );

  return (
    <PaymentStateContext.Provider value={stateContextValue}>
      {children}
    </PaymentStateContext.Provider>
  );
};

export default PaymentStateProvider;
