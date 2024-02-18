import styled from 'styled-components';
import { cssVar, rgba } from 'polished';
import { sizes } from '@/constants/devices';

export const Wrapper = styled.div`
  position: absolute;
  left: 36px;
  bottom: 88px;
  width: 100%;
  height: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  width: calc(100% - 72px);
  gap: 16px;
`;

export const MiniAndNotificationWrapper = styled.div<{
  isSingle: boolean;
  isVisible: boolean;
}>`
  display: flex;
  flex-direction: column;
  width: 356px;
  align-items: center;
  border-radius: 16px;
  z-index: 5;
  box-shadow: 0px 4px 32px ${rgba(cssVar('--shadow-neutral-default'), 0.08)};
  padding: ${({ isSingle, isVisible }) =>
    isSingle || !isVisible ? 0 : '12px'};
  gap: 10px;
  box-sizing: border-box;
  background: var(--bg-card-neutral-alt-default);

  @media (min-width: ${sizes.TABLET}) {
    right: 40px;
    bottom: 40px;
  }

  @media (max-width: ${sizes.LAPTOP_L}) {
    right: 32px;
    bottom: 88px;
  }

  @media (max-width: ${sizes.MOBILE_L}) {
    width: calc(100% - 36px);
    right: 18px;
    bottom: 88px;
  }
`;
