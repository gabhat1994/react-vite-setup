import styled from 'styled-components';

export const TypeContainer = styled.div<{ iswrapped: boolean }>`
  width: 100%;
  max-width: ${({ iswrapped }) => (iswrapped ? '100%' : '255px')};
`;
