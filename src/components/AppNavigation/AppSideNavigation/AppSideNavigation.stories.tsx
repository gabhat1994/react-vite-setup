import { Card } from '@/components/Card';
import { useWindowDimensions } from '@/hooks';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { Stack, StackItem } from '@/layout';
import { type Meta, type StoryObj } from '@storybook/react';
import { useState, type ComponentProps, type ReactNode } from 'react';
import { NavigationContainer } from './components/NavigationContainer';
import { AppSideNavigationProvider } from './contexts/AppSideNavigationContext';
import { SubNavContextProvider } from '../SubNav/SubNavContext';
import { type NavItemOption, type NavUserItemOption } from '../types';
import { NavigationSubNav } from './components/NavigationSubNav';
import { AppSideNavigation } from '.';

export default {
  title: 'ui/AppSideNavigation',
  component: AppSideNavigation,
  parameters: {
    layout: 'fullscreen',
    controls: {
      exclude: ['isPersistent', 'isOpen'],
    },
  },
  argTypes: {
    subNavMode: {
      options: ['popper', 'bottom-sheet'],
      control: { type: 'radio' },
    },
  },
} as Meta<typeof AppSideNavigation>;

const createNavItem: NavItemOption = {
  key: 'create',
  label: 'Create',
  subNavItems: [
    { key: 'noum', label: 'Noum', iconName: 'noum' },
    { key: 'immediate_event', label: 'Start Event Now', iconName: 'event' },
    { key: 'scheduled_event', label: 'Schedule New Event', iconName: 'event' },
    { key: 'contract', label: 'Contract', iconName: 'contracts' },
    { key: 'proposal', label: 'Proposal', iconName: 'proposals' },
    { key: 'invoice', label: 'Invoice', iconName: 'invoices' },
  ],
};
const mainNavItems: NavItemOption[] = [
  { key: 'home', label: 'Home', iconName: 'home' },
  { key: 'money', label: 'Money', iconName: 'money' },
  { key: 'discover', label: 'Discover', iconName: 'discover' },
  { key: 'community', label: 'Community', iconName: 'community' },
  { key: 'noums', label: 'Noums', iconName: 'noums' },
];
const toolsNavItems: NavItemOption[] = [
  { key: 'contracts', label: 'Contracts', iconName: 'contracts' },
  { key: 'proposals', label: 'Proposals', iconName: 'proposals' },
  { key: 'invoices', label: 'Invoices', iconName: 'invoices' },
  { key: 'contacts', label: 'Contacts', iconName: 'contacts' },
];
const userNavItem: NavUserItemOption = {
  key: 'user',
  label: 'Johnatan Williamson Jr.',
  avatarUrl: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
  subNavItems: [
    { key: 'my_profile', label: 'My Profile', iconName: 'my_profile' },
    { key: 'settings', label: 'Settings', iconName: 'settings' },
    { key: 'help', label: 'Help', iconName: 'help' },
    { key: 'logout', label: 'Log Out', iconName: 'log_out' },
  ],
};

interface StoryLayoutProps {
  topNavbar: ReactNode;
  sideNav: ReactNode;
  mainContent: ReactNode;
}
function StoryLayout({ topNavbar, sideNav, mainContent }: StoryLayoutProps) {
  const { width } = useWindowDimensions();

  return (
    <Stack
      justify="stretch"
      align="stretch"
      vertical
      fullWidth
      style={{
        backgroundColor: '#f3f3f3',
        height: '100vh',
        overflow: 'hidden',
        scrollbarGutter: 'auto',
      }}
    >
      <StackItem
        style={{
          background: 'white',
          borderBottom: '1px solid var(--color-base-secondary-25)',
        }}
      >
        {topNavbar}
      </StackItem>
      <Stack
        grow
        justify="stretch"
        align="stretch"
        style={{ overflow: 'hidden', scrollbarGutter: 'auto' }}
      >
        {sideNav}
        <StackItem grow padding="24px 40px" style={{ overflowY: 'scroll' }}>
          <Card
            style={{
              maxWidth: '1440px',
              margin: width >= 1440 ? 'auto' : '0',
              height: '150vh',
            }}
          >
            {mainContent}
          </Card>
        </StackItem>
      </Stack>
    </Stack>
  );
}

interface StoryTopNavProps {
  onMenuButtonClick?(): void;
}

function StoryTopNav({ onMenuButtonClick }: StoryTopNavProps) {
  return (
    <Stack gap={16} align="center" padding="16px">
      {!!onMenuButtonClick && (
        <button type="button" onClick={() => onMenuButtonClick()}>
          Open
        </button>
      )}
      top nav
    </Stack>
  );
}

function PersistentStory(props: ComponentProps<typeof AppSideNavigation>) {
  const [selectedItemKey, setSelectedItemKey] = useState<string>('home');

  return (
    <StoryLayout
      topNavbar={<StoryTopNav />}
      sideNav={
        <SubNavContextProvider displayMode={props.subNavMode}>
          <AppSideNavigationProvider
            {...props}
            selectedItemKey={selectedItemKey}
            onSelectItem={(item) => setSelectedItemKey(item.key)}
          >
            <NavigationContainer.Persistent />
            <NavigationSubNav />
          </AppSideNavigationProvider>
        </SubNavContextProvider>
      }
      mainContent={selectedItemKey}
    />
  );
}

function DrawerStory(props: ComponentProps<typeof AppSideNavigation>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItemKey, setSelectedItemKey] = useState<string>('home');

  return (
    <StoryLayout
      topNavbar={<StoryTopNav onMenuButtonClick={() => setIsOpen((s) => !s)} />}
      sideNav={
        <SubNavContextProvider
          displayMode={props.subNavMode}
          onOpen={() => props.subNavMode === 'bottom-sheet' && setIsOpen(false)}
          onClose={() => props.subNavMode === 'bottom-sheet' && setIsOpen(true)}
        >
          <AppSideNavigationProvider
            {...props}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            selectedItemKey={selectedItemKey}
            onSelectItem={(item) => setSelectedItemKey(item.key)}
          >
            <NavigationContainer.Drawer />
            <NavigationSubNav />
          </AppSideNavigationProvider>
        </SubNavContextProvider>
      }
      mainContent={selectedItemKey}
    />
  );
}

function ResponsiveStory(props: ComponentProps<typeof AppSideNavigation>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItemKey, setSelectedItemKey] = useState<string | null>('home');
  const { isDesktop, isMobile } = useBreakpoints();

  const subNavMode = isMobile ? 'bottom-sheet' : 'popper';

  return (
    <StoryLayout
      topNavbar={
        <StoryTopNav
          onMenuButtonClick={
            !isDesktop ? () => setIsOpen((s) => !s) : undefined
          }
        />
      }
      sideNav={
        <AppSideNavigation
          {...props}
          subNavMode={subNavMode}
          isOpen={isDesktop || isOpen}
          isPersistent={isDesktop}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          selectedItemKey={selectedItemKey}
          onSelectItem={(item: NavItemOption) => {
            setSelectedItemKey(item.key);
          }}
        />
      }
      mainContent={selectedItemKey}
    />
  );
}

export const Persistent = {
  args: {
    isOpen: true,
    isPersistent: true,
    onClose: () => {},
    subNavMode: 'popper',
    createNavItem,
    mainNavItems,
    toolsNavItems,
    userNavItem,
  },
  render: (props) => <PersistentStory {...props} />,
} as StoryObj<typeof AppSideNavigation>;

export const Drawer = {
  args: {
    isOpen: false,
    isPersistent: false,
    onClose: () => {},
    subNavMode: 'popper',
    createNavItem,
    mainNavItems,
    toolsNavItems,
    userNavItem,
  },
  render: (props) => <DrawerStory {...props} />,
} as StoryObj<typeof AppSideNavigation>;

export const Responsive = {
  args: {
    onClose: () => {},
    createNavItem,
    mainNavItems,
    toolsNavItems,
    userNavItem,
  },
  render: (props) => <ResponsiveStory {...props} />,
} as StoryObj<typeof AppSideNavigation>;
