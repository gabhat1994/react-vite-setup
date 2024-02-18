import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { capitalize, chunk } from 'lodash';
import { useTranslation } from 'react-i18next';
import * as Storyblok from '@/services/rest/storyblok';
import ListLayout from '@/layout/ListLayout';
import { Tag } from '@/components/Tag';
import {
  type SettledPromise,
  type Story,
} from '@/screens/Home/components/HowItWorksSection/types';
import { Icon } from '@/components/Icon';
import routes from '@/constants/routes';
import { useLaunchDarkly, useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import useEvent from '@/hooks/useEvent';
import { Button } from '@/components/Button';
import { type Content, type ArticleDetails, type Article } from './types';
import {
  Container,
  StyledAllArticles,
  StyledArticlesGrid,
  StyledHeader,
  StyledTagsSection,
  StyledCard,
} from './styles';

const Articles = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const { flags } = useLaunchDarkly();
  const [content, setContent] = useState<Content>();
  const [fetchedArticles, setFetchedArticles] = useState<Story[][]>([]);

  useEffect(() => {
    async function getContent() {
      const { data }: { data: ArticleDetails } =
        await Storyblok.getHomePageMainPageLayout();
      setContent(data?.story?.content);
    }
    getContent();
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      const articles: Article[] | undefined = content?.Section_02[1]?.Articles;
      const settledPromises: unknown[] = await Promise.allSettled(
        articles?.map(async (article) =>
          Storyblok.getArticleDetails(article?.Link?.cached_url),
        ) || [],
      );
      const fetchedArticlesRes = settledPromises?.map((promise) => {
        const item = promise as SettledPromise;
        return item?.value?.data?.story || null;
      });

      const tempArticles = [...fetchedArticlesRes];
      const chunks = chunk(tempArticles, 14);
      setFetchedArticles(chunks);
    };
    fetchArticles();
  }, [content]);

  const tags = [
    { id: 1, text: 'Knowledge Base', type: 'secondary' },
    // { id: 2, text: 'Knowledge Base', type: 'secondary' },
  ];

  const navigateToArticleDetail = useEvent((slug) => {
    navigate({
      pathname: routes.ARTICLE,
      search: `?slug=${slug}`,
    });
  });

  return (
    <ListLayout type="Articles">
      {width < breakpoints.TABLET && (
        <StyledTagsSection>
          <StyledHeader>
            {t('noumena.home.articles.knowledge_base')}
          </StyledHeader>
          <div className="tags">
            {tags.map((tag) => (
              <Tag key={tag.id} secondary={tag.type === 'secondary'}>
                {tag.text}
              </Tag>
            ))}
          </div>
        </StyledTagsSection>
      )}
      <Container $isAppUiV2={flags.newAppNavigation}>
        <StyledAllArticles data-testid="articles">
          {width >= breakpoints.TABLET && (
            <StyledHeader>
              {t('noumena.home.articles.knowledge_base')}
            </StyledHeader>
          )}
          {width >= breakpoints.TABLET && (
            <StyledTagsSection>
              <div className="tags">
                {tags.map((tag) => (
                  <Tag key={tag.id} secondary={tag.type === 'secondary'}>
                    {tag.text}
                  </Tag>
                ))}
              </div>
            </StyledTagsSection>
          )}
          {fetchedArticles?.map((articles, i) => (
            <StyledArticlesGrid key={`${i + 0}`}>
              {articles?.map((article, index) => {
                let variable = 0;
                if (width >= breakpoints.LAPTOP) {
                  variable = 9;
                } else if (
                  width < breakpoints.LAPTOP &&
                  width >= breakpoints.TABLET
                ) {
                  variable = 7;
                } else if (width < breakpoints.TABLET) {
                  variable = 0;
                }
                const featured = index % variable === 0;
                const {
                  id,
                  content: articleContent,
                  full_slug: slug,
                } = article;
                const imageUrl = articleContent?.Main_Image?.filename;
                const title = articleContent?.Title;
                const description = articleContent?.Short_Description;
                const type = capitalize(
                  articleContent?.Main_Category.split('_').join(' ') || '',
                );

                return (
                  <StyledCard
                    imageUrl={imageUrl}
                    key={id}
                    className={`StyledCard ${featured ? 'featured' : ''}`}
                    onClick={() => navigateToArticleDetail(slug)}
                  >
                    <div className="article-image" />
                    <div className="article-details">
                      <div className="type">{type}</div>
                      <div className="title">{title}</div>
                      <div className="content">{description}</div>
                      {!!featured && (
                        <Button
                          className="link"
                          textOnly
                          onClick={() => navigateToArticleDetail(slug)}
                          rightIcon={
                            <Icon
                              name="chevron_small_right_m"
                              size={24}
                              color="--icon-button-brand-primary-default"
                            />
                          }
                        >
                          {t('noumena.home.articles.read_full_article')}
                        </Button>
                      )}
                    </div>
                  </StyledCard>
                );
              })}
            </StyledArticlesGrid>
          ))}
        </StyledAllArticles>
      </Container>
    </ListLayout>
  );
};

export default Articles;
