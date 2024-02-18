import styled from 'styled-components';
import { Stack } from '@/layout';
import { type Property } from 'csstype';

export const Wrapper = styled.div<{ flexDirection?: Property.FlexDirection }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  ${({ flexDirection }) => flexDirection && `flex-direction: ${flexDirection};`}
`;

export const HeaderButtonsWrapper = styled(Stack)<{
  isOwner?: boolean;
  isFullHeader?: boolean;
}>`
  display: flex;
  ${({ isFullHeader }) =>
    isFullHeader &&
    `
  display:grid;
  grid-template-columns: 1fr 1fr;
  `}
`;

export const ParentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;
