import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout/Stack';
import { useWindowDimensions } from '@/hooks/dimensions';
import { type Section01 } from '../types';
import {
  StyledOnboardingEventsSection,
  StyledHeader,
  StyledDescription,
} from './styles';

type OnboardingEventsSectionProps = {
  data: Section01 | undefined;
};

export default function OnboardingEventsSection(
  props: OnboardingEventsSectionProps,
) {
  const { data } = props;
  const title1 = data?.Title;
  const description = data?.Description;
  const { width } = useWindowDimensions();

  return (
    <StyledOnboardingEventsSection data-testid="noum-onboarding-section-testid">
      <StyledHeader>
        <TSpan
          font={width < 768 ? 'heading-xs-bold' : 'heading-s-bold'}
          colorToken="--text-card-header-neutral-alt-default"
        >
          {title1}
        </TSpan>
      </StyledHeader>
      <Spacer height={8} />
      <StyledDescription
        font="body-l"
        colorToken="--text-card-brand-secondary-default"
      >
        {description}
      </StyledDescription>
    </StyledOnboardingEventsSection>
  );
}
