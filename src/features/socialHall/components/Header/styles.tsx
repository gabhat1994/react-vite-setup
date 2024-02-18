import styled from 'styled-components';
import { TSpan } from '@/components/Typography';
import { sizes } from '@/constants/devices';
import { BottomSheetBody } from '@/components/BottomSheet';

export const Wrapper = styled.div<{ isRow?: boolean }>`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  justify-content: center;
  background-color: var(--bg-card-neutral-alt-default);
  padding: 16px 40px;
  border-top: 1px solid var(--bg-separator-neutral-default);
  box-sizing: border-box;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    flex-direction: ${({ isRow }) => (isRow ? 'row' : 'column')};
    justify-content: flex-end;
    gap: 8px;
  }

  @media (max-width: ${sizes.LAPTOP_M}) {
    padding: 16px;
  }
`;

export const MiddleWrapper = styled.div<{ isBuzzRoom?: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    display: ${({ isBuzzRoom }) => (isBuzzRoom ? 'none' : 'flex')};
  }
  @media (max-width: ${sizes.LAPTOP_M}) {
    flex: 1;
  }
`;

export const MobileBuzzRoomMiddleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  position: absolute;
  top: calc(100% + 32px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    top: 100%;
    width: 100%;
  }
`;

export const TitleWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  @media (min-width: ${sizes.TABLET}) and (max-width: ${sizes.LAPTOP}) {
    width: calc(100vw - 320px);
  }
`;

export const RightWrapper = styled.div<{ isBuzzRoom?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;

  @media (max-width: ${sizes.MOBILE_MAX}) {
    position: relative;
    justify-content: flex-end;
    flex: 1;
    ${({ isBuzzRoom }) => !isBuzzRoom && 'width: 100%;'}
  }

  @media (max-width: ${sizes.LAPTOP_M}) {
    position: relative;
  }

  @media (min-width: ${sizes.LAPTOP_L}) {
    position: absolute;
    top: 0;
    right: 16px;
    height: 100%;
  }
`;

export const LeftWrapper = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: ${sizes.LAPTOP_M}) {
    position: relative;
  }

  @media (min-width: ${sizes.LAPTOP_L}) {
    position: absolute;
    top: 0;
    left: 40px;
    height: 100%;
  }
`;

export const CounterClockSpan = styled(TSpan)<{ isCountDown?: boolean }>`
  display: block;
  color: ${({ isCountDown }) =>
    isCountDown
      ? 'var(--text-timestamp-danger-primary-default)'
      : 'var(--text-timestamp-neutral-default)'};
  margin-top: 4px;
`;

export const TitleSpan = styled(TSpan)<{ isGray?: boolean }>`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  ${({ isGray }) =>
    isGray
      ? 'color: var(--text-card-neutral-default)'
      : 'color: var(--text-appbar-neutral-default)'};
  text-overflow: ellipsis;
  font-size: var(--font-body-large-size);
`;

export const TagSpan = styled(TSpan)`
  display: block;
  font-size: 12px;
  line-height: 160%;
  font-weight: 600;
  background-color: var(--bg-tab-chips-brand-secondary-selected);
  border-radius: 8px;
  padding: 2px 6px;
  white-space: nowrap;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    margin-right: 10px;
  }
`;

export const TagTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const IconButton = styled.div`
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  padding: 8px;
  background: var(--bg-button-neutral-default);
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DropdownWrapper = styled.div``;

export const SocialHallBottomSheetBody = styled(BottomSheetBody)`
  gap: 16px;
  justify-content: flex-end;
  padding-bottom: 30px;
  padding-top: 16px;
`;
