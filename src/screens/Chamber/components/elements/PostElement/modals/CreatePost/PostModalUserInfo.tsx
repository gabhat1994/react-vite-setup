import { t } from 'i18next';
import { Avatar } from '@/components/Avatar/Avatar';
import { TSpan } from '@/components/Typography';
import { useAuth } from '@/features/auth/contexts';
import { Stack } from '@/layout';
import { UserUtil } from '@/utils/user';
import { UserInfo } from './styles';

const PostModalUserInfo = () => {
  const { user, isUnregistered: isUnregisteredUser } = useAuth();

  return (
    <UserInfo data-testid="user_info">
      <Avatar url={UserUtil.getProfilePicture(user) ?? ''} />
      <Stack vertical>
        <TSpan
          font="body-l-bold"
          colorToken="--text-tablecell-header-neutral-highlighted"
        >
          {`${user?.firstName || ''} ${user?.lastName || ''}`.trim()}
        </TSpan>
        <TSpan font="body-m" colorToken="--text-tablecell-body-neutral-default">
          {isUnregisteredUser
            ? t('noumena.chamber_edit.modal.non_member')
            : `@${user?.username}`}
        </TSpan>
      </Stack>
    </UserInfo>
  );
};

export default PostModalUserInfo;
