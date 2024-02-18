import {
  InternalTransfer,
  Receiver,
  Sender,
} from '../components/TransactionCard';
import {
  type TransactionContext,
  type Transactions,
} from '../components/TransactionCard/type';

export const TransactionCardUtil = {
  getTransactionCardComponent: (
    context: TransactionContext,
    props: Transactions,
  ) => {
    const key = props.paymentId;
    switch (context) {
      case 'sender':
        return <Sender key={key} {...props} />;
      case 'receiver':
        return <Receiver key={key} {...props} />;
      case 'internal-transfer':
        return <InternalTransfer key={key} {...props} />;
      default:
        throw new Error('Unknown context');
    }
  },
};
