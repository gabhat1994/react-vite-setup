import React from 'react';
import { AppLayout } from '../AppLayout';
import S from './styles';

type NavBarProps = {
  children: React.ReactNode;
};

export const NavBar: React.FC<NavBarProps> = ({ children }) => (
  <S.NavBar>
    <AppLayout.MainContent>{children}</AppLayout.MainContent>
  </S.NavBar>
);
