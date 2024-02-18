import { type Meta } from '@storybook/react';
import { EditChamberProvider } from '@/screens/Chamber/EditChamber/provider';
import Rearrange from './Rearrange';
import { StoryDescription, StoryWrapper, StoryWrapperContent } from './styles';

export default {
  title: 'UI/Chambers/SectionElementRearrange',
  component: Rearrange,

  argTypes: {},
} as Meta<typeof Rearrange>;

export const Example = () => (
  <StoryWrapper>
    <StoryWrapperContent>
      <StoryDescription>Sections Rearrange Example</StoryDescription>
      <EditChamberProvider>
        <Rearrange setSections={() => {}} />
      </EditChamberProvider>
    </StoryWrapperContent>
  </StoryWrapper>
);
