import { type Meta } from '@storybook/react';
import styled from 'styled-components';
import { bodyTypography } from '@/components/Typography';
import { question1 } from './mock';
import { QuestionAnswer } from './QuestionAnswer';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 60px 0px;
  align-items: center;
  background-color: var(--bg-body-neutral-alt-highlighted);
  width: 100%;
  min-height: 100vh;
`;
const WrapperContent = styled.div`
  width: 783px;
`;

const Description = styled.span`
  display: inline-flex;
  justify-content: center;
  width: 100%;
  padding: 24px;
  text-align: center;
  color: var(--text-card-brand-primary-default);
  ${bodyTypography.bodyXLargeBold};
`;

export default {
  title: 'UI/Chambers/QuestionAnswer',
  component: QuestionAnswer,
  args: {
    question: question1,
  },
} as Meta<typeof QuestionAnswer>;

export const Example = {
  render: ({ ...args }) => (
    <Wrapper>
      <WrapperContent>
        <Description>QuestionAnswer example</Description>
        <QuestionAnswer question={question1} {...args} />
      </WrapperContent>
    </Wrapper>
  ),
};
