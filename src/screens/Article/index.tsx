import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { capitalize } from 'lodash';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import { useTranslation } from 'react-i18next';
import * as Storyblok from '@/services/rest/storyblok';
import MoneyLayout from '@/layout/MoneyLayout';
import { Button } from '@/components/Button';
import getBgColorByNoumType from '@/utils/getBgColorByNoumType';
import getColorByNoumType from '@/utils/getColorByNoumType';
import { type RootObject } from '@/screens/Home/types';
import { Spacer } from '@/layout';
import { TSpan } from '@/components/Typography';
import { useLaunchDarkly, useWindowDimensions } from '@/hooks';
import connectIntroNoumBgImage from '@/assets/images/connect-intro-noum.svg';
import connectIntroNoumMobileBgImage from '@/assets/images/connect-intro-noum-mobile.svg';
import { breakpoints } from '@/constants/devices';
import { StoryblokRichTextContainer } from '@/components/StoryblokRichTextContainer/StoryblokRichTextContainer';
import useEvent from '@/hooks/useEvent';
import { Icon } from '@/components/Icon';
import { useNoumDetails } from '@/features/noums/hooks/noums';
import { VideoPlayerModal } from '@/screens/Home/components/VideoPlayerModal/Modal';
import { StyledNoumCard } from '@/screens/Home/components/NoumsForYouSection/styles';
import { type Content, type ArticleDetails } from './types';
import {
  Container,
  StyledArticleDetail,
  StyledCategory,
  StyledBanner,
  ArticeMainImage,
  StyledFeaturedImageContainer,
} from './styles';

const Articles = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const componentMounted = useRef(true);
  const slug = location?.search?.split('?slug=')[1];
  const [showPlayVideoModal, setShowPlayVideoModal] = useState<boolean>(false);
  const [content, setContent] = useState<Content>();
  const [specialNoumId, setSpecialNoumId] = useState<string>('');
  const { width } = useWindowDimensions();
  const { flags } = useLaunchDarkly();

  useEffect(() => {
    async function getHomeContent() {
      const { data }: { data: RootObject } =
        await Storyblok.getHomePageMainPageLayout();
      const noumId = data?.story?.content?.special_noum_id || '';
      if (componentMounted.current) {
        setSpecialNoumId(noumId);
      }
    }
    async function getContent() {
      const { data }: { data: ArticleDetails } =
        await Storyblok.getArticleDetails(slug);
      setContent(data?.story?.content);
    }
    getHomeContent();
    getContent();
  }, [slug]);

  const { space: noum } = useNoumDetails(specialNoumId);
  const id = noum?._id;
  const name = noum?.name;
  const profileImage = noum?.profileImage || '';
  const type = noum?.type || '';
  const followersCount = noum?.followersCount || 0;
  const ownedBy = `${noum?.uid?.firstName} ${noum?.uid?.lastName}`;
  const { t } = useTranslation();

  const bannerBackgroundImage =
    width > breakpoints.MOBILE_MAX
      ? connectIntroNoumBgImage
      : connectIntroNoumMobileBgImage;

  const videoURL = content?.Video?.filename || '';

  const handleOpenPlayVideoModal = useEvent(() => {
    setShowPlayVideoModal(true);
  });
  const handleClosePlayVideoModal = useEvent(() => {
    setShowPlayVideoModal(false);
  });

  return (
    <MoneyLayout
      hideLeftMenu={true}
      backgroundColor="--bg-body-neutral-alt-default"
      onGoBack={() => navigate(-1)}
    >
      <Container isAppUiV2={flags.newAppNavigation}>
        {width > 1023 && <Spacer height={24} />}
        <StyledFeaturedImageContainer>
          <ArticeMainImage
            className={`featured-img ${!!videoURL?.length && 'clickable'}`}
            src={content?.Main_Image?.filename}
            alt={content?.Main_Image?.alt}
            onClick={videoURL.length > 0 ? handleOpenPlayVideoModal : undefined}
          />

          {!!videoURL?.length && (
            <div className="relative-btn-ctr">
              <Button
                primary
                size="small"
                onClick={handleOpenPlayVideoModal}
                leftIcon={
                  <Icon
                    name="play_xs"
                    size={24}
                    color="--icon-button-neutral-alt-default"
                  />
                }
              >
                {t('noumena.home.article.watch_video')}
              </Button>
            </div>
          )}
        </StyledFeaturedImageContainer>

        {!videoURL?.length && <Spacer height={width > 1023 ? 40 : 24} />}

        <StyledArticleDetail>
          <StyledCategory>
            {capitalize(content?.Main_Category.split('_').join(' ') || '')}
          </StyledCategory>
          <TSpan
            font="heading-l-bold"
            colorToken="--text-body-neutral-highlighted"
          >
            {content?.Title}
          </TSpan>
          <Spacer isFlex height={16} />
          <TSpan font="heading-xs" colorToken="--text-body-neutral-highlighted">
            {content?.Short_Description}
          </TSpan>
          <Spacer height={16} />
          <StoryblokRichTextContainer
            content={content?.Content as StoryblokRichtext}
          />
        </StyledArticleDetail>
        <StyledBanner bgImage={bannerBackgroundImage}>
          <div className="left">
            <TSpan
              font="heading-xs-bold"
              colorToken="--text-card-header-neutral-highlighted"
            >
              {t('noumena.home.article.footer.header')}
            </TSpan>
            <Spacer isFlex height={4} />
            <TSpan
              font="body-l"
              colorToken="--text-card-brand-primary-default"
              className="description"
            >
              {t('noumena.home.article.footer.description')}
            </TSpan>
            <Spacer isFlex height={16} />
            <Button
              primary
              size="small"
              onClick={() => navigate(`/noum/${id}`)}
            >
              {t('noumena.home.article.footer.button.text')}
            </Button>
          </div>
          <div className="right">
            <StyledNoumCard
              imageUrl={profileImage}
              backgroundColor={getBgColorByNoumType(type)}
              color={getColorByNoumType(type)}
              onClick={() => navigate(`/noum/${id}`)}
            >
              <div className="cover" />
              <div className="transform-block">
                <div className="image" />
                <div className="type">{capitalize(type)}</div>
              </div>
              <div className="transform-block transform-block-50">
                <div className="name">{name}</div>
                <div className="owned-by">
                  Owned By: <b>{ownedBy}</b>
                </div>
              </div>
              <div className="followers">{followersCount} Followers</div>
            </StyledNoumCard>
          </div>
        </StyledBanner>
      </Container>
      <VideoPlayerModal
        open={showPlayVideoModal}
        onClose={handleClosePlayVideoModal}
        videoURL={videoURL}
      />
    </MoneyLayout>
  );
};

export default Articles;
