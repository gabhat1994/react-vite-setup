import React, { type HTMLAttributes } from 'react';
import S from './styles';

interface ResponsiveContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  noPadding?: boolean;
}

export function ResponsiveContainer({
  children,
  noPadding = false,
  ...divProps
}: ResponsiveContainerProps) {
  return (
    <S.Container hasPadding={!noPadding} {...divProps}>
      {children}
    </S.Container>
  );
}
