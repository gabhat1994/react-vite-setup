import React from 'react';
import S from './styles';

export const ElementBodyWrapper: React.FC = ({ children }) => (
  <S.BodyContainer>{children}</S.BodyContainer>
);
