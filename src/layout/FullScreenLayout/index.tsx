import routes from '@/constants/routes';
import { useAuth } from '@/features/auth/contexts';
import React from 'react';
import { useNavigate } from 'react-router';
import { AppLayout } from '../AppLayout';
import { NavBar } from './NavBar';

type FullScreenLayoutProps = {
  children: React.ReactNode;
  navBarContent?: React.ReactNode;
  responsiveMain?: boolean;
};

export const FullScreenLayout: React.FC<FullScreenLayoutProps> = ({
  children,
  responsiveMain = false,
  navBarContent,
}) => {
  const navigate = useNavigate();
  const { isUnregistered } = useAuth();

  return (
    <AppLayout.Layout
      onGoBack={() =>
        isUnregistered ? navigate(routes.GUEST_HOME) : navigate(-1)
      }
      topNavbar={navBarContent ? <NavBar>{navBarContent}</NavBar> : null}
      sideNav={null}
      background="neutral-alt-highlighted"
    >
      {responsiveMain ? (
        <AppLayout.MainContent>{children}</AppLayout.MainContent>
      ) : (
        children
      )}
    </AppLayout.Layout>
  );
};
