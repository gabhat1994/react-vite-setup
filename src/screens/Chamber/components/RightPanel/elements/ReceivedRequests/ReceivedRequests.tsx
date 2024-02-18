import { useEffect, useState } from 'react';
import { t } from 'i18next';
import { Trans } from 'react-i18next';

import { useReceivedConnections } from '@/features/noums/hooks/spaceQuery';
import { useLaunchDarkly, useToggle, useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography/Typography';
import { RequestsAndInvitesModal } from '@/screens/Chamber/components/modals/RequestsAndInvites';
import RequestsAndInvitesModalV2 from '@/screens/Chambers/RequestsAndInvitesV2/modals/RequestsAndInvitesModalV2';
import { ReceivedRequestsSkeleton } from './ReceivedRequestsSkeleton';
import RequestList from './RequestList';
import { Container, AllRequests, ButtonView, Header } from './styles';
import { type ReceivedRequestProp } from './types';

const ReceivedRequests = ({
  isChambersScreen,
  noumId: spaceId,
  disabled,
}: ReceivedRequestProp) => {
  const dimensions = useWindowDimensions();
  const {
    flags: { noumRequestsInvitesV2 },
  } = useLaunchDarkly();
  const [isModalOpen, toggleModalOpen] = useToggle();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (dimensions.width > breakpoints.TABLET_L) {
      setIsCollapsed(false);
    }
  }, [dimensions.width]);

  const { data, loading, refetch } = useReceivedConnections(
    isChambersScreen ? { limit: 3 } : { spaceId, limit: 3 },
  );

  const refetchReceivedRequests = () =>
    refetch(isChambersScreen ? {} : { spaceId });

  return (
    <Container disabled={disabled}>
      {loading && !data?.receivedConnectionRequest?.data?.length ? (
        <ReceivedRequestsSkeleton />
      ) : (
        <>
          <Header>
            <ButtonView
              data-testid="received-requests-collapse-button"
              onClick={() => setIsCollapsed(!isCollapsed)}
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
          {isCollapsed ? (
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
                  count: data?.receivedConnectionRequest?.count || 0,
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
            <RequestList
              refetchReceivedRequests={refetchReceivedRequests}
              chamberId={spaceId}
              data={data}
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
          refetchReceivedRequests={refetchReceivedRequests}
        />
      ) : (
        <RequestsAndInvitesModal
          isOpen={isModalOpen}
          isChambersScreen={isChambersScreen}
          handleClose={toggleModalOpen}
          refetchReceivedRequests={refetchReceivedRequests}
          noumId={spaceId}
        />
      )}
    </Container>
  );
};

export default ReceivedRequests;
