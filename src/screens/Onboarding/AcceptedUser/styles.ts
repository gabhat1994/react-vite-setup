import styled from 'styled-components';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { Stack } from '@/layout';
import { sizes } from '@/constants/devices';

export const Title = styled(TSpan)`
  width: 100%;
`;

export const Description = styled(TSpan)`
  width: 100%;
`;

export const ContinueButton = styled(Button)`
  margin-top: 20px;
  width: 100%;
`;

export const OutlineBox = styled(Stack).attrs({
  vertical: true,
  gap: 24,
})`
  padding: 24px;
  align-items: center;
  border-radius: 16px;
  border: 1px solid var(--bg-separator-neutral-default);
  width: 100%;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    border: none;

    box-sizing: border-box;

    padding: 0px;
  }
`;
