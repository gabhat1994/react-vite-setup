import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { formatMultipleUserNames } from '../utils';
import { type ContractRejectedCounterpartyProps } from './types';

const ContractRejectedCounterparty = ({
  users,
  contract,
  ...basicProps
}: ContractRejectedCounterpartyProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.contract_rejected_counterparty.body"
        values={{
          userName: formatMultipleUserNames(users),
          documentName: contract?.title ?? '',
        }}
      />
    }
  />
);

export default ContractRejectedCounterparty;
