import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { formatMultipleUserNames } from '../utils';
import { type ContractSignedOwnerProps } from './types';

const ContractSignedOwner = ({
  users,
  contract,
  ...basicProps
}: ContractSignedOwnerProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.contract_signed_owner.body"
        values={{
          userName: formatMultipleUserNames(users),
          documentName: contract?.title ?? '',
        }}
      />
    }
  />
);

export default ContractSignedOwner;
