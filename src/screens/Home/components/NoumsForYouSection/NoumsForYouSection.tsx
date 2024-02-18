import { useTranslation } from 'react-i18next';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout/Stack';
import { SwiperFreeMode } from './SwiperFreeMode';
import { StyledNoumsForYouSection, StyledCardsSection } from './styles';

export default function NoumsForYouSection({
  recommendedNoumIds,
}: {
  recommendedNoumIds: string[];
}) {
  const { t } = useTranslation();
  return (
    <StyledNoumsForYouSection data-testid="noums-for-you-section-testid">
      <TSpan
        font="body-xl-bold"
        colorToken="--text-card-header-neutral-highlighted"
      >
        {t('noumena.home.recommended.noums.header')}
      </TSpan>
      <Spacer height={16} />
      <StyledCardsSection>
        <SwiperFreeMode recommendedNoumIds={recommendedNoumIds} />
      </StyledCardsSection>
    </StyledNoumsForYouSection>
  );
}
