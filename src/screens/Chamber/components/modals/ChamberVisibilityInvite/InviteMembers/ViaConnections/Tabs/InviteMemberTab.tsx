import {
  ActionType,
  ConnectionRequestTypeEnum,
} from '@/apollo/generated/types';
import { Infinite } from '@/components/Infinite';
import { Spinner } from '@/components/Spinner';
import { useConnections, useNoumDetails } from '@/features/noums/hooks/noums';
import { useUpdateConnectionStatusHelper } from '@/features/noums/hooks/spaceQuery';
import { useToast } from '@/hooks';
import { UserUtil } from '@/utils/user';
import React, { useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSendMultipleConnectionInviteMutation } from '@/apollo/graphql';
import { cleanList } from '@/utils/list';
import * as S from '../../../styles';
import { type InviteUserTabProps, type InvitedUser } from '../../../types';
import { ChamberInvitedUser } from '../ChamberInvitedUser';
import { InviteUserPicker } from '../InviteUserPicker/InviteUserPicker';

/** @deprecated This component was used in the legacy connection flow, and will be removed soon. */
const InviteMemberTab: React.FC<InviteUserTabProps> = ({ spaceId }) => {
  const {
    invitedConnectionsLoading: loadingConnections,
    invitedConnections: connections,
    refetchInvitedConnections: onRefetchConnections,
    fetchMoreInvitedConnections: fetchMoreConnections,
    invitedInfiniteState: connectionsInfiniteState,
  } = useConnections(spaceId, true, 10);

  const { space } = useNoumDetails(spaceId);

  const linkedNoumIds = useMemo(
    () => cleanList(space?.link?.linkedNoums.map((link) => link?._id)),
    [space?.link],
  );

  const { addToast } = useToast();
  const { t } = useTranslation();
  const isUsers = useMemo(() => !!connections?.length, [connections]);
  const invitesScrollRef = useRef<HTMLDivElement>(null);
  const { updateConnectionStatusHelper } = useUpdateConnectionStatusHelper();
  const [sendMultipleConnectionInviteMutation] =
    useSendMultipleConnectionInviteMutation();
  const connectedUsers = useMemo(() => {
    const result: InvitedUser[] = [];
    connections?.map((connection) => {
      if (
        (!UserUtil.isInactive(connection.requestTo?.uid) ||
          !UserUtil.isInactive(connection.requestFrom?.uid)) &&
        connection.status !== ConnectionRequestTypeEnum.Cancelled &&
        connection.status !== ConnectionRequestTypeEnum.Removed &&
        connection.requestTo?.uid?.userStatus !== ActionType.Unregistered &&
        !UserUtil.isInactive(connection.requestTo?.uid)
      ) {
        const requestedUser =
          connection.requestFrom?._id === spaceId ||
          linkedNoumIds.includes(connection?.requestFrom?._id!)
            ? connection?.requestTo?.uid
            : connection?.requestFrom?.uid;
        result.push({
          isMember: true,
          connectionStatus: connection.status!,
          connectionId: connection._id!,
          ...requestedUser!,
        } as InvitedUser);
      }
      return undefined;
    });
    return result;
  }, [connections, spaceId, linkedNoumIds]);
  const onResendInvite = useCallback(
    async (user: InvitedUser) => {
      try {
        await sendMultipleConnectionInviteMutation({
          variables: {
            ownSpaceId: spaceId,
            invitedSpaceIds: [user.chamber?._id || ''],
          },
        });
        addToast(
          'success',
          'icon',
          `${t('noumena.chamber_invite_sent.success_message')}`,
        );
        onRefetchConnections();
      } catch (e) {
        let message = 'Unknown';
        if (e instanceof Error) {
          message = e.message;
        }
        addToast(
          'error',
          'none',
          `${t('noumena.toast_error.text')}: ${message}`,
        );
      }
    },
    [
      sendMultipleConnectionInviteMutation,
      spaceId,
      addToast,
      t,
      onRefetchConnections,
    ],
  );
  const onHandleInvite = useCallback(
    (user: InvitedUser, value) => {
      switch (value) {
        case 'Cancel':
          updateConnectionStatusHelper({
            spaceId,
            connectionId: user.connectionId,
            status: ConnectionRequestTypeEnum.Cancelled,
          });
          break;
        case 'Resend':
          onResendInvite(user);
          break;
      }
    },
    [updateConnectionStatusHelper, spaceId, onResendInvite],
  );

  const handleRefetchConnection = useCallback(() => {
    onRefetchConnections();
    if (invitesScrollRef.current) {
      invitesScrollRef.current.scrollTo({
        top: invitesScrollRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  }, [onRefetchConnections]);

  return (
    <>
      <InviteUserPicker handleInvite={handleRefetchConnection} />
      {loadingConnections ? (
        <S.SpinnerContainer>
          <Spinner />
        </S.SpinnerContainer>
      ) : (
        <S.InvitedUsersWrapper>
          <Infinite
            ref={invitesScrollRef}
            onFetchMore={fetchMoreConnections}
            status={connectionsInfiniteState}
            scrollbarWidth={0}
            isSpinnerRelative
          >
            {Boolean(isUsers) &&
              connectedUsers?.map((user: InvitedUser) => (
                <ChamberInvitedUser
                  key={user._id}
                  user={user}
                  onSelect={onHandleInvite}
                />
              ))}
          </Infinite>
        </S.InvitedUsersWrapper>
      )}
    </>
  );
};

export default InviteMemberTab;
