import styled from 'styled-components';
import { Stack } from '@/layout';

export const MediaInfoWrapper = styled(Stack)`
  & > div {
    min-width: 56px;
  }
`;

export const StyledButton = styled.div<{
  isBanner?: boolean;
}>`
  width: ${({ isBanner }) => isBanner && '173px'};
  height: ${({ isBanner }) => isBanner && '36px'};
  cursor: pointer;
  vertical-align: middle;
  gap: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(
    ${({ isBanner }) =>
      isBanner ? '--color-base-gray-transparency-40' : 'none'}
  );
`;
