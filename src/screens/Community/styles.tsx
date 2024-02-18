import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';

type ElementWrapperProps = {
  isMarginTop?: boolean;
};

export const ElementWrapper = styled.div<ElementWrapperProps>`
  border: 1px solid var(--border-card-neutral-highlighted);
  padding: 16px;
  gap: 10px;
  background: var(--bg-card-neutral-alt-default);
  display: grid;
  grid-template-columns: 56px auto;
  align-items: center;
  margin-top: 16px;
  box-sizing: border-box;

  @media (min-width: ${sizes.TABLET}) {
    margin-top: 16px;
    border-radius: 16px;
    grid-template-columns: 56px auto 48px;
    width: 92%;
    margin-left: auto;
    margin-right: auto;
  }

  @media (min-width: ${sizes.LAPTOP}) {
    margin-top: ${({ isMarginTop }) => (isMarginTop ? '20px' : '0')};
    width: unset;
  }
`;

export const StartDiscussion = styled.div`
  background: var(--bg-input-neutral-default);
  border-radius: 8px;
  height: 52px;
  color: var(--text-input-neutral-default);
  font-size: 16px;
  padding-left: 12px;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-family: var(--font-family);
  width: calc(100% - 10px);

  @media (min-width: ${sizes.TABLET}) {
    width: 95%;
  }

  @media (min-width: ${sizes.DESKTOP}) {
    width: 100%;
  }
`;

export const TabContainer = styled(Stack)`
  gap: 16px;
  margin: 16px 12px 0;
  width: 100%;
`;

export const NoPostsContainer = styled(Stack)`
  gap: 16px;
  margin: 32px 12px 0;
  width: 100%;
`;

export const TabButton = styled.div<{ isActive?: boolean }>`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  height: 40px;
  padding: 9px 12px;
  cursor: pointer;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: var(--font-body-medium-size);
  color: var(--text-tab-chips-neutral-default);
  ${({ isActive }) =>
    isActive
      ? 'color: var(--text-tab-chips-brand-primary-selected); background-color: var(--bg-tab-chips-brand-secondary-selected);'
      : undefined}
`;

export const StyledAvatar = styled.img<{ isClickable: boolean }>`
  min-width: 52px;
  width: 52px;
  height: 52px;
  border-radius: 12px;
  ${({ isClickable }) => (isClickable ? 'cursor: pointer;' : undefined)}
`;

export const RightSideBarContainer = styled.div`
  @media (min-width: ${sizes.LAPTOP}) {
    width: 288px;
    margin-left: 0;
  }
`;

export const PageCnt = styled.div`
  width: 100vw;
`;

export const Container = styled(Stack)<{ isAppUiV2: boolean }>`
  width: 100%;

  ${(props) =>
    !props.isAppUiV2 &&
    `
  @media (min-width: ${sizes.TABLET_L}) and (max-width: ${sizes.LAPTOP_L}) {
    width: calc(100vw - 512px);
    max-width: 924px;
  }
  @media (min-width: ${sizes.TABLET}) and (max-width: ${sizes.TABLET_L}) {
    width: calc(100vw - 32px);
  }
  @media (min-width: ${sizes.LAPTOP_L}) {
    width: calc(100vw - 516px);
    max-width: 924px;
  }
  @media (min-width: ${sizes.DESKTOP}) {
    max-width: 924px;
  }
  @media (max-width: ${sizes.TABLET_L}) {
    padding-bottom: 95px;
  }
  `}
`;
