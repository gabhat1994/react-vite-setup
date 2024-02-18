import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { type StoryblokRichtext } from 'storyblok-rich-text-react-renderer';
import * as Storyblok from '@/services/rest/storyblok';
import MoneyLayout from '@/layout/MoneyLayout';
import { Button } from '@/components/Button';
import { Spacer } from '@/layout';
import { TSpan } from '@/components/Typography';
import { useLaunchDarkly, useToast } from '@/hooks';
import { useGenerateTokenForCQ } from '@/features/money/hooks';
import { StoryblokRichTextContainer } from '@/components/StoryblokRichTextContainer/StoryblokRichTextContainer';
import { type Content, type ArticleDetails } from './types';
import { Container, StyledArticleDetail, ArticeMainImage } from './styles';

const MoneyArticle = () => {
  const location = useLocation();
  const { addToast } = useToast();
  const cqURl = process.env.VITE_CQ_URL;
  const slug = location?.search?.split('?slug=')[1];
  const [content, setContent] = useState<Content>();
  const generateTokenForCQ = useGenerateTokenForCQ();
  const { flags } = useLaunchDarkly();

  useEffect(() => {
    async function getContent() {
      const { data }: { data: ArticleDetails } =
        await Storyblok.getArticleDetails(slug);
      setContent(data?.story?.content);
    }
    getContent();
  }, [slug]);

  const handleNavigation = async (_slug: string) => {
    if (cqURl === content?.Main_Button_Link) {
      const { token, error } = await generateTokenForCQ();
      if (token) {
        const formedUrl: string = `${cqURl}?access_token=${token}`;
        window.open(formedUrl, '_blank');
      }
      if (error) {
        addToast('error', 'none', `${error.message}`);
      }
      return;
    }
    window.open(_slug, '_blank');
  };

  return (
    <MoneyLayout
      hideLeftMenu={true}
      backgroundColor="--bg-body-neutral-alt-default"
    >
      <Container $isAppUiV2={flags.newAppNavigation}>
        <Spacer height={24} />
        <ArticeMainImage
          src={content?.Main_Image?.filename}
          alt={content?.Main_Image?.alt}
        />
        <Spacer height={40} />
        <StyledArticleDetail $isAppUiV2={flags.newAppNavigation}>
          <TSpan
            font="heading-m-bold"
            colorToken="--text-card-header-neutral-highlighted"
          >
            {content?.Title}
          </TSpan>
          <Spacer isFlex height={16} />
          <TSpan
            font="body-l"
            colorToken="--text-card-header-neutral-highlighted"
          >
            {content?.Short_Description}
          </TSpan>
          <Spacer isFlex height={21} />
          {content?.Main_Button_Label && (
            <Button
              primary
              size="small"
              style={{ width: '100%' }}
              onClick={() => handleNavigation(content?.Main_Button_Link)}
            >
              {content?.Main_Button_Label}
            </Button>
          )}
          <Spacer height={16} />
          <StoryblokRichTextContainer
            content={content?.Content as StoryblokRichtext}
          />
          <Spacer height={32} />
          {content?.Main_Button_Label && (
            <Button
              primary
              size="small"
              style={{ width: '100%' }}
              onClick={() => handleNavigation(content?.Main_Button_Link)}
            >
              {content?.Main_Button_Label}
            </Button>
          )}
        </StyledArticleDetail>
      </Container>
    </MoneyLayout>
  );
};
export default MoneyArticle;
