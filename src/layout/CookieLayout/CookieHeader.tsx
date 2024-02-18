import { forwardRef } from 'react';
import { useNavigate } from 'react-router';
import { Stack } from '@/layout';
import Logo from '@/components/Logo';

import routes from '@/constants/routes';
import { MainHeaderWrapper } from '../MainHeader';

export const CookieHeader = forwardRef(() => {
  const navigate = useNavigate();

  return (
    <MainHeaderWrapper id="main-header">
      <Stack justify="space-between" fullWidth align="center">
        <Stack gap={32}>
          <Logo handleLogoClick={() => navigate(routes.LOGIN)} />
        </Stack>
      </Stack>
    </MainHeaderWrapper>
  );
});
