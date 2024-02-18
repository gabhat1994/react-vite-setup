import React from 'react';
import { Header } from '@/components/Header';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { useAuth } from '@/features/auth/contexts';
import { UserUtil } from '@/utils/user';
import { MainHeader } from '../MainHeader';
import { type LayoutProps } from './types';
import { Container, Content, Main } from './styles';

const ApplicationReviewLayout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const deviceType = useDeviceType();

  return (
    <Container data-testid="layout-container">
      <Header isBorderRadius={false}>
        <MainHeader
          avatar={UserUtil.getProfilePicture(user) || undefined}
          userName={user?.firstName || undefined}
        />
      </Header>

      <Main
        data-testid="layout-main"
        isMobile={deviceType === DeviceTypeEnum.MOBILE}
      >
        <Content
          data-testid="layout-main-content"
          isMobile={deviceType === DeviceTypeEnum.MOBILE}
        >
          {children}
        </Content>
      </Main>
    </Container>
  );
};

export default ApplicationReviewLayout;
