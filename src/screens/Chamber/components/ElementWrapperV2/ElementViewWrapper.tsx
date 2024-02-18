import React from 'react';
import S from './styles';

type ElementBodyWrapperProps = {
  id?: string;
};

export const ElementViewWrapper: React.FC<ElementBodyWrapperProps> = ({
  children,
  id,
}) => <S.Container id={id}>{children}</S.Container>;
