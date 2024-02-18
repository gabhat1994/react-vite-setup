import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';

export const StyledNoumsForYouSection = styled.div`
  box-sizing: border-box;
  padding: 16px;
  width: 100%;
  min-width: 322px;
  min-height: 182px;
  background: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  flex: none;
  flex-grow: 0;
  @media (max-width: ${sizes.TABLET_L}) {
    min-width: 704px;
    min-height: 160px;
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100vw;
    min-width: unset;
    margin: unset;
    min-height: 182px;
    border-radius: unset;
    margin-bottom: 16px;
    padding: 16;
  }
`;

export const StyledCardsSection = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  width: 100%;
  .mySwiper {
    display: flex;
    flex-direction: column-reverse;
    @media (max-width: 767px) {
      flex-direction: column;
    }
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    padding: 16px;
  }
`;

export const StyledSwiperControls = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 16px;
  margin-left: -6px;
  .swiper-icons {
    display: flex;
    .disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .swiper-control-btn {
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 8px;
      gap: 10px;
      width: 40px;
      height: 40px;
      background: var(--bg-button-neutral-default);
      border-radius: 8px;
    }
    .show-all {
      cursor: pointer;
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 100%;
      color: var(--text-button-brand-primary-default);
      margin-left: 16px;
    }
    > div:first-of-type {
      margin-right: 8px;
    }
    @media (max-width: ${sizes.MOBILE_MAX}) {
      display: none;
    }
  }
`;

export const SpinnerContainer = styled(Stack)`
  position: relative;
  padding: 5px;
  height: 245px;
`;
