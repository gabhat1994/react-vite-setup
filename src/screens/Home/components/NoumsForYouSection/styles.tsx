import styled from 'styled-components';
import { sizes } from '@/constants/devices';
import { Stack } from '@/layout';
import { singleLineEllipisText } from '@/common/globalStyles';

export const StyledNoumsForYouSection = styled.div`
  h2 {
    margin-top: 0;
  }
  box-sizing: border-box;
  padding: 24px;
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
    width: calc(100% - 32px);
    margin: 0 16px;
    > span:first-of-type {
      font-weight: 600;
      font-size: 18px;
      line-height: 160%;
    }
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100vw;
    min-width: unset;
    margin: unset;
    min-height: 182px;
    border-radius: unset;
    margin-bottom: 16px;
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

export const StyledNoumCard = styled.div.attrs(
  (props: { imageUrl: string; backgroundColor: string; color: string }) =>
    props,
)`
  cursor: pointer;
  padding: 8px !important;
  display: flex;
  flex-direction: column;
  padding: 0px;
  background: var(--bg-card-neutral-alt-default);
  border: 1px solid var(--border-card-neutral-highlighted);
  border-radius: 20px;
  .cover {
    height: 56px;
    background-color: ${(props) => `var(${props.backgroundColor})`};
    border-radius: 12px;
  }
  .transform-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(-40%);
    .image {
      border-radius: 12px;
      width: 80px;
      height: 80px;
      background: ${(props) =>
        props.imageUrl
          ? `url('${props.imageUrl}') no-repeat center center`
          : `var(${props.backgroundColor})`};
      background-size: cover;
      align-self: center;
      border: 4px solid var(--border-avatar-neutral-alt-default);
    }
    .type {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1px 6px 2px;
      background-color: ${(props) => `var(${props.backgroundColor})`};
      border: 2px solid var(--border-badge-neutral-alt-default);
      border-radius: 8px;
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 160%;
      text-align: center;
      color: ${(props) => `var(${props.color})`};
      transform: translateY(-50%);
    }
    .name {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 150%;
      color: var(--link-card-neutral-highlighted);
      margin: -20px 0px 2px 0px;
      ${singleLineEllipisText}
    }
    .owned-by {
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 160%;
      color: var(--text-card-neutral-default);
      margin: 2px 0px 0px 0px;
      ${singleLineEllipisText}
    }
  }

  .transform-block-50 {
    transform: translateY(-50%);
  }

  .followers {
    padding-top: 8px;
    border-top: 1px solid var(--bg-separator-neutral-default);
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 160%;
    color: var(---text-card-neutral-default);
  }
`;

export const SpinnerContainer = styled(Stack)`
  position: relative;
  padding: 5px;
  height: 245px;
`;
