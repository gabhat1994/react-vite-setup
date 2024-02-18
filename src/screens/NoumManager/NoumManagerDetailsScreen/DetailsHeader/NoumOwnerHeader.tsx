import { ManagerDetailsHeaderLayout } from '@/features/noums/components/ManagerDetailsHeader';
import { useMembersManagerActions } from '@/features/noums/hooks/manageMembers';
import React from 'react';
import { NoumMemberStatus } from '@/apollo/generated/types';
import EllipsisMenu from '@/screens/Chambers/EllipsisMenu';
import { cleanList } from '@/utils/list';
import { useBreakpoints } from '@/hooks';
import { useNoumManagerDetailsProvider } from '../providers/NoumManagerDetailsProvider';

type NoumOwnerHeaderProps = {
  onGoBack: () => void;
};

export const NoumOwnerHeader: React.FC<NoumOwnerHeaderProps> = ({
  onGoBack,
}) => {
  const { noum, member } = useNoumManagerDetailsProvider();
  const { isMobile } = useBreakpoints();

  const { openModal, disconnectModalElement, editRoleModalElement } =
    useMembersManagerActions({
      noumId: noum?._id ?? '',
      onDisconnect: onGoBack,
      onEditRoles: () => null,
    });

  const isConnected = member?.status === NoumMemberStatus.Connected;
  const isInvited = member?.status === NoumMemberStatus.Invited;

  const handleDisconnect = () => {
    if (!member) return;
    openModal('disconnect', [member]);
  };

  const handleEditRole = () => {
    if (!member) return;
    openModal('edit-role', [member]);
  };

  const RightContentMobile = (
    <EllipsisMenu
      containerWidth="125px"
      neutral
      onClick={() => {}}
      menuOptions={cleanList([
        {
          key: 'edit-role',
          label: 'Edit Role',
          type: 'value',
          value: 'edit-role',
          onClick: handleEditRole,
        },
        isConnected
          ? {
              key: 'disconnect',
              label: 'Disconnect',
              type: 'value',
              value: 'disconnect',
              intent: 'danger',
              onClick: handleDisconnect,
            }
          : undefined,
        isInvited
          ? {
              key: 'cancel-invite',
              label: 'Cancel Invite',
              type: 'value',
              value: 'cancel-invite',
              intent: 'danger',
              onClick: () => handleDisconnect,
            }
          : undefined,
      ])}
      iconColorToken="--button-card-neutral-default"
    />
  );

  return (
    <>
      <ManagerDetailsHeaderLayout.BaseHeader
        member={member}
        onGoBack={onGoBack}
        rightContent={
          isMobile ? (
            RightContentMobile
          ) : (
            <>
              {isConnected ? (
                <ManagerDetailsHeaderLayout.DisconnectButton
                  onClick={handleDisconnect}
                />
              ) : isInvited ? (
                <ManagerDetailsHeaderLayout.CancelInviteButton
                  onClick={handleDisconnect}
                />
              ) : null}
              <ManagerDetailsHeaderLayout.EditRoleButton
                onClick={handleEditRole}
              />
            </>
          )
        }
      />
      {disconnectModalElement}
      {editRoleModalElement}
    </>
  );
};
