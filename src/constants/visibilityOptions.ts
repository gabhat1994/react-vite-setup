import { t } from 'i18next';
import { PostVisibility } from '@/apollo/generated/types';
import { type DropdownValueType } from '@/components/Dropdown';

const VisibilityOptions: { [key: string]: DropdownValueType<PostVisibility> } =
  {
    [PostVisibility.Connection]: {
      key: 'connections',
      value: PostVisibility.Connection,
      type: 'value',
      label: t('noumena.chambers.element.posts.visibility_connections'),
    },
    [PostVisibility.Follower]: {
      key: 'followers',
      value: PostVisibility.Follower,
      type: 'value',
      label: t('noumena.chambers.element.posts.visibility_followers'),
    },
    [PostVisibility.All]: {
      key: 'all',
      value: PostVisibility.All,
      type: 'value',
      label: '',
    },
  };

export default VisibilityOptions;
