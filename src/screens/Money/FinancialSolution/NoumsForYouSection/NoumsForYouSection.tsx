import { useTranslation } from 'react-i18next';
import { TSpan } from '@/components/Typography';
import { SwiperFreeMode } from './SwiperFreeMode';
import {
  StyledNoumsForYouSection,
  StyledCardsSection,
  HeaderWrapper,
} from './styles';

export default function NoumsForYouSection({
  recommendedNoumIds,
  storyBlockTitle,
}: {
  recommendedNoumIds: string[];
  storyBlockTitle?: string;
}) {
  const { t } = useTranslation();
  return (
    <StyledNoumsForYouSection data-testid="noums-for-you-section-testid">
      <HeaderWrapper>
        <TSpan
          font="heading-xs-bold"
          colorToken="--text-card-header-neutral-highlighted"
        >
          {storyBlockTitle || t('noumena.home.recommended.noums.header')}
        </TSpan>
      </HeaderWrapper>
      <StyledCardsSection>
        <SwiperFreeMode recommendedNoumIds={recommendedNoumIds} />
      </StyledCardsSection>
    </StyledNoumsForYouSection>
  );
}
