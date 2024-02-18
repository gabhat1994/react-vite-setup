import { useCallback, useEffect, useState, useRef } from 'react';
import { t } from 'i18next';
import { uniqBy } from 'lodash';

import { Icon } from '@/components/Icon';
import { Privacy, UserRole } from '@/apollo/generated/types';

import type { Maybe } from '@/common/types';
import { TSpan } from '@/components/Typography';
import { MembersSearch } from './MembersSearch';
import type { IUser } from '../../types/context';
import { EventMembersView } from './EventMembersView';
import { EventFieldRow } from '../../styles/EventFieldRow';
import { useCreateEditEventContext } from '../../contexts';
import { UsersSearchSelector } from '../UsersSearchSelector';
import { EventFieldLabel } from '../../styles/EventFieldLabel';
import { isMembersChanged } from '../../utils/isMembersChanged';
import { generateEventUser } from '../../utils/generateEventUser';
import { EventConfirmationModal } from '../EventConfirmationModal';
import type { EventUsersFieldProps } from '../../types/eventUsersField';
import { EventUsersFieldWrapper } from '../../styles/EventUsersFieldWrapper';
import { EventMembersDropDown } from '../../styles';

export const EventMembers = ({
  dropdownProps,
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
    <EventFieldRow>
      <EventUsersFieldWrapper data-testid="event-members-field">
        <EventFieldLabel
          font="body-l-bold"
          colorToken="--text-body-header-neutral-default"
        >
          {t('noumena.event.modal.invite_members_title')}
        </EventFieldLabel>
        {showHelperText && (
          <TSpan font="body-m" colorToken="--text-card-neutral-default">
            {t('noumena.event.modal.invite_members_helper_text')}
          </TSpan>
        )}
        <UsersSearchSelector
          type="member"
          chamberId={chamberId}
          initialData={members || []}
          searchPlaceholder={t(
            'noumena.event.modal.invite_members_placeholder',
          )}
          members={members}
          dropdownProps={{
            placement: dropdownProps?.placement || 'top',
            usePortal: dropdownProps?.usePortal || false,
          }}
          onlyConnected={privacy === Privacy.Connected}
          onChangeSelectedUsers={(_members) => setMembers(_members)}
          renderSearch={({
            inputProps,
            inputRef,
            selectedOptions,
            isOpened,
            hasSelectedOption,
            onUnSelectUser,
            onClose,
          }) => (
            <MembersSearch
              multiselect
              ref={inputRef}
              label={t('noumena.event.modal.invite_members_title')}
              inputProps={inputProps}
              hasSelectedOption={hasSelectedOption}
              selectedOptions={selectedOptions}
              isOpened={isOpened}
              onUnSelectUser={onUnSelectUser}
              onClose={onClose}
            />
          )}
        />
        <EventMembersView
          members={members || []}
          loading={loading}
          onRemoveMember={onRemoveMember}
        />
        {!loading && !members?.length && (
          <EventMembersDropDown>
            <Icon
              data-testid="event-summary-icon"
              name="warning_m"
              size={24}
              color="--icon-tablecell-neutral-default"
            />
            <TSpan
              font="footnote-bold"
              colorToken="--text-tablecell-body-neutral-default"
            >
              {t('noumena.event.modal.no_invited_members_text')}
            </TSpan>
          </EventMembersDropDown>
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
