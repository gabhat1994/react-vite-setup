import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { formatMultipleUserNames } from '../utils';
import { type ContractIssuedCounterpartyProps } from './types';

const ContractIssuedCounterparty = ({
  users,
  contract,
  ...basicProps
}: ContractIssuedCounterpartyProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.contract_issued_counterparty.body"
        values={{
          userName: formatMultipleUserNames(users),
          documentName: contract?.title ?? '',
        }}
      />
    }
  />
);

export default ContractIssuedCounterparty;
