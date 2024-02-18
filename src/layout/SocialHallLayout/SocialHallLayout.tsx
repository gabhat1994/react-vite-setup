import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  SideBar,
  BottomBar,
  InviteAttendeeModal,
  ChangeGroupNameModal,
  HostHeader,
  AttendeeHeader,
} from '@/features/socialHall/components';
import { UserUtil } from '@/utils/user';
import { Header } from '@/components/Header';
import { MainHeader } from '@/layout/MainHeader';
import { useAuth } from '@/features/auth/contexts';
import { breakpoints } from '@/constants/devices';
import { GuestHeader } from '@/layout/GuestHeader';
import { EventAttendeesModal } from '@/features/events/components';
import { useLaunchDarkly, useToggle, useWindowDimensions } from '@/hooks';
import { Modal, ModalBody, ModalHeader } from '@/components/ExtendedModal';
import { useSocialHallContext, useSocialHallEventContext } from '@/providers';

import * as S from './styles';
import { Spacer } from '../Stack';
import { AppLayout } from '../AppLayout';
import { type LayoutProps } from './types';

export const SocialHallLayout = (props: LayoutProps) => {
  const { showBuzzRoom, socialHallAttendeesAndGroups } = useSocialHallContext();
  const { isEventHost, eventDetails, isMainEvent } =
    useSocialHallEventContext();
  const { children } = props;
  const attendeesRef =
    useRef<React.ElementRef<typeof EventAttendeesModal>>(null);
  const { user, isUnregistered } = useAuth();
  const { width } = useWindowDimensions();
  const { t } = useTranslation();
  const [visibilityViz, setVisibilityViz] = useState<boolean>(true);
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false);
  const [showChangeGroupName, setShowChangeGroupName] = useToggle(false);

  const { flags } = useLaunchDarkly();

  const isMobile = width <= breakpoints.MOBILE_MAX;

  const urls = useMemo(() => {
    const profileUrls =
      socialHallAttendeesAndGroups?.data?.socialHallAttendee?.data?.map(
        (attendee) => attendee?.attendeeId?.profile?.profilePicture ?? '',
      );
    socialHallAttendeesAndGroups?.data?.socialHallGroups?.data?.map((group) => {
      group?.users?.map((u) =>
        profileUrls?.push(u?.profile?.profilePicture ?? ''),
      );
      return undefined;
    });
    return profileUrls ?? [];
  }, [socialHallAttendeesAndGroups]);

  const toggle = () => setShowInviteModal((val) => !val);

  const onViewAttendees = useCallback(() => {
    attendeesRef.current?.open(eventDetails?._id ?? '', !!isEventHost);
  }, [isEventHost, eventDetails]);

  useEffect(() => {
    if (isMainEvent && showChangeGroupName) setShowChangeGroupName();
  }, [isMainEvent, setShowChangeGroupName, showChangeGroupName]);

  const mainContent = (
    <>
      <S.Container>
        {isEventHost && eventDetails?._id && !showBuzzRoom && (
          <HostHeader
            onViewAttendees={onViewAttendees}
            onInviteAttendees={toggle}
            onChangeGroupName={setShowChangeGroupName}
          />
        )}
        {!isEventHost && eventDetails?._id && !showBuzzRoom && (
          <AttendeeHeader
            onViewAttendees={onViewAttendees}
            onChangeGroupName={setShowChangeGroupName}
          />
        )}
        <S.Content>
          {!showBuzzRoom && (
            <S.SideBarWrapper visible={!visibilityViz}>
              <SideBar />
              <S.Background onClick={() => setVisibilityViz(true)} />
            </S.SideBarWrapper>
          )}
          <S.Children visible={visibilityViz}>{children}</S.Children>
          {!showBuzzRoom && (
            <S.BottomBarWrapper visible={visibilityViz}>
              <BottomBar
                urls={urls}
                onClickShowAll={() => setVisibilityViz(false)}
              />
            </S.BottomBarWrapper>
          )}
        </S.Content>
      </S.Container>
      {isMobile && (
        <Modal
          open={!visibilityViz}
          isFullScreen
          noPaddingNoBorder
          enableCloseButton
          closeButtonStyles={{ enforceRight: true }}
          onClose={() => setVisibilityViz(true)}
        >
          <Spacer height={26} />
          <ModalHeader isFullScreen>
            {t(`noumena.social_hall.see_event_attendees`)}
          </ModalHeader>
          <ModalBody isFullScreen mobileFlex overflowY="hidden">
            <SideBar />
          </ModalBody>
        </Modal>
      )}
      <EventAttendeesModal ref={attendeesRef} />
      <InviteAttendeeModal isOpen={showInviteModal} handleClose={toggle} />
      <ChangeGroupNameModal
        isOpen={showChangeGroupName && !isMainEvent}
        onClose={setShowChangeGroupName}
      />
    </>
  );

  if (flags.newAppNavigation) {
    return (
      <AppLayout.Layout
        mode="focused"
        topNavbar={
          isUnregistered ? (
            <GuestHeader leftNavButton={true} />
          ) : (
            <AppLayout.TopBar />
          )
        }
      >
        {mainContent}
      </AppLayout.Layout>
    );
  }

  return (
    <S.Layout>
      <Header isBorderRadius={false}>
        {isUnregistered ? (
          <GuestHeader leftNavButton={true} />
        ) : (
          <MainHeader
            avatar={UserUtil.getProfilePicture(user) || undefined}
            userName={user?.firstName || undefined}
          />
        )}
      </Header>
      {mainContent}
    </S.Layout>
  );
};
