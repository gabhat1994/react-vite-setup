import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type NewGroupPostProps } from './types';

const NewGroupPost = ({ group, ...basicProps }: NewGroupPostProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="NewGroupPost"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.new_group_post.body"
        values={{
          groupName: group?.name,
        }}
      />
    }
  />
);

export default NewGroupPost;
