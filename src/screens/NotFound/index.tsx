import { useNavigate, useParams } from 'react-router';
import { Trans } from 'react-i18next';
import { addMinutes, format } from 'date-fns';
import { t } from 'i18next';
import { useMemo } from 'react';
import { useAuth } from '@/features/auth/contexts';
import { useWindowDimensions } from '@/hooks';
import { useSocialHallEvent } from '@/features/socialHall/hooks';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';
import { Button } from '@/components/Button';
import { LINKS } from '@/constants/links';
import { breakpoints } from '@/constants/devices';
import { Header } from '@/components/Header';
import { GuestHeader } from '@/layout/GuestHeader';
import ROUTES from '@/constants/routes';
import { MainHeader } from '@/layout/MainHeader';
import { UserUtil } from '@/utils/user';
import { Spinner } from '@/components/Spinner';
import { setLocalStorage } from '@/utils/localStorage';
import accessLocalStorage from '@/constants/accessLocalStorage';
import { getFinalTime } from './utils';
import { AboutUsLink, Container, NotFoundContainer } from './styles';

const NotFound = () => {
  const pathName = window.location.pathname;
  const { id } = useParams();
  const { isUnregistered, user } = useAuth();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const isDesktop = width > breakpoints.TABLET_L;

  const { eventDetails, loading } = useSocialHallEvent();
  const isAccessNoLive = useMemo(() => `/event/no-live/${id}`, [id]);

  const isAccessDenied = useMemo(
    () =>
      isUnregistered ||
      pathName === ROUTES.EVENT_NO_ACCESS ||
      pathName === isAccessNoLive ||
      pathName === ROUTES.ACCESS_DENIED ||
      pathName === ROUTES.EVENT_FINISHED,
    [isAccessNoLive, isUnregistered, pathName],
  );

  const eventStartDate = useMemo(
    () => new Date(eventDetails?.eventDate),
    [eventDetails?.eventDate],
  );

  const eventEndDate = useMemo(
    () =>
      eventDetails &&
      addMinutes(new Date(eventDetails.eventDate), eventDetails.duration! / 60),
    [eventDetails],
  );

  const routeHandler = () => {
    setLocalStorage(accessLocalStorage.GUEST_REDIRECT_TO_URI);
    if (isUnregistered) {
      navigate(ROUTES.GUEST_HOME);
    } else {
      navigate(ROUTES.HOME_NOUM);
    }
  };

  if (loading) return <Spinner />;

  return (
    <Container>
      {isAccessDenied && (
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
      )}
      <NotFoundContainer data-testid="404_Container">
        <TSpan
          font="heading-xs-bold"
          data-testid="404_title"
          colorToken="--text-card-neutral-highlighted"
        >
          {pathName === ROUTES.ACCESS_DENIED
            ? t(`noumena.404.nm.title`)
            : pathName === ROUTES.EVENT_NO_ACCESS
            ? t(`noumena.event.error`)
            : pathName === isAccessNoLive
            ? t(`noumena.event.not_live`)
            : pathName === ROUTES.EVENT_FINISHED
            ? t(`noumena.event.finished`)
            : t(`noumena.404.title`)}
        </TSpan>
        <Spacer height={8} />
        {isAccessDenied && (
          <>
            {pathName !== isAccessNoLive &&
              pathName !== ROUTES.EVENT_NO_ACCESS &&
              pathName !== ROUTES.EVENT_FINISHED && (
                <>
                  <TSpan
                    font="body-m"
                    colorToken="--text-card-neutral-default"
                    data-testid="404_NM_subtitle"
                  >
                    {t(`noumena.404.nm.subTitle`)}
                  </TSpan>
                  <Spacer height={24} />
                </>
              )}
            {pathName === ROUTES.EVENT_FINISHED ? (
              <Button onClick={routeHandler} secondary size="small">
                {t('noumena.event.NM_finished')}
              </Button>
            ) : (
              eventDetails?.eventDate && (
                <TSpan
                  font="body-m"
                  colorToken="--text-card-neutral-default"
                  data-testid="404_NM_description"
                >
                  <Trans
                    i18nKey={
                      pathName === ROUTES.EVENT_NO_ACCESS
                        ? t('noumena.event.no_access')
                        : pathName === isAccessNoLive
                        ? t('noumena.event.no_live', {
                            eventName: eventDetails?.title,
                            eventDate: format(eventStartDate, 'dd/MM/yyyy'),
                            startTime: getFinalTime(eventStartDate),
                            endTime: getFinalTime(eventEndDate!),
                          })
                        : t('noumena.404.nm.description')
                    }
                    components={{
                      newline: isDesktop ? <> </> : <br />,
                      link1: <AboutUsLink href={LINKS.ABOUT_US} />,
                    }}
                  />
                </TSpan>
              )
            )}
          </>
        )}
        {!isAccessDenied && (
          <Button
            onClick={() => navigate(ROUTES.HOME)}
            testId="404_go_home_btn"
          >
            {t('noumena.404.body')}
          </Button>
        )}
      </NotFoundContainer>
    </Container>
  );
};

export default NotFound;
