import type { FormState, UseFormSetValue } from 'react-hook-form';
import type { Dispatch, SetStateAction } from 'react';

import type {
  Privacy,
  Timezone,
  WeekDays,
  Attendees,
  InvitationStatus,
  UserRole,
  Frequency,
  CreateEventInput,
} from '@/apollo/generated/types';
import type { Maybe } from '@/common/types';
import type { EventFragment } from '@/apollo/graphql';
import type { DropdownValueType } from '@/components/Dropdown';
import type { EditEventResponse } from '../createEditEvent/types/UserEventForm';

export interface IUser {
  _id: Maybe<string>;
  firstName: Maybe<string>;
  middleName: Maybe<string>;
  lastName: Maybe<string>;
  title: Maybe<string>;
  email: Maybe<string>;
  profilePictureThumbnail: Maybe<string>;
  isHost?: boolean;
  isConnected?: boolean;
  isSaved?: boolean;
  isTemporarySaved?: boolean;
  chamberId?: string;
  invitationStatus?: Maybe<InvitationStatus>;
  userRole?: Maybe<UserRole>;
}

export interface InvitedMembers {
  userId: string;
}

export type IUserDropdown = DropdownValueType<IUser>;
export type IEventTimeDropdown = DropdownValueType<Date>;
export type IEventDurationDropdown = DropdownValueType<number>;
export type IEventTimezoneDropdown = DropdownValueType<Timezone>;

export interface ICreateEditEventProvider {
  isOpen?: boolean;
  chamberId: string;
  onClose: () => void;
  isProjectNoum: boolean;
  event?: EventFragment | null;
  eventSuccessCallback?: () => void;
}

export type TSetCustomErrorFunc = (
  field: 'eventDate' | 'duration',
  msg?: string,
) => void;

export type TUncontrolledFields =
  | 'cohosts'
  | 'members'
  | 'privacy'
  | 'eventDate'
  | 'duration'
  | 'timezone';

export type TEventFormCustomError = Record<'eventDate', string>;

export type ModalType = 'confirmation';

export type TCancelInvitation = (
  invitationId: Maybe<string>,
  status: InvitationStatus,
  callback: () => void,
) => void;

export interface ICreateEditEventContext
  extends ICreateEditEventProvider,
    Pick<
      EditEventResponse,
      | 'cancellingInvitation'
      | 'onSubmit'
      | 'onCancelInvitation'
      | 'control'
      | 'loading'
    > {
  cohosts: IUser[]; // @TODO: implementation of this need to be remove
  members: IUser[]; // @TODO: implementation of this need to be remove
  interval: number;
  privacy: Privacy;
  duration: number;
  monthDates: number[];
  weekDays: WeekDays[];
  eventDate: Date | null; // @TODO: implementation of this need to be remove
  timezone: string | null;
  isCustomRepeat: boolean;
  fetchingAttendees: boolean;
  modalType: ModalType | null;
  otherAttendees: Attendees[];
  frequency: Frequency | string;
  hasUnConnectedMembers: boolean;
  connectedAttendees: Attendees[];
  formState: FormState<CreateEventInput> | null;
  formChanged: Record<TUncontrolledFields, boolean>;

  onCancelModal: () => void;
  closeConfirmationModal: () => void;
  setValue: UseFormSetValue<CreateEventInput>;
  setPrivacy: (privacy: Privacy) => void;
  setMonthDates: (day: number[]) => void;
  setTimezone: (timezone: string) => void;
  onUpdateMembersBasedOnPrivacy: () => void;
  setWeekDays: (weekDays: WeekDays[]) => void;
  setEventInterval: (interval: number) => void;
  setCohosts: Dispatch<SetStateAction<IUser[]>>; // @TODO: implementation of this need to be remove
  setMembers: Dispatch<SetStateAction<IUser[]>>; // @TODO: implementation of this need to be remove
  setDuration: Dispatch<SetStateAction<number>>;
  setIsCustomRepeat: (isCustom: boolean) => void;
  onSetFormEventDate: (eventDate: Date) => void; // @TODO: rename to setEventDate
  onSetFormCohosts: (userIds: InvitedMembers[]) => void; // @TODO: rename to setCohosts
  onSetFormInvitedMembers: (uids: InvitedMembers[]) => void; // @TODO: rename to setInvitedMembers
  setEventDate: Dispatch<SetStateAction<Date | null>>; // @TODO: implementation of this need to be remove
  setFrequency: (frequency: Frequency | string) => void;
  onRemoveMember: (userId: string, cb: () => void) => void;
  onFormChanged: (field: TUncontrolledFields, changed: boolean) => void;
}
