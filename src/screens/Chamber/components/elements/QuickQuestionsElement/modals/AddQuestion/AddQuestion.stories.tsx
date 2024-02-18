import { useState } from 'react';
import { client } from '@/apollo/client';
import { AuthProvider } from '@/features/auth/contexts';
import { AddQuestionModal } from './AddQuestionModal';

export const AddQuestionStories = () => {
  const [isOpenAddQuestionModal, setIsOpenAddQuestionModal] = useState(true);

  const handleCloseAddQuestionModal = () => setIsOpenAddQuestionModal(false);
  return (
    <AuthProvider client={client}>
      <AddQuestionModal
        isOpen={isOpenAddQuestionModal}
        onClose={handleCloseAddQuestionModal}
        spaceId=""
      />
    </AuthProvider>
  );
};

export default {
  title: 'UI/Chambers/AddQuestion',
  component: AddQuestionStories,
};
