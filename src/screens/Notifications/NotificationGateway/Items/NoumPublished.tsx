import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type NoumPublishedProps } from './types';

const NoumPublished = ({ noumName, ...basicProps }: NoumPublishedProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.noum_published.body"
        values={{
          noumName,
        }}
      />
    }
  />
);

export default NoumPublished;
