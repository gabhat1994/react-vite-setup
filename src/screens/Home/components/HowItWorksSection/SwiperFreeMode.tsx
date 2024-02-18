import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { capitalize } from 'lodash';
import { useTranslation } from 'react-i18next';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import type SwiperCore from 'swiper';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/Button';
import { getArticleDetails } from '@/services/rest/storyblok';
import routes from '@/constants/routes';
import useEvent from '@/hooks/useEvent';
import { useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { type InputListTypes } from '@/components/Tabs/types';
import { type Article } from '../types';
import { type SettledPromise, type Story } from './types';
import { StyledSwiperControls, StyledCard } from './styles';

type SwiperFreeModeProps = {
  articles: Article[];
};

const tagsList: InputListTypes[] = [
  {
    name: 'test1',
    image: 'terms_m',
    text: 'Knowledge Base',
    labelSize: 'auto',
  },
];

export const SwiperFreeMode: React.FC<SwiperFreeModeProps> = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [disablePrevBtn, setDisablePrevBtn] = useState(true);
  const [disableNextBtn, setDisableNextBtn] = useState(false);
  const { articles } = props;
  const [fetchedArticles, setFetchedArticles] = useState<Story[]>([]);
  const [swiper, setSwiper] = useState<SwiperCore>();
  const [selectedTab, setSelectedTab] = useState(0);

  const { width } = useWindowDimensions();

  let slidesPerView = 3;
  if (width < breakpoints.MOBILE_L) {
    slidesPerView = 1.25;
  } else if (width < breakpoints.TABLET) {
    slidesPerView = 2.25;
  } else if (width < breakpoints.LAPTOP) {
    slidesPerView = 3;
  } else if (width < breakpoints.LAPTOP_SM) {
    slidesPerView = 2.25;
  }

  useEffect(() => {
    const fetchArticles = async () => {
      const settledPromises: unknown[] = await Promise.allSettled(
        articles?.map(async (article) =>
          getArticleDetails(article?.Link?.cached_url),
        ) || [],
      );
      const fetchedArticlesRes = settledPromises?.map((promise) => {
        const item = promise as SettledPromise;
        return item?.value?.data?.story || null;
      });
      setFetchedArticles([...fetchedArticlesRes]);
    };
    fetchArticles();
  }, [articles]);

  const navigateToArticles = useEvent(() => {
    navigate(routes.ARTICLES);
  });

  const prevSlide = useEvent(() => {
    if (swiper && !swiper.destroyed) {
      swiper.slidePrev();
      setDisableNextBtn(false);
    }
  });

  const nextSlide = useEvent(() => {
    if (swiper && !swiper.destroyed) {
      swiper.slideNext();
      setDisablePrevBtn(false);
    }
  });

  const onTabChange = (value: string) => {
    setSelectedTab(Number(value));
  };

  return (
    <>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={16}
        freeMode={true}
        className="mySwiper"
        onInit={(swiperInstance) => setSwiper(swiperInstance)}
        onReachBeginning={() => setDisablePrevBtn(true)}
        onReachEnd={() => {
          const progress = swiper?.progress || 0;
          if (progress > 0.5) setDisableNextBtn(true);
        }}
      >
        <StyledSwiperControls>
          <BasicChipsTabsForm
            onChange={onTabChange}
            selectedId={selectedTab.toString()}
            mode="isBackground"
            isWithoutImage
            inputList={tagsList}
            fontSize="--font-link-medium-size"
          />
          <div className="swiper-icons">
            {fetchedArticles?.length > slidesPerView && (
              <>
                <Icon
                  className={`swiper-control-btn ${
                    disablePrevBtn ? 'disabled' : ''
                  }`}
                  name="chevron_left_m"
                  size={16}
                  color={
                    disablePrevBtn
                      ? '--icon-button-neutral-disabled'
                      : '--icon-button-neutral-default'
                  }
                  onClick={prevSlide}
                />
                <Icon
                  className={`swiper-control-btn ${
                    disableNextBtn ? 'disabled' : ''
                  }`}
                  name="chevron_right_m"
                  size={16}
                  color={
                    disableNextBtn
                      ? '--icon-button-neutral-disabled'
                      : '--icon-button-neutral-default'
                  }
                  onClick={nextSlide}
                />
              </>
            )}
            <Button
              className="show-all"
              textOnly
              onClick={navigateToArticles}
              rightIcon={
                <Icon
                  name="chevron_right_m"
                  size={16}
                  color="--icon-button-brand-primary-default"
                />
              }
            >
              {t('noumena.home.show_all')}
            </Button>
          </div>
        </StyledSwiperControls>

        {fetchedArticles?.map((article, index) => {
          const { id, content, full_slug: slug } = article;
          const imageUrl = content?.Main_Image?.filename;
          const title = content?.Title;
          const description = content?.Short_Description;
          const type = capitalize(
            content?.Main_Category.split('_').join(' ') || '',
          );
          return (
            <SwiperSlide key={`${index + 0}-${id}`}>
              <StyledCard
                imageUrl={imageUrl}
                onClick={() => {
                  navigate({
                    pathname: routes.ARTICLE,
                    search: `?slug=${slug}`,
                  });
                }}
              >
                <div className="article-image" />
                <div className="article-details">
                  <div className="type">{type}</div>
                  <div className="title">{title}</div>
                  <div className="content">{description}</div>
                </div>
              </StyledCard>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};
