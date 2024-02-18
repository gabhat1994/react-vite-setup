import { type Event, Privacy } from '@/apollo/generated/types';
import ROUTES from '@/constants/routes';
import { type ModalManagerResult } from '@/hooks/modal/useModalManager';
import { useSocialHallEvent } from '@/features/socialHall/hooks';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { type ModalType } from './types';

interface UseEventRedirectionHandler
  extends Pick<ModalManagerResult<ModalType, Event>, 'openModal'> {}

export function useEventRedirectionHandler({
  openModal,
}: UseEventRedirectionHandler) {
  const { eventDetails } = useSocialHallEvent();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const LIVE_EVENTS = ['GOLIVE', 'LIVE', 'PRE_LIVE', 'PRE_EVENT'];
    const query = new URLSearchParams(search);
    const socialHallEvent =
      pathname === ROUTES.HOME &&
      query.get('calendar') &&
      query.get('calendar') !== '';

    if (socialHallEvent && eventDetails) {
      const { status, socialHall, privacy } = eventDetails;
      if (privacy !== Privacy.Invitation) {
        if (status && LIVE_EVENTS.includes(status)) {
          navigate(`/social-hall/${socialHall?._id}`);
        } else {
          openModal('calendar');
        }
      } else {
        // TODO
      }
    }
  }, [pathname, search, eventDetails, navigate, openModal]);
}
