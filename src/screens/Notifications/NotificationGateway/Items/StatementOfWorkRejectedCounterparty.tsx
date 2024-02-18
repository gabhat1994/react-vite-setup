import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { formatMultipleUserNames } from '../utils';
import { type StatementOfWorkRejectedCounterpartyProps } from './types';

const StatementOfWorkRejectedCounterparty = ({
  users,
  statementOfWork,
  ...basicProps
}: StatementOfWorkRejectedCounterpartyProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.statement_of_work_rejected_counterparty.body"
        values={{
          userName: formatMultipleUserNames(users),
          documentName: statementOfWork?.title ?? '',
        }}
      />
    }
  />
);

export default StatementOfWorkRejectedCounterparty;
