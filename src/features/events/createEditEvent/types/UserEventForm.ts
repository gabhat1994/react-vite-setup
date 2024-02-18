import type {
  FieldErrorsImpl,
  DeepRequired,
  Control,
  UseFormReturn,
} from 'react-hook-form';

import type { CreateEventInput } from '@/apollo/generated/types';

import type {
  TSetCustomErrorFunc,
  TEventFormCustomError,
  TCancelInvitation,
  ICreateEditEventContext,
} from '../../types/context';

export interface EditEventParams {
  form: UseFormReturn<CreateEventInput>;
  isOpen: boolean;
  eventId: string;
  chamberId: string;
  eventDate: Date;
  onSuccess: () => void;
}

export interface EditEventResponse {
  isValid: boolean;
  loading: boolean;
  isFormChanged: boolean;
  onSubmit: () => void;
  cancellingInvitation: boolean;
  customError: TEventFormCustomError;
  onSetCustomError: TSetCustomErrorFunc;
  onCancelInvitation: TCancelInvitation;
  control: Control<CreateEventInput, object>;
  errors: FieldErrorsImpl<DeepRequired<CreateEventInput>>;
}

export interface InitializeFormProps
  extends Pick<
    ICreateEditEventContext,
    'event' | 'members' | 'cohosts' | 'chamberId'
  > {}
