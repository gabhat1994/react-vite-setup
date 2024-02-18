import { t } from 'i18next';

// Social Hall Event Modal Translated Strings
export const cancelEventModalData = {
  title: t('noumena.social_hall.cancel_modal.title'),
  description: t('noumena.social_hall.cancel_modal.description'),
  confirmButton: t('noumena.social_hall.cancel_modal.confirm'),
  cancelButton: t('noumena.social_hall.keep_it'),
};

export const endEventModalData = {
  title: t('noumena.social_hall.end_modal.title'),
  description: t('noumena.social_hall.end_modal.description'),
  confirmButton: t('noumena.social_hall.end_modal.confirm'),
  cancelButton: t('noumena.cancel'),
};

export const kickUserModalData = (name: string) => ({
  title: t('noumena.social_hall.remove_user_modal.title', { name }),
  description: t('noumena.social_hall.kick_modal.description'),
  confirmButton: t('noumena.social_hall.kick_modal.confirm'),
  cancelButton: t('noumena.cancel'),
});

export const hostLeaveEventModalData = {
  title: t('noumena.social_hall.leave_modal.title'),
  description: t('noumena.social_hall.leave_modal.description'),
  confirmButton: t('noumena.social_hall.leave_modal.confirm'),
  cancelButton: t('noumena.social_hall.keep_it'),
};

export const attendeeLeaveEventModalData = {
  title: t('noumena.social_hall.leave_modal_attendee.title'),
  description: t('noumena.social_hall.leave_modal_attendee.description'),
  confirmButton: t('noumena.social_hall.leave_modal_attendee.confirm'),
  cancelButton: t('noumena.social_hall.keep_it'),
};

export const hostFinishMainEventModalData = {
  title: t('noumena.social_hall.finish_main_event_host_modal.title'),
  description: t(
    'noumena.social_hall.finish_main_event_host_modal.description',
  ),
  confirmButton: t('noumena.social_hall.finish_main_event_host_modal.confirm'),
  cancelButton: t('noumena.cancel'),
  isConfirmButtonPrimary: true,
};

export const hostFinishInstantEventModalData = {
  title: t('noumena.social_hall.finish_instant_event_host_modal.description'),
  description: '',
  confirmButton: t('noumena.social_hall.end_modal.confirm'),
  cancelButton: t('noumena.cancel'),
  isConfirmButtonPrimary: true,
};

export const kickedOutModalData = {
  title: t('noumena.social_hall.kicked_out_modal.title'),
  description: t('noumena.social_hall.kicked_out_modal.description'),
  cancelButton: t('noumena.social_hall.ok_close'),
};

export const hostEndedModalData = {
  title: t('noumena.social_hall.host_canceled_modal.title'),
  description: t('noumena.social_hall.host_canceled_modal.description'),
  cancelButton: t('noumena.social_hall.host_canceled_modal.cancel'),
};

export const attendeeEndedModalData = {
  title: t('noumena.social_hall.attendee_ended_modal.title'),
  description: t('noumena.social_hall.attendee_ended_modal.description'),
  cancelButton: t('noumena.social_hall.host_canceled_modal.cancel'),
};

export const attendeeCanceledModalData = {
  title: t('noumena.social_hall.attendee_canceled_modal.title'),
  cancelButton: t('noumena.social_hall.ok_close'),
};

export const waitingHostModalData = {
  title: t('noumena.social_hall.waiting_host_modal.title'),
  description: t('noumena.social_hall.waiting_host_modal.description'),
};

export const countDownModalData = {
  title: t('noumena.social_hall.count_down_modal.title'),
  description: t('noumena.social_hall.count_down_modal.description'),
};

export const confirmKnockModalData = {
  title: t('noumena.social_hall.confirm_knock.title'),
  confirmButton: t('noumena.social_hall.confirm_knock.confirm_btn'),
  cancelButton: t('noumena.social_hall.confirm_knock.cancel_btn'),
};

export const kickedFromEventModalData = {
  title: t('noumena.social_hall.removed_from_event.title'),
  description: t('noumena.social_hall.removed_from_event.description'),
  cancelButton: t('noumena.social_hall.ok_close'),
};

export const kickedFromPersonalEventModalData = {
  title: t('noumena.social_hall.removed_from_event.title'),
  cancelButton: t('noumena.social_hall.ok_close'),
};
