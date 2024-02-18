import { useMemo, type FC } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { StickyContainer } from '@/components/StickyContainer';
import { SideNav } from '@/components/SideNav';
import {
  NoumSideNavItems,
  SinglePostSideNavBar,
} from '@/constants/sideNavItems';
import { useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import { type SideNavItemProps } from '@/components/SideNav/SideNavItem/types';
import { useSearchParams } from 'react-router-dom';
import { useNoumDetails } from '@/features/noums/hooks/noums';
import { LeftSideBarContainer } from './styles';

/** @deprecated This component was used in the old app layout, and will be removed soon. */
export const NoumLeftSideBar: FC<{ loading?: boolean }> = ({ loading }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { width } = useWindowDimensions();
  const isTablet = useMemo(() => width <= breakpoints.TABLET_L, [width]);
  const { pathname } = useLocation();
  const isSinglePost = useMemo(() => pathname.startsWith('/post/'), [pathname]);
  const noumId = searchParams.get('noumId') ?? '';
  const { space } = useNoumDetails(isSinglePost ? noumId : id!);

  const PostNoumSideNavItems: SideNavItemProps[] = [
    {
      icon: 'arrow_left_m',
      label: `${space?.name} All Posts`,
      id: '1',
      value: 'back',
      to: '#',
      disabled: false,
    },
  ];

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
          navItems={
            !isTablet
              ? NoumSideNavItems
              : isSinglePost
              ? SinglePostSideNavBar
              : PostNoumSideNavItems
          }
          activeNavValue=""
          isNoumSideBar
          loading={loading}
        />
      </LeftSideBarContainer>
    </StickyContainer>
  );
};
