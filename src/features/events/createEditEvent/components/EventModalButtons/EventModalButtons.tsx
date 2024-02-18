import { t } from 'i18next';
import { matchPath, useLocation, useNavigate } from 'react-router';

import ROUTES from '@/constants/routes';
import { useBreakpoints, useToast } from '@/hooks';
import { EventsStatus } from '@/apollo/generated/types';
import { useUpdateEventStatusHelper } from '@/features/events/hooks';
import { useCreateEditEventContext } from '@/features/events/contexts';

import { Spacer, Stack } from '@/layout';
import { type EventModalButtonsProps } from './types';
import { EventConfirmationModal } from '../../../components/EventConfirmationModal';
import { EventRecurringConfirmationModal } from '../../../components/EventConfirmationModal/EventRecurringConfirmationModal';
import { Button } from './styles';

export const EventModalButtons = ({
  onCancel,
  openModal,
  setOpenModal,
  isNoumEditor,
  btnSize = 'full',
}: EventModalButtonsProps) => {
  const {
    event,
    onClose,
    loading,
    onSubmit,
    formState,
    fetchingAttendees,
    eventSuccessCallback,
  } = useCreateEditEventContext();

  const isEditing = !!event?._id;
  const submitDisabled = !formState?.isValid || fetchingAttendees;

  const navigate = useNavigate();
  const { addToast } = useToast();
  const { pathname } = useLocation();

  const isEventDetailPage = matchPath(
    { path: ROUTES.SOCIAL_HALL_DETAILS },
    pathname,
  );

  const { isMobile } = useBreakpoints();

  const { updateEventStatusHelper, loading: deleting } =
    useUpdateEventStatusHelper();

  const onCloseModal = async (
    confirmed?: boolean,
    eventStatus: EventsStatus = EventsStatus.Cancelled,
  ) => {
    setOpenModal(false);
    if (confirmed) {
      const { isSuccess, errorMsg } = await updateEventStatusHelper(
        event?._id ?? '',
        eventStatus,
      );
      if (isSuccess) {
        addToast(
          'primary',
          'icon',
          t('noumena.event.cancel_success_message_v2'),
        );
        if (isEventDetailPage) {
          navigate(-1);
        }
        eventSuccessCallback?.();
        onClose();
      } else {
        addToast('error', 'icon', errorMsg);
      }
    }
  };

  const justifyModalBtns = isEditing && !isMobile ? 'end' : 'space-between';

  return (
    <>
      <Stack
        fullWidth
        justify="space-between"
        data-testid="event-modal-buttons"
      >
        {isEditing && !isMobile && (
          <>
            <Button
              secondary
              size={btnSize}
              intent="negative"
              loading={deleting}
              isNoumEditor={isNoumEditor}
              disabled={deleting || loading}
              testId="delete-event-button"
              onClick={() => setOpenModal(true)}
            >
              {t('noumena.event.event_cancel_button')}
            </Button>
          </>
        )}
        <Stack
          justify={justifyModalBtns}
          fullWidth={isMobile || !isEditing}
          data-testid="event-modal-button"
        >
          <Button
            size={btnSize}
            secondary
            tertiary
            isNoumEditor={isNoumEditor}
            disabled={deleting || loading}
            testId="cancel-create-event-button"
            onClick={onCancel}
          >
            {t('noumena.cancel')}
          </Button>
          <Spacer width={16} />
          <Button
            size={btnSize}
            onClick={onSubmit}
            primary
            tertiary={submitDisabled}
            secondary={submitDisabled}
            loading={loading}
            isNoumEditor={isNoumEditor}
            disabled={submitDisabled || loading || deleting}
            type="submit"
            testId="create-event-button"
          >
            {isEditing
              ? t('noumena.event.event_edit_button')
              : t('noumena.event.event_create_button')}
          </Button>
        </Stack>
      </Stack>
      {openModal && !event?.recurring && (
        <EventConfirmationModal
          type="cancel-event"
          onClose={() => onCloseModal()}
          onConfirm={() => onCloseModal(true)}
        />
      )}
      {openModal && event?.recurring && (
        <EventRecurringConfirmationModal
          type="cancel-recurring-event"
          onClose={() => onCloseModal()}
          onAllEventClicked={() => onCloseModal(true, EventsStatus.Cancelled)}
          onSingleEventClicked={() => onCloseModal(true, EventsStatus.Expired)}
        />
      )}
    </>
  );
};
