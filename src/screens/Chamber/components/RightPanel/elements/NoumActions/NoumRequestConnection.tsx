import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ConnectionRequestTypeEnum } from '@/apollo/generated/types';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import ChamberCancelRequest from '@/screens/Chamber/components/modals/ChamberCancelRequest';
import ConnectLinkedNoumsModal from '@/screens/Chamber/components/modals/ConnectLinkedNoumsModal';
import { useAuth } from '@/features/auth/contexts';
import { useToggle } from '@/hooks';

import { NoumActionButton } from './styles';
import { type UserActionProps } from './types';

export const NoumRequestConnection: React.FC<UserActionProps> = ({
  connectionStatus,
  onHandle,
  loading,
  isNoumEditor,
}) => {
  const { t } = useTranslation();
  const { isActive: isUserActive } = useAuth();
  const { space } = useNoumContext();
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [openLinkedNoumsModal, toggle] = useToggle(false);

  const isRequested = useMemo(
    () => connectionStatus === ConnectionRequestTypeEnum.Requested,
    [connectionStatus],
  );

  const handleRequest = useCallback(
    async (isLinked = true) => {
      await onHandle(ConnectionRequestTypeEnum.Requested);
      if (isLinked) {
        toggle();
      }
    },
    [onHandle, toggle],
  );

  const onCancelRequest = useCallback(async () => {
    await onHandle(ConnectionRequestTypeEnum.Cancelled);
    setShowConfirm(false);
  }, [onHandle]);

  const onClickRequestButton = useCallback(async () => {
    if (isRequested) {
      setShowConfirm(true);
      return;
    }
    if (!space?.link) {
      await handleRequest(false);
      return;
    }
    toggle();
  }, [handleRequest, isRequested, space, toggle]);

  return (
    <>
      <NoumActionButton
        isNoumEditor={isNoumEditor}
        testId="request-connection-button"
        disabled={!isUserActive || loading}
        loading={loading}
        size={!isNoumEditor ? 'full' : undefined}
        primary={!isRequested}
        tertiary={isRequested}
        onClick={onClickRequestButton}
      >
        {isRequested
          ? t('noumena.chamber.request_sent_button')
          : t('noumena.chamber.request_connect_button')}
      </NoumActionButton>
      {showConfirm && (
        <ChamberCancelRequest
          spaceName={space?.name}
          onCancelRequest={onCancelRequest}
          loading={loading}
          onClose={() => setShowConfirm(false)}
        />
      )}
      {openLinkedNoumsModal && space?.link && (
        <ConnectLinkedNoumsModal
          actionType="connect"
          loading={loading}
          onConfirm={handleRequest}
          onClose={toggle}
        />
      )}
    </>
  );
};
