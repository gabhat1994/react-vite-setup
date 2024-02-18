import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { cleanup, render, fireEvent, act, waitFor } from '@/test-utils';
import { type SideMenuItemProps } from './types';
import { disabledNavItems } from '../mock';
import { SideMenu } from '../SideMenu';

const inputList: SideMenuItemProps[] = disabledNavItems;

describe('SideMenuItem', () => {
  afterEach(() => {
    cleanup();
  });
  it('check styles and onChange Actions', async () => {
    const handleOnChange = vi.fn();
    const { container, getByTestId, getAllByTestId } = render(
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
    const navItems = getAllByTestId('Side-Menu-Item');
    const navIcons = getAllByTestId('Nav-icon');

    expect(container).toBeTruthy();
    expect(stack).toHaveStyle(`
      flex-direction: column;
    `);
    expect(navItems.length).toBe(5);
    expect(navIcons.length).toBe(7);

    act(() => {
      fireEvent.click(navItems[0]);
    });
    act(() => {
      fireEvent.click(navItems[2]);
    });
    await waitFor(() => {
      expect(handleOnChange).toHaveBeenCalledTimes(2);
    });
  });
});
