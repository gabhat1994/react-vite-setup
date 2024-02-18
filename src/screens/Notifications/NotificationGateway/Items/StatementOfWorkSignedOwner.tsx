import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { formatMultipleUserNames } from '../utils';
import { type StatementOfWorkSignedOwnerProps } from './types';

const StatementOfWorkSignedOwner = ({
  users,
  statementOfWork,
  ...basicProps
}: StatementOfWorkSignedOwnerProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.statement_of_work_signed_owner.body"
        values={{
          userName: formatMultipleUserNames(users),
          documentName: statementOfWork?.title ?? '',
        }}
      />
    }
  />
);

export default StatementOfWorkSignedOwner;
