import { useMemo, type FC, useState, useCallback, useEffect } from 'react';

import {
  type Attendees,
  InvitationStatus,
  UserRole,
  Privacy,
} from '@/apollo/generated/types';
import { cleanList } from '@/utils/list';
import { useSaveEvent } from '@/features/events/hooks';
import { getSnappedTime } from '@/utils/date';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { useGetEventEditAttendeesQuery } from '@/apollo/graphql';

import {
  type IUser,
  type ModalType,
  type TUncontrolledFields,
  type ICreateEditEventContext,
  type ICreateEditEventProvider,
} from '../types/context';
import { CreateEditEventContext, initialForm } from './CreateEditEventContext';
import { useFormInputControl } from '../createEditEvent/hooks/useFormInputControl';
import { useInitializeForm } from '../createEditEvent/hooks';
import {
  getEventUser,
  getMembersBasedOnPrivacySetting,
} from '../createEditEvent/components/EventInviteMembers/utils';

export const CreateEditEventProvider: FC<ICreateEditEventProvider> = ({
  children,
  event,
  ...props
}) => {
  const [cohosts, setCohosts] = useState<IUser[]>([]);
  const [members, setMembers] = useState<IUser[]>([]);
  const [eventDate, setEventDate] = useState<Date | null>(null);

  const chamberId = event?.chamberId?._id || props.chamberId;

  const { openModal, closeModal, modalType } = useModalManager<ModalType>();

  const { loading: fetchingAttendees, data } = useGetEventEditAttendeesQuery({
    skip: !event?._id,
    variables: {
      id: event?._id || '',
    },
    fetchPolicy: 'cache-and-network',
  });

  const [formChanged, setFormChanged] =
    useState<Record<TUncontrolledFields, boolean>>(initialForm);

  const onFormChanged = useCallback(
    (field: TUncontrolledFields, changed: boolean) => {
      setFormChanged((fields) => ({ ...fields, [field]: !!event && changed }));
    },
    [event, setFormChanged],
  );

  const { form } = useInitializeForm({
    event,
    cohosts,
    members,
    chamberId,
  });

  const editEventHook = useSaveEvent({
    form,
    chamberId,
    isOpen: !!props.isOpen,
    eventId: event?._id ?? '',
    eventDate: eventDate || new Date(),
    onSuccess: () => {
      props.onClose();
      props.eventSuccessCallback?.();
    },
  });

  const formInputControl = useFormInputControl(form.control);

  const hasUnConnectedMembers = useMemo(
    () => members.some((m) => !m.isConnected),
    [members],
  );

  const connectedAttendees: Attendees[] = useMemo(
    () => cleanList(data?.connected?.data),
    [data?.connected?.data],
  );

  const otherAttendees: Attendees[] = useMemo(
    () => cleanList(data?.others?.data),
    [data?.others?.data],
  );

  const onCancelModal = useCallback(() => {
    const isChanged = Object.values(formChanged).some((field) => field);
    if (editEventHook.isFormChanged || isChanged) {
      openModal('confirmation');
    } else {
      props.onClose();
    }
  }, [editEventHook, formChanged, props, openModal]);

  const onRemoveMember = useCallback(
    (userId: string, callback: () => void) => {
      const { invitationId, invitationStatus }: Partial<Attendees> =
        [...connectedAttendees, ...otherAttendees].find(
          (user) => user.userId?._id === userId,
        ) || {};

      if (!invitationId) {
        callback();
      } else {
        const removeInvitationStatus =
          invitationStatus === InvitationStatus.Accepted
            ? InvitationStatus.Rejected
            : InvitationStatus.Cancelled;
        editEventHook.onCancelInvitation(
          invitationId,
          removeInvitationStatus,
          callback,
        );
      }
    },
    [connectedAttendees, otherAttendees, editEventHook],
  );

  const onUpdateMembersBasedOnPrivacy = useCallback(() => {
    setMembers((invitedMembers) =>
      getMembersBasedOnPrivacySetting(
        formInputControl.privacy,
        invitedMembers,
        [],
        [],
      ),
    );
  }, [formInputControl.privacy]);

  useEffect(() => {
    const others = getEventUser(otherAttendees, UserRole.Participant);
    const connected = getEventUser(
      connectedAttendees,
      UserRole.Participant,
      true,
    );

    setMembers(() =>
      getMembersBasedOnPrivacySetting(
        event?.privacy || Privacy.Public,
        [...others, ...connected],
        connected,
        others,
      ),
    );
  }, [connectedAttendees, otherAttendees, event?.privacy]);

  useEffect(() => {
    const updatedEventDate = event?.eventDate
      ? new Date(event.eventDate)
      : getSnappedTime({
          dateTime: new Date(),
          minsToAdd: 30,
        }).value;

    setEventDate(updatedEventDate);
  }, [event?.eventDate]);

  const value: ICreateEditEventContext = useMemo(
    () => ({
      event,
      cohosts,
      members,
      modalType,
      eventDate,
      formChanged,
      onFormChanged,
      otherAttendees,
      onRemoveMember,
      connectedAttendees,
      hasUnConnectedMembers,
      onUpdateMembersBasedOnPrivacy,
      setCohosts,
      setMembers,
      setEventDate,
      onCancelModal,
      fetchingAttendees,
      closeConfirmationModal: closeModal,
      ...props,
      ...form,
      ...editEventHook,
      ...formInputControl,
    }),
    [
      form,
      props,
      event,
      members,
      cohosts,
      modalType,
      eventDate,
      closeModal,
      formChanged,
      onFormChanged,
      onCancelModal,
      editEventHook,
      otherAttendees,
      onRemoveMember,
      formInputControl,
      fetchingAttendees,
      connectedAttendees,
      hasUnConnectedMembers,
      onUpdateMembersBasedOnPrivacy,
    ],
  );

  return (
    <CreateEditEventContext.Provider value={value}>
      {children}
    </CreateEditEventContext.Provider>
  );
};
