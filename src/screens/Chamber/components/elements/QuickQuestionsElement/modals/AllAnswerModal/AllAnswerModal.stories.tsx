import { useState } from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { client } from '@/apollo/client';
import { AuthProvider } from '@/features/auth/contexts';
import { type AnswerOutput } from '@/apollo/generated/types';
import AllAnswerModal from './AllAnswerModal';

export const AllAnswerStory = () => {
  const [isOpenAllAnswerModal, setIsOpenAllAnswerModal] = useState(true);

  const handleCloseAllAnswerModal = () => setIsOpenAllAnswerModal(false);

  const answers: AnswerOutput[] = [
    {
      body: 'Yes, I use the 4K HDR mode when I want to record the highest quality footage. It covers all my requirements. It allows me to do my job quickly.',
      createdAt: '2022-07-04T06:14:32.060Z',
      user: {
        _id: '',
        firstName: 'Test',
        lastName: 'Name',
        profile: {
          profilePictureThumbnail: '',
        },
      },
    },
    {
      body: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.',
      createdAt: '2022-07-03T06:14:32.060Z',
      user: {
        _id: '',
        firstName: 'First',
        lastName: 'Name',
        createdAt: '10h ago',
        profile: {
          profilePictureThumbnail: '',
        },
      },
    },
  ];

  return (
    <MockedProvider>
      <AuthProvider client={client}>
        <AllAnswerModal
          isOpen={isOpenAllAnswerModal}
          onClose={handleCloseAllAnswerModal}
          question={{
            _id: '1',
            spaceId: { _id: '123' },
            body: 'test',
            answers,
          }}
        />
      </AuthProvider>
    </MockedProvider>
  );
};

export default {
  title: 'UI/Chambers/AllAnswer',
  component: AllAnswerModal,
};
