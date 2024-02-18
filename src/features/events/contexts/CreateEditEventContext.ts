import type { Control } from 'react-hook-form';
import { createContext, useContext } from 'react';

import { type CreateEventInput, Privacy } from '@/apollo/generated/types';

import { type ICreateEditEventContext } from '../types/context';

export const initialForm = {
  cohosts: false,
  members: false,
  eventDate: false,
  duration: false,
  timezone: false,
  privacy: false,
};

export const CreateEditEventContext = createContext<ICreateEditEventContext>({
  loading: false,
  interval: 1,
  event: null,
  members: [],
  cohosts: [],
  weekDays: [],
  isOpen: false,
  chamberId: '',
  timezone: null,
  duration: 3600,
  modalType: null,
  frequency: '',
  monthDates: [],
  formState: null,
  otherAttendees: [],
  isProjectNoum: false,
  eventDate: new Date(),
  isCustomRepeat: false,
  connectedAttendees: [],
  privacy: Privacy.Public,
  fetchingAttendees: false,
  formChanged: initialForm,
  cancellingInvitation: false,
  hasUnConnectedMembers: false,
  control: {} as Control<CreateEventInput, object>,
  setValue: () => {},
  onClose: () => {},
  onSubmit: () => {},
  setCohosts: () => {},
  setMembers: () => {},
  setPrivacy: () => {},
  setDuration: () => {},
  setTimezone: () => {},
  setWeekDays: () => {},
  setEventDate: () => {},
  setFrequency: () => {},
  onCancelModal: () => {},
  onFormChanged: () => {},
  setMonthDates: () => {},
  onRemoveMember: () => {},
  onSetFormCohosts: () => {},
  setEventInterval: () => {},
  setIsCustomRepeat: () => {},
  onSetFormEventDate: () => {},
  onCancelInvitation: () => {},
  eventSuccessCallback: () => {},
  closeConfirmationModal: () => {},
  onSetFormInvitedMembers: () => {},
  onUpdateMembersBasedOnPrivacy: () => {},
});

export const useCreateEditEventContext = () =>
  useContext(CreateEditEventContext);
