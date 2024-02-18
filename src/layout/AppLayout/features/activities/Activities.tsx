import { AppTopBar } from '@/components/AppNavigation/AppTopBar';
import routes from '@/constants/routes';
import { useLaunchDarkly } from '@/hooks';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { type EventFragment } from '@/apollo/graphql';
import { useAppLayout } from '../../AppLayoutContext';
import { type ActivityType } from '../../types';
import { ActivityModals } from './ActivityModals';
import { type ModalType } from './types';
import { useUnreadCounters } from './useUnreadCounters';

export function TopBarActivities() {
  const { flags } = useLaunchDarkly();

  const { onNavigate } = useAppLayout();

  const modalManager = useModalManager<ModalType, EventFragment>();

  const unreadCount = useUnreadCounters();

  const handleActivityClick = (key: ActivityType) => {
    switch (key) {
      case 'events':
        modalManager.openModal('calendar');
        break;
      case 'notifications':
        modalManager.openModal('notifications');
        break;
      case 'messages':
        onNavigate(routes.MESSAGES);
        break;
    }
  };

  return (
    <>
      {!!flags.noumsSocialHall && (
        <AppTopBar.ActivityIcon
          name="events"
          label="Events"
          isActive={modalManager.modalType === 'calendar'}
          showDot={unreadCount.events > 0}
          onClick={() => handleActivityClick('events')}
        />
      )}
      <AppTopBar.ActivityIcon
        name="notification"
        label="Notifications"
        isActive={modalManager.modalType === 'notifications'}
        showDot={unreadCount.notifications > 0}
        onClick={() => handleActivityClick('notifications')}
      />
      <AppTopBar.ActivityIcon
        name="chat"
        label="Messages"
        isActive={false}
        showDot={unreadCount.messages > 0}
        onClick={() => handleActivityClick('messages')}
      />
      <ActivityModals {...modalManager} />
    </>
  );
}
