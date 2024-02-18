import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';

import { ConnectionRequestStatus } from '@/apollo/generated/types';
import { Spinner } from '@/components/Spinner';
import { TSpan } from '@/components/Typography/Typography';
import { Icon } from '@/components/Icon';
import { RequestsAndInvitesModal } from '@/screens/Chamber/components/modals/RequestsAndInvites';
import InvitesOrMyRequestsList from '@/screens/Chamber/components/modals/RequestsAndInvites/InvitesOrMyRequestsList';
import { useToggle, useWindowDimensions } from '@/hooks';
import { useRequestedConnections } from '@/features/noums/hooks/spaceQuery';
import { breakpoints } from '@/constants/devices';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { InvitedByMeSkeleton } from './InvitedByMeSkeleton';
import {
  Container,
  SpinnerContainer,
  AllInvites,
  ButtonView,
  Header,
  CollapsedWrapper,
} from './styles';
import { type InvitesMeProp } from './types';

const InvitedByMe = ({
  isChambersScreen,
  noumId: spaceId,
  disabled,
}: InvitesMeProp) => {
  const dimensions = useWindowDimensions();
  const { lastUpdatedConnectionId } = useNoumUserConnectionContext();
  const [isModalOpen, toggleModalOpen] = useToggle();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { data, loading, refetch } = useRequestedConnections({
    limit: 3,
    requestFrom: isChambersScreen ? null : spaceId,
    status: ConnectionRequestStatus.Invited,
  });
  useEffect(() => {
    if (dimensions.width > breakpoints.TABLET_L) {
      setIsCollapsed(false);
    }
  }, [dimensions.width]);

  useEffect(() => {
    if (
      lastUpdatedConnectionId &&
      data?.requestedConnection?.data &&
      data?.requestedConnection?.data?.findIndex(
        (x) => x?.connectionId === lastUpdatedConnectionId,
      ) > -1
    )
      refetch();
  }, [data?.requestedConnection?.data, lastUpdatedConnectionId, refetch]);

  return (
    <Container disabled={disabled}>
      {loading && !data?.requestedConnection?.data?.length ? (
        <InvitedByMeSkeleton />
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
              {t(`noumena.chamber.modal.invited_by_me`)?.toLocaleUpperCase()}
            </TSpan>
          </Header>
          {loading ? (
            <SpinnerContainer>
              <Spinner />
            </SpinnerContainer>
          ) : isCollapsed ? (
            <CollapsedWrapper
              font="body-m"
              colorToken="--text-body-neutral-default"
              textAlign="center"
              $fill
            >
              <Trans
                i18nKey="noumena.chamber.awaiting_received_requests"
                values={{
                  postProcess: 'interval',
                  count: data?.requestedConnection?.count || 0,
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
            </CollapsedWrapper>
          ) : (
            <InvitesOrMyRequestsList
              isChambersScreen={isChambersScreen}
              refetch={refetch}
              chamberId={spaceId}
              data={data}
              loading={loading}
              isChamberBox={true}
            />
          )}
          {!loading && (
            <AllInvites
              textOnly
              onClick={disabled ? undefined : toggleModalOpen}
            >
              {t(`noumena.chamber.modal.see_all_invited_by_me`)}
            </AllInvites>
          )}
          <RequestsAndInvitesModal
            isOpen={isModalOpen}
            isChambersScreen={isChambersScreen}
            handleClose={toggleModalOpen}
            noumId={spaceId}
            isInviteOnly
          />
        </>
      )}
    </Container>
  );
};

export default InvitedByMe;
