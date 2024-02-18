import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { formatMultipleUserNames } from '../utils';
import { type StatementOfWorkIssuedOwnerProps } from './types';

const StatementOfWorkIssuedOwner = ({
  users,
  statementOfWork,
  ...basicProps
}: StatementOfWorkIssuedOwnerProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.statement_of_work_issued_owner.body"
        values={{
          userName: formatMultipleUserNames(users),
          documentName: statementOfWork?.title ?? '',
        }}
      />
    }
  />
);

export default StatementOfWorkIssuedOwner;
