import React, { useState } from 'react';
import {
  ConnectionRequestStatus,
  type ConnectionRequestTypeEnum,
  type NoumPendingConnection,
} from '@/apollo/generated/types';
import { useBreakpoints } from '@/hooks';

import { useModalManager } from '@/hooks/modal/useModalManager';
import { Stack } from '@/layout';
import { MembersModal } from '@/screens/Chamber/components/RequestInformation';
import { Separator } from '@/components/Separator/Separator';
import { type RequestsAndInvitesItemsPropsV2 } from './types';
import RequestsOrInvitesItemActions from './RequestsOrInvitesItemActions';
import { useRequestInvitationActions } from '../hooks';
import RequstsOrInvitesItemDetailV2 from './RequstsOrInvitesItemDetailV2';

type ModalType = 'actions';

const RequestsOrInvitesItemV2: React.FC<RequestsAndInvitesItemsPropsV2> = ({
  data,
  isReceived,
  isInvite,
  refetch,
}) => {
  const { isMobile } = useBreakpoints();

  const { actionHanlder, loader } = useRequestInvitationActions();
  const { modalType, openModal, closeModal } = useModalManager<ModalType>();
  const [member, setMember] = useState<NoumPendingConnection>();
  const [selectedActionType, setSelectedActionType] = useState<
    ConnectionRequestTypeEnum | undefined
  >(undefined);

  const isInvitesReceived = (isReceived && isInvite) || false;
  const isRequestSent = !isReceived && !isInvite;
  const handleActionClick = (
    actionType: ConnectionRequestTypeEnum,
    memberItem: NoumPendingConnection,
  ) => {
    openModal('actions');
    setSelectedActionType(actionType);
    setMember(memberItem);
  };
  const handleCloseActionModal = () => {
    closeModal();
    setSelectedActionType(undefined);
  };

  const handleActionConfirm = async () => {
    if (!selectedActionType || !isInvite) return;
    await actionHanlder(
      selectedActionType,
      isInvite,
      member?._id || '',
      member?.noum._id || '',
    );
    handleCloseActionModal();
    refetch();
  };

  const connectionStatus = isReceived
    ? ConnectionRequestStatus.Requested
    : ConnectionRequestStatus.Invited;

  return (
    <Stack
      justify="space-between"
      fullWidth
      gap={16}
      vertical
      align={isMobile ? undefined : 'center'}
    >
      <>
        {data.map((item) => (
          <Stack vertical fullWidth key={item?._id}>
            <Stack fullWidth align="center" justify="space-between">
              <RequstsOrInvitesItemDetailV2
                item={item}
                isInvitesReceived={isInvitesReceived}
                isRequestSent={isRequestSent}
              />
              <Stack align="center">
                <RequestsOrInvitesItemActions
                  isReceived={isReceived}
                  handleActionClick={(actionType) =>
                    handleActionClick(actionType, item as NoumPendingConnection)
                  }
                />
              </Stack>
            </Stack>
            <Separator size="thin" noMargin fullWidth />
          </Stack>
        ))}

        {member && (
          <MembersModal
            isOpen={modalType === 'actions'}
            actionType={selectedActionType}
            onClose={handleCloseActionModal}
            onConfirm={handleActionConfirm}
            isActionLoading={loader}
            connectionStatus={connectionStatus}
            user={member.user}
            date={member.requestedAt}
          />
        )}
      </>
    </Stack>
  );
};
export default RequestsOrInvitesItemV2;
