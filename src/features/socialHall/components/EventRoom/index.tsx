import { useLaunchDarkly } from '@/hooks/launchDarkly';
import {
  EventRoom as EventRoomComponent,
  type EventRoomProps,
} from './EventRoom';
import { EventRoomOld } from './EventRoomOld';

export const EventRoom = (props: EventRoomProps) => {
  const {
    flags: { socialHallVideoCall },
  } = useLaunchDarkly();

  return socialHallVideoCall ? (
    <EventRoomComponent {...props} />
  ) : (
    <EventRoomOld {...props} />
  );
};
