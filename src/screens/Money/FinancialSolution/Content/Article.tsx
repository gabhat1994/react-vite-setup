import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { t } from 'i18next';
import { Button } from '@/components/Button';
import * as Storyblok from '@/services/rest/storyblok';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import routes from '@/constants/routes';
import { useToast } from '@/hooks/toast';
import { useLaunchDarkly } from '@/hooks/launchDarkly';
import { useAuth } from '@/features/auth/contexts';
import {
  type FinancialSolution,
  type ArticleRootObject,
  type ArticleContent,
} from '../../types';
import {
  ButtonContainer,
  ArticleContainer,
  ArticleHeader,
  LoadingContainer,
  HeaderText,
  BodyTextArticle,
} from './styles';

const Article = (props: { data: FinancialSolution }) => {
  const { flags } = useLaunchDarkly();
  const { addToast } = useToast();
  const { isActive } = useAuth();
  const [content, setContent] = useState<ArticleContent | undefined>(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    const fetch = async () => {
      const { data }: { data: ArticleRootObject } =
        await Storyblok.getArticleDetails(props.data.Article.cached_url);
      setContent(data?.story?.content);
    };
    fetch();
  }, [props.data.Article.cached_url]);

  const navigateToArticleDetail = useCallback(
    (slug) => {
      navigate({
        pathname: routes.MONEY_ARTICLE,
        search: `?slug=${slug}`,
      });
    },
    [navigate],
  );

  if (!content) {
    return (
      <ArticleContainer isAppUiV2={flags.newAppNavigation}>
        <LoadingContainer>
          <Button neutral loading />
        </LoadingContainer>
      </ArticleContainer>
    );
  }
  return (
    <ArticleContainer isAppUiV2={flags.newAppNavigation}>
      <ArticleHeader>
        <Stack>
          {/* <Icon name="grow_m" size={56} />
          <Spacer width={10} /> */}
          <HeaderText>
            <TSpan
              font="body-l-bold"
              colorToken="--text-body-neutral-highlighted"
            >
              {content.Title}
            </TSpan>
          </HeaderText>
        </Stack>
      </ArticleHeader>
      <BodyTextArticle>
        <TSpan font="body-m" colorToken="--text-card-neutral-default">
          {content.Short_Description}
        </TSpan>
      </BodyTextArticle>
      <ButtonContainer>
        <Button
          secondary
          size="full_small"
          onClick={() => {
            if (isActive)
              navigateToArticleDetail(props.data.Article.cached_url);
            else
              addToast(
                'error',
                'none',
                `${t('noumena.money.setup_wallet.not.authorized')}`,
              );
          }}
        >
          {content.Main_Button_Label}
        </Button>
      </ButtonContainer>
    </ArticleContainer>
  );
};

export default Article;
