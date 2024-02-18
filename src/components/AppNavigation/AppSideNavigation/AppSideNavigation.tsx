import { NavigationContainer } from './components/NavigationContainer';
import { AppSideNavigationProvider } from './contexts/AppSideNavigationContext';
import { SubNavContext, SubNavContextProvider } from '../SubNav/SubNavContext';
import { type AppSideNavigationProps } from './types';
import { NavigationSubNav } from './components/NavigationSubNav';

export function AppSideNavigation({
  subNavMode,
  isPersistent,
  ...props
}: AppSideNavigationProps) {
  return (
    <SubNavContextProvider
      displayMode={subNavMode}
      onOpen={() => {
        if (subNavMode === 'bottom-sheet') {
          props.onClose();
        }
      }}
      onClose={() => {
        if (subNavMode === 'bottom-sheet') {
          props.onOpen();
        }
      }}
    >
      <SubNavContext.Consumer>
        {({ close: closeSubNav }) => (
          <AppSideNavigationProvider
            {...props}
            onClose={() => {
              closeSubNav();
              props.onClose();
            }}
          >
            {isPersistent ? (
              <NavigationContainer.Persistent />
            ) : (
              <NavigationContainer.Drawer />
            )}
            <NavigationSubNav />
          </AppSideNavigationProvider>
        )}
      </SubNavContext.Consumer>
    </SubNavContextProvider>
  );
}
