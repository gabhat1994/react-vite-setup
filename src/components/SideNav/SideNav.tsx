import generate from 'uniqid';
import { type SideNavProps } from './types';
import { SideNavItem } from './SideNavItem/SideNavItem';
import { Wrapper } from './styles';

export const SideNav = ({
  navItems = [],
  onNavChange,
  activeNavValue,
  isNoumSideBar = false,
  loading,
}: SideNavProps) => (
  <Wrapper isNoumSideBar={isNoumSideBar}>
    {navItems.map(({ value, ...rest }) => (
      <SideNavItem
        data-testid="Side-Nav-Item"
        key={generate()}
        active={value === activeNavValue}
        onItemChange={onNavChange}
        value={value}
        {...rest}
        isNoumSideBar={isNoumSideBar}
        loading={loading}
      />
    ))}
  </Wrapper>
);

export default SideNav;
