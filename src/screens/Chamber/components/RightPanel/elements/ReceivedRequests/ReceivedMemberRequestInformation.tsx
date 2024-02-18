import { Avatar } from '@/components/Avatar/Avatar';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { UserUtil } from '@/utils/user';
import MemberBadge from '@/screens/Chambers/RequestsAndInvitesV2/components/MemberBadge';
import { SpaceTypeEnum } from '@/apollo/generated/types';
import { type ReceivedMemberRequest } from './types';

export const ReceivedMemberRequestInformation = ({
  user,
  gap,
  type,
}: ReceivedMemberRequest) => {
  const handleClick = () => {
    UserUtil.goToUserProfile(user, '_self');
  };

  const showMemberBadge = type === SpaceTypeEnum.Home;

  return (
    <Stack
      data-testid="MemberRequest_container"
      onClick={handleClick}
      fullWidth
      justify="space-between"
      align="center"
    >
      <Stack align="center" fullWidth gap={gap}>
        <Avatar url={user?.profile?.profilePicture || ''} />
        <TSpan
          font="body-m-bold"
          colorToken="--text-tablecell-header-neutral-highlighted"
        >
          {UserUtil.renderFullName(user)}
        </TSpan>
      </Stack>
      <Stack fullWidth justify="end">
        {showMemberBadge && <MemberBadge />}
      </Stack>
    </Stack>
  );
};
