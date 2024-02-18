import { disabledNavItems } from './mock';
import { SideMenu } from './SideMenu';
import { type SideMenuItemProps } from './SideMenuItem/types';
import { StoriesWrapper } from './styles';

export const SideMenuigaton = () => {
  const tmpList: SideMenuItemProps[] = disabledNavItems;

  const onChange = () => {};

  return (
    <StoriesWrapper>
      <h1>Side Menu for Account Page </h1>
      <SideMenu
        onNavChange={onChange}
        navItems={tmpList}
        isUserPending={false}
      />
    </StoriesWrapper>
  );
};

export default {
  title: 'UI/MyAccount/SideMenu',
  component: SideMenu,
};
