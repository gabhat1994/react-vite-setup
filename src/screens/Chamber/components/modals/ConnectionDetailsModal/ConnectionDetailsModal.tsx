import { NoumMemberStatus } from '@/apollo/generated/types';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Infinite, getBottomStatusFromQuery } from '@/components/Infinite';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { type InputListTypes } from '@/components/Tabs/types';
import { useNoumMembersManagerList } from '@/features/noums/hooks/manageMembers';
import { useBreakpoints, useLaunchDarkly } from '@/hooks';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { PAGE_SIZE } from '@/screens/Chambers/constants';
import { SpaceUtils } from '@/utils/space';
import { memo, useCallback, useMemo, type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { MemberRequestInformation } from '../../RequestInformation';
import { ConnectionDetailsContent } from './ConnectionDetailsContent';
import { getModalHeadList } from './ModalHeadList';
import {
  Container,
  NoResultsContainer,
  TabSectionHead,
  TextOnlySpan,
} from './styles';
import {
  ConnectionDetailModalTabEnum,
  type ConnectionDetailsModalProps,
} from './types';
import { useConnectionDetailsHelper } from './useConnectionDetailsHelper';

export const ConnectionDetailsModal: FC<ConnectionDetailsModalProps> = memo(
  ({
    isOpen,
    defaultTab,
    handleClose,
    followersCount,
    linkedNoumsCount,
    setInvitedInfo,
    showInviteModal,
    setDefaultTab,
    connectedProjectsCount = 0,
    userNoumsCount = 0,
    connectionsCount = 0,
  }) => {
    const { flags } = useLaunchDarkly();
    const { t } = useTranslation();

    const { isOwner, space } = useNoumContext();
    const { isConnected } = useNoumUserConnectionContext();
    const { isMobile, isTablet } = useBreakpoints();
    const { hasNoumPermission } = useNoumAuthorization();

    const isMasterNoum = SpaceUtils.isMasterNoum(space);
    const isSecretNoum = SpaceUtils.isSecretNoum(space);

    const canAssignUserRoles = hasNoumPermission('assign-user-roles', isOwner);
    const enableConnectionsAndFollowers =
      canAssignUserRoles && !isMasterNoum && !isSecretNoum;

    const enableConnectionsOnly = isConnected || isMasterNoum || isSecretNoum;

    const hasMemberConnections =
      flags.elementPermission &&
      !isMasterNoum &&
      defaultTab === ConnectionDetailModalTabEnum.Connections;
    const isHomeNoumConnectionDetail =
      isMasterNoum && defaultTab !== ConnectionDetailModalTabEnum.OwnedNoums;

    const connectedText = t('noumena.chamber.link.connection_date');
    const {
      membersData,
      currentCount: membersCurrentCount,
      totalCount: membersTotalCount,
      networkStatus: membersNetworkStatus,
      fetchMore: membersFetchMore,
      refetch,
    } = useNoumMembersManagerList({
      noumId: space?._id || '',
      rowsPerPage: PAGE_SIZE,
      defaultStatuses: [NoumMemberStatus.Connected],
      skip: !isOpen,
    });

    const {
      currentData,
      loading,
      totalCount: totalCountOld,
      networkStatus: networkStatusOld,
      fetchMore,
    } = useConnectionDetailsHelper(
      hasMemberConnections ? '' : space?._id || '',
      defaultTab || '',
      space?.link?._id,
      isMasterNoum ? space?.uid?._id : null,
    );

    const connectionCountForTitle = hasMemberConnections
      ? membersTotalCount
      : connectionsCount + connectedProjectsCount;

    const modalHeadList: InputListTypes[] = useMemo(
      () =>
        getModalHeadList({
          isHomeNoumConnectionDetail,
          connectedMembersCount: connectionsCount,
          linkedNoumsCount,
          isConnected,
          isOwner,
          isMasterNoum,
          followersCount,
          isSecretNoum,
          connectedProjectsCount,
          defaultTab,
          userNoumsCount,
          canSeeFollowers: canAssignUserRoles,
        }),
      [
        isHomeNoumConnectionDetail,
        connectionsCount,
        linkedNoumsCount,
        isConnected,
        isOwner,
        isMasterNoum,
        followersCount,
        isSecretNoum,
        connectedProjectsCount,
        defaultTab,
        userNoumsCount,
        canAssignUserRoles,
      ],
    );

    const totalCount = hasMemberConnections ? membersTotalCount : totalCountOld;
    const currentCount = hasMemberConnections
      ? membersCurrentCount
      : currentData?.length;
    const networkStatus = hasMemberConnections
      ? membersNetworkStatus
      : networkStatusOld;

    const title = useMemo(() => {
      if (modalHeadList.length > 1) {
        return linkedNoumsCount
          ? t('noumena.noum_link.link_details')
          : enableConnectionsAndFollowers
          ? t('noumena.noum.connections_and_followers')
          : enableConnectionsOnly
          ? isHomeNoumConnectionDetail
            ? t(`noumena.noum.home.connections`, {
                connectionsCount: connectionCountForTitle,
              })
            : t('noumena.noum.connections')
          : t('noumena.noum.followers');
      }
      return modalHeadList[0]?.text || '';
    }, [
      modalHeadList,
      linkedNoumsCount,
      t,
      enableConnectionsAndFollowers,
      enableConnectionsOnly,
      isHomeNoumConnectionDetail,
      connectionCountForTitle,
    ]);

    const handleChange = useCallback(
      (id: string) => {
        if (id) {
          setDefaultTab?.(id);
          if (hasMemberConnections) {
            refetch();
          }
        }
      },
      [hasMemberConnections, refetch, setDefaultTab],
    );
    const fetchMoreHandler = useCallback(() => {
      if (hasMemberConnections) {
        membersFetchMore();
      } else {
        fetchMore();
      }
    }, [fetchMore, hasMemberConnections, membersFetchMore]);

    const tabComponent = useMemo(() => {
      if (loading) {
        return null;
      }
      if (hasMemberConnections) {
        return membersData.map((item) => (
          <MemberRequestInformation
            key={item?._id}
            user={item.user}
            gap={isHomeNoumConnectionDetail ? 16 : 12}
            dateText={connectedText}
            date={item.connectedAt}
          />
        ));
      }
      if (currentData && currentData.length > 0) {
        return currentData.map((item) => (
          <ConnectionDetailsContent
            key={item?._id}
            item={item}
            selectedTab={defaultTab || ''}
            isOwner={isOwner}
            isArchived={SpaceUtils.isArchived(space)}
            closeModal={handleClose}
            setInvitedInfo={setInvitedInfo}
            showInviteModal={showInviteModal}
            gap={isHomeNoumConnectionDetail ? 16 : 12}
          />
        ));
      }
      return (
        <NoResultsContainer>
          <TextOnlySpan
            font="body-l"
            colorToken="--text-card-neutral-highlighted"
          >
            {t('noumena.chamber.link.no_value', { value: defaultTab })}
          </TextOnlySpan>
        </NoResultsContainer>
      );
    }, [
      loading,
      hasMemberConnections,
      currentData,
      t,
      defaultTab,
      membersData,
      isHomeNoumConnectionDetail,
      connectedText,
      isOwner,
      space,
      handleClose,
      setInvitedInfo,
      showInviteModal,
    ]);

    return (
      <Modal
        testId="testRequestsAndInvites"
        open={isOpen}
        onClose={handleClose}
        enableCloseButton
        size={ModalSize.L}
        isFullScreen={isMobile}
        closeButtonStyles={{
          enforceLeft: isTablet,
        }}
        spacingMode="gap-content"
        disableBackdropClick
      >
        <ModalHeader>{title}</ModalHeader>

        <ModalBody minHeight={488} maxHeight={isMobile ? 'unset' : '488px'}>
          {modalHeadList.length > 1 && (
            <Container>
              <TabSectionHead autoWidth={isHomeNoumConnectionDetail}>
                <BasicChipsTabsForm
                  onChange={handleChange}
                  inputList={modalHeadList}
                  selectedId={defaultTab || ''}
                  mode="isBackground"
                  isWithoutImage
                  fontSize="--font-button-small-size"
                  fullWidth={true}
                  textFont="--font-body-medium-regular-font"
                />
              </TabSectionHead>
            </Container>
          )}

          <Infinite
            onFetchMore={fetchMoreHandler}
            status={getBottomStatusFromQuery({
              networkStatus,
              totalCount,
              currentCount,
            })}
            disableFetchMoreWhileLoading={true}
            isSpinnerRelative
            style={{
              overflowX: 'hidden',
            }}
            width="100%"
          >
            {tabComponent}
          </Infinite>
        </ModalBody>
      </Modal>
    );
  },
);
