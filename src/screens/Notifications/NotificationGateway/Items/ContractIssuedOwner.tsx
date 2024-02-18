import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { formatMultipleUserNames } from '../utils';
import { type ContractIssuedOwnerProps } from './types';

const ContractIssuedOwner = ({
  users,
  contract,
  ...basicProps
}: ContractIssuedOwnerProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.contract_issued_owner.body"
        values={{
          userName: formatMultipleUserNames(users),
          documentName: contract?.title ?? '',
        }}
      />
    }
  />
);

export default ContractIssuedOwner;
