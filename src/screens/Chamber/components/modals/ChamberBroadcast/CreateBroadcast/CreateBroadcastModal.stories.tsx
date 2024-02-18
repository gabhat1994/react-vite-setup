import { MockedProvider } from '@apollo/client/testing';
import { type Meta, type StoryFn } from '@storybook/react';
import { CreateBroadcastModal } from './CreateBroadcastModal';

export default {
  title: 'UI/ChamberBroadcast/CreateBroadcastModal',
  component: CreateBroadcastModal,
  argTypes: {
    isOpen: {
      type: 'boolean',
      defaultValue: true,
    },
    onSuccessfulCampaignCreation: {
      type: 'function',
    },
    onClose: {
      type: 'function',
    },
  },
} as Meta<typeof CreateBroadcastModal>;

const Template: StoryFn<typeof CreateBroadcastModal> = ({
  onClose,
  noumId = '',
  noumType = '',
  isOpen = true,
}) => (
  <MockedProvider mocks={[]}>
    <CreateBroadcastModal {...{ isOpen, onClose, noumId, noumType }} />
  </MockedProvider>
);

export const CreateBroadcastModalWithProps = {
  render: Template,
  args: {},
};
