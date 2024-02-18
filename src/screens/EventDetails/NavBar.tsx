import { EventsStatus, UserRole } from '@/apollo/generated/types';
import { Icon } from '@/components/Icon';
import { Tag } from '@/components/Tag';
import { TSpan } from '@/components/Typography';
import { useBreakpoints } from '@/hooks';
import { useEventMeta } from '@/features/events/hooks';
import { Stack } from '@/layout';
import { t } from 'i18next';
import { EventDetailsWrapper } from './styles';
import { type EventNavProps } from './types';

import EventDetailActions from './EventDetailActions';

export const NavBar = ({ event, masterId, refetch }: EventNavProps) => {
  const { isMobile } = useBreakpoints();
  const { userRole } = useEventMeta({ chamberId: masterId, event });
  const isShowHostLabel = [UserRole.Host, UserRole.Cohost].includes(userRole);

  return (
    <>
      {isMobile ? (
        <Stack align="center" vertical>
          <EventDetailActions
            event={event}
            masterId={masterId}
            refetch={refetch}
          />
        </Stack>
      ) : (
        <EventDetailsWrapper>
          <Stack
            padding="0 10px"
            fullWidth
            justify="space-between"
            align="center"
          >
            <Stack gap={16}>
              <Stack gap={12}>
                {isShowHostLabel && (
                  <Tag size="small" secondary>
                    {t('noumena.social_hall.host')}
                  </Tag>
                )}
                {event.status === EventsStatus.Live && (
                  <Tag
                    size="small"
                    bgColor="var(--bg-badge-danger-primary-default)"
                    icon={<Icon name="wave_left_m" size={16} />}
                    rightIcon={<Icon name="wave_right_m" size={16} />}
                  >
                    {t('noumena.event.event_duration.live_now')}
                  </Tag>
                )}
                <TSpan font="body-xl-bold"> {event.title} </TSpan>
              </Stack>
            </Stack>
            <Stack align="center" gap={12}>
              <EventDetailActions
                event={event}
                masterId={masterId}
                refetch={refetch}
              />
            </Stack>
          </Stack>
        </EventDetailsWrapper>
      )}
    </>
  );
};
