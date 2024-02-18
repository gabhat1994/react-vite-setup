import { useAlertNotifications } from '@/providers/AlertNotificationsProvider';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertNotificationGateway } from '../AlertNotificationGateway';
import S from './styles';
import { isNotificationExpired } from '../utils';

const offsetHidden = '110%';

export const AlertNotificationsList = () => {
  const { notifications, dismissNotification } = useAlertNotifications();

  return notifications.length ? (
    <S.Container>
      <AnimatePresence>
        {notifications.map((item) =>
          !isNotificationExpired(item) ? (
            <motion.div
              key={item.id}
              layout
              initial={{ translateX: offsetHidden, opacity: 0.3 }}
              animate={{ translateX: 0, opacity: 1 }}
              exit={{ translateX: offsetHidden, opacity: 0.3 }}
              transition={{ duration: 0.3 }}
            >
              <AlertNotificationGateway
                key={item.id}
                onDismiss={() => dismissNotification(item.id)}
                notification={item}
                bottomGap
              />
            </motion.div>
          ) : null,
        )}
      </AnimatePresence>
    </S.Container>
  ) : null;
};
