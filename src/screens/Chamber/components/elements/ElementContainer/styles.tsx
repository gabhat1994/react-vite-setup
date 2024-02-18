import styled from 'styled-components';

export const Container = styled.div<{ isBorderContent?: boolean }>`
  ${({ isBorderContent }) =>
    !isBorderContent &&
    `border: 1px solid var(--border-card-neutral-default); border-radius:16px;`};
`;
