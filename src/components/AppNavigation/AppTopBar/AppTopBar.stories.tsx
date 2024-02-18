import { type GlassIconName } from '@/assets/glass-icons';
import { Icon } from '@/components/Icon';
import { TextField } from '@/components/TextField';
import { breakpoints } from '@/constants/devices';
import { useWindowDimensions } from '@/hooks/dimensions';
import { type Meta, type StoryObj } from '@storybook/react';
import { Fragment, useState } from 'react';
import { AppTopBar } from './index';
import { type NavUserItemOption } from '../types';

export default {
  title: 'ui/AppTopBar',
  component: AppTopBar.Container,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof AppTopBar['Container']>;

interface ActivityOption {
  key: string;
  label: string;
  iconName: GlassIconName;
}

const activities: ActivityOption[] = [
  { key: 'events', label: 'Events', iconName: 'events' },
  { key: 'notifications', label: 'Notifications', iconName: 'notification' },
  { key: 'messages', label: 'Messages', iconName: 'chat' },
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

interface StoryComponentProps {
  showBackButton: boolean;
  showMenuButton: boolean;
  collapseSearchInput: boolean;
  showUserNav: boolean;
  showActivityDots: boolean;
}

function StoryComponent({
  showBackButton,
  showMenuButton,
  collapseSearchInput,
  showUserNav,
  showActivityDots,
}: StoryComponentProps) {
  const [selectedActivity, setSelectedActivity] =
    useState<ActivityOption | null>(null);
  const [selectedItemKey, setSelectedItemKey] = useState<string | null>(null);

  return (
    <div
      style={{
        backgroundColor: '#fff',
        height: '100vh',
      }}
    >
      <AppTopBar.Container>
        <AppTopBar.Group>
          {showBackButton && (
            <>
              <AppTopBar.IconButton name="arrow_left_m" label="Go Back" />
              <AppTopBar.Separator />
            </>
          )}
          {showMenuButton && (
            <>
              <AppTopBar.IconButton name="menu_m" label="Menu" />
              <AppTopBar.Separator />
            </>
          )}

          <AppTopBar.Logo />
          <AppTopBar.Separator />

          {collapseSearchInput ? (
            <AppTopBar.ActivityIcon
              name="search"
              label="Search"
              isActive={false}
              onClick={() => {}}
            />
          ) : (
            <div style={{ margin: '0 8px' }}>
              <TextField
                inputSize="small"
                placeholder="Search"
                leftIcon={
                  <Icon
                    name="search_m"
                    size={24}
                    color="--icon-input-neutral-default"
                  />
                }
              />
            </div>
          )}
        </AppTopBar.Group>
        <AppTopBar.Group>
          {activities.map((activity) => (
            <AppTopBar.ActivityIcon
              key={activity.key}
              name={activity.iconName}
              label={activity.label}
              isActive={selectedActivity?.key === activity.key}
              showDot={showActivityDots}
              onClick={() => setSelectedActivity(activity)}
            />
          ))}
          {showUserNav && (
            <>
              <AppTopBar.Separator $margin="0 12px" />
              <AppTopBar.UserNavButton
                item={userNavItem}
                selectedItemKey={selectedItemKey}
                onNavItemClick={(item) => {
                  setSelectedItemKey(item.key);
                }}
              />
            </>
          )}
        </AppTopBar.Group>
      </AppTopBar.Container>
    </div>
  );
}

interface ResponsiveStoryProps {
  showBackButton: boolean;
  showActivityDots: boolean;
}

function ResponsiveStory({
  showBackButton,
  showActivityDots,
}: ResponsiveStoryProps) {
  const { width } = useWindowDimensions();
  const collapseSearchInput = width < breakpoints.MOBILE_L;
  const showMenuButton = width < breakpoints.TABLET;
  const showUserNav = width > breakpoints.TABLET;

  return (
    <StoryComponent
      collapseSearchInput={collapseSearchInput}
      showBackButton={showBackButton}
      showMenuButton={showMenuButton}
      showUserNav={showUserNav}
      showActivityDots={showActivityDots}
    />
  );
}

export const Basic = {
  args: {
    collapseSearchInput: false,
    showBackButton: true,
    showMenuButton: true,
    showUserNav: true,
    showActivityDots: true,
  },
  render: (props) => <StoryComponent {...props} />,
} as StoryObj<typeof StoryComponent>;

export const Responsive = {
  args: {
    showBackButton: true,
    showActivityDots: true,
  },
  render: (props) => <ResponsiveStory {...props} />,
} as StoryObj<typeof ResponsiveStory>;
