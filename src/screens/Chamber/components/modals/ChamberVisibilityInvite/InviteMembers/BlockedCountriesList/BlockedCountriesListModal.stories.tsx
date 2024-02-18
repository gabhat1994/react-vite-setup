import { type Meta, type StoryFn } from '@storybook/react';
import { BlockedCountriesListModal } from './BlockedCountriesListModal';

export default {
  title: 'UI/ChamberVisibilityInvite/BlockedCountriesListModal',
  component: BlockedCountriesListModal,
  argTypes: {
    isOpen: {
      type: 'boolean',
      defaultValue: true,
    },
  },
} as Meta<typeof BlockedCountriesListModal>;

const Template: StoryFn<typeof BlockedCountriesListModal> = ({
  isOpen = true,
}) => (
  <BlockedCountriesListModal
    {...{
      isOpen,
    }}
    onClose={() => {}}
  />
);

export const ViewBroadcastModalWithProps = {
  render: Template,
};
