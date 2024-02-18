import { t } from 'i18next';
import { useEffect, useMemo, useState, useRef, useCallback } from 'react';

import { cleanList } from '@/utils/list';
import { useAuth } from '@/features/auth/contexts';
import { UserRole } from '@/apollo/generated/types';
import { useCreateEditEventContext } from '@/features/events/contexts';
import { isMembersChanged } from '@/features/events/utils/isMembersChanged';
import { HostElementRowHeight } from '@/features/events/createEditEvent/components/EventMemberItems/const';

import { UserUtil } from '@/utils/user';
import type { InvitedMembers, IUser } from '../../../types/context';
import { EventMemberItem, EventMemberItems } from '../EventMemberItems';
import { Container, HostContainer } from './styles';
import { AddMemberHeader } from '../AddMemberHeader';
import { EventConfirmationModal } from '../../../components/EventConfirmationModal';
import { AddMemberModal } from '../AddMemeberModal';
import { getEventUser } from '../EventInviteMembers/utils';

export const EventInviteHosts = () => {
  const { user: currentUser } = useAuth();
  const [isShowHosts, setIsShowHosts] = useState(false);
  const [original, setOriginal] = useState<IUser[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openInviteHostModal, setOpenInviteHostModal] = useState(false);
  const {
    event,
    cohosts,
    chamberId,
    setCohosts,
    onFormChanged,
    isProjectNoum,
    otherAttendees,
    onRemoveMember,
    onSetFormCohosts,
    fetchingAttendees,
    connectedAttendees,
    cancellingInvitation,
  } = useCreateEditEventContext();

  const selected = useRef<IUser | null>(null);

  const onUpdateFormData = useCallback(
    (hosts: IUser[]) => {
      const uids = cleanList(hosts.map((user) => ({ userId: user._id })));
      onSetFormCohosts(uids as InvitedMembers[]);
    },
    [onSetFormCohosts],
  );

  useEffect(() => {
    const attendees = getEventUser(
      [...connectedAttendees, ...otherAttendees],
      UserRole.Cohost,
    );
    setCohosts(attendees);
    setOriginal(attendees);
    onUpdateFormData(attendees);
  }, [connectedAttendees, otherAttendees, setCohosts, onUpdateFormData]);

  useEffect(() => {
    if (!event?._id) return;
    const changed = isMembersChanged(original, cohosts || []);
    onFormChanged('cohosts', changed);
  }, [cohosts, event?._id, onFormChanged, original]);

  const host: IUser = useMemo(() => {
    const user = event ? event.userId : currentUser;
    const hostUser = {
      _id: user?._id,
      firstName: user?.firstName,
      middleName: user?.middleName,
      lastName: user?.lastName,
      email: user?.email,
      title: user?.title,
      profilePictureThumbnail: UserUtil.getProfilePicture(user),
      isHost: true,
    };

    return event
      ? { ...hostUser, chamberId: user?.chamber?._id || '' }
      : hostUser;
  }, [event, currentUser]);

  const onRemoveCoHosts = (id: string) => {
    const hosts = cleanList(cohosts).filter((cohost) => cohost._id !== id);
    setCohosts(hosts);
    onUpdateFormData(hosts);
  };

  const onRemoveHost = (user: IUser) => {
    if (user.isSaved) {
      selected.current = user;
      setOpenModal(true);
    } else {
      onRemoveCoHosts(user._id ?? '');
    }
  };

  const onCloseModal = (confirmed?: boolean) => {
    if (confirmed) {
      const selectedId = selected.current?._id;
      if (selectedId) {
        onRemoveMember(selectedId, () => {
          onRemoveCoHosts(selectedId);
          selected.current = null;
          setOpenModal(false);
        });
      }
    } else {
      selected.current = null;
      setOpenModal(false);
    }
  };

  const onChange = (hosts: IUser[]) => {
    setCohosts(hosts);
    onUpdateFormData(hosts);
  };

  const hostCount = cohosts.length + 1; // 1 is for the default host

  const userItemContainerHeight = hostCount * HostElementRowHeight + 60;

  return (
    <Container
      align="center"
      fullWidth
      vertical
      data-testid="event-invite-hosts"
    >
      <AddMemberHeader
        isExpand={isShowHosts}
        count={hostCount}
        onExpand={() => setOpenInviteHostModal(true)}
        toggle={() => setIsShowHosts(!isShowHosts)}
        expandBtnLabel="noumena.event.modal.add_host"
        headingLabel="noumena.event.modal.hosts_title_v2"
      />
      <HostContainer
        height={userItemContainerHeight}
        fullWidth
        isOpen={isShowHosts}
        vertical
      >
        <EventMemberItem
          splitter={hostCount > 1}
          user={host}
          type="host"
          isNoumEditor={true}
          onRemove={onRemoveHost}
        />
        <EventMemberItems
          type="host"
          members={cohosts}
          isOpen={isShowHosts}
          onRemove={onRemoveHost}
          loading={fetchingAttendees}
        />
      </HostContainer>

      <AddMemberModal
        type="cohost"
        btnLabel={t('noumena.event.modal.add_hosts_button')}
        testId="add-host-modal"
        chamberId={chamberId}
        initialData={cohosts || []}
        onlyFavorites={isProjectNoum}
        onChange={onChange}
        isShowModal={openInviteHostModal}
        onClose={() => setOpenInviteHostModal(false)}
        modalTitle={t('noumena.event.modal.add_hosts_heading')}
        emptyText={
          isProjectNoum ? t('noumena.event.modal.hosts_only_favorites') : ''
        }
      />

      {openModal && (
        <EventConfirmationModal
          type="remove-cohost"
          loading={cancellingInvitation}
          onClose={() => onCloseModal()}
          onConfirm={() => onCloseModal(true)}
        />
      )}
    </Container>
  );
};
