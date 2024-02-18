import styled from 'styled-components';
import { type Meta } from '@storybook/react';

import { AuthProvider } from '@/features/auth/contexts';
import { client } from '@/apollo/client';
import Answer, { type AnswerProps, AnswerElementType } from '.';
import { variousAnswers } from './mock';
import { TSpan } from '../../../../../../../components/Typography';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  max-width: 680px;
  margin: 0 auto;
`;

const AnswerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const titles = [
  'No tipe',
  'Tipped by me',
  'Tipped by me and others',
  'Tipped by other',
  'Tipped by others',
];

export default {
  title: 'UI/Chambers/QuestionAnswer/Answer',
  component: Answer,
  argTypes: {
    type: {
      options: [
        AnswerElementType.ALL_ANSWERS_MODAL,
        AnswerElementType.MY_TIPS,
        AnswerElementType.MY_ANSWERS,
      ],
      defaultValue: [AnswerElementType.ALL_ANSWERS_MODAL],
      control: { type: 'radio' },
    },
  },
} as Meta<typeof Answer>;

export const Primary = {
  render: (props: AnswerProps) => (
    <AuthProvider
      client={client}
      initialUser={{ _id: '6232f2aefd028201aff18b43' }}
    >
      <Wrapper>
        {variousAnswers.map((answer, i) => (
          <AnswerWrapper>
            <TSpan font="body-m" colorToken="--text-body-neutral-defaul">
              {titles[i]}
            </TSpan>
            <Answer {...props} answer={answer} key={answer._id} />
          </AnswerWrapper>
        ))}
      </Wrapper>
    </AuthProvider>
  ),
};
