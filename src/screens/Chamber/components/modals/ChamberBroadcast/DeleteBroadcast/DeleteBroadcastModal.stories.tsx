import { MockedProvider } from '@apollo/client/testing';
import { type Meta, type StoryFn } from '@storybook/react';
import { DeleteChamberBroadcastModal } from './DeleteBroadcastModal';

export default {
  title: 'UI/ChamberBroadcast/DeleteBroadcastModal',
  component: DeleteChamberBroadcastModal,
  argTypes: {
    isOpen: {
      type: 'boolean',
      defaultValue: true,
    },
    campaignId: {
      type: 'string',
      defaultValue: '',
    },
    onRefetchCampaigns: {
      type: 'function',
    },
    onClose: {
      type: 'function',
    },
  },
} as Meta<typeof DeleteChamberBroadcastModal>;

const Template: StoryFn<typeof DeleteChamberBroadcastModal> = ({
  onClose,
  campaignId,
  onRefetchCampaigns,
  isOpen = true,
}) => (
  <MockedProvider mocks={[]}>
    <DeleteChamberBroadcastModal
      {...{ isOpen, campaignId, onRefetchCampaigns, onClose }}
    />
  </MockedProvider>
);

export const DeleteChamberBroadcastModalWithProps = {
  render: Template,
  args: {},
};
