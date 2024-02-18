import { type Meta } from '@storybook/react';
import { t } from 'i18next';
import { useCallback } from 'react';
import { Button } from '@/components/Button';
import { useToggle } from '@/hooks/toggle';

import { useToast } from '@/hooks';
import { QuestionModal } from './QuestionModal';

const Component = () => {
  const [isOpen, toggle] = useToggle(false);
  const { addToast } = useToast();

  const handleDelete = useCallback(() => {
    addToast(
      'primary',
      'none',
      t('noumena.quick_questions.modal.delete_success'),
    );
    toggle();
  }, [addToast, toggle]);

  return (
    <>
      <Button primary onClick={toggle}>
        Delete a Question
      </Button>
      {isOpen && (
        <QuestionModal
          onConfirm={handleDelete}
          onClose={toggle}
          questionId="spaceId"
          isOpenModal={isOpen}
        />
      )}
    </>
  );
};

export default {
  title: 'UI/Chambers/QuickQuestions/QuestionModal',
  component: Component,
} as Meta<typeof QuestionModal>;

export const QuestionModalStory = {};
