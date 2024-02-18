import { useCallback, type FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
  ElementStatusEnum,
  ElementTypeEnum,
  type CreateElementInput,
  type ElementOutput,
} from '@/apollo/generated/types';
import {
  useGetSpaceForViewLazyQuery,
  type EventFragment,
} from '@/apollo/graphql';
import { type DropdownValueType } from '@/components/Dropdown';
import { useToggle } from '@/hooks';
import { ElementUtils } from '@/utils/element';
import { SideModal } from '@/components/SideModal';
import { useAuth } from '@/features/auth/contexts';
import {
  CreateNewEventTypeSelection,
  EventFilter,
} from '@/features/events/components';
import { useModalManager } from '@/hooks/modal/useModalManager';
import {
  useAddElementsHelper,
  usePublishElementStateHelper,
} from '@/features/noums/hooks/spaceQuery';
import { GLOBAL_EVENT_CREATION, useEvents } from '@/features/events/hooks';

import { AllEventList } from './AllEventList';
import type { EventListModalProps } from './types';
import { DropdownKey } from '../types/dropdownKey';
import { OnDemandEventModal } from '../onDemandEvent';
import { CreateEditEvent } from '../createEditEvent';
import { FilteredEventList } from './FilteredEventList';
import { EventListModalHeaderWrapper, EventListWrapper } from './styles';

type ModalType = 'create-edit-event';

export const EventListModal: FC<EventListModalProps> = ({
  isOpen,
  onEditEvent,
  onClose,
}) => {
  const { t } = useTranslation();
  const { masterId } = useAuth();
  const {
    events,
    eventsCount,
    activeFilter,
    onChangeFilter,
    loading,
    onGoLive,
    refetchEvents,
    networkStatus,
    fetchMoreEvents,
    onJoinEvent,
    ...eventHandlers
  } = useEvents({
    chamberId: masterId || '',
    limit: 10,
    preventGetEvents: !isOpen,
  });
  const { addElementsHelper } = useAddElementsHelper();
  const { publishElementStateHelper } = usePublishElementStateHelper();
  const [getSpace] = useGetSpaceForViewLazyQuery();
  const { openModal, closeModal, modalType } = useModalManager<ModalType>();

  const [isStartNowModalOpen, toggleStartNowModalOpen] = useToggle();

  const handleJoinEvent = useCallback(
    async (event: EventFragment) => {
      onJoinEvent(event?._id ?? '', event?.socialHall?._id ?? '');
    },
    [onJoinEvent],
  );

  const handleGoLiveEvent = useCallback(
    async (event: EventFragment) => {
      await onGoLive(event._id!);
      onJoinEvent(event?._id ?? '', event?.socialHall?._id ?? '');
    },
    [onGoLive, onJoinEvent],
  );

  const handleDropdownClick = useCallback(
    (e: DropdownValueType<DropdownKey>) => {
      if (e.value === DropdownKey.START_NOW) {
        toggleStartNowModalOpen();
      } else if (e.value === DropdownKey.SCHEDULE) {
        openModal('create-edit-event');
      }
    },
    [openModal, toggleStartNowModalOpen],
  );

  const eventSuccessCallback = useCallback(async () => {
    refetchEvents();
    const event = new CustomEvent(GLOBAL_EVENT_CREATION);
    document.dispatchEvent(event);
    const { data } = await getSpace({
      variables: {
        noumId: masterId,
        userHomeNoumId: '',
        editorV2Enabled: true,
      },
    });
    const hasCalendarElement = ElementUtils.hasCalendarElement(
      data?.getSpaceById?.elements as ElementOutput[],
    );
    const newElementInput: CreateElementInput = {
      elementType: ElementTypeEnum.Calendar,
      bodyContentType: ElementUtils.getBodyContentTypeFromElementType(
        ElementTypeEnum.Calendar,
      ),
      status: ElementStatusEnum.Published,
      headerContent: '',
      position: 2,
    };
    if (!hasCalendarElement) {
      await addElementsHelper(masterId, newElementInput);
      await publishElementStateHelper(
        masterId,
        [ElementStatusEnum.Unsaved, ElementStatusEnum.Draft],
        ElementStatusEnum.Published,
      );
    }
  }, [
    addElementsHelper,
    getSpace,
    masterId,
    publishElementStateHelper,
    refetchEvents,
  ]);

  return (
    <>
      <SideModal
        open={isOpen}
        onClose={onClose}
        enableAnimation={true}
        showCloseButton={true}
        placement="right"
        padding={16}
        title={t('noumena.events.title')}
        titleFixed={true}
        rightSecondaryIcon={
          <CreateNewEventTypeSelection
            chamberId={masterId}
            hasEvents={!loading || !!events.length}
            handleDropdownClick={handleDropdownClick}
          />
        }
      >
        <EventListWrapper data-testid="event-list-modal-testid">
          <EventListModalHeaderWrapper>
            <EventFilter
              visible={true}
              activeFilter={activeFilter}
              onChange={onChangeFilter}
              type="notification"
            />
          </EventListModalHeaderWrapper>
          {activeFilter === 'all' ? (
            <AllEventList
              chamberId={masterId || ''}
              events={events}
              networkStatus={networkStatus}
              totalCount={eventsCount}
              onJoinEvent={handleJoinEvent}
              onGoLive={handleGoLiveEvent}
              onEditEvent={(ev) => onEditEvent(ev, refetchEvents)}
              fetchMore={fetchMoreEvents}
              refetchEvents={refetchEvents}
              activeFilter={activeFilter}
              type="notification"
              {...eventHandlers}
            />
          ) : (
            <FilteredEventList
              chamberId={masterId || ''}
              events={events}
              networkStatus={networkStatus}
              totalCount={eventsCount}
              onJoinEvent={handleJoinEvent}
              onGoLive={handleGoLiveEvent}
              onEditEvent={(ev) => onEditEvent(ev, refetchEvents)}
              fetchMore={fetchMoreEvents}
              refetchEvents={refetchEvents}
              activeFilter={activeFilter}
              type="notification"
              {...eventHandlers}
            />
          )}
        </EventListWrapper>
      </SideModal>
      {modalType === 'create-edit-event' && (
        <CreateEditEvent
          isOpen
          chamberId={masterId}
          onClose={closeModal}
          isProjectNoum={false}
          eventSuccessCallback={eventSuccessCallback}
        />
      )}
      {isStartNowModalOpen && (
        <OnDemandEventModal
          isProjectNoum={false}
          chamberId={masterId}
          onClose={toggleStartNowModalOpen}
          eventSuccessCallback={eventSuccessCallback}
        />
      )}
    </>
  );
};

export default EventListModal;
