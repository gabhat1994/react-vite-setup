import React from 'react';
import { Header } from '@/components/Header';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { CookieHeader } from './CookieHeader';
import { type LayoutProps } from './types';
import { Container, Content, Main } from './styles';

const CookieLayout: React.FC<LayoutProps> = ({ children }) => {
  const deviceType = useDeviceType();

  return (
    <Container data-testid="layout-container">
      <Header isBorderRadius={false}>
        <CookieHeader />
      </Header>

      <Main
        data-testid="layout-main"
        isMobile={deviceType === DeviceTypeEnum.MOBILE}
        justify="center"
        gap={0}
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

export default CookieLayout;
