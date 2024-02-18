import { useMemo } from 'react';
import { getSnappedTime } from '@/utils/date';
import { type KeepStateOptions, useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { Privacy, type CreateEventInput } from '@/apollo/generated/types';

import { createEventSchema } from '../services';
import type { IUser } from '../../types/context';
import { DEFAULT_EVENT_DURATION } from '../const';
import type { InitializeFormProps } from '../types/UserEventForm';

const resetFormOpts: KeepStateOptions = {
  keepDirtyValues: false,
  keepErrors: false,
  keepDirty: false,
  keepValues: false,
  keepDefaultValues: false,
  keepIsSubmitted: false,
  keepTouched: false,
  keepIsValid: false,
  keepSubmitCount: false,
};

export const useInitializeForm = ({
  event,
  chamberId,
}: InitializeFormProps) => {
  const getUserIdObjects = (users: IUser[]) =>
    users.map((user) => ({
      userId: user._id || '',
    }));

  const eventDate = useMemo(
    () =>
      event?.eventDate
        ? new Date(event.eventDate)
        : getSnappedTime({
            dateTime: new Date(),
            minsToAdd: 30,
          }).value,
    [event?.eventDate],
  );

  const defaultValues = useMemo(
    () => ({
      title: event?.title ?? '',
      description: event?.description ?? '',
      chamberId,
      eventDate,
      duration: event?.duration || DEFAULT_EVENT_DURATION,
      cohosts: getUserIdObjects((event?.cohosts || []) as IUser[]),
      invitations: getUserIdObjects((event?.invitations || []) as IUser[]),
      timezone: event?.timezone?._id || '',
      privacy: event?.privacy || Privacy.Public,
      recurringDetails: event?.recurringDetails || {},
    }),
    [event, chamberId, eventDate],
  );

  const form = useForm<CreateEventInput>({
    resolver: yupResolver(createEventSchema),
    mode: 'all',
    criteriaMode: 'all',
    reValidateMode: 'onBlur',
    defaultValues,
  });

  const onResetForm = () => form.reset(defaultValues, resetFormOpts);

  return {
    form,
    onResetForm,
  };
};
