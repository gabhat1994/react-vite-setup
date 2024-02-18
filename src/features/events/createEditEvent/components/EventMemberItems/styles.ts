import { Stack } from '@/layout';
import { TSpan } from '@/components';
import styled from 'styled-components';
import { ellipsisText } from '@/common/globalStyles';

export const SpinnerContainer = styled.div`
  width: 100%;
  height: 24px !important;
`;

export const EventUserItemWrapper = styled(Stack)<{
  splitter?: boolean;
  isNoumEditor?: boolean;
}>`
  height: 78px;
  width: 100%;
  padding-left: ${({ isNoumEditor }) => (isNoumEditor ? '24px' : 0)};
  border-bottom: ${({ splitter }) =>
    !splitter ? 'none' : '1px solid var(--bg-separator-neutral-default)'};
`;

export const EventUserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  flex: 1;
  overflow: hidden;
`;

export const EventUserTitle = styled(TSpan)`
  ${ellipsisText}
`;
