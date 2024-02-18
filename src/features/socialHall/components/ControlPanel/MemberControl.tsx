import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Icon } from '@/components/Icon';
import {
  useSocialHallCallContext,
  useSocialHallEventContext,
} from '@/providers';
import { BadgeContainer, BadgeNotification, ControlPanelIcon } from './styles';

export const MemberControl = ({
  onToggleMemberPanel,
  showMembersPanel,
}: {
  showMembersPanel: boolean;
  onToggleMemberPanel: () => void;
}) => {
  const { isEventHost, eventDetails } = useSocialHallEventContext();
  const { raisedHandUsers } = useSocialHallCallContext();
  const [showBadge, setShowBadge] = useState(false);
  const [isNewMemberJoined, setIsNewMemberJoined] = useState(false);

  const onToggleHandler = () => {
    onToggleMemberPanel();
    if (showMembersPanel) {
      setIsNewMemberJoined(false);
    }
  };

  useEffect(() => {
    const hostBadgeLogic = !!raisedHandUsers.length && isEventHost;
    setShowBadge(
      (hostBadgeLogic || !isEventHost) &&
        !eventDetails?.isInstantEvent &&
        !showMembersPanel &&
        isNewMemberJoined,
    );
  }, [
    isNewMemberJoined,
    raisedHandUsers,
    isEventHost,
    eventDetails?.isInstantEvent,
    showMembersPanel,
  ]);

  return (
    <ControlPanelIcon
      cursorAllowed
      onClick={onToggleHandler}
      data-title={t('noumena.social_hall.Control_panel.Members')}
    >
      {showBadge && (
        <BadgeContainer>
          <BadgeNotification />
        </BadgeContainer>
      )}
      <Icon size={24} name="groups_m" color="--icon-button-neutral-default" />
    </ControlPanelIcon>
  );
};
