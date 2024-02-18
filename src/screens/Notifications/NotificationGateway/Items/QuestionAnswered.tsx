import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type QuestionAnsweredProps } from './types';

const QuestionAnswered = ({
  noumName,
  timestamp,
  ...basicProps
}: QuestionAnsweredProps) => (
  <NotificationItem
    {...basicProps}
    timestamp={timestamp}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.noum_question_answered.body"
        values={{
          noumName,
        }}
      />
    }
  />
);

export default QuestionAnswered;
