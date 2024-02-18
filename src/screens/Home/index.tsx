import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import * as Storyblok from '@/services/rest/storyblok';
import ListLayout from '@/layout/ListLayout';
import { useAuth } from '@/features/auth/contexts';
import { useLaunchDarkly } from '@/hooks';
import { Button } from '@/components/Button';
import useEvent from '@/hooks/useEvent';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout/Stack';
import routes from '@/constants/routes';
import HowItWorksSection from './components/HowItWorksSection/HowItWorksSection';
import { NoumMeModal } from './components/NoumMeModal/Modal';
import NoumsForYouSection from './components/NoumsForYouSection/NoumsForYouSection';
import SideBar from './components/SideBar/SideBar';
import StorySection from './components/StorySection/StorySection';
import OnboardingEventsSection from './components/OnboardingEventsSection/OnboardingEventsSection';
import { type Content, type RootObject } from './types';
import { Container, NoumMeCard, UserInfoCard, ButtonContainer } from './styles';

const Home = () => {
  const [showNoumMeModal, setShowNoumMeModal] = useState<boolean>(false);
  const [content, setContent] = useState<Content>();
  const componentMounted = useRef(true);
  const { isActive, user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { flags } = useLaunchDarkly();

  const firstName = user?.firstName || '';
  const middleName = user?.middleName || '';
  const lastName = user?.lastName || '';
  const jobTitle = user?.title || '';
  const profilePicture = user?.profile?.profilePicture || '';

  const title = content?.Section_03?.length && content?.Section_03[0]?.Title;
  const description =
    content?.Section_03?.length && content?.Section_03[0]?.Description;
  const buttonLabel =
    content?.Section_03?.length && content?.Section_03[0]?.Button_Label;
  const recommendedNoumIds = content?.Noum_recommendations || [];

  const handleOpenNoumMeModal = useEvent(() => {
    setShowNoumMeModal(true);
  });
  const handleCloseNoumMeModal = useEvent(() => {
    setShowNoumMeModal(false);
  });

  useEffect(() => {
    async function getContent() {
      const { data }: { data: RootObject } =
        await Storyblok.getHomePageMainPageLayout();

      if (componentMounted.current) {
        setContent(data?.story?.content);
      }
    }
    getContent();

    return () => {
      componentMounted.current = false;
    };
  }, []);
  return (
    <ListLayout
      type="Home"
      rightContent={<SideBar data={content?.Section_03} />}
    >
      <Container isAppUiV2={flags.newAppNavigation}>
        <UserInfoCard profileImageUrl={profilePicture}>
          {!!profilePicture && <div className="image" />}
          {!profilePicture && (
            <Icon imageIconName="avatar_m" size={56} data-testid="avatarIcon" />
          )}
          <div className="right">
            <div className="name-and-title">
              <TSpan
                font="body-xl-bold"
                className="name"
                colorToken="--text-card-header-neutral-highlighted"
              >{`${firstName} ${middleName} ${lastName}`}</TSpan>
              <div className="job-title">{jobTitle}</div>
            </div>
            <Button
              className="link"
              textOnly
              rightIcon={
                <Icon
                  name="arrow_right_m"
                  size={20}
                  color="--icon-button-brand-secondary-default"
                />
              }
              onClick={() => navigate(routes.HOME_NOUM)}
            >
              {t('noumena.home.go_to_your_home_noum')}
            </Button>
          </div>
        </UserInfoCard>
        <OnboardingEventsSection data={content?.Section_01?.[0]} />
        <StorySection
          sectionData={content?.Section_02?.[0]}
          calendlyData={content?.Schedule_a_call}
        />
        <NoumMeCard>
          <div>
            <TSpan
              font="body-xl-bold"
              colorToken="--text-card-neutral-alt-default"
            >
              {title}
            </TSpan>
            <Spacer height={16} />
            <TSpan
              font="body-l"
              colorToken="--text-card-brand-secondary-default"
            >
              {description}
            </TSpan>
          </div>
          <ButtonContainer>
            <Button
              primary
              size="small"
              className={`${!isActive ? 'disabled' : ''}`}
              disabled={!isActive}
              onClick={handleOpenNoumMeModal}
            >
              {buttonLabel}
            </Button>
          </ButtonContainer>
        </NoumMeCard>
        <HowItWorksSection data={content?.Section_02?.[1]} />
        {!!recommendedNoumIds.length && (
          <NoumsForYouSection recommendedNoumIds={recommendedNoumIds} />
        )}
        <NoumMeModal open={showNoumMeModal} onClose={handleCloseNoumMeModal} />
      </Container>
    </ListLayout>
  );
};

export default Home;
