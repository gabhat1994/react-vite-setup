import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { formatMultipleUserNames } from '../utils';
import { type StatementOfWorkSignedCounterpartyProps } from './types';

const StatementOfWorkSignedCounterparty = ({
  users,
  statementOfWork,
  ...basicProps
}: StatementOfWorkSignedCounterpartyProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.statement_of_work_signed_counterparty.body"
        values={{
          userName: formatMultipleUserNames(users),
          documentName: statementOfWork?.title ?? '',
        }}
      />
    }
  />
);

export default StatementOfWorkSignedCounterparty;
