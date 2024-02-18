import React, { useState } from 'react';
import { ResolvingAnimationState } from '@/screens/Chamber/components/modals/RequestsAndInvites/types';
import { useAuth } from '@/features/auth/contexts';
import {
  type Maybe,
  type ConnectionRequestTypeEnum,
} from '@/apollo/generated/types';
import { useUpdateConnectionStatusHelper } from '@/features/noums/hooks/spaceQuery';
import { useBreakpoints } from '@/hooks';
import { TSpan } from '@/components';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { type RequestsOrInviteItemProps } from './types';
import { RequestsOrInvitesItemWrapper } from './styles';
import { RequestOrInvitesActionModal } from '../modals/RequestsOrInvitesActionModal';
import RequestsOrInvitesItemActions from './RequestsOrInvitesItemActions';
import RequstsOrInvitesItemDetail from './RequstsOrInvitesItemDetail';
import ItemDetailMessageModal from '../modals/ItemDetailMessageModal';

const RequestsOrInvitesItem: React.FC<RequestsOrInviteItemProps> = ({
  item,
  isInvite,
  isReceived,
  refetch,
}) => {
  const { isMobile } = useBreakpoints();
  const { user } = useAuth();
  const [isOpenActionModal, setIsOpenActionModal] = useState(false);
  const [isOpenMessageModal, setIsOpenMessageModal] = useState(false);
  const { onChangeLastUpdatedConnectionId } = useNoumUserConnectionContext();

  const [animationState, setAnimationState] = useState<ResolvingAnimationState>(
    ResolvingAnimationState.Default,
  );

  const {
    updateConnectionStatusHelper,
    loading: updateConnectionStatusLoading,
  } = useUpdateConnectionStatusHelper();

  const startRequestResolvingAnimation = () => {
    setAnimationState(ResolvingAnimationState.FadeOut);
    refetch();
  };

  const updateConnectionStatus = async (
    connectId: Maybe<string> | undefined,
    statusToUpdate: ConnectionRequestTypeEnum,
  ) => {
    if (connectId) {
      const isSuccess = await updateConnectionStatusHelper({
        spaceId: user?.chamber?._id || '',
        connectionId: connectId,
        status: statusToUpdate,
      });

      if (onChangeLastUpdatedConnectionId)
        onChangeLastUpdatedConnectionId(connectId);
      if (isSuccess) {
        startRequestResolvingAnimation();
        handleCloseActionModal();
      }
    }
  };

  const [selectedActionType, setSelectedActionType] = useState<
    ConnectionRequestTypeEnum | undefined
  >(undefined);

  const handleActionClick = (actionType: ConnectionRequestTypeEnum) => {
    setIsOpenActionModal(true);
    setSelectedActionType(actionType);
  };

  const handleCloseActionModal = () => {
    setIsOpenActionModal(false);
    setSelectedActionType(undefined);
  };

  const handleActionConfirm = async () => {
    if (selectedActionType)
      await updateConnectionStatus(item._id, selectedActionType);
  };

  const handleClickShowMessage = () => {
    if (isMobile) setIsOpenMessageModal(true);
  };

  return (
    <RequestsOrInvitesItemWrapper
      justify="space-between"
      fullWidth
      gap={16}
      animationState={animationState}
      vertical={isMobile && isReceived}
      align={isMobile ? undefined : 'center'}
    >
      <RequstsOrInvitesItemDetail
        item={item}
        isReceived={isReceived}
        isInvite={isInvite}
        showMessage={!!item.message}
        handleClickShowMessage={handleClickShowMessage}
      />
      <RequestsOrInvitesItemActions
        isReceived={isReceived}
        handleActionClick={handleActionClick}
      />
      <RequestOrInvitesActionModal
        isOpen={isOpenActionModal}
        actionType={selectedActionType}
        onClose={handleCloseActionModal}
        onConfirm={handleActionConfirm}
        isActionLoading={updateConnectionStatusLoading}
        isInvite={isInvite}
        item={item}
        isReceived={isReceived}
      />
      {item.message && isMobile && (
        <ItemDetailMessageModal
          open={isOpenMessageModal}
          onClose={() => setIsOpenMessageModal(false)}
        >
          <TSpan colorToken="--text-modal-neutral-default">
            {item.message}
          </TSpan>
        </ItemDetailMessageModal>
      )}
    </RequestsOrInvitesItemWrapper>
  );
};

export default RequestsOrInvitesItem;
