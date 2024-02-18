import styled, { css } from 'styled-components';
import { devices } from '@/constants/devices';
import { Card } from '@/components/Card';

export const ViewModeWrapper = styled(Card)<{ isEditing?: boolean }>`
  box-sizing: border-box;
  border-radius: 0;
  position: relative;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: visible;

  @media ${devices.LAPTOP} {
    border-radius: 16px;
    padding: 24px;
  }
  @media ${devices.TABLET} {
    border-radius: 16px;
  }

  ${({ isEditing }) =>
    isEditing &&
    css`
      & * {
        pointer-events: none;
      }
    `}
`;
