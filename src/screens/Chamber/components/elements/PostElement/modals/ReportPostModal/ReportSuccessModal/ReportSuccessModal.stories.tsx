import { type Meta } from '@storybook/react';
import { useToggle } from '@/hooks/toggle';

import { ReportSuccessModal } from './ReportSuccessModal';

const Component = () => {
  const [isOpen, toggle] = useToggle(true);
  return <>{isOpen && <ReportSuccessModal onClose={toggle} />}</>;
};

export default {
  title: 'UI/Chambers/Post/Report',
  component: Component,
} as Meta<typeof ReportSuccessModal>;

export const ReportSuccess = {};
