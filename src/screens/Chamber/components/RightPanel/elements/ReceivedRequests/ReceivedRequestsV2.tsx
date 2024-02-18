import { useState } from 'react';
import { t } from 'i18next';
import { Trans } from 'react-i18next';

import { useBreakpoints, useLaunchDarkly, useToggle } from '@/hooks';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography/Typography';
import { RequestsAndInvitesModal } from '@/screens/Chamber/components/modals/RequestsAndInvites';
import RequestsAndInvitesModalV2 from '@/screens/Chambers/RequestsAndInvitesV2/modals/RequestsAndInvitesModalV2';
import { useAllNoumsPendingRequests } from '@/features/noums/hooks/noums';
import { NoumMemberStatus } from '@/apollo/generated/types';
import { ReceivedRequestsSkeleton } from './ReceivedRequestsSkeleton';
import { Container, AllRequests, ButtonView, Header } from './styles';
import { type ReceivedRequestProp } from './types';
import RequestListV2 from './RequestListV2';

const ReceivedRequestsV2 = ({
  isChambersScreen,
  noumId: spaceId,
  disabled,
}: ReceivedRequestProp) => {
  const { isMobile, isTablet } = useBreakpoints();
  const {
    flags: { noumRequestsInvitesV2 },
  } = useLaunchDarkly();
  const [isModalOpen, toggleModalOpen] = useToggle();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const shouldAppearCollapsed = isCollapsed && (isMobile || isTablet);

  const { userMembers, userMembersCount, loading, refetch } =
    useAllNoumsPendingRequests(NoumMemberStatus.Requested, 3);

  return (
    <Container disabled={disabled}>
      {loading ? (
        <ReceivedRequestsSkeleton />
      ) : (
        <>
          <Header>
            <ButtonView
              data-testid="received-requests-collapse-button"
              onClick={() => setIsCollapsed((prev) => !prev)}
            >
              <Icon
                name={
                  isCollapsed ? 'chevron_small_down_m' : 'chevron_small_up_m'
                }
                color="--icon-button-neutral-default"
                size={24}
              />
            </ButtonView>
            <TSpan
              font="footnote-bold"
              colorToken="--text-body-neutral-default"
            >
              {t(`noumena.chamber.received_requests`)}
            </TSpan>
          </Header>
          {shouldAppearCollapsed ? (
            <TSpan
              font="body-m"
              colorToken="--text-body-neutral-default"
              textAlign="center"
              $fill
            >
              <Trans
                i18nKey="noumena.chamber.awaiting_received_requests"
                values={{
                  postProcess: 'interval',
                  count: userMembersCount || 0,
                }}
                components={{
                  bold: (
                    <TSpan
                      colorToken="--text-card-neutral-highlighted"
                      textAlign="center"
                      $fill
                    />
                  ),
                }}
              />
            </TSpan>
          ) : (
            <RequestListV2
              refetchReceivedRequests={refetch}
              data={userMembers}
            />
          )}
          <AllRequests textOnly onClick={toggleModalOpen}>
            {t(`noumena.chamber.See_all_Requests_&_Invites`)}
          </AllRequests>
        </>
      )}
      {noumRequestsInvitesV2 ? (
        <RequestsAndInvitesModalV2
          isOpen={isModalOpen}
          handleClose={toggleModalOpen}
          refetchReceivedRequests={refetch}
        />
      ) : (
        <RequestsAndInvitesModal
          isOpen={isModalOpen}
          isChambersScreen={isChambersScreen}
          handleClose={toggleModalOpen}
          refetchReceivedRequests={refetch}
          noumId={spaceId}
        />
      )}
    </Container>
  );
};

export default ReceivedRequestsV2;
