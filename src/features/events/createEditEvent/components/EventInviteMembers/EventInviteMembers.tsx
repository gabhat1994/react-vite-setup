import { t } from 'i18next';
import { useState, useRef, useCallback, useEffect } from 'react';

import { cleanList } from '@/utils/list';
import { useCreateEditEventContext } from '@/features/events/contexts';

import type { InvitedMembers, IUser } from '../../../types/context';
import type { EventUsersFieldProps } from './types';
import { EventConfirmationModal } from '../../../components/EventConfirmationModal';

import { Container } from './styles';
import { AddMemberModal } from '../AddMemeberModal';
import { AddMemberHeader } from '../AddMemberHeader';
import { HostContainer } from '../EventInviteHosts/styles';
import { HostElementRowHeight } from '../EventMemberItems/const';
import { EventMemberItems } from '../EventMemberItems';

export const EventInviteMembers = ({
  dropdownProps,
  onCancelInvitation,
}: EventUsersFieldProps) => {
  const {
    privacy,
    members,
    chamberId,
    setMembers,
    cancellingInvitation,
    onSetFormInvitedMembers,
    fetchingAttendees: loading,
    onUpdateMembersBasedOnPrivacy,
  } = useCreateEditEventContext();

  const selected = useRef<IUser | null>(null);
  const [isShowMembers, setIsShowMembers] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openInviteMembersModal, setOpenInviteMembersModal] = useState(false);

  const onUpdateFormData = useCallback(
    (users: IUser[]) => {
      const uids = cleanList(users.map((user) => ({ userId: user._id })));
      onSetFormInvitedMembers(uids as InvitedMembers[]);
    },
    [onSetFormInvitedMembers],
  );

  const onFilterMembers = (filterId: string) => {
    const users = members.filter((member) => member._id !== filterId);
    setMembers(users);
    onUpdateFormData(users);
  };

  const onRemoveMember = (user: IUser) => {
    if (user.isSaved) {
      selected.current = user;
      setOpenModal(true);
    } else {
      onFilterMembers(user._id ?? '');
    }
  };

  const cancelInvitationCb = (selectedId: string) => {
    onFilterMembers(selectedId);
    selected.current = null;
    setOpenModal(false);
  };

  const onCloseModal = (confirmed?: boolean) => {
    if (confirmed) {
      const selectedId = selected.current?._id;
      if (!selectedId) {
        return;
      }
      if (onCancelInvitation) {
        onCancelInvitation(selectedId, () => cancelInvitationCb(selectedId));
      } else {
        cancelInvitationCb(selectedId);
      }
    } else {
      selected.current = null;
      setOpenModal(false);
    }
  };

  const onChange = (users: IUser[]) => {
    setMembers(users);
    onUpdateFormData(users);
  };

  useEffect(() => {
    onUpdateFormData(members);
  }, [onUpdateFormData, members]);

  useEffect(() => {
    onUpdateMembersBasedOnPrivacy();
  }, [onUpdateMembersBasedOnPrivacy, privacy]);

  const userItemContainerHeight = members.length * HostElementRowHeight + 60;

  return (
    <Container
      align="center"
      fullWidth
      vertical
      data-testid="event-invite-members"
    >
      <AddMemberHeader
        isExpand={isShowMembers}
        count={members.length}
        onExpand={() => setOpenInviteMembersModal(true)}
        toggle={() => setIsShowMembers(!isShowMembers)}
        headingLabel="noumena.event.modal.invite_members_title_v2"
        expandBtnLabel="noumena.event.modal.invite_members_btn"
      />
      <HostContainer
        height={userItemContainerHeight}
        fullWidth
        isOpen={isShowMembers}
      >
        <EventMemberItems
          type="member"
          members={members || []}
          loading={loading}
          onRemove={onRemoveMember}
        />
      </HostContainer>
      {openModal && (
        <EventConfirmationModal
          type="cancel-invite"
          loading={cancellingInvitation}
          onClose={() => onCloseModal()}
          onConfirm={() => onCloseModal(true)}
        />
      )}
      <AddMemberModal
        type="member"
        dropdownProps={dropdownProps}
        btnLabel={t('noumena.event.modal.add_member_button')}
        chamberId={chamberId}
        initialData={members || []}
        onChange={onChange}
        isShowModal={openInviteMembersModal}
        onClose={() => setOpenInviteMembersModal(false)}
        modalTitle={t('noumena.event.modal.invite_members_heading')}
      />
    </Container>
  );
};
