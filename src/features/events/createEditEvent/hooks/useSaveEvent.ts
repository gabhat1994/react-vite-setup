import { omit } from 'lodash';
import { t } from 'i18next';
import { type SubmitHandler } from 'react-hook-form';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  Frequency,
  type CreateEventInput,
  type InvitationStatus,
  type RecurringDetails,
  type WeekDays,
} from '@/apollo/generated/types';
import { useToast } from '@/hooks/toast';
import { type Maybe } from '@/common/types';
import { convertToTimezone } from '@/utils/date';

import {
  type TSetCustomErrorFunc,
  type TEventFormCustomError,
} from '../../types/context';
import { useEvents } from '../../hooks/useEvents';
import type { EditEventParams } from '../types/UserEventForm';
import { findClosestDayOfMonth, findClosestDayOfWeek } from '../utils';
import {
  useUpsertEventHelper,
  useIsCreateNewEventV2,
  useUpdateInviteStatus,
} from '../../hooks';

export const useSaveEvent = ({
  form,
  isOpen,
  eventId,
  chamberId,
  eventDate,
  onSuccess,
}: EditEventParams) => {
  const { addToast } = useToast();
  const isCreateNewEventV2 = useIsCreateNewEventV2();

  const [customError, setCustomError] = useState<TEventFormCustomError>({
    eventDate: '',
  });

  const { refetchEvents } = useEvents({
    chamberId: chamberId || '',
    preventGetEvents: true,
  });

  const getValidEventDate = (recurringDetails: RecurringDetails): Date => {
    const monthDates = (recurringDetails?.monthDates || []) as number[];
    const weekDays = (recurringDetails?.weekDays || []) as WeekDays[];

    if (
      !recurringDetails?.frequency ||
      !recurringDetails.custom ||
      recurringDetails?.frequency === Frequency.Daily
    ) {
      return eventDate;
    }

    if (recurringDetails?.frequency === Frequency.Weekly && weekDays?.length) {
      return findClosestDayOfWeek(weekDays, new Date(eventDate));
    }

    if (
      recurringDetails?.frequency === Frequency.Monthly &&
      monthDates?.length
    ) {
      return findClosestDayOfMonth(monthDates, eventDate);
    }

    return new Date();
  };
  const { createEventHelper, updateEventHelper, loading } =
    useUpsertEventHelper();

  const { updateInviteStatusHelper, loading: cancellingInvitation } =
    useUpdateInviteStatus();

  useEffect(() => {
    if (!isOpen) {
      setCustomError({
        eventDate: '',
      });
    }
  }, [isOpen]);

  const onSetCustomError: TSetCustomErrorFunc = useCallback((field, msg) => {
    setCustomError((e) => ({ ...e, [field]: msg || '' }));
  }, []);

  const isFormValid = useMemo(
    () => !Object.values(customError).some((e) => !!e),
    [customError],
  );

  const isFormChanged = eventId
    ? Object.keys(form.formState.dirtyFields).length > 0
    : false;

  const onCancelInvitation = (
    invitationId: Maybe<string>,
    status: InvitationStatus,
    callback: () => void,
  ) => {
    if (!invitationId) return;

    updateInviteStatusHelper(invitationId, status, (isSuccess) => {
      if (isSuccess) {
        callback();
      }
    });
  };

  const onSubmit: SubmitHandler<CreateEventInput> = async (
    request: CreateEventInput,
  ) => {
    const recurringDetails = request.recurringDetails?.frequency
      ? omit(request.recurringDetails, ['__typename'])
      : {};

    const data = {
      ...request,
      recurringDetails,
      eventDate: getValidEventDate(recurringDetails),
    };

    if (!isFormValid || !eventDate || !request.timezone) return;
    const eDate = convertToTimezone(data.eventDate, request.timezone);

    const { isSuccess, errorMsg } = eventId
      ? await updateEventHelper({
          ...data,
          _id: eventId || '',
          eventDate: eDate,
        })
      : await createEventHelper({ ...data, eventDate: eDate });

    if (isSuccess) {
      onSuccess();
      refetchEvents();
      addToast(
        eventId && !isCreateNewEventV2 ? 'primary' : 'success',
        'icon',
        eventId
          ? t('noumena.event.update_success_message_v2')
          : t('noumena.event.create_success_message'),
      );
      form.reset({});
    } else if (errorMsg?.includes('overlapping')) {
      setCustomError((e) => ({
        ...e,
        eventDate: t('noumena.event.modal.starts_overlapping_error'),
      }));
    } else {
      addToast('error', 'icon', errorMsg);
    }
  };

  return {
    loading,
    customError,
    isFormChanged,
    onSetCustomError,
    onCancelInvitation,
    isValid: isFormValid,
    cancellingInvitation,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
