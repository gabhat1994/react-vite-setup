import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import {
  cleanup,
  type queries,
  render,
  type RenderResult,
  screen,
  act,
} from '@/test-utils';
import { client } from '@/apollo/client';
import { AuthProvider } from '@/features/auth/contexts';
import { GetOnboardingQuestionAndAnswersDocument } from '@/apollo/graphql';
import OnboardingQuestions from '.';
import { questionsMock } from './data';

const user = {
  _id: 'someId',
};

const getOnboardingQuestionAndAnswersMock = {
  request: {
    query: GetOnboardingQuestionAndAnswersDocument,
    variables: {},
  },
  result: () => ({
    data: {
      getOnboardingQuestionAndAnswers: questionsMock,
    },
  }),
};

const mocks = (): MockedResponse[] => [getOnboardingQuestionAndAnswersMock];

describe('OnboardingQuestions', () => {
  let mocked: RenderResult<typeof queries, HTMLElement, HTMLElement>;
  beforeEach(async () => {
    await act(async () => {
      mocked = render(
        <BrowserRouter>
          <MockedProvider addTypename={false} mocks={mocks()}>
            <AuthProvider client={client} initialUser={user}>
              <OnboardingQuestions />
            </AuthProvider>
          </MockedProvider>
        </BrowserRouter>,
      );
    });
  });

  afterEach(() => {
    cleanup();
  });

  test('Testing for rendering', async () => {
    const { container, getByTestId } = mocked;
    expect(container).toBeTruthy();
    const onboardingQuestionsForm = getByTestId(
      'onboardingQuestionsFormContainer',
    );
    expect(onboardingQuestionsForm).toBeInTheDocument();
    await screen.findByText('Your business, your way');
  });
});
