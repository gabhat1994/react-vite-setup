import { useState } from 'react';
import { disabledNavItems } from './mock';
import { type SideNavItemProps } from './SideNavItem/types';
import { SideNav } from './SideNav';
import { StoriesWrapper } from './styles';

export const SideNavigaton = () => {
  const [selectedValue, setSelectedValue] = useState<string>('discovery');

  const tmpList: SideNavItemProps[] = disabledNavItems;

  const onChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <StoriesWrapper>
      <h1>Navigation Panel</h1>
      <SideNav
        onNavChange={onChange}
        navItems={tmpList}
        activeNavValue={selectedValue}
      />
    </StoriesWrapper>
  );
};

export default {
  title: 'UI/Chambers/Navigation',
  component: SideNavigaton,
};
