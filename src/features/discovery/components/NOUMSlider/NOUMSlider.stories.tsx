import { type Meta } from '@storybook/react';

import { client } from '@/apollo/client';
import { AuthProvider } from '@/features/auth/contexts';
import { DiscoveryCategoryEnum } from '@/components/ChamberBox/types';
import { NOUMSlider } from './NOUMSlider';
import { StoryWrapper } from './styles';

export default {
  title: 'UI/Chambers/Slider',
  component: NOUMSlider,
  argTypes: {
    description: {
      control: { type: 'text' },
    },
    category: {
      control: { type: 'text' },
    },
  },
} as Meta<typeof NOUMSlider>;

export const Primary = () => (
  <StoryWrapper>
    <AuthProvider client={client}>
      <NOUMSlider
        title="Noumena Slider"
        category={DiscoveryCategoryEnum.Recommended}
        route="discovery"
        loading={false}
        cardItems={[]}
      />
    </AuthProvider>
  </StoryWrapper>
);
