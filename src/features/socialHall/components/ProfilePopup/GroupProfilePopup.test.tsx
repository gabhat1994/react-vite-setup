import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from '@/test-utils';
import { GroupProfilePopup } from './GroupProfilePopup';

describe('<GroupProfilePopup />', () => {
  test(`check group popup rendered enough or not`, () => {
    const onCloseGroupPopup = vi.fn();
    const { container, getByTestId } = render(
      <BrowserRouter>
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <GroupProfilePopup
            showGroupPopup={true}
            groupId=""
            onCloseGroupPopup={onCloseGroupPopup}
          />
        </ApolloProvider>
      </BrowserRouter>,
    );
    const GroupProfilePopupWrapper = getByTestId('item_wrapper');
    expect(GroupProfilePopupWrapper).toHaveStyle(`
      display: flex;
      flex-direction: column;
      padding: 0 24px 20px;
      box-sizing: border-box;
      background-color: var(--bg-tablecell-neutral-alt-default);
      border-radius: 16px;
      width: 100%;
    `);

    expect(getByTestId('members_count')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });

  test(`check group popup join button works or not`, () => {
    const onCloseGroupPopup = vi.fn();
    const { container, getByTestId } = render(
      <BrowserRouter>
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <GroupProfilePopup
            showGroupPopup={true}
            groupId=""
            onCloseGroupPopup={onCloseGroupPopup}
          />
        </ApolloProvider>
      </BrowserRouter>,
    );

    expect(getByTestId('join_button')).toBeInTheDocument();
    fireEvent.click(getByTestId('join_button'));
    expect(container).toBeTruthy();
  });
});
