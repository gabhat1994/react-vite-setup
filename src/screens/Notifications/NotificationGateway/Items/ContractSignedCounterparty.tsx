import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { formatMultipleUserNames } from '../utils';
import { type ContractSignedCounterpartyProps } from './types';

const ContractSignedCounterparty = ({
  users,
  contract,
  ...basicProps
}: ContractSignedCounterpartyProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.contract_signed_counterparty.body"
        values={{
          userName: formatMultipleUserNames(users),
          documentName: contract?.title ?? '',
        }}
      />
    }
  />
);

export default ContractSignedCounterparty;
