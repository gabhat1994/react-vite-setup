import { t } from 'i18next';
import { type Meta } from '@storybook/react';
import { MockedProvider } from '@apollo/client/testing';
import { useToggle } from '@/hooks/toggle';

import { Button } from '@/components/Button';
import { ReportPostModal } from './Modal';

const Component = () => {
  const [isOpen, toggle] = useToggle(false);
  return (
    <>
      <Button primary onClick={toggle}>
        {t('noumena.report')}
      </Button>
      <MockedProvider>
        {isOpen && <ReportPostModal onClose={toggle} postId="post_id" />}
      </MockedProvider>
    </>
  );
};

export default {
  title: 'UI/Chambers/Post/Report',
  component: Component,
} as Meta<typeof ReportPostModal>;

export const ReportAModal = {};
