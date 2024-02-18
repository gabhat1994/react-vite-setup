import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { formatMultipleUserNames } from '../utils';
import { type StatementOfWorkIssuedCounterpartyProps } from './types';

const StatementOfWorkIssuedCounterparty = ({
  users,
  statementOfWork,
  ...basicProps
}: StatementOfWorkIssuedCounterpartyProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.statement_of_work_issued_counterparty.body"
        values={{
          userName: formatMultipleUserNames(users),
          documentName: statementOfWork?.title ?? '',
        }}
      />
    }
  />
);

export default StatementOfWorkIssuedCounterparty;
