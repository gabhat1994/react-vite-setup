import { t } from 'i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  type Maybe,
  type Attendees,
  InvitationStatus,
} from '@/apollo/generated/types';
import { useToast } from '@/hooks';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { type InputListTypes } from '@/components/Tabs/types';
import { EventCancelAttendeeModal } from '@/features/events/components';

import {
  getAttendeeTabData,
  getCancelModalData,
  getPendingTabData,
} from './utils';
import { AttendeesView } from './AttendeesView';
import { type AttendeesStatusProps } from './types';
import { AttendeesStatusContainer } from './styles';

export const AttendeesStatus = ({
  isHost,
  isCoHost,
  onCancel,
  isExpired,
  isLoading,
  activeTab,
  isAttending,
  pendingUsers,
  acceptedUsers,
}: AttendeesStatusProps) => {
  const { addToast } = useToast();
  const [fullName, setFullName] = useState('');
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedId, setSelectedId] = useState('0');
  const [selectedAttendee, setSelectedAttendee] = useState<
    Maybe<Attendees> | undefined
  >();
  const [invitationTabs, setInvitationTabs] = useState<InputListTypes[]>([]);

  const attendingUsers = useMemo(
    () =>
      acceptedUsers.filter(
        (attendee) =>
          attendee.invitationStatus === InvitationStatus.Accepted &&
          attendee.userRole !== 'HOST',
      ),
    [acceptedUsers],
  );

  const onRemoving = (attendee: Attendees) => {
    setSelectedAttendee(attendee);
    setOpenConfirmModal(true);
  };

  const handleConfirmCancel = useCallback(() => {
    onCancel(selectedAttendee, () => {
      setOpenConfirmModal(false);
      setSelectedAttendee(undefined);
      if (activeTab === 'pending') {
        const message = t('noumena.social_hall.cancel_invitation.notification');
        addToast('primary', 'icon', message);
      }
    });
  }, [onCancel, selectedAttendee, activeTab, addToast]);

  const handleCancelRemove = () => {
    setOpenConfirmModal(false);
    setSelectedAttendee(undefined);
  };

  useEffect(() => {
    setInvitationTabs(() => {
      const defaultTabs: InputListTypes[] = [];
      if ((isAttending && isCoHost) || isHost) {
        defaultTabs.push(getAttendeeTabData(attendingUsers.length));
      }
      if (!isExpired && isHost) {
        defaultTabs.push(getPendingTabData(pendingUsers.length));
      }
      return defaultTabs;
    });
  }, [
    isHost,
    isCoHost,
    isExpired,
    isAttending,
    pendingUsers.length,
    attendingUsers.length,
  ]);

  return (
    <AttendeesStatusContainer>
      <BasicChipsTabsForm
        onChange={setSelectedId}
        tabWidth="50%"
        inputList={invitationTabs}
        selectedId={selectedId}
        mode="isUnderline"
        fontSize="--font-input-small-size"
        textFont="--font-body-medium-bold-weight"
      />
      <AttendeesView
        isHost={isHost}
        isExpired={isExpired}
        onRemove={onRemoving}
        setFullName={setFullName}
        attendees={selectedId === '0' ? attendingUsers : pendingUsers}
      />
      <EventCancelAttendeeModal
        isOpen={!!selectedAttendee && openConfirmModal}
        loading={isLoading}
        onClose={handleCancelRemove}
        onConfirm={handleConfirmCancel}
        isUnblocked={activeTab === 'blocked'}
        {...getCancelModalData(fullName)}
      />
    </AttendeesStatusContainer>
  );
};
