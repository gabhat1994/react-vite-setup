import styled from 'styled-components';
import { TSpan } from '@/components/Typography/Typography';
import { Stack } from '@/layout';
import { Button } from '@/components/Button';
import { devices } from '@/constants/devices';

export const Container = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  vertical-align: middle;
  background: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  padding: 16px;
  pointer-events: ${({ disabled }) => (disabled ? `none` : `initial`)};
`;

export const SkeletonContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const SkeletonItem = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--bg-separator-neutral-default);
  padding: 16px 0;
  gap: 16px;
`;

export const ItemSkeletonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

export const RightSkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ButtonSkeletonWrapper = styled.div`
  flex: 1;
`;

export const FooterSkeleton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 16px;
`;

export const SpinnerContainer = styled(Stack)`
  position: relative;
  padding: 5px;
`;

export const CollapsedWrapper = styled(TSpan)`
  padding-bottom: 10px;
`;

export const ButtonView = styled.div<{ isBackground?: boolean }>`
  cursor: pointer;
  padding: 8px;
  color: var(--icon-button-neutral-default);
  border-radius: 8px;
  background-color: var(--bg-button-neutral-default);
  :hover {
    background-color: var(--bg-button-neutral-alt-hover);
  }
  display: block;

  @media ${devices.LAPTOP} {
    display: none;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

export const AllInvites = styled(Button)`
  margin: 2px 0px;
`;
