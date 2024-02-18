import { t } from 'i18next';
import { useCallback, useMemo, useState } from 'react';
import { matchPath, useLocation, useParams } from 'react-router-dom';
import {
  EventsStatus,
  InvitationStatus,
  UserRole,
} from '@/apollo/generated/types';
import {
  Tag,
  Icon,
  Card,
  Button,
  Spinner,
  TSpan,
  BasicChipsTabsForm,
} from '@/components';
import { Stack } from '@/layout';
import ROUTES from '@/constants/routes';
import { useBreakpoints } from '@/hooks';
import { useAuth } from '@/features/auth/contexts';
import { SocialHallEventProvider } from '@/providers';
import { useGetEventByIdQuery } from '@/apollo/graphql';
import { NoumViewLayout } from '@/layout/NoumLayout';
import { useEventAttendees } from '@/features/events/hooks';

import { InviteAttendeeModal } from '@/features/socialHall/components';
import {
  Content,
  EventDetialsLayout,
  EventDetialsStyled,
  TabComponentContainer,
} from './styles';
import Details from './Details';
import { NavBar } from './NavBar';
import { EventDetialsEnum } from './constants';
import { AttendeesStatus } from './AttendeesStatus';
import { getAttendingAttendees, getEvenDetailsTab } from './utils';

export const EventDetail = (): JSX.Element => {
  const { eventId } = useParams();
  const { isMobile } = useBreakpoints();
  const { masterId } = useAuth();
  const [selectedValue, setSelectedValue] = useState(EventDetialsEnum.Details);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const { pathname } = useLocation();
  const {
    data: updatedEventDataResult,
    refetch,
    loading,
  } = useGetEventByIdQuery({
    skip: !eventId,
    fetchPolicy: 'cache-and-network',
    variables: {
      id: eventId!,
    },
  });

  const isEventDetailPage = matchPath(
    { path: ROUTES.SOCIAL_HALL_DETAILS },
    pathname,
  );

  const eventData = updatedEventDataResult?.getEventById;

  const isHost = eventData?.currentUser?.userRole === UserRole.Host;

  const isEventAttending =
    eventData?.currentUser?.invitation?.status === InvitationStatus.Accepted;

  const isCoHost =
    eventData?.currentUser?.userRole === UserRole.Cohost && isEventAttending;

  const isExpired = eventData?.status === EventsStatus.Expired;

  const showInviteBtn = !isExpired && (isHost || isCoHost);

  const {
    onCancel,
    activeTab,
    attendeesToShow,
    refetchAudience,
    pendingAttendees,
    cancellingUser,
  } = useEventAttendees({
    isHost: isHost || isCoHost,
    eventId: eventId!,
    shouldFetch: !!eventId,
  });

  const attendees = useMemo(
    () => getAttendingAttendees(attendeesToShow),
    [attendeesToShow],
  );

  const totalAttendees =
    isExpired || !isEventAttending
      ? attendees.length
      : attendees.length + pendingAttendees.length;

  const DetailView = () => (
    <Details
      eventData={eventData!}
      attendees={attendeesToShow}
      isEventDetailPage={!!isEventDetailPage}
    />
  );

  const AttendeesStatusView = () => (
    <AttendeesStatus
      eventId={eventId!}
      isCoHost={isCoHost}
      onCancel={onCancel}
      activeTab={activeTab}
      isExpired={isExpired}
      isLoading={cancellingUser}
      isHost={isHost || isCoHost}
      isAttending={isEventAttending}
      pendingUsers={pendingAttendees}
      acceptedUsers={attendeesToShow}
    />
  );

  const NavBarView = useCallback(
    () =>
      eventData ? (
        <NavBar event={eventData} masterId={masterId} refetch={refetch} />
      ) : null,
    [eventData, masterId, refetch],
  );

  if (loading && !eventData) return <Spinner />;

  return (
    <>
      {isMobile ? (
        <Card>
          <Stack gap={16}>
            <Stack gap={12}>
              {isHost && (
                <Tag size="small" secondary>
                  {t('noumena.social_hall.host')}
                </Tag>
              )}
              {eventData?.status === EventsStatus.Live && (
                <Tag
                  size="small"
                  bgColor="var(--bg-badge-danger-primary-default)"
                  icon={<Icon name="wave_left_m" size={16} />}
                  rightIcon={<Icon name="wave_right_m" size={16} />}
                >
                  {t('noumena.event.event_duration.live_now')}
                </Tag>
              )}
              <TSpan font="body-xl-bold"> {eventData?.title} </TSpan>
            </Stack>
          </Stack>
          <BasicChipsTabsForm
            onChange={setSelectedValue}
            inputList={getEvenDetailsTab(totalAttendees)}
            selectedId={selectedValue}
            mode="isUnderline"
            isWithoutImage
            fontSize="--font-input-small-size"
            textFont="--font-body-medium-regular-font"
            tabWidth="auto"
            fullWidth
          />
          <TabComponentContainer>
            {eventData && selectedValue === EventDetialsEnum.Details ? (
              <DetailView />
            ) : (
              <AttendeesStatusView />
            )}
          </TabComponentContainer>

          {eventData?._id ? <NavBarView /> : null}
        </Card>
      ) : (
        <>
          {eventData && (
            <EventDetialsStyled>
              <NoumViewLayout leftSidebar={<NavBarView />} isStickyContainer>
                <EventDetialsLayout>
                  <Content isBorder>
                    <Stack padding="16px" align="center" borderBottom>
                      <TSpan font="body-l-bold">
                        {t('noumena.editor.details')}
                      </TSpan>
                    </Stack>
                    <DetailView />
                  </Content>
                  <Content>
                    <Stack
                      padding="16px"
                      justify="space-between"
                      align="center"
                      borderBottom
                    >
                      <TSpan font="body-l-bold">
                        {t('noumena.event.attendees.active', {
                          count: totalAttendees,
                        })}
                      </TSpan>
                      {showInviteBtn && (
                        <Button
                          size="small"
                          onClick={() => setShowInviteModal(true)}
                        >
                          Invite
                        </Button>
                      )}
                    </Stack>
                    <AttendeesStatusView />
                  </Content>
                </EventDetialsLayout>
              </NoumViewLayout>
            </EventDetialsStyled>
          )}
        </>
      )}
      <SocialHallEventProvider>
        <InviteAttendeeModal
          isOpen={showInviteModal}
          handleClose={() => setShowInviteModal(false)}
          refetchAudience={refetchAudience}
        />
      </SocialHallEventProvider>
    </>
  );
};
