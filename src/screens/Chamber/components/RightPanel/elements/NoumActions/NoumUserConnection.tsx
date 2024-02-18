import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ConnectionRequestTypeEnum } from '@/apollo/generated/types';
import { Icon } from '@/components/Icon';
import { useAuth } from '@/features/auth/contexts';
import { useToggle } from '@/hooks';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import ChamberDisconnect from '@/screens/Chamber/components/modals/ChamberDisconnect';
import ConnectLinkedNoumsModal from '@/screens/Chamber/components/modals/ConnectLinkedNoumsModal';

import { GetNoumMembersCountDocument } from '@/apollo/graphql';
import { useApolloClient } from '@apollo/client';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { NoumActionButton } from './styles';
import { type UserActionProps } from './types';

export const NoumUserConnection: React.FC<UserActionProps> = ({
  onHandle,
  loading,
  isNoumEditor,
}) => {
  const { t } = useTranslation();
  const { space, refetchSpaceById: onRefetchSpaceById } = useNoumContext();
  const { isConnected } = useNoumUserConnectionContext();
  const apolloClient = useApolloClient();

  const { isActive: isUserActive } = useAuth();

  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [openLinkedNoumsModal, toggle] = useToggle(false);

  const handleConnect = useCallback(
    async (isLinked = true) => {
      const isSuccess = await onHandle(ConnectionRequestTypeEnum.Requested);
      if (isSuccess) {
        apolloClient.refetchQueries({ include: [GetNoumMembersCountDocument] });
        onRefetchSpaceById();
      }
      if (isLinked) {
        toggle();
      }
    },
    [apolloClient, onHandle, onRefetchSpaceById, toggle],
  );

  const onClickConnectButton = useCallback(() => {
    if (isConnected) {
      setShowConfirm(true);
    } else if (!space?.link) {
      handleConnect(false);
    } else {
      toggle();
    }
  }, [handleConnect, isConnected, space?.link, toggle]);

  const onDisconnect = useCallback(async () => {
    setShowConfirm(false);
    const isSuccess = await onHandle(ConnectionRequestTypeEnum.Declined);
    if (isSuccess) {
      apolloClient.refetchQueries({ include: [GetNoumMembersCountDocument] });
      onRefetchSpaceById();
    }
  }, [apolloClient, onHandle, onRefetchSpaceById]);

  return (
    <>
      <NoumActionButton
        testId="user-connection-button"
        disabled={!isUserActive || loading}
        loading={loading}
        isNoumEditor={isNoumEditor}
        size={!isNoumEditor ? 'full' : undefined}
        primary={!isConnected}
        tertiary={isConnected}
        leftIcon={
          isConnected ? (
            <Icon
              name="check_xs"
              size={16}
              color="--icon-button-neutral-default"
            />
          ) : undefined
        }
        onClick={onClickConnectButton}
      >
        {isConnected
          ? t('noumena.chamber.disconnect_button')
          : t('noumena.chamber.connect_button')}
      </NoumActionButton>
      {showConfirm && (
        <ChamberDisconnect
          spaceName={space?.name}
          onDisconnect={onDisconnect}
          onClose={() => setShowConfirm(false)}
        />
      )}
      {openLinkedNoumsModal && space?.link && (
        <ConnectLinkedNoumsModal
          actionType="connect"
          loading={loading}
          onConfirm={handleConnect}
          onClose={toggle}
        />
      )}
    </>
  );
};
