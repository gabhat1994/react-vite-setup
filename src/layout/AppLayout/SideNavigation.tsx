import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useLocalStorageItem } from '@/hooks';
import { useAuth } from '@/features/auth/contexts';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { CreateEditEvent } from '@/features/events/createEditEvent';
import { OnDemandEventModal } from '@/features/events/onDemandEvent';
import { generatePersonalInviteLink } from '@/features/coreSettings';
import ProjectCreate from '@/screens/Chamber/components/modals/ProjectCreate';
import { AppSideNavigation } from '@/components/AppNavigation/AppSideNavigation/AppSideNavigation';

import {
  createNavItem,
  getUserNavItem,
  mainNavItems,
  toolsNavItems,
  useMenuNavigationHandler,
  useSelectedNavItem,
} from './utils';
import { useAppLayout } from './AppLayoutContext';

type ModalType =
  | 'create-noum'
  | 'create-event-instant'
  | 'create-event-scheduled';

export function AppLayoutSideNavigation() {
  const { user, masterId } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { modalType, openModal, closeModal } = useModalManager<ModalType>();

  const { isSideMenuOpen, toggleSideMenu, onGoBack } = useAppLayout();

  const { isDesktop, isMobile } = useBreakpoints();
  const subNavMode = isMobile ? 'bottom-sheet' : 'popper';

  const userNavItem = useMemo(() => getUserNavItem(user), [user]);

  const allOptions = useMemo(
    () => [createNavItem, ...mainNavItems, ...toolsNavItems, userNavItem],
    [userNavItem],
  );

  const selectedItem = useSelectedNavItem(allOptions);

  const [defaultIsExpanded, setIsExpanded] = useLocalStorageItem<boolean>(
    'SIDE_NAVIGATION_EXPANDED',
    false,
  );

  const handleItemSelect = useMenuNavigationHandler({
    onItemClick: (item) => {
      switch (item.key) {
        case 'create-noum':
          openModal('create-noum');
          return;
        case 'create-event-instant':
          openModal('create-event-instant');
          return;
        case 'create-event-scheduled':
          openModal('create-event-scheduled');
          return;
        case 'start-personal-event':
          window.open(generatePersonalInviteLink(user ?? null), '_blank');
      }
    },
  });

  return (
    <>
      <AppSideNavigation
        isOpen={isDesktop || isSideMenuOpen}
        onOpen={() => {
          toggleSideMenu(true);
        }}
        onClose={() => {
          toggleSideMenu(false);
        }}
        onGoBack={onGoBack}
        isPersistent={isDesktop}
        subNavMode={subNavMode}
        selectedItemKey={selectedItem?.key ?? null}
        onSelectItem={handleItemSelect}
        createNavItem={createNavItem}
        mainNavItems={mainNavItems}
        toolsNavItems={toolsNavItems}
        userNavItem={userNavItem}
        defaultIsExpanded={defaultIsExpanded}
        onToggleExpanded={setIsExpanded}
      />
      <ProjectCreate
        isOpen={modalType === 'create-noum'}
        handleClose={closeModal}
        handleSuccess={(id) => {
          navigate(`/noum/${id}/edit`, { state: { prevPath: pathname } });
          closeModal();
        }}
      />
      {modalType === 'create-event-scheduled' && (
        <CreateEditEvent
          isOpen
          onClose={closeModal}
          chamberId={masterId}
          isProjectNoum={false}
        />
      )}

      {modalType === 'create-event-instant' && (
        <OnDemandEventModal
          isProjectNoum={false}
          chamberId={masterId}
          onClose={closeModal}
          eventSuccessCallback={closeModal}
        />
      )}
    </>
  );
}
