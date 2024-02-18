import { useBreakpoints } from '@/hooks';
import { MobileFilters } from './MobileFilters';
import { TabletFilters } from './TabletFilters';
import { DesktopFilters } from './DesktopFilters';

type FiltersType = {
  onInviteMembers(): void;
};

export const Filters = ({ onInviteMembers }: FiltersType) => {
  const { isMobile, isTablet } = useBreakpoints();

  if (isMobile) {
    return <MobileFilters onInviteMembers={onInviteMembers} />;
  }

  if (isTablet) {
    return <TabletFilters onInviteMembers={onInviteMembers} />;
  }

  return <DesktopFilters onInviteMembers={onInviteMembers} />;
};
