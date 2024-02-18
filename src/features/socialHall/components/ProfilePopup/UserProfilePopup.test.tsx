import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render } from '@/test-utils';
import { UserProfilePopup } from './UserProfilePopup';

describe('<UserProfilePopup />', () => {
  test(`check user popup rendered enough or not`, () => {
    const onCloseUserPopup = () => vi.fn();
    const { container, getByTestId } = render(
      <BrowserRouter>
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <UserProfilePopup
            onCloseUserPopup={onCloseUserPopup}
            showKnockBtn={true}
            attendeeId=""
            showUserPopup={true}
          />
        </ApolloProvider>
      </BrowserRouter>,
    );
    const UserProfilePopupWrapper = getByTestId('item_wrapper');
    expect(UserProfilePopupWrapper).toHaveStyle(`
      display: flex;
      flex-direction: column;
      padding: 0 24px 20px;
      box-sizing: border-box;
      background-color: var(--bg-tablecell-neutral-alt-default);
      border-radius: 16px;
      width: 100%;
    `);

    expect(getByTestId('avatar_wrapper')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});
