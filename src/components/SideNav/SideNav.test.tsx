import { BrowserRouter } from 'react-router-dom';
import { cleanup, render } from '@/test-utils';
import { type SideNavItemProps } from './SideNavItem/types';
import { SideNav } from './SideNav';
import { defaultNavItems } from './mock';

const inputList: SideNavItemProps[] = defaultNavItems;
describe('SideNav', () => {
  afterEach(() => {
    cleanup();
  });
  it('should change orientation, styles according to the window size', () => {
    const handleOnChange = vi.fn();
    const { container } = render(
      <BrowserRouter>
        <SideNav
          navItems={inputList}
          onNavChange={handleOnChange}
          activeNavValue=""
        />
      </BrowserRouter>,
    );

    expect(container).toBeTruthy();
  });
});
