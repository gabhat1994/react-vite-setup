import { formatMultipleUserNames } from '../utils';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type NewIndividualPostProps } from './types';

const NewIndividualPost = ({
  users,
  noumName,
  ...basicProps
}: NewIndividualPostProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="NewIndividualPost"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.new_individual_post.body"
        values={{
          usersList: formatMultipleUserNames(users),
          noumName,
        }}
      />
    }
  />
);

export default NewIndividualPost;
