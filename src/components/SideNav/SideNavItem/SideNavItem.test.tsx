import { BrowserRouter } from 'react-router-dom';
import { cleanup, render, fireEvent, act, waitFor } from '@/test-utils';
import { type SideNavItemProps } from './types';
import { disabledNavItems } from '../mock';
import { SideNav } from '../SideNav';

const inputList: SideNavItemProps[] = disabledNavItems;

describe('SideNavItem', () => {
  afterEach(() => {
    cleanup();
  });
  it('check styles and onChange Actions', async () => {
    const handleOnChange = vi.fn();
    const { container, getAllByTestId } = render(
      <BrowserRouter>
        <SideNav
          navItems={inputList}
          onNavChange={handleOnChange}
          activeNavValue={inputList[1].value}
        />
      </BrowserRouter>,
    );

    const navItems = getAllByTestId('Side-Nav-Item');
    const navIcons = getAllByTestId('Nav-icon-wrapper');
    const navLabels = getAllByTestId('Nav-label');

    expect(container).toBeTruthy();

    expect(navItems.length).toBe(4);
    expect(navIcons.length).toBe(4);
    expect(navLabels[0]).toHaveStyle(`
    font-size: var(--font-footnote-regular-size);
    font-weight: var(--font-footnote-bold-weight);
    font-family: var(--font-footnote-bold-font);
    color: var(--link-main-nav-brand-primary-selected);
    `);
    expect(navLabels[1]).toHaveStyle(`
    color: var(--link-main-nav-neutral-default);
    `);
    act(() => {
      fireEvent.click(navItems[0]);
    });
    act(() => {
      fireEvent.click(navItems[2]);
    });
    await waitFor(() => {
      expect(handleOnChange).toHaveBeenCalledTimes(1);
    });
  });
});
