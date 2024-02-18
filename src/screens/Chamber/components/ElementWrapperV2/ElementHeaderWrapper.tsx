import React from 'react';

import { TSpan } from '@/components';
import S from './styles';

type ElementHeaderWrapperProps = {
  title: string | undefined;
};

export const ElementHeaderWrapper: React.FC<ElementHeaderWrapperProps> = ({
  title,
  children,
}) => (
  <S.HeaderContainer>
    <TSpan
      font="heading-xs-bold"
      colorToken="--text-body-header-neutral-default"
    >
      {title}
    </TSpan>
    {children}
  </S.HeaderContainer>
);
