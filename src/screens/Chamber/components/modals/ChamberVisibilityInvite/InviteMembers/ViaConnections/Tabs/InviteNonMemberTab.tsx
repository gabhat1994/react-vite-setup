import { Spinner } from '@/components/Spinner';
import { useToast } from '@/hooks';
import {
  useNonNoumMembers,
  useNoumDetails,
} from '@/features/noums/hooks/noums';
import {
  useSendNonMemberConnectionInviteHelper,
  useSetInviteInactiveHelper,
} from '@/features/noums/hooks/spaceQuery';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChamberInvitedUser } from '../ChamberInvitedUser';
import InviteNonUserPicker from '../InviteNonUserPicker';
import * as S from '../../../styles';
import { type InvitedUser, type InviteUserTabProps } from '../../../types';

/** @deprecated This component was used in the legacy connection flow, and will be removed soon. */
const InviteNonMemberTab: React.FC<InviteUserTabProps> = ({ spaceId }) => {
  const [connectedUsers, setConnectedUsers] = useState<InvitedUser[]>([]);
  const { loadingNonMembers, nonMembers } = useNonNoumMembers(spaceId);
  const { addToast } = useToast();
  const { t } = useTranslation();
  const isUsers = useMemo(() => !!nonMembers?.length, [nonMembers]);
  const { setInvitedMemberInactive } = useSetInviteInactiveHelper();
  const { sendNonMemberInvite } = useSendNonMemberConnectionInviteHelper();
  const { space: noumInfo } = useNoumDetails(spaceId);

  const checkMembersEmail = useCallback(() => {
    let checkEmailflag = nonMembers.length > 0;
    nonMembers?.forEach((connection) => {
      if (!connection.uid?.email) checkEmailflag = false;
    });
    return checkEmailflag;
  }, [nonMembers]);

  useEffect(() => {
    if (nonMembers && nonMembers.length !== 0 && checkMembersEmail()) {
      const result: InvitedUser[] = [];
      nonMembers?.forEach((connection) => {
        result.push({
          email: connection.uid?.email,
          connectionStatus: connection.uid?.userStatus!,
          connectionId: connection._id!,
          isVerified: connection.isVerified,
          ...connection.uid,
        } as InvitedUser);
      });
      setConnectedUsers(result);
    }
    if (!isUsers) setConnectedUsers([]);
  }, [checkMembersEmail, nonMembers, isUsers]);

  const onResendInvite = useCallback(
    async (user: InvitedUser) => {
      try {
        if (!noumInfo) return;
        await sendNonMemberInvite(
          spaceId,
          user.email || '',
          user.firstName || '',
          user.lastName || '',
          noumInfo,
        );
        addToast(
          'success',
          'icon',
          `${t('noumena.chamber_invite_sent.success_message')}`,
        );
      } catch (e) {
        let message = 'Unknown';
        if (e instanceof Error) {
          message = e.message;
        }
        addToast('error', 'none', message);
      }
    },
    [sendNonMemberInvite, spaceId, addToast, t, noumInfo],
  );
  const onHandleInvite = useCallback(
    async (user: InvitedUser, value) => {
      switch (value) {
        case 'Cancel':
          setInvitedMemberInactive(user.connectionId, spaceId);
          break;
        case 'Resend':
          onResendInvite(user);
          break;
      }
    },
    [setInvitedMemberInactive, spaceId, onResendInvite],
  );

  return (
    <>
      <InviteNonUserPicker connectedUsers={connectedUsers} spaceId={spaceId} />
      {loadingNonMembers ? (
        <S.SpinnerContainer>
          <Spinner />
        </S.SpinnerContainer>
      ) : (
        <S.InvitedUsersWrapper>
          {Boolean(isUsers) &&
            connectedUsers.map((user: InvitedUser) => (
              <ChamberInvitedUser
                key={user._id}
                user={user}
                onSelect={onHandleInvite}
                isNonNoumTab
              />
            ))}
        </S.InvitedUsersWrapper>
      )}
    </>
  );
};

export default InviteNonMemberTab;
