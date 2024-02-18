import styled from 'styled-components';
import { sizes } from '@/constants/devices';

export const ChambersListContainer = styled.div<{ gap?: number }>`
  ${({ gap }) => `--gap:${gap || 20}px`};
  gap: var(--gap);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: max-content;
  position: relative;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    justify-content: center;
  }
`;

export const ChamberItem = styled.div<{
  fourColumnItem?: boolean;
  columns?: number;
}>`
  display: flex;
  --columns: ${({ columns, fourColumnItem }) =>
    `${columns || fourColumnItem ? 4 : 3}`};

  @media (max-width: ${sizes.LAPTOP_M}) {
    --columns: 3;
  }

  @media (max-width: ${sizes.LAPTOP}) {
    --columns: 2;
  }

  width: calc(
    100% / var(--columns) - var(--gap) * (var(--columns) - 1) / var(--columns)
  );

  @media (max-width: 700px) {
    width: calc(50vw - var(--gap) / 2);
  }

  @media (max-width: ${sizes.MOBILE_L}) {
    width: calc(100vw - 32px);
    margin-right: 0 !important;
  }
`;
