import { QueryClient, QueryClientProvider } from 'react-query';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import { render } from '@/test-utils';
import QuickQuestionsElement from './QuickQuestionsElement';
import { type QuickQuestionsElementProps } from './types';
import {
  AddFirstQuestionButtonTestId,
  NoQuestionsAddedYetTextTestId,
  NoQuestionsIconTestId,
  QuickQuestionsCollapseButtonTestId,
  QuickQuestionsEditWrapperTestId,
  QuickQuestionsWrapperTestId,
} from './testIds';

const spaceId = '';
const element = {
  __typename: undefined,
  _id: undefined,
};
const queryClient = new QueryClient();

describe('<QuickQuestionsElement />', () => {
  const setup = (props: QuickQuestionsElementProps) =>
    render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <QueryClientProvider client={queryClient}>
          <QuickQuestionsElement {...props}>
            <>content</>
          </QuickQuestionsElement>
        </QueryClientProvider>
      </ApolloProvider>,
    );

  test('should render correctly in view mode', () => {
    const props = {
      spaceId,
      element,
    };

    const { container, queryByTestId } = setup(props);

    expect(queryByTestId(QuickQuestionsWrapperTestId)).not.toBeInTheDocument();
    expect(
      queryByTestId(NoQuestionsAddedYetTextTestId),
    ).not.toBeInTheDocument();
    expect(container).toBeTruthy();
  });

  test('collapsing should work correctly', () => {
    const props = {
      spaceId,
      element,
    };

    const { queryByTestId } = setup(props);

    expect(queryByTestId(NoQuestionsIconTestId)).not.toBeInTheDocument();
    expect(queryByTestId(AddFirstQuestionButtonTestId)).not.toBeInTheDocument();

    queryByTestId(QuickQuestionsCollapseButtonTestId)?.click();

    expect(queryByTestId(QuickQuestionsWrapperTestId)).not.toBeInTheDocument();
    expect(
      queryByTestId(NoQuestionsAddedYetTextTestId),
    ).not.toBeInTheDocument();
    expect(queryByTestId(AddFirstQuestionButtonTestId)).not.toBeInTheDocument();
  });

  test('should render correctly in edit mode', () => {
    const props = {
      spaceId,
      element,
      isEditing: true,
    };

    const { container, getByTestId } = setup(props);

    expect(getByTestId(QuickQuestionsEditWrapperTestId)).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});
