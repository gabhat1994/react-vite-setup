import { type FC } from 'react';
import { SpaceUtils } from '@/utils/space';
import { UserUtil } from '@/utils/user';
import {
  MemberRequestInformation,
  ProjectRequestInformation,
} from '@/screens/Chamber/components/RequestInformation';
import { useAuth } from '@/features/auth/contexts';
import { type RequstsOrInvitesDetailProps } from './types';

const RequstsOrInvitesItemDetailV2: FC<RequstsOrInvitesDetailProps> = ({
  item,
  isInvitesReceived,
  isRequestSent,
}) => {
  const { user } = useAuth();
  const hasRequestSentView =
    SpaceUtils.isMasterNoum(item.noum) && isRequestSent;
  const isCurrentUser = hasRequestSentView
    ? user?._id === item.noum?.uid?._id
    : user?._id === item.user?._id;
  return (
    <>
      {isInvitesReceived ? (
        <ProjectRequestInformation
          profileURL={item.noum?.profileImage || ''}
          projectName={item.noum?.name || ''}
          noumId={item.noum?._id || ''}
          userName={UserUtil.renderFullName(item.noum?.uid)}
          date={item.requestedAt}
        />
      ) : (
        <MemberRequestInformation
          user={hasRequestSentView ? item.noum?.uid : item.user}
          gap={12}
          date={item.requestedAt}
          projectName={item.noum?.name || ''}
          type={item.noum?.type || ''}
          isCurrentUser={isCurrentUser}
        />
      )}
    </>
  );
};

export default RequstsOrInvitesItemDetailV2;
