import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import useEvent from '@/hooks/useEvent';
import routes from '@/constants/routes';

import { Spacer } from '@/layout/Stack';
import { type Section01 } from '../types';
import {
  StyledHowItWorksSection,
  StyledCardsSection,
  HeaderWrapper,
  ShowAllButton,
  HeaderTitle,
} from './styles';
import { SwiperFreeMode } from './SwiperFreeMode';

type HowItWorksSectionProps = {
  data: Section01 | undefined;
};

export default function HowItWorksSection({ data }: HowItWorksSectionProps) {
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
          font="body-xl-bold"
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
              name="chevron_small_right_m"
              size={24}
              color="--icon-button-brand-primary-default"
            />
          }
        >
          {t('noumena.home.show_all')}
        </ShowAllButton>
      </HeaderWrapper>
      <Spacer height={16} />
      <StyledCardsSection>
        <SwiperFreeMode articles={articles} />
      </StyledCardsSection>
    </StyledHowItWorksSection>
  ) : null;
}
