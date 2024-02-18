import styled from 'styled-components';
import { devices, mediaSizes, sizes } from '@/constants/devices';
import { TSpan } from '@/components/Typography';

export const FinancialSolutionWrapper = styled.div`
  font-family: var(--font-family);
  background-color: var(--bg-card-brand-primary-highlighted);
  background: linear-gradient(
    180deg,
    rgba(49, 13, 117, 1) 17%,
    rgba(102, 63, 186, 1) 100%,
    rgba(255, 255, 255, 1) 42%,
    rgba(255, 255, 255, 1) 100%
  );
  border-radius: 0px;
  box-sizing: border-box;
  width: 100%;
  @media ${devices.LAPTOP} {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }
`;
export const TitleWrapper = styled('div')`
  padding-top: 32px;
  padding-bottom: 32px;
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  flex-direction: column;
  @media (max-width: 767px) {
    padding-left: 16px;
    padding-right: 16px;
    padding-bottom: 16px;
  }
`;
export const FinancialSolutionHeaderWrapper = styled.div<{
  hidePadding: boolean;
}>`
  transition: all 0.12s liner;
  background: linear-gradient(
    180deg,
    rgba(102, 63, 186, 1) 42%,
    rgba(255, 255, 255, 1) 42%,
    rgba(255, 255, 255, 1) 100%
  );
  border-radius: 0px;
  padding-left: ${(props) => (props.hidePadding ? '0px' : '16px')};
  padding-bottom: 16px;
  width: 100%;
  box-sizing: border-box;
  @media ${devices.LAPTOP} {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }
`;

export const Title = styled(TSpan)`
  align-self: center;
  @media (max-width: ${mediaSizes.MOBILE_XL_MAX}) {
    font-size: var(--font-header-xsmall-size);
  } ;
`;

export const SubTitle = styled(TSpan)`
  align-self: center;
  text-align: center;
  padding: 0px 16px 16px 16px;
  width: 100%;
  @media (max-width: 767px) {
    padding-top: 8px;
  }
`;

export const SubSubTitle = styled(TSpan)`
  text-align: center;
  line-height: var(--font-input-medium-lineheight);
  align-self: center;
`;

export const ArticlesContainer = styled.div`
  width: 100%;
`;
export const ArticlesContainerFlex = styled.div`
  width: 100%;
  text-align: center;
  .mySwiper {
    display: flex;
    flex-direction: column-reverse;
  }
`;

export const ArticleContainer = styled.div<{ isAppUiV2: boolean }>`
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  width: ${(props) => (props.isAppUiV2 ? 'auto' : '335px')};
  height: 248px;
  display: flex;
  flex-direction: column;
  border: 1px solid #e7e6e9;
  gap: 8px;
`;
export const ArticleHeader = styled.div`
  display: flex;
`;

export const LoadingContainer = styled.div`
  display: flex;
  height: 250px;
  width: 250px;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;
export const HeaderText = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  font-weight: var(--font-body-xlarge-bold-weight);
`;

export const BodyTextArticle = styled.div`
  display: flex;
  flex-grow: 1;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 160%;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ButtonContainer = styled.div`
  padding-top: 8px;
  display: flex;
`;

export const Container = styled.div<{ $isAppUiV2: boolean }>`
  font-family: var(--font-family);
  width: 100%;
  box-sizing: border-box;
  padding: 16px;

  ${(props) =>
    props.$isAppUiV2
      ? `
    width: 100%;
    padding: 0;
    `
      : `
  @media (max-width: ${mediaSizes.TABLET_MAX}) and (min-width: ${mediaSizes.TABLET_MIN}) {
    width: 736px;
  }
  @media (max-width: ${mediaSizes.LAPTOP_MAX}) and (min-width: ${mediaSizes.LAPTOP_MIN}) {
    width: 736px;
  }
  @media (max-width: ${mediaSizes.LAPTOP_L_MAX}) and (min-width: ${mediaSizes.LAPTOP_L_MIN}) {
    width: 894px;
  }
  @media (min-width: ${sizes.DESKTOP}) {
    width: calc(100vw - 200px);
    max-width: 894px;
  }
  @media (max-width: ${mediaSizes.TABLET_MIN}) {
    padding: unset;
  }
  `}
`;

export const StyledArticleDetail = styled.div<{ $isAppUiV2: boolean }>`
  margin: 0 auto;
  width: 668px;
  font-family: var(--font-family);
  padding-bottom: 85px;

  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 140%;
    color: var(--text-card-header-neutral-highlighted);
    margin: 16px 0;
  }

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 160%;
    color: var(--text-card-header-neutral-highlighted);
    img {
      width: 100%;
      height: 413px;
    }
  }

  @media (max-width: ${mediaSizes.TABLET_MIN}) {
    box-sizing: border-box;
    padding-bottom: 60px;
    ${(props) =>
      props.$isAppUiV2
        ? `
    width: 100%;
    padding: 0;
    `
        : `
    width: 100vw;
    padding: 0 16px;
    `}
  }
`;

export const ArticeMainImage = styled.img`
  height: 360px;
  background: var(--bg-body-neutral-alt-default);
  border-radius: 16px;
  width: 100%;
  object-fit: cover;
`;

export const StyledSwiperControls = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  @media (max-width: 767px) {
    padding-bottom: 0px;
  }
  .swiper-icons {
    position: absolute;
    right: 20px;
    .stepper {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
    }
    display: flex;
    .disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    @media (max-width: ${sizes.MOBILE_MAX}) {
      display: none;
    }
  }
`;
