import styled from 'styled-components';

export const Observed = styled.div<{
  position: 'top' | 'bottom';
  minHeight?: string;
}>`
  min-height: ${({ minHeight }) => minHeight ?? '10px'};
  width: 100%;
`;

export const SpinnerPosition = styled.div<{
  isBottom?: boolean;
  isSpinnerRelative?: boolean;
}>`
  width: 100%;
  height: 24px;
  position: ${({ isSpinnerRelative }) =>
    isSpinnerRelative ? 'relative' : 'absolute'};
  ${({ isBottom }) => (isBottom ? 'bottom: 12px;' : 'top: 12px;')}
`;
