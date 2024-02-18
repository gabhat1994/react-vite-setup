import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { formatMultipleUserNames } from '../utils';
import { type StatementOfWorkRejectedOwnerProps } from './types';

const StatementOfWorkRejectedOwner = ({
  users,
  statementOfWork,
  ...basicProps
}: StatementOfWorkRejectedOwnerProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.statement_of_work_rejected_owner.body"
        values={{
          userName: formatMultipleUserNames(users),
          documentName: statementOfWork?.title ?? '',
        }}
      />
    }
  />
);

export default StatementOfWorkRejectedOwner;
