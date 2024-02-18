import { useState, type FC, useEffect } from 'react';

import { useBreakpoints } from '@/hooks/useBreakpoints';
import { NoumEditRestrictionModal } from '@/screens/Chamber/components/modals/NoumEditRestrictionModal';
import { Header, MainNoumLayout, Root } from './styles';
import { type LayoutProps } from './types';

export const NoumViewLayout: FC<LayoutProps> = ({
  header,
  isEditing,
  children,
  hasThemePanel = false,
  leftSidebar,
  isStickyContainer,
}) => {
  const { isTablet, isMobile } = useBreakpoints();
  const [isRestrictionModalOpen, setRestrictionModalOpen] = useState(false);

  useEffect(() => {
    setRestrictionModalOpen((isMobile || isTablet) && !!isEditing);
  }, [isTablet, isEditing, isMobile]);

  return (
    <Root className="NoumEditor-root">
      {isStickyContainer && <div id="space">{leftSidebar}</div>}
      {(isMobile || isTablet) && isEditing ? (
        <MainNoumLayout
          data-testid="Main-Layout"
          hasThemePanel={hasThemePanel}
        />
      ) : (
        <MainNoumLayout
          data-testid="Main-Layout"
          hasThemePanel={hasThemePanel}
          isStickyContainer={isStickyContainer}
        >
          <Header id="header">{header}</Header>
          <div id="body">{children}</div>
        </MainNoumLayout>
      )}
      <NoumEditRestrictionModal
        isOpen={isRestrictionModalOpen}
        onClose={() => setRestrictionModalOpen(false)}
        isEditing={isEditing}
      />
    </Root>
  );
};
