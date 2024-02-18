import {
  useCallback,
  useMemo,
  type ForwardedRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { type Attendees, type Maybe } from '@/apollo/generated/types';
import { breakpoints } from '@/constants/devices';
import { Modal, ModalBody, ModalHeader } from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { Spinner } from '@/components/Spinner';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { useWindowDimensions, useToast } from '@/hooks';
import { getFullName } from '@/utils/fullName';
import { useEventAttendees } from '@/features/events/hooks';
import { EventAttendeeItem } from './EventAttendeeItem';
import { EventCancelAttendeeModal } from './EventCancelAttendeeModal';
import { type IModalControl, type EventAttendeeModalProps } from './types';
import * as S from './styles';

export const EventAttendeesModal = forwardRef(
  (
    { onRefetchEvents, onClose }: EventAttendeeModalProps,
    ref: ForwardedRef<IModalControl>,
  ) => {
    const { t } = useTranslation();
    const windowSize = useWindowDimensions();
    const { addToast } = useToast();

    const [eventId, setEventId] = useState<Maybe<string>>(null);
    const [isHost, setIsHost] = useState<boolean | undefined>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [selectedAttendee, setSelectedAttendee] = useState<
      Maybe<Attendees> | undefined
    >();
    const [openConfirmModal, setOpenConfirmModal] = useState<boolean>(false);

    const {
      loading,
      cancellingUser,
      tabs,
      activeTab,
      attendeesToShow,
      onChangeTab,
      onCancel,
    } = useEventAttendees({
      eventId,
      isHost: Boolean(isHost),
      shouldFetch: !!eventId && isHost !== undefined && isOpen,
    });

    const isDesktop = windowSize.width >= breakpoints.LAPTOP;
    const isTablet =
      windowSize.width < breakpoints.LAPTOP &&
      windowSize.width >= breakpoints.TABLET;
    const isMobile = windowSize.width < breakpoints.TABLET;

    const fullName = useMemo(
      () =>
        getFullName(
          selectedAttendee?.userId?.firstName,
          selectedAttendee?.userId?.middleName,
          selectedAttendee?.userId?.lastName,
        ),
      [
        selectedAttendee?.userId?.firstName,
        selectedAttendee?.userId?.lastName,
        selectedAttendee?.userId?.middleName,
      ],
    );

    const cancelModalData = useMemo(() => {
      if (activeTab === 'attendees') {
        return {
          title: t('noumena.social_hall.remove_user_modal.title', {
            name: fullName,
          }),
          description: t('noumena.social_hall.remove_user_modal.description'),
          confirmButton: t('noumena.social_hall.remove_user_modal.confirm'),
          cancelButton: t('noumena.cancel'),
        };
      }
      if (activeTab === 'blocked') {
        return {
          title: t('noumena.social_hall.unblock_user_modal.title', {
            name: fullName,
          }),
          description: t('noumena.social_hall.unblock_user_modal.description'),
          confirmButton: t('noumena.social_hall.unblock_user_modal.confirm'),
          cancelButton: t('noumena.cancel'),
        };
      }

      return {
        title: t('noumena.social_hall.cancel_invitation_modal.title'),
        description: t(
          'noumena.social_hall.cancel_invitation_modal.description',
        ),
        confirmButton: t('noumena.social_hall.cancel_invitation_modal.confirm'),
        cancelButton: t('noumena.social_hall.no_keep_it'),
      };
    }, [activeTab, t, fullName]);

    const onRemoving = useCallback((attendee: Attendees) => {
      setSelectedAttendee(attendee);
      setOpenConfirmModal(true);
    }, []);

    const handleClose = useCallback(() => {
      setIsOpen(false);
      setEventId(null);
      setIsHost(undefined);
      setOpenConfirmModal(false);
      setSelectedAttendee(undefined);
      onChangeTab('attendees');

      if (onClose) onClose();
    }, [onClose, onChangeTab]);

    const handleConfirmCancel = useCallback(() => {
      onCancel(selectedAttendee, () => {
        setOpenConfirmModal(false);
        setSelectedAttendee(undefined);
        if (activeTab === 'pending') {
          const message = t(
            'noumena.social_hall.cancel_invitation.notification',
          );
          addToast('primary', 'icon', message);
        }
        if (onRefetchEvents) onRefetchEvents();
      });
    }, [onCancel, selectedAttendee, activeTab, onRefetchEvents, t, addToast]);

    const handleCancelRemove = useCallback(() => {
      setOpenConfirmModal(false);
      setSelectedAttendee(undefined);
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        open(evId: string, host: boolean) {
          setEventId(evId);
          setIsHost(host);
          setIsOpen(true);
        },
      }),
      [],
    );

    return (
      <Modal
        testId="event-attendees-modal"
        open={isOpen}
        onClose={handleClose}
        enableCloseButton
        isFullScreen={isMobile || isTablet}
        style={{
          width: isDesktop ? 752 : '100vw',
        }}
        disableBackdropClick
      >
        <ModalHeader isFullScreen={isMobile}>
          {t(`noumena.event.event_attendees`)}
        </ModalHeader>
        <ModalBody isFullScreen={isMobile} maxHeight="100%">
          <S.LoadingWrapper visible={loading}>
            <Spinner />
          </S.LoadingWrapper>
          {isHost && (
            <S.TabsWrapper data-testid="event-attendees-tabs">
              <BasicChipsTabsForm
                inputList={tabs}
                onChange={onChangeTab}
                selectedId={activeTab}
                isWithoutImage
                mode="isUnderline"
                fullWidth
                textFont="--font-body-medium-regular-font"
              />
            </S.TabsWrapper>
          )}
          <S.ListWrapper data-testid="event-attendees-list-wrapper">
            {activeTab === 'blocked' && (
              <S.NoBlockedWrapper>
                <TSpan font="body-l" colorToken="--text-modal-neutral-default">
                  {t('noumena.event.modal.attendees.no_blocked.description')}
                </TSpan>
                {attendeesToShow.length === 0 && (
                  <S.NoBlockedTitle>
                    <TSpan
                      font="body-m"
                      colorToken="--text-tablecell-header-neutral-default"
                    >
                      {t('noumena.event.modal.attendees.no_blocked.title')}
                    </TSpan>
                  </S.NoBlockedTitle>
                )}
              </S.NoBlockedWrapper>
            )}
            {attendeesToShow.length !== 0
              ? attendeesToShow.map((attendee: Attendees) => (
                  <EventAttendeeItem
                    key={attendee.invitationId}
                    isHost={isHost}
                    isBlocked={activeTab === 'blocked'}
                    attendee={attendee}
                    onCancel={onRemoving}
                  />
                ))
              : null}
          </S.ListWrapper>
        </ModalBody>
        <EventCancelAttendeeModal
          isOpen={!!selectedAttendee && openConfirmModal}
          loading={cancellingUser}
          onClose={handleCancelRemove}
          onConfirm={handleConfirmCancel}
          isUnblocked={activeTab === 'blocked'}
          {...cancelModalData}
        />
      </Modal>
    );
  },
);
