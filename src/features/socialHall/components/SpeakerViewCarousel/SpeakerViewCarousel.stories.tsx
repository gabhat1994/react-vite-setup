import { type Meta } from '@storybook/react';
import { useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import { StoryWrapper } from './styles';
import { SpeakerViewCarousel } from './SpeakerViewCarousel';
import { type SpeakerViewCarouselProps } from './types';
import { AttendeeDummyData } from './data';

export default {
  title: 'UI/SocialHall/SpeakerViewCarousel',
  component: SpeakerViewCarousel,
  argTypes: {
    totalCount: {
      defaultValue: 5,
      control: { type: 'number', min: 1, step: 1 },
    },
  },
} as Meta<typeof SpeakerViewCarousel>;

const SpeakerViewCarouselWithHooks = (props: SpeakerViewCarouselProps) => {
  const { width } = useWindowDimensions();
  const isTablet =
    width < breakpoints.TABLET_L && width > breakpoints.MOBILE_MAX;
  const isMobile = width < breakpoints.MOBILE_MAX;

  return (
    <StoryWrapper>
      <SpeakerViewCarousel
        {...props}
        maxVideoPerPage={isMobile ? 1 : isTablet ? 3 : 5}
        userFeeds={AttendeeDummyData}
      />
    </StoryWrapper>
  );
};

export const SpeakerViewSlider = {
  render: SpeakerViewCarouselWithHooks,
};
