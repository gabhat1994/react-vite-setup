import React from 'react';
import { Header } from '@/components/Header';
import { GuestHeader } from '../GuestHeader';
import { Container, Main } from './styles';
import { type GuestLayoutProps } from './types';

const GuestLayout: React.FC<GuestLayoutProps> = ({ type, children }) => (
  <Container data-testid="guest-layout-container">
    <Header isBorderRadius={false}>
      <GuestHeader />
    </Header>
    <Main data-testid="guest-layout-main" type={type}>
      {children}
    </Main>
  </Container>
);

export default GuestLayout;
