import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { cleanup, render, act, resizeWindow } from '@/test-utils';
import { type SideMenuItemProps } from './SideMenuItem/types';
import { SideMenu } from './SideMenu';
import { defaultNavItems } from './mock';

const inputList: SideMenuItemProps[] = defaultNavItems;

describe('SideMenu', () => {
  afterEach(() => {
    cleanup();
  });
  it('should change orientation, styles according to the window size', () => {
    const handleOnChange = vi.fn();
    const { container, getByTestId } = render(
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <BrowserRouter>
          <SideMenu
            navItems={inputList}
            onNavChange={handleOnChange}
            isUserPending={false}
          />
        </BrowserRouter>
      </ApolloProvider>,
    );
    const stack = getByTestId('stack');

    expect(container).toBeTruthy();

    act(() => {
      resizeWindow(320, 561); // resize to mobile
    });
    act(() => {
      resizeWindow(769, 700); // resize to tablet
    });
    act(() => {
      resizeWindow(1024, 900); // resize to Desktop
    });
    expect(stack).toHaveStyle(`
        flex-direction: column;
        `);
  });
});
