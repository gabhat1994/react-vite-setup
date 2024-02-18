import {
  ConnectionRequestStatus,
  ProjectChamberType,
  SpaceTypeEnum,
} from '@/apollo/generated/types';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { ConnectionDetailsModal } from '@/screens/Chamber/components/modals/ConnectionDetailsModal/ConnectionDetailsModal';
import { ConnectionInviteModal } from '@/screens/Chamber/components/modals/ConnectionInviteModal/ConnectionInviteModal';
import { NetworkStatus } from '@apollo/client';
import { t } from 'i18next';
import { useCallback, useEffect, useMemo, useState, type FC } from 'react';

import {
  useGetTokenQuery,
  type SpaceOutputFragment,
  useGetNoumConnectedMembersQuery,
} from '@/apollo/graphql';
import { useEvents } from '@/features/events/hooks';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import {
  useReceivedConnections,
  useRequestedConnections,
} from '@/features/noums/hooks/spaceQuery';
import { useLaunchDarkly } from '@/hooks/launchDarkly';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { useGetNoumByLinkContext } from '@/screens/Chamber/components/RightPanel/NoumByLinkProvider';
import { ChamberVisibilityInviteModal } from '@/screens/Chamber/components/modals/ChamberVisibilityInvite';
import { ConnectionDetailModalTabEnum } from '@/screens/Chamber/components/modals/ConnectionDetailsModal/types';
import { useConnectionDetailsHelper } from '@/screens/Chamber/components/modals/ConnectionDetailsModal/useConnectionDetailsHelper';
import NoumDashboardMetricsModal from '@/screens/Chamber/components/modals/NoumDashboardMetricsModal';
import {
  NoumDashboardMetricsModalTabEnum,
  NoumDashboradTypeEnum,
} from '@/screens/Chamber/components/modals/NoumDashboardMetricsModal/types';
import TokenModal from '@/screens/Money/Payments/Tokens/TokenModal';
import { SpaceUtils } from '@/utils/space';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { RequestsAndInvitesModal } from '../../modals/RequestsAndInvites';
import { InfoStackWrapper } from '../styles';
import NoumMembersTab from './NoumMembersTab';
import { useNoumMembersCounts } from './useNoumMembersCounts';

type ModalType = 'connections' | 'visibility' | 'token' | 'request-and-invites';

export const NoumMembersInformation: FC = () => {
  const {
    flags: { noumDashboardMetrics, elementPermission },
  } = useLaunchDarkly();
  const { space, isOwner, loadingSpace } = useNoumContext();
  const isMasterNoum = SpaceUtils.isMasterNoum(space);
  const { isConnected, isFollowing, lastUpdatedConnectionId } =
    useNoumUserConnectionContext();

  const { data: connectedMembersData } = useGetNoumConnectedMembersQuery({
    skip: !space?._id || elementPermission,
    variables: {
      noumId: space?._id!,
      limit: 1,
    },
    fetchPolicy: 'cache-and-network',
  });

  const { eventMeta, networkStatus } = useEvents({
    chamberId: space?._id || '',
    preventGetEvents: false,
  });
  const {
    data: tokenData,
    refetch: tokenRefetch,
    loading: loadingTokenData,
  } = useGetTokenQuery({
    skip: !isMasterNoum,
  });
  const [defaultTab, setDefaultTab] = useState<string>();
  const [dashboardType, setDashboardType] = useState<
    NoumDashboradTypeEnum | undefined
  >();
  const [invitedInfo, setInvitedInfo] = useState<SpaceOutputFragment>();

  const { openModal, closeModal, modalType } = useModalManager<ModalType>();

  const { hasNoumPermission } = useNoumAuthorization();

  const shouldShowInviteBox =
    (SpaceUtils.isPublicNoum(space) || SpaceUtils.isSecretNoum(space)) &&
    !isMasterNoum;

  const {
    membersConnectedCounts,
    membersRequestedCounts,
    membersInvitedCounts,
    membersConnectedLoading,
    membersRequestedLoading,
    membersInvitedLoading,
  } = useNoumMembersCounts({
    noumId: space?._id || '',
  });

  const {
    data: requestedConnection,
    refetch: refetchRequestConnection,
    loading: loadingRequestConnection,
  } = useRequestedConnections({
    limit: 3,
    requestFrom: isMasterNoum ? null : space?._id,
    status: ConnectionRequestStatus.Invited,
  });

  const {
    data: receivedConnections,
    refetch: refetchReceivedConnection,
    loading: loadingReceivedConnection,
  } = useReceivedConnections(
    isMasterNoum ? { limit: 3 } : { spaceId: space?._id, limit: 3 },
    isOwner,
  );

  const {
    noumLinkData,
    loadingLinked,
    refetch: refetchLinkData,
  } = useGetNoumByLinkContext();

  const { totalCount, loading: connectionDetailsLoading } =
    useConnectionDetailsHelper(
      '',
      ConnectionDetailModalTabEnum.ProjectSpaces,
      undefined,
      isMasterNoum ? space?.uid?._id : null,
    );

  const connectedProjectsCount = isMasterNoum ? totalCount : 0;

  const { totalCount: userNoumsCount, loading: loadingUserNoums } =
    useConnectionDetailsHelper(
      '',
      ConnectionDetailModalTabEnum.OwnedNoums,
      undefined,
      isMasterNoum ? space?.uid?._id : null,
    );

  const ownedCounts = isMasterNoum ? userNoumsCount : 0;

  const linkedNoumsCount =
    noumLinkData?.getNoumLinkByNoumId?.link?.linkedNoumsCount || 0;

  const linkByNoumId = noumLinkData?.getNoumLinkByNoumId?.link;

  const isSummaryDescrisption =
    space?.description || space?.uid?.bio || undefined;

  const followersCount = linkByNoumId?._id
    ? linkByNoumId?.followersCount
    : space?.followersCount ?? 0;

  const isFollowersClickable =
    hasNoumPermission('assign-user-roles', isOwner) ||
    (isMasterNoum && followersCount > 0);

  const showFollowers =
    space?.type !== SpaceTypeEnum.Home &&
    space?.projectType !== ProjectChamberType.Secret &&
    !SpaceUtils.isRiseApplicationNoum(space) &&
    !SpaceUtils.isRiseNoum(space);

  const showCompleteness = useMemo(
    () => !space?.percentCompleted || space?.percentCompleted < 100,
    [space?.percentCompleted],
  );

  const requestConnectionCount =
    requestedConnection?.requestedConnection?.count || 0;

  const receivedConnectionCount =
    receivedConnections?.receivedConnectionRequest?.count || 0;

  const connectedMembersCountOld =
    connectedMembersData?.getNoumConnectedMembers?.count ?? 0;

  const totalConnectedCount = elementPermission
    ? membersConnectedCounts || 0
    : connectedMembersCountOld;

  const totalRequestedAndInvitedCount = elementPermission
    ? membersRequestedCounts + membersInvitedCounts
    : requestConnectionCount + receivedConnectionCount;

  const totalInvitedCount = elementPermission
    ? membersInvitedCounts
    : requestedConnection?.requestedConnection?.count || 0;

  const requestedAndInvitedMemberLoading =
    loadingRequestConnection ||
    loadingReceivedConnection ||
    membersRequestedLoading ||
    membersInvitedLoading;

  const isClickableConnections =
    isOwner || isConnected || (isMasterNoum && connectedMembersCountOld > 0);

  const handleClickConnections = useCallback(() => {
    if (isClickableConnections) {
      if (isMasterNoum || !noumDashboardMetrics)
        setDefaultTab(ConnectionDetailModalTabEnum.Connections);
      else if (hasNoumPermission('assign-user-roles', isOwner)) {
        setDashboardType(NoumDashboradTypeEnum.connections);
        setDefaultTab(NoumDashboardMetricsModalTabEnum.Statistics);
      } else setDefaultTab(ConnectionDetailModalTabEnum.Connections);
    }
  }, [
    hasNoumPermission,
    isClickableConnections,
    isMasterNoum,
    isOwner,
    noumDashboardMetrics,
  ]);

  const info = useMemo(() => {
    if (tokenData?.getSpaceByType && tokenData?.getSpaceByType[0]) {
      return tokenData?.getSpaceByType[0];
    }
    return {
      token: {
        count: '--',
      },
    };
  }, [tokenData]);

  const refetchReceivedRequests = () =>
    refetchReceivedConnection(isMasterNoum ? {} : { spaceId: space?._id });

  useEffect(() => {
    if (
      lastUpdatedConnectionId &&
      requestedConnection?.requestedConnection?.data &&
      requestedConnection?.requestedConnection?.data?.findIndex(
        (x) => x?.connectionId === lastUpdatedConnectionId,
      ) > -1
    )
      refetchRequestConnection();
  }, [
    requestedConnection?.requestedConnection?.data,
    lastUpdatedConnectionId,
    refetchRequestConnection,
  ]);

  const rewardInfoCount = useMemo(
    () => typeof info.token?.count === 'number' && info.token.count > 0,
    [info.token?.count],
  );

  useEffect(() => {
    if (!showCompleteness) {
      tokenRefetch();
    }
  }, [showCompleteness, tokenRefetch]);

  useEffect(() => {
    refetchLinkData();
    /* this needs to be called only when spaceFollowersCount is changed */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [space?.followersCount]);

  const hasConnections =
    totalConnectedCount > 0 && !SpaceUtils.isRiseApplicationNoum(space);

  const hasFollowers = showFollowers && followersCount > 0;
  const hasLinkedNoums = (isOwner || isConnected) && linkedNoumsCount > 0;
  const hasEvents = (eventMeta?.hostedEventsCount ?? 0) > 0;
  const hasTokenReward = isOwner && isMasterNoum && !!rewardInfoCount;

  const hasConnectionModal =
    (isFollowing ||
      isClickableConnections ||
      linkedNoumsCount > 0 ||
      (isMasterNoum &&
        defaultTab === ConnectionDetailModalTabEnum.OwnedNoums)) &&
    !connectionDetailsLoading &&
    !loadingUserNoums &&
    !!defaultTab &&
    defaultTab !== NoumDashboardMetricsModalTabEnum.Statistics;

  return (
    <>
      <InfoStackWrapper isSummaryDescription={!!isSummaryDescrisption}>
        <NoumMembersTab
          label={t('noumena.chamber.connections', {
            postProcess: 'interval',
            count: totalConnectedCount,
          })}
          counts={totalConnectedCount}
          isClickable={isClickableConnections}
          loading={loadingSpace || membersConnectedLoading}
          onClick={handleClickConnections}
          isHidden={!hasConnections}
        />
        <NoumMembersTab
          label={t('noumena.chamber.followers', {
            postProcess: 'interval',
            count: followersCount,
          })}
          counts={followersCount}
          isClickable={isFollowersClickable}
          loading={loadingSpace}
          onClick={() => setDefaultTab(ConnectionDetailModalTabEnum.Followers)}
          isHidden={!hasFollowers}
        />
        <NoumMembersTab
          label={t('noumena.noum_editor.linked_noum')}
          counts={linkedNoumsCount}
          isClickable={isClickableConnections}
          loading={loadingLinked}
          onClick={() => setDefaultTab(ConnectionDetailModalTabEnum.Noums)}
          isHidden={!hasLinkedNoums}
        />
        <NoumMembersTab
          label={t('noumena.noum_editor.owned_noum')}
          counts={ownedCounts}
          isClickable={isClickableConnections}
          loading={loadingUserNoums!}
          onClick={() => setDefaultTab(ConnectionDetailModalTabEnum.OwnedNoums)}
          isHidden={ownedCounts <= 0}
        />
        {hasNoumPermission('invite-users', true) ? (
          shouldShowInviteBox ? (
            <>
              <NoumMembersTab
                label={t('noumena.chamber.modal.invited_by_me')}
                counts={totalInvitedCount}
                isClickable={isClickableConnections}
                loading={loadingRequestConnection || membersRequestedLoading}
                onClick={() => openModal('request-and-invites')}
                isHidden={totalInvitedCount <= 0}
              />
            </>
          ) : (
            <NoumMembersTab
              label={t('noumena.chamber.modal.requests_invites')}
              counts={totalRequestedAndInvitedCount}
              isClickable={isClickableConnections}
              loading={requestedAndInvitedMemberLoading}
              onClick={() => openModal('request-and-invites')}
              isHidden={totalRequestedAndInvitedCount <= 0}
            />
          )
        ) : null}
        <NoumMembersTab
          label={t('noumena.noum.events', {
            postProcess: 'interval',
            count: eventMeta?.hostedEventsCount || 0,
          })}
          counts={eventMeta?.hostedEventsCount || 0}
          isClickable
          loading={networkStatus !== NetworkStatus.ready}
          isHidden={!hasEvents}
        />
        <NoumMembersTab
          label={t('noumena.money.tokens.subheading')}
          counts={Number(info.token?.count) || 0}
          isClickable
          loading={loadingTokenData}
          onClick={() => openModal('token')}
          isHidden={!hasTokenReward}
        />
      </InfoStackWrapper>

      {hasConnectionModal && (
        <ConnectionDetailsModal
          isOpen
          defaultTab={defaultTab}
          handleClose={() => setDefaultTab(undefined)}
          followersCount={followersCount}
          linkedNoumsCount={linkedNoumsCount}
          connectedProjectsCount={connectedProjectsCount}
          connectionsCount={totalConnectedCount}
          setInvitedInfo={setInvitedInfo}
          showInviteModal={() => openModal('connections')}
          userNoumsCount={userNoumsCount}
          setDefaultTab={setDefaultTab}
        />
      )}
      <NoumDashboardMetricsModal
        isOpen={!!dashboardType}
        dashboardType={dashboardType}
        handleClose={() => setDashboardType(undefined)}
      />
      <ConnectionInviteModal
        isOpen={modalType === 'connections'}
        invitedInfo={invitedInfo || {}}
        ownNoumId={space?._id || ''}
        closeInviteModal={closeModal}
      />
      <ChamberVisibilityInviteModal
        spaceId={space?._id || ''}
        isOpen={modalType === 'visibility'}
        handleClose={closeModal}
        isOnlyInvite={true}
      />
      <RequestsAndInvitesModal
        isOpen={modalType === 'request-and-invites'}
        isChambersScreen={isMasterNoum}
        handleClose={closeModal}
        noumId={space?._id || ''}
        isInviteOnly={shouldShowInviteBox}
        refetchReceivedRequests={refetchReceivedRequests}
      />
      <TokenModal open={modalType === 'token'} onClose={closeModal} />
    </>
  );
};
