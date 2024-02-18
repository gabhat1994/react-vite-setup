import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@/test-utils';
import { QuestionAnswer } from './index';
import { question1, question2 } from './mock';

describe('<QuestionAnswer />', () => {
  const argOne = {
    question: question1,
    refetch: vi.fn(),
    isCollapse: true,
  };
  const argTwo = {
    question: question2,
    isOwner: true,
    refetch: vi.fn(),
    isCollapse: false,
  };
  const argThree = {
    question: question1,
    isOwner: true,
    isCollapse: true,
    refetch: vi.fn(),
  };
  const argFour = {
    question: question2,
    isCollapse: false,
    refetch: vi.fn(),
  };
  test(`testing basic QuestionAnswer's container styling`, () => {
    const { container, getByTestId } = render(
      <MemoryRouter>
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <QuestionAnswer {...argThree} />
        </ApolloProvider>
      </MemoryRouter>,
    );
    const StyledQuestionAnswerEle = getByTestId('tQuestionAnswer');
    expect(StyledQuestionAnswerEle).toHaveStyle(`
      position: relative;
      transition: all 0.1s ease-in-out;
      display: flex;
      flex-direction: column;
      border: 1px solid var(--border-card-neutral-highlighted);
      border-radius: 8px;
      background: var(--bg-card-neutral-alt-default);
      padding: 16px;
      vertical-align: middle;
      overflow: hidden;
    `);

    expect(container).toBeTruthy();
  });

  test('render when element is collapse', () => {
    const { container, getByTestId, queryByTestId } = render(
      <MemoryRouter>
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <QuestionAnswer {...argOne} />
        </ApolloProvider>
      </MemoryRouter>,
    );
    const imageNotCollapsed = queryByTestId('tQINotCollapsed');
    const imageCollapsed = getByTestId('tQuestionImage');
    expect(imageNotCollapsed).not.toBeInTheDocument();
    expect(imageCollapsed).toBeInTheDocument();

    expect(container).toBeTruthy();
  });

  test('render when element is not collapse', () => {
    const { container, queryByTestId } = render(
      <MemoryRouter>
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <QuestionAnswer {...argTwo} />
        </ApolloProvider>
      </MemoryRouter>,
    );
    const imageCollapsed = queryByTestId('tQuestionImage');
    expect(imageCollapsed).not.toBeInTheDocument();

    expect(container).toBeTruthy();
  });

  test('render when element is collapse and question image is not available', () => {
    const { container, queryByTestId } = render(
      <MemoryRouter>
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <QuestionAnswer {...argThree} />
        </ApolloProvider>
      </MemoryRouter>,
    );
    const imageNotCollapsed = queryByTestId('tQINotCollapsed');
    const imageCollapsed = queryByTestId('tQuestionImage');
    expect(imageNotCollapsed).not.toBeInTheDocument();
    expect(imageCollapsed).toBeInTheDocument();

    expect(container).toBeTruthy();
  });

  test('render when element is not collapse and question image is not available', () => {
    const { container, queryByTestId } = render(
      <MemoryRouter>
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <QuestionAnswer {...argFour} />
        </ApolloProvider>
      </MemoryRouter>,
    );
    const imageNotCollapsed = queryByTestId('tQINotCollapsed');
    const imageCollapsed = queryByTestId('tQuestionImage');
    expect(imageNotCollapsed).not.toBeInTheDocument();
    expect(imageCollapsed).not.toBeInTheDocument();

    expect(container).toBeTruthy();
  });
});
