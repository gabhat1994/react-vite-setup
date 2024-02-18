import { type Meta, type StoryFn } from '@storybook/react';
import { MediaPreview } from './MediaPreview';

export default {
  title: 'SocialHall/MediaPreview',
  argTypes: {} as Meta<typeof MediaPreview>,
};

const Template: StoryFn<typeof MediaPreview> = (props) => (
  <MediaPreview {...props} />
);

export const Primary = {
  render: Template,

  args: {
    _id: '60e8051f986d605182c85af7',
    firstName: 'Ravi',
    lastName: 'Sha',
    title: null,
    bio: 'FE Dev',
    profile: {
      profilePicture:
        'https://noumena-img.s3-accelerate.amazonaws.com/60e8051f986d605182c85af7/profile/mrrYRf6ulLCC4eK9DoODx',
      profilePictureThumbnail:
        'https://noumena-img.s3-accelerate.amazonaws.com/60e8051f986d605182c85af7/profile/60e8051f986d605182c85af7-1632394671274-thumbnail.png',
    },
  },
};
