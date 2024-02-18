import { t } from 'i18next';
import { first } from 'lodash';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import {
  useSocialHallCallContext,
  useSocialHallContext,
  useSocialHallEventContext,
} from '@/providers';
import { Icon } from '@/components/Icon';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { useWindowDimensions } from '@/hooks';
import { cleanList } from '@/utils/list';
import { type UserOutput } from '@/apollo/generated/types';
import { Dropdown, type DropdownTargetProps } from '@/components/Dropdown';
import { breakpoints } from '@/constants/devices';
import { EventAttendeesModal } from '@/features/events/components';
import { useEventAttendees } from '@/features/events/hooks';
import { InviteAttendeeModal } from '../InviteAttendee';
import {
  createAudienceSection,
  createRaisedHandSection,
  createStageSection,
} from './helper';
import {
  type SideBarSection,
  type SideBarType,
  type SocialHallMembersProps,
} from './types';
import {
  ListWrapper,
  SideBarWrapper,
  SideBarHeader,
  SideBarHeaderWrapper,
  IconButton,
  SideBarActionHeader,
} from './styles';
import { SideBarUserItem } from './SideBarUserItem/SideBarUserListItem';
import {
  mobileDropdownStyles,
  moreDropdownOptionAttendee,
  moreDropdownOptionHost,
  personalEventDropdownOptionHost,
} from './data';

export const SocialHallMembers = ({
  onClose,
  show,
  isInvited,
  onlineAttendees,
}: SocialHallMembersProps) => {
  const { width } = useWindowDimensions();
  const isMobile = useMemo(() => width <= breakpoints.MOBILE_MAX, [width]);
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false);
  const attendeesRef =
    useRef<React.ElementRef<typeof EventAttendeesModal>>(null);
  const {
    isHost,
    isPersonalSocialHall,
    socialHallAttendeesAndGroups,
    stageAttendees: stageUsers,
    audienceAttendees: audience,
  } = useSocialHallContext();

  const { isEventHost, eventDetails } = useSocialHallEventContext();

  const inviteUserToggle = () => setShowInviteModal((val) => !val);

  const onViewAttendees = useCallback(() => {
    attendeesRef.current?.open(eventDetails?._id ?? '', !!isEventHost);
  }, [isEventHost, eventDetails]);

  const { pendingAttendees: pAttendees, refetchAudience } = useEventAttendees({
    eventId: eventDetails?._id || '',
    isHost: Boolean(isHost),
    shouldFetch: !!eventDetails?._id && isHost !== undefined,
  });

  const { raisedHandUsers, mutedUsers, camUsers, networkErrorUsers } =
    useSocialHallCallContext();

  const groupAttendees = useMemo(
    () =>
      first(
        socialHallAttendeesAndGroups?.data?.socialHallGroups?.data,
      )?.users?.filter((attendee) => raisedHandUsers?.includes(attendee?._id!)),
    [raisedHandUsers, socialHallAttendeesAndGroups],
  );

  const stageAttendees = useMemo(() => {
    const attendees = eventDetails?.isInstantEvent
      ? onlineAttendees
      : stageUsers;
    return attendees?.map((item) => ({
      ...item,
      isMuted: mutedUsers.includes(item._id),
      isCameraEnable: camUsers.includes(item._id),
    }));
  }, [
    camUsers,
    mutedUsers,
    stageUsers,
    onlineAttendees,
    eventDetails?.isInstantEvent,
  ]);

  const pendingAttendees = useMemo(
    () =>
      cleanList(pAttendees).map((item) => ({
        ...(item.userId as UserOutput),
        invitationStatus: 'PENDING',
      })),
    [pAttendees],
  );

  const audienceAttendees = useMemo(
    () => [...(audience || []), ...(pendingAttendees || [])],
    [pendingAttendees, audience],
  );

  const HostAudienceAttendees = useMemo(
    () =>
      isHost && groupAttendees
        ? audienceAttendees.filter(
            (attendee) => !raisedHandUsers?.includes(attendee?._id!),
          )
        : audienceAttendees,
    [audienceAttendees, groupAttendees, isHost, raisedHandUsers],
  );

  const totalMembers = useMemo(() => {
    if (eventDetails?.isInstantEvent) {
      return stageAttendees?.length || 0;
    }
    return (
      (groupAttendees?.length || 0) +
      (stageAttendees?.length || 0) +
      (audienceAttendees?.length || 0)
    );
  }, [
    groupAttendees?.length,
    stageAttendees?.length,
    audienceAttendees?.length,
    eventDetails?.isInstantEvent,
  ]);

  const sideBarData = useMemo((): Array<SideBarSection> => {
    const audiences = createAudienceSection(HostAudienceAttendees || []);
    const stage = createStageSection(stageAttendees || []);
    const raisedHand = isHost
      ? createRaisedHandSection(groupAttendees as UserOutput[])
      : undefined;
    if (eventDetails?.isInstantEvent) {
      return [stage];
    }
    const sections = [audiences, stage];
    return raisedHand ? [raisedHand, ...sections] : sections;
  }, [
    HostAudienceAttendees,
    groupAttendees,
    isHost,
    stageAttendees,
    eventDetails?.isInstantEvent,
  ]);

  const handleSelectOptions = useCallback(
    (option) => {
      if (option.value === 'see_event_attendees') {
        onViewAttendees();
      } else if (option.value === 'invite_users') {
        inviteUserToggle();
      }
    },
    [onViewAttendees],
  );

  return (
    <SideBarWrapper data-testid="side_bar_wrapper" show={show}>
      <SideBarActionHeader>
        <IconButton>
          <Icon
            onClick={onClose}
            color="--icon-button-brand-primary-default"
            name="close_m"
            size={24}
          />
        </IconButton>
        {((isPersonalSocialHall && isEventHost) || !isPersonalSocialHall) && (
          <Stack grow={1} justify="space-between">
            <Stack grow={1} justify="center">
              <TSpan font="body-l" colorToken="--text-appbar-neutral-default">
                {`${t('noumena.social_hall.users')} (${totalMembers})`}
              </TSpan>
            </Stack>
            <Dropdown
              closeOnSelect
              placement="bottom-end"
              isShowEmptyText={false}
              onSelectOption={(option) => handleSelectOptions(option)}
              options={
                isEventHost
                  ? isPersonalSocialHall
                    ? personalEventDropdownOptionHost
                    : moreDropdownOptionHost
                  : moreDropdownOptionAttendee
              }
              containerWidth="197"
              padding="0"
              observerMinHeight="0"
              usePortal
              renderContainerFromBottom={isMobile}
              dropdownItemStyle={isMobile ? mobileDropdownStyles : {}}
            >
              {({
                targetRef,
                targetProps,
                toggle,
              }: DropdownTargetProps<HTMLDivElement>) => (
                <IconButton
                  ref={targetRef}
                  onClick={toggle}
                  {...targetProps}
                  data-testid="three_dot_button"
                >
                  <Icon
                    color="--icon-button-neutral-default"
                    name="more_m"
                    size={24}
                  />
                </IconButton>
              )}
            </Dropdown>
          </Stack>
        )}
      </SideBarActionHeader>
      {sideBarData.map(({ data, header, type }) =>
        data?.length ? (
          <React.Fragment key={header}>
            <SideBarHeaderWrapper>
              <SideBarHeader
                colorToken="--text-tablecell-body-neutral-default"
                font="footnote"
              >
                {t(header)}
              </SideBarHeader>
            </SideBarHeaderWrapper>
            <ListWrapper
              data-testid="list_wrapper"
              isScrollable={data.length === 1}
            >
              {data.map((attendee) => (
                <SideBarUserItem
                  user={attendee!}
                  key={attendee?._id}
                  isInvited={isInvited}
                  refetchAudience={refetchAudience}
                  sideBarType={type as SideBarType}
                  isOffline={networkErrorUsers.includes(attendee._id)}
                />
              ))}
            </ListWrapper>
          </React.Fragment>
        ) : null,
      )}
      <EventAttendeesModal ref={attendeesRef} />
      <InviteAttendeeModal
        isOpen={showInviteModal}
        handleClose={inviteUserToggle}
        refetchAudience={refetchAudience}
      />
    </SideBarWrapper>
  );
};

export default SocialHallMembers;
