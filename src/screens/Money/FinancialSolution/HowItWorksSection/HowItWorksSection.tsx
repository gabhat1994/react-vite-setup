import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import useEvent from '@/hooks/useEvent';
import routes from '@/constants/routes';
import { SwiperFreeMode } from './SwiperFreeMode';
import {
  StyledHowItWorksSection,
  StyledCardsSection,
  HeaderWrapper,
  ShowAllButton,
  HeaderTitle,
} from './styles';
import { type Section01 } from './types';

export type HowItWorksSectionProps = {
  data: Section01 | undefined;
  showOnlyNavigationIcons?: boolean;
  showCategory?: boolean;
};

export default function HowItWorksSection({
  data,
  showOnlyNavigationIcons = false,
  showCategory = true,
}: HowItWorksSectionProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const title = data?.Title;
  const articles = data?.Articles || [];

  const navigateToArticles = useEvent(() => {
    navigate(routes.ARTICLES);
  });

  return articles && articles?.length ? (
    <StyledHowItWorksSection data-testid="onboarding-section-testid">
      <HeaderWrapper>
        <HeaderTitle
          font="heading-xs-bold"
          colorToken="--text-card-header-neutral-highlighted"
        >
          {title}
        </HeaderTitle>
        <ShowAllButton
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
        </ShowAllButton>
      </HeaderWrapper>
      <StyledCardsSection>
        <SwiperFreeMode
          articles={articles}
          showOnlyNavigationIcons={showOnlyNavigationIcons}
          showCategory={showCategory}
        />
      </StyledCardsSection>
    </StyledHowItWorksSection>
  ) : null;
}
