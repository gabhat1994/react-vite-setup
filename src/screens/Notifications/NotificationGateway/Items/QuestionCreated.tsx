import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { formatMultipleUserNames } from '../utils';
import { type QuestionCreatedProps } from './types';

const QuestionCreated = ({
  users,
  noumName,
  timestamp,
  ...basicProps
}: QuestionCreatedProps) => (
  <NotificationItem
    {...basicProps}
    timestamp={timestamp}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.noum_question_created.body"
        values={{
          noumName,
          userName: formatMultipleUserNames(users),
        }}
      />
    }
  />
);

export default QuestionCreated;
