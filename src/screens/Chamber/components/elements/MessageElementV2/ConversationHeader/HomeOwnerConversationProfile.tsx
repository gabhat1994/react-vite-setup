import { type FC } from 'react';
import { TSpan } from '@/components/Typography';
import { Spacer, Stack } from '@/layout';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { UserUtil } from '@/utils/user';
import { Avatar } from '@/components/Avatar/Avatar';
import { ProfileWrapper, ProfileInfo } from './styles';

export const HomeOwnerConversationProfile: FC = () => {
  const { space } = useNoumContext();
  const avatarUrl = UserUtil.getProfilePicture(space?.uid);
  const userFullName = UserUtil.renderFullName(space?.uid);
  const subTitle = space?.uid?.title;

  return (
    <ProfileWrapper data-testid="receiverprofile">
      <ProfileInfo>
        <Avatar data-testid="avatar-testid" url={avatarUrl || ''} size="M" />
        <Spacer width={16} />
        <Stack vertical style={{ overflow: 'hidden' }}>
          <TSpan
            font="body-m"
            overflow="ellipsis"
            colorToken="--text-tablecell-header-neutral-highlighted"
          >
            {userFullName}
          </TSpan>
          <TSpan
            font="body-s"
            colorToken="--text-tablecell-body-neutral-default"
          >
            {subTitle}
          </TSpan>
        </Stack>
      </ProfileInfo>
    </ProfileWrapper>
  );
};
