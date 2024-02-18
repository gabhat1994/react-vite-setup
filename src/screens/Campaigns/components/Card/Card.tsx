import { type ReactNode } from 'react';

import { Separator } from '@/components/Separator/Separator';
import { Spacer } from '@/layout/Stack/Spacer';
import { Stack } from '@/layout/Stack';

import S from './style';
import type * as T from './types';

function Title({ children, ...rest }: T.Title) {
  return <S.BaseTitle {...rest}>{children}</S.BaseTitle>;
}

function Label({ children, ...rest }: T.Label) {
  return <S.BaseLabel {...rest}>{children}</S.BaseLabel>;
}

function Divider() {
  return (
    <>
      <Spacer height={8} />
      <Separator size="thin" fullWidth />
      <Spacer height={8} />
    </>
  );
}

function TitleWithBG({ children }: { children: string }) {
  return (
    <S.BaseTitleWithBG>
      <S.ValueBold>{children}</S.ValueBold>
    </S.BaseTitleWithBG>
  );
}

function CampaignMetrics({
  children,
  label,
  right,
  isBold = true,
  minWidth = true,
  vertical = true,
}: {
  children: ReactNode;
  label: ReactNode;
  isBold?: boolean;
  minWidth?: boolean;
  vertical?: boolean;
  right?: ReactNode;
}) {
  return (
    <div style={{ minWidth: minWidth ? '137px' : '' }}>
      <Stack vertical={vertical} gap={8} fullWidth>
        <Stack align="center" gap={6}>
          <Label>{label}</Label>
          {right && <span style={{ marginTop: '-4px' }}>{right}</span>}
        </Stack>
        {isBold && <S.ValueBold>{children}</S.ValueBold>}
        {!isBold && <S.Value>{children}</S.Value>}
      </Stack>
    </div>
  );
}

const { Value, ValueBold } = S;

export const Card = {
  Title,
  Label,
  Divider,
  Value,
  ValueBold,
  CampaignMetrics,
  TitleWithBG,
};
