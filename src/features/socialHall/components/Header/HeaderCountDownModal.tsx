import { useEffect, useState } from 'react';
import { EventsStatus } from '@/apollo/generated/types';
import { useSocialHallEventContext } from '@/providers';
import { useHeaderTimer } from '@/features/socialHall/hooks';
import { countDownModalData, EventModal } from '../EventModals/EventModal';

export const HeaderCountDownModal = () => {
  const { remainTime } = useHeaderTimer();
  const [showCountDownModal, setShowCountDownModal] = useState<boolean>(false);
  const { eventDetails } = useSocialHallEventContext();

  useEffect(() => {
    if (
      eventDetails?.status === EventsStatus.PreLive &&
      remainTime / 1000 < 4 &&
      remainTime / 1000 > 3
    ) {
      setShowCountDownModal(true);
    }
  }, [eventDetails?.status, remainTime]);
  return (
    <EventModal
      isOpen={showCountDownModal}
      onClose={() => setShowCountDownModal(false)}
      countDown={true}
      remainTime={remainTime}
      {...countDownModalData}
    />
  );
};
