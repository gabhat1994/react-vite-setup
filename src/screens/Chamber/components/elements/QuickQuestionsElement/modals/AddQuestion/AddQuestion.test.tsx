import { act } from 'react-dom/test-utils';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { cleanup, render } from '@/test-utils';
import { AddQuestionModal } from './AddQuestionModal';

describe('<AddQuestion />', () => {
  afterEach(() => {
    cleanup();
  });

  const handleOnClick = vi.fn();
  test('check component is trusthy', () => {
    const { container } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <AddQuestionModal
          onClose={handleOnClick}
          isOpen
          spaceId=""
          refetch={vi.fn()}
        />
      </ApolloProvider>,
    );

    expect(container).toBeTruthy();
  });

  test(`testing basic text area's container styling`, () => {
    const { getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <AddQuestionModal
          onClose={handleOnClick}
          isOpen
          spaceId=""
          refetch={vi.fn()}
        />
      </ApolloProvider>,
    );
    const StyledTextAreaEle = getByTestId('Styled-TextArea');
    expect(StyledTextAreaEle).toHaveStyle(`
      position: relative;
      background-color: var(--bg-input-neutral-default);
      border-radius: 8px;
      font-family: var(--font-input-medium-regular-font);
      position: relative;
      width: 100%;
    `);
  });

  test('render date picker component ', () => {
    const { getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <AddQuestionModal
          onClose={handleOnClick}
          isOpen
          spaceId=""
          refetch={vi.fn()}
        />
      </ApolloProvider>,
    );
    expect(getByTestId('date-picker')).toBeInTheDocument();
  });

  test('clicking the date field should switch showing popup calendar element', () => {
    const { queryByTestId, getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <AddQuestionModal
          onClose={handleOnClick}
          isOpen
          spaceId=""
          refetch={vi.fn()}
        />
      </ApolloProvider>,
    );
    expect(queryByTestId('date-picker-calendar-testid')).toBeNull();
    const dateFieldElement = getByTestId('date-picker-date-field');
    act(() => {
      dateFieldElement.click();
    });
    const calendarElement = getByTestId('date-picker-calendar-testid');
    expect(calendarElement).toBeInTheDocument();
    act(() => {
      dateFieldElement.click();
    });
    expect(queryByTestId('date-picker-calendar-testid')).toBeNull();
  });
});
