import { type Meta } from '@storybook/react';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';
import { ToastProvider } from '@/providers';
import LightBox from './index';
import { type LightBoxProps } from './types';

const url =
  'https://noumena-img.s3-accelerate.amazonaws.com/Group 1.TZW5HgkP.png';

export default {
  title: 'Atoms/LightBox',
  component: LightBox,

  args: {
    isOpen: false,
    handleClose: () => {},
    url,
  },

  argTypes: {
    handleClose: {
      table: {
        disable: true,
      },
    },
    isOpen: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof LightBox>;

const PrimaryWithHooks = ({ ...args }: LightBoxProps) => {
  const [isOpen, toggle] = useToggle(false);

  return (
    <>
      <Button primary onClick={toggle}>
        Toggle
      </Button>
      <ToastProvider>
        <LightBox {...args} isOpen={isOpen} handleClose={toggle} />
      </ToastProvider>
    </>
  );
};
export const Primary = {
  render: PrimaryWithHooks,
};
