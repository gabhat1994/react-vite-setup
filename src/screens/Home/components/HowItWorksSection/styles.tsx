import styled from 'styled-components';
import { sizes, mediaSizes } from '@/constants/devices';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { singleLineEllipisText } from '@/common/globalStyles';

export const StyledHowItWorksSection = styled.div`
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
  /* order: 3; */
  flex-grow: 0;

  @media (max-width: ${sizes.TABLET_L}) {
    min-width: 704px;
    min-height: 160px;
    width: calc(100% - 32px);
    margin: 0 16px;
  }

  @media (max-width: ${sizes.MOBILE_MAX}) {
    width: 100vw;
    min-width: unset;
    margin: unset;
    min-height: 182px;
    border-radius: unset;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const HeaderTitle = styled(TSpan)`
  display: flex;
  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    width: 60%;
    font-weight: 600;
    font-size: 18px;
    line-height: 160%;
  }
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    display: inline-flex;
    width: 85%;
    word-break: break-word;
  }
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    width: 70%;
  }
  @media (max-width: ${mediaSizes.MOBILE_L_MIN}) {
    width: 60%;
  }
`;
export const ShowAllButton = styled(Button)`
  display: none;
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    display: inline-flex;
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
    .swiper-slide {
      height: auto;
    }
  }
`;

export const StyledSwiperControls = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
  margin-left: -6px;
  .swiper-icons {
    display: flex;
    align-items: center;
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
      display: flex;
      align-items: center;
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

export const StyledCard = styled.div.attrs(
  (props: { imageUrl: string }) => props,
)`
  cursor: pointer;
  box-sizing: border-box;
  height: 100%;
  padding: 8px !important;
  display: flex;
  flex-direction: column;
  padding: 0px;
  border: 1px solid var(--border-card-neutral-highlighted);
  border-radius: 20px;
  &.featured {
    display: flex;
    flex-direction: row;
  }
  &.featured .article-image {
    height: 100%;
    width: 50%;
    min-width: 50%;
  }
  &.featured .article-details {
    padding: 24px;
    .title {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: 18px;
      line-height: 160%;
    }
    .content {
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
  .article-image {
    border-radius: 12px;
    width: 100%;
    height: 134px;
    background: url(${(props) => props.imageUrl}) no-repeat center center;
    background-size: cover;
  }
  .article-details {
    padding: 8px;
    text-align: left;
    .type {
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 160%;
      color: var(--text-card-header-neutral-default);
    }
    .title {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 150%;
      color: var(--text-card-header-neutral-highlighted);
      ${singleLineEllipisText}
    }
    .content {
      padding-top: 4px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 160%;
      color: var(--text-card-header-neutral-default);
      opacity: 0.75;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .link {
      padding-top: 0.75rem;
      display: flex;
      align-items: center;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 100%;
      > div {
        padding-left: 8px;
      }
    }
  }
`;
