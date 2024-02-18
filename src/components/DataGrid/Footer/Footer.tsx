import React from 'react';
import { Stack } from '@/layout';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import S from './styles';

interface FooterProps {
  leftElement: React.ReactNode;
  rightElement?: React.ReactNode;
}

export function Footer({ leftElement, rightElement }: FooterProps) {
  const { isMobile } = useBreakpoints();
  return (
    <Stack
      gap={24}
      vertical={isMobile}
      reverse={isMobile}
      justify="space-between"
      align="center"
    >
      <S.LeftSlot>{leftElement}</S.LeftSlot>
      <S.RightSlot>{rightElement}</S.RightSlot>
    </Stack>
  );
}
