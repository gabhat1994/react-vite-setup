import styled from 'styled-components';

import { TSpan } from '@/components/Typography';

export const NoResultWrapper = styled.div<{ offsetTop: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  height: 100%;
  margin-top: ${({ offsetTop }) => `${offsetTop}px`};
`;

export const NoResultText = styled(TSpan)`
  margin-top: 16px;
`;

export const NoResultSubText = styled(TSpan)`
  margin-top: 8px;
`;
