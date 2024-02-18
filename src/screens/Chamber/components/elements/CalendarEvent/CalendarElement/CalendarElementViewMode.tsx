import { forwardRef, useCallback, useEffect, useRef, type Ref } from 'react';

import {
  ElementTypeEnum,
  PermissibleElementType,
  SpaceTypeEnum,
} from '@/apollo/generated/types';
import { Pagination } from '@/components/Pagination';
import { useAuth } from '@/features/auth/contexts';
import { useToggle } from '@/hooks';
import { CreateEditEvent } from '@/features/events/createEditEvent';
import { OnDemandEventModal } from '@/features/events/onDemandEvent';
import { type EventFragment } from '@/apollo/graphql';
import { Button } from '@/components/Button';
import { type DropdownValueType } from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { GLOBAL_EVENT_CREATION } from '@/features/events/hooks';
import usePaginatedEvents from '@/features/events/hooks/usePaginatedEvents';
import { useModalManager } from '@/hooks/modal/useModalManager';
import useScrollToLocation from '@/hooks/useScrollToLocation';
import { DropdownKey } from '@/features/events/types/dropdownKey';
import { Stack } from '@/layout';
import SkeletonLoaderCalendarElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderCalendarElement';
import { NetworkStatus } from '@apollo/client';
import { t } from 'i18next';
import { useElementLayoutMode } from '@/features/noums/hooks/noums';
import { NoumLayoutViewMode } from '@/features/conversation/types';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { CalendarPlaceHolder } from '../components/CalendarPlaceholder';
import { AllCalendarModal } from './AllCalendarModal';
import { CalendarElementGuestView } from './CalendarElementGuestView';
import { CalendarElementOwnerView } from './CalendarElementOwnerView';
import { CalendarElementViewModeHeader } from './CalendarElementViewModeHeader';
import { ViewModeChildrenWrapper, ViewModeWrapper } from './styles';
import { type CalendarElementProps } from './types';
import { useCalendar } from './useCalendar';
import { ElementContainer } from '../../ElementContainer';

const pageSize = 3;

type ModalType = 'edit-event';

type ModalContext = {
  event?: EventFragment;
  callback?: () => void;
};

export const CalendarElementViewMode = forwardRef(
  (props: CalendarElementProps, ref: Ref<HTMLDivElement>) => {
    const { masterId: masterNoumId } = useAuth();

    const childrenRef = useRef<HTMLDivElement>(null);
    const [isStartNowModalOpen, toggleStartNowModalOpen] = useToggle();
    const [isStartNowWarningModalOpen, toggleStartNowWarningModalOpen] =
      useToggle();
    const [isAllEventsModalOpen, toggleAllEventsModalOpen] = useToggle();

    const { viewMode, setViewMode } = useCalendar(childrenRef);
    const { hasElementPermission } = useNoumAuthorization();

    const hasCreateEventPermission = hasElementPermission(
      PermissibleElementType.Calendar,
      'create-event',
      props.isOwner,
    );

    const {
      events,
      eventsCount,
      eventMeta,
      currentPage,
      activeFilter,
      loading,
      networkStatus,
      onJoinEvent,
      onChangeFilter,
      onGoLive,
      onAccept,
      onDecline,
      onAttending,
      onNotAttending,
      onAttend,
      onCopyLink,
      onChangePage,
      refetchEvents,
    } = usePaginatedEvents({
      chamberId: props.spaceId,
      limit: pageSize,
      shouldGetActiveEvents: hasCreateEventPermission,
    });
    const noumLayoutViewMode = useElementLayoutMode();

    const isNoumLayoutSmallViewMode =
      noumLayoutViewMode === NoumLayoutViewMode.NOUMLAYOUTSMALL;

    const { openModal, closeModal, contextData, modalType } = useModalManager<
      ModalType,
      ModalContext
    >();

    const handleGlobalEventUpdates = useCallback(() => {
      if (props.spaceId === masterNoumId) {
        refetchEvents();
      }
    }, [masterNoumId, props.spaceId, refetchEvents]);

    useEffect(() => {
      document.addEventListener(
        GLOBAL_EVENT_CREATION,
        handleGlobalEventUpdates,
      );
      return () => {
        document.removeEventListener(
          GLOBAL_EVENT_CREATION,
          handleGlobalEventUpdates,
        );
      };
    }, [handleGlobalEventUpdates]);

    useScrollToLocation(events?.length > 0);

    const handleJoinEvent = useCallback(
      async (event: EventFragment) => {
        onJoinEvent(event._id ?? '', event.socialHall?._id ?? '');
      },
      [onJoinEvent],
    );

    const onGoLiveEvent = useCallback(
      async (event: EventFragment) => {
        await onGoLive(event._id!);
        onJoinEvent(event._id ?? '', event.socialHall?._id ?? '');
      },
      [onGoLive, onJoinEvent],
    );

    const handleDropdownClick = (e: DropdownValueType<DropdownKey>) => {
      if (e.value === DropdownKey.START_NOW) {
        toggleStartNowModalOpen();
      } else if (e.value === DropdownKey.SCHEDULE) {
        openModal('edit-event', {
          callback: refetchEvents,
        });
      }
    };

    if (eventsCount === 0 && props.isEditing) {
      return loading ? (
        <SkeletonLoaderCalendarElement />
      ) : (
        <CalendarPlaceHolder
          isNoumLayoutSmallViewMode={isNoumLayoutSmallViewMode}
        />
      );
    }
    if (
      loading &&
      events.length === 0 &&
      networkStatus !== NetworkStatus.setVariables
    ) {
      return <SkeletonLoaderCalendarElement />;
    }
    if (!hasCreateEventPermission && eventsCount === 0) return null;

    return (
      <>
        <ElementContainer
          isBorderContent={props.isEditing}
          elementType={ElementTypeEnum.Calendar}
        >
          <ViewModeWrapper
            id="event"
            ref={ref}
            style={{ overflow: 'visible' }}
            data-testid="calendar-viewmode-wrapper"
          >
            <CalendarElementViewModeHeader
              showAddEventBtn={!!eventMeta?.allEventsCount}
              chamberId={props.spaceId}
              isStartNowModalOpen={isStartNowWarningModalOpen}
              toggleStartNowModal={toggleStartNowWarningModalOpen}
              currentTitle={props.currentTitle}
              handleDropdownClick={handleDropdownClick}
              selectedCustomPreviewTab={props.selectedCustomPreviewTab}
              hasEvents={!!events.length || !loading}
            />
            <ViewModeChildrenWrapper ref={childrenRef}>
              {hasCreateEventPermission ? (
                <CalendarElementOwnerView
                  loading={loading}
                  masterNoumId={masterNoumId}
                  events={events}
                  eventsCount={eventsCount}
                  activeFilter={activeFilter}
                  activeViewMode={viewMode}
                  onChangeFilter={(f) => {
                    onChangeFilter(f);
                  }}
                  onChangeViewMode={(v: string) => setViewMode(v)}
                  onAddEvent={() => {
                    openModal('edit-event', {
                      callback: refetchEvents,
                    });
                  }}
                  onEditEvent={(ev) => {
                    openModal('edit-event', {
                      event: ev,
                      callback: refetchEvents,
                    });
                  }}
                  onRefetchEvents={refetchEvents}
                  onGoLive={onGoLiveEvent}
                  onJoin={handleJoinEvent}
                  onAccept={onAccept}
                  onDecline={onDecline}
                  onAttending={onAttending}
                  onNotAttending={onNotAttending}
                  onAttend={onAttend}
                  onCopyLink={onCopyLink}
                  isNoumLayoutSmallViewMode={isNoumLayoutSmallViewMode}
                />
              ) : (
                <CalendarElementGuestView
                  masterNoumId={masterNoumId}
                  events={events}
                  onEditEvent={(ev) => {
                    openModal('edit-event', {
                      event: ev,
                      callback: refetchEvents,
                    });
                  }}
                  onRefetchEvents={refetchEvents}
                  onGoLive={onGoLiveEvent}
                  onJoin={handleJoinEvent}
                  onAccept={onAccept}
                  onDecline={onDecline}
                  onAttending={onAttending}
                  onNotAttending={onNotAttending}
                  onAttend={onAttend}
                  isNoumLayoutSmallViewMode={isNoumLayoutSmallViewMode}
                />
              )}
            </ViewModeChildrenWrapper>
            {eventsCount > pageSize && !loading ? (
              <Stack fullWidth justify="center" padding="0 16px 16px 16px">
                <Button
                  textOnly
                  size="small"
                  onClick={toggleAllEventsModalOpen}
                  secondary
                  rightIcon={<Icon size={12} name="chevron_right_m" />}
                >
                  {t('noumena.editor.all_events')}
                </Button>
              </Stack>
            ) : (
              !loading && (
                <Pagination
                  totalCount={eventsCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={onChangePage}
                />
              )
            )}
          </ViewModeWrapper>
        </ElementContainer>
        {modalType === 'edit-event' && (
          <CreateEditEvent
            isOpen
            onClose={closeModal}
            event={contextData?.event}
            eventSuccessCallback={contextData?.callback}
            chamberId={props.spaceId}
            isProjectNoum={props.spaceType === SpaceTypeEnum.Project}
          />
        )}
        {isStartNowModalOpen && (
          <OnDemandEventModal
            isProjectNoum={false}
            chamberId={props.spaceId}
            onClose={toggleStartNowModalOpen}
          />
        )}
        <AllCalendarModal
          isOpen={isAllEventsModalOpen}
          onClose={toggleAllEventsModalOpen}
          chamberId={masterNoumId}
          spaceId={props.spaceId}
          isOwner={props.isOwner!}
          isNoumLayoutSmallViewMode={isNoumLayoutSmallViewMode}
          spaceType={props.spaceType!}
        />
      </>
    );
  },
);
