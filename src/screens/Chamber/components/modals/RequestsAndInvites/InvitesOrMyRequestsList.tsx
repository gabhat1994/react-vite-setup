import { type FC } from 'react';
import { t } from 'i18next';
import {
  ReceivedRequest,
  Underline,
} from '@/screens/Chamber/components/RightPanel/elements/ReceivedRequests/styles';
import { type InvitesOrMyRequestsListProps } from '@/screens/Chamber/components/RightPanel/elements/ReceivedRequests/types';
import RequestsOrInvite from '@/screens/Chamber/components/modals/RequestsAndInvites/RequestsOrInvite';
import { UserUtil } from '@/utils/user';
import { Stack } from '@/layout';
import { NoResultsContainer } from './styles';
import { InviteNonNemberNoListNote } from './components/InviteNonNemberNoListNote';

const InvitesOrMyRequestsList: FC<InvitesOrMyRequestsListProps> = ({
  isInvite,
  data,
  refetch,
  loading,
  chamberId,
  isChamberBox,
  isNotPrivateNoum,
  isChambersScreen,
  isModal,
}) => {
  const requestedConnections = data?.requestedConnection?.data?.filter(
    (item) => !!item?.requestTo && !UserUtil.isInactive(item?.requestTo?.uid),
  );

  return (
    <>
      {requestedConnections && requestedConnections.length > 0
        ? requestedConnections.map((item) => (
            <div key={item?.connectionId}>
              <RequestsOrInvite
                requestFromChamberId={item?.requestFrom?._id}
                requestToChamberId={item?.requestTo?._id}
                refetch={refetch}
                noumId={chamberId || ''}
                connectionId={item?.connectionId}
                isInvite={isInvite}
                requestedAt={item?.requestedAt}
                name={
                  isInvite || isChamberBox || item?.requestTo?.type === 'HOME'
                    ? `${item?.requestTo?.uid?.firstName} ${item?.requestTo?.uid?.lastName}`
                    : item?.requestTo?.name
                }
                title={
                  isChambersScreen
                    ? item?.requestFrom?.name
                    : item?.requestTo?.uid?.title
                }
                profileImage={
                  item?.requestTo?.type === 'HOME'
                    ? UserUtil.getProfilePicture(item?.requestTo?.uid)
                    : item?.requestTo?.profileImage
                }
                isNotPrivateNoum={isNotPrivateNoum}
                isChamberBox={isChamberBox}
                isChambersScreen={isChambersScreen}
              />
              <Underline />
            </div>
          ))
        : !loading && (
            <NoResultsContainer isModal={isModal}>
              <Stack vertical>
                <ReceivedRequest>
                  {isInvite || isChamberBox
                    ? t(`noumena.chamber.You_dont_have_any_invites`)
                    : t(`noumena.chamber.You_dont_have_any_sent_requests`)}
                </ReceivedRequest>
                {isInvite && <InviteNonNemberNoListNote />}
              </Stack>
            </NoResultsContainer>
          )}
    </>
  );
};

export default InvitesOrMyRequestsList;
