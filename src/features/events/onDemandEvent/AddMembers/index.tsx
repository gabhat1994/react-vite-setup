import { t } from 'i18next';
import { uniqBy } from 'lodash';
import { useCallback, useEffect, useState, useRef } from 'react';

import { Spacer } from '@/layout';
import { Icon } from '@/components/Icon';
import { useBreakpoints } from '@/hooks';
import { type Maybe } from '@/common/types';
import { TSpan } from '@/components/Typography';
import { TextField } from '@/components/TextField';
import { Privacy, UserRole } from '@/apollo/generated/types';

import {
  EventFieldLabel,
  EventFieldRow,
  EventUsersFieldWrapper,
} from '../../styles';
import { AddMembersView } from './AddMembersView';
import type { IUser } from '../../types/context';
import { useCreateEditEventContext } from '../../contexts';
import { isMembersChanged } from '../../utils/isMembersChanged';
import { generateEventUser } from '../../utils/generateEventUser';
import type { EventUsersFieldProps } from '../../types/eventUsersField';
import { EventConfirmationModal } from '../../components/EventConfirmationModal';
import {
  AddMemberModal,
  MemberPicker,
} from '../../createEditEvent/components/AddMemeberModal';

export const AddMembers = ({
  onCancelInvitation,
  showHelperText = false,
}: EventUsersFieldProps) => {
  const {
    event,
    privacy,
    members,
    chamberId,
    setMembers,
    onFormChanged,
    otherAttendees,
    connectedAttendees,
    cancellingInvitation,
    fetchingAttendees: loading,
  } = useCreateEditEventContext();
  const { isMobile } = useBreakpoints();
  const [openInviteHostModal, setOpenInviteHostModal] = useState(false);
  const [connectedTempMembers, setConnectedTempMembers] = useState<IUser[]>([]);
  const [otherTempMembers, setOtherTempMembers] = useState<IUser[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const selected = useRef<IUser | null>(null);

  useEffect(() => {
    if (connectedAttendees?.length) {
      const temp1: IUser[] = [];
      connectedAttendees.forEach((a) => {
        const generated = generateEventUser(
          a.userRole === UserRole.Participant ? a.userId : null,
          true,
          true,
        );
        if (generated)
          temp1.push({
            ...generated,
            invitationStatus: a.invitationStatus,
            userRole: a.userRole,
          });
      });
      setConnectedTempMembers(temp1);
    }
  }, [connectedAttendees]);

  useEffect(() => {
    if (otherAttendees?.length) {
      const temp2: IUser[] = [];
      otherAttendees.forEach((a) => {
        const generated = generateEventUser(
          a.userRole === UserRole.Participant ? a.userId : null,
          true,
          false,
        );
        if (generated)
          temp2.push({
            ...generated,
            invitationStatus: a.invitationStatus,
            userRole: a.userRole,
          });
      });
      setOtherTempMembers(temp2);
    }
  }, [otherAttendees]);

  useEffect(() => {
    setMembers([...connectedTempMembers, ...otherTempMembers]);
  }, [connectedTempMembers, otherTempMembers, setMembers]);

  useEffect(() => {
    if (privacy === Privacy.Connected) {
      setMembers((_members) =>
        _members.filter((member) => !!member.isConnected),
      );
    } else {
      setMembers((_members) =>
        uniqBy(
          [..._members, ...connectedTempMembers, ...otherTempMembers],
          '_id',
        ),
      );
    }
  }, [connectedTempMembers, otherTempMembers, privacy, setMembers]);

  useEffect(() => {
    if (!event?._id) return;
    const changed = isMembersChanged(
      [...connectedTempMembers, ...otherTempMembers],
      members || [],
    );
    if (onFormChanged) {
      onFormChanged('members', changed);
    }
  }, [
    connectedTempMembers,
    event?._id,
    members,
    onFormChanged,
    otherTempMembers,
  ]);

  const onRemoveMember = useCallback(
    (user: IUser) => {
      if (user.isSaved) {
        selected.current = user;
        setOpenModal(true);
      } else {
        setMembers?.((m) => m.filter((member) => member._id !== user._id));
      }
    },
    [setMembers],
  );

  const cancelInvitationCb = useCallback(
    (selectedId: Maybe<string>) => {
      setMembers?.((m) => m.filter((member) => member._id !== selectedId));
      selected.current = null;
      setOpenModal(false);
    },
    [setMembers, selected],
  );
  const onCloseModal = useCallback(
    (confirmed?: boolean) => {
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
    },
    [cancelInvitationCb, onCancelInvitation],
  );

  return (
    <EventFieldRow noBorder>
      <EventUsersFieldWrapper data-testid="event-ondemand-members">
        <EventFieldLabel
          font="body-l-bold"
          colorToken="--text-body-header-neutral-default"
        >
          <Icon name="add_m" size={24} />
          <Spacer width={8} />
          {t('noumena.event.modal.add_members_title')}
        </EventFieldLabel>
        <Spacer height={8} />
        {showHelperText && (
          <TSpan font="body-m" colorToken="--text-card-neutral-default">
            {t('noumena.event.modal.invite_members_helper_text')}
          </TSpan>
        )}
        <Spacer height={8} />
        {!isMobile ? (
          <MemberPicker
            type="member"
            chamberId={chamberId}
            onChange={setMembers}
            initialData={members || []}
            dropdownProps={{
              usePortal: true,
              placement: 'bottom',
            }}
          />
        ) : (
          <>
            <TextField
              onFocus={() => setOpenInviteHostModal(true)}
              placeholder={t('noumena.event.modal.add_members_placeholder')}
              leftIcon={
                <Icon
                  name="search_m"
                  size={24}
                  color="--icon-input-neutral-default"
                />
              }
            />
            <AddMemberModal
              type="member"
              initialOpen={true}
              chamberId={chamberId}
              onChange={setMembers}
              initialData={members || []}
              isShowModal={openInviteHostModal}
              onClose={() => setOpenInviteHostModal(false)}
              btnLabel={t('noumena.event.modal.add_ondemand_member_button')}
              modalTitle={t('noumena.event.modal.add_ondemand_hosts_heading')}
            />
            <Spacer height={8} />
            <AddMembersView
              members={members || []}
              loading={loading}
              onRemoveMember={onRemoveMember}
            />
          </>
        )}
        {openModal && (
          <EventConfirmationModal
            type="cancel-invite"
            loading={cancellingInvitation}
            onClose={() => onCloseModal()}
            onConfirm={() => onCloseModal(true)}
          />
        )}
      </EventUsersFieldWrapper>
    </EventFieldRow>
  );
};
