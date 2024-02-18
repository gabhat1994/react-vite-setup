import styled, { css } from 'styled-components';

const bordered = css`
  border-radius: 16px;
  border: solid 1px var(--border-card-neutral-highlighted);
  padding: 8px;
`;
export const StyledFlexRow = styled.div<{
  gap?: number;
  justify?: string;
  align?: string;
  fullWidth?: boolean;
}>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: ${({ gap }) => `${gap || 0}px`};
  justify-content: ${({ justify }) => `${justify || 'center'}`};
  align-items: ${({ align }) => `${align || 'center'}`};
  ${({ fullWidth }) => fullWidth && 'width: 100%;'};
  & span > span.react-loading-skeleton {
    line-height: unset;
  }
`;

export const StyledFlexRowBordered = styled(StyledFlexRow)`
  width: 100%;
  ${bordered};
`;

export const StyledFlexColumn = styled(StyledFlexRow)`
  display: flex;
  flex-direction: column;
`;

export const StyledFlexColumnBordered = styled(StyledFlexColumn)`
  display: flex;
  flex-direction: column;
  ${bordered};
`;
