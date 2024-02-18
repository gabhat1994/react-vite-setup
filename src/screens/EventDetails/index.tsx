import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/features/auth/contexts';
import { Header } from '@/components/Header';
import { GuestHeader } from '@/layout/GuestHeader';

import ROUTES from '@/constants/routes';
import { AppLayout } from '@/layout/AppLayout';
import { EventDetail } from './EventDetail';

export const Index = () => {
  const { isUnregistered } = useAuth();
  const navigate = useNavigate();
  return (
    <AppLayout.Layout
      onGoBack={
        isUnregistered ? () => navigate(ROUTES.GUEST_HOME) : () => navigate(-1)
      }
      topNavbar={
        isUnregistered ? (
          <Header isBorderRadius={false}>
            <GuestHeader leftNavButton={true} />
          </Header>
        ) : (
          <AppLayout.TopBar />
        )
      }
      sideNav={<AppLayout.SideNavigation />}
    >
      <EventDetail />
    </AppLayout.Layout>
  );
};

export default Index;
