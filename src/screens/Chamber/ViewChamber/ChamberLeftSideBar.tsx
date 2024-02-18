import { type FC } from 'react';
import { useNavigate } from 'react-router';
import { StickyContainer } from '@/components/StickyContainer';
import { SideNav } from '@/components/SideNav';
import {
  NoumSideNavItems,
  GuestNoumSideNavItems,
} from '@/constants/sideNavItems';
import { useAuth } from '@/features/auth/contexts';
import { LeftSideBarContainer } from './styles';

export const ChamberLeftSideBar: FC = () => {
  const navigate = useNavigate();
  const { isUnregistered } = useAuth();

  return (
    <StickyContainer>
      <LeftSideBarContainer>
        <SideNav
          onNavChange={(value) => {
            if (value === 'back') {
              navigate(-1);
            } else {
              navigate(value);
            }
          }}
          navItems={isUnregistered ? GuestNoumSideNavItems : NoumSideNavItems}
          activeNavValue=""
          isNoumSideBar
        />
      </LeftSideBarContainer>
    </StickyContainer>
  );
};
