import { AppTopBar as Container } from './AppTopBar';
import { TopBarActivityIcon } from './components/ActivityIcon';
import { TopBarIconButton } from './components/IconButton';
import { TopBarLogo } from './components/Logo';
import { TopBarSearchInput } from './components/SearchInput';
import { TopBarUserNavButton } from './components/UserNav';
import { TopBarGroup, TopBarSeparator } from './styles';

export const AppTopBar = {
  Container,
  Group: TopBarGroup,
  Separator: TopBarSeparator,
  IconButton: TopBarIconButton,
  Logo: TopBarLogo,
  ActivityIcon: TopBarActivityIcon,
  Search: TopBarSearchInput,
  UserNavButton: TopBarUserNavButton,
};
