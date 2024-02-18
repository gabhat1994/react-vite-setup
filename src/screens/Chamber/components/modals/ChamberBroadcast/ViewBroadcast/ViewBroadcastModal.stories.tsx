import { type Meta, type StoryFn } from '@storybook/react';
import { ViewBroadcastModal } from './ViewBroadcastModal';

export default {
  title: 'UI/ChamberBroadcast/ViewBroadcastModal',
  component: ViewBroadcastModal,
  argTypes: {
    isOpen: {
      type: 'boolean',
      defaultValue: true,
    },
  },
} as Meta<typeof ViewBroadcastModal>;

const Template: StoryFn<typeof ViewBroadcastModal> = ({
  onCampaign,
  spaceId,
  isOpen = true,
}) => (
  <ViewBroadcastModal
    {...{
      isOpen,
      onCampaign,
      spaceId,
    }}
    onClose={() => {}}
  />
);

export const ViewBroadcastModalWithProps = {
  render: Template,

  args: {},
};
