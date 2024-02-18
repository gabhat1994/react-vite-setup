import styled from 'styled-components';
import { mediaSizes, sizes } from '@/constants/devices';
import { singleLineEllipisText } from '@/common/globalStyles';

export const Container = styled.div<{ $isAppUiV2: boolean }>`
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  padding: 16px;

  ${(props) =>
    props.$isAppUiV2
      ? `
        padding: 0;
      `
      : `
  @media (max-width: ${mediaSizes.TABLET_MAX}) and (min-width: ${mediaSizes.TABLET_MIN}) {
    width: calc(100vw - 32px);
    padding: 16px 0 0 0;
  }
  @media (max-width: ${mediaSizes.LAPTOP_MAX}) and (min-width: ${mediaSizes.LAPTOP_MIN}) {
    width: 100%;
    max-width: 1224px;
    padding: 0;
  }
  @media (max-width: ${mediaSizes.LAPTOP_L_MAX}) and (min-width: ${mediaSizes.LAPTOP_L_MIN}) {
    width: 1224px;
    padding: 0;
  }
  @media (min-width: ${sizes.DESKTOP}) {
    width: calc(100vw - 200px);
    max-width: 1224px;
    padding: 0;
  }
  `}
`;

export const StyledAllArticles = styled.div`
  font-family: var(--font-family);
  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    padding-bottom: 87px;
  }
`;

export const StyledHeader = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 150%;
  color: var(--text-body-header-neutral-default);
  margin-bottom: 16px;
`;

export const StyledTagsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: var(--bg-card-neutral-alt-default);
  border-radius: 16px;
  padding: 24px;
  margin: 24px 0;
  .tags {
    > span {
      margin-right: 12px;
    }
  }
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    margin: 0;
    border-radius: unset;
  }
  @media (min-width: ${mediaSizes.TABLET_MIN}) and (max-width: ${mediaSizes.TABLET_MAX}) {
    padding: 16px;
    margin: 16px 0;
  }
  @media (max-width: ${mediaSizes.TABLET_MIN}) {
    padding: 16px;
  }
`;

export const StyledArticlesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: max-content;
  grid-gap: 24px;
  padding-bottom: 24px;
  .StyledCard {
    :nth-child(9n + 1) {
      grid-column: auto / span 2;
    }
  }

  @media (min-width: ${mediaSizes.TABLET_MIN}) and (max-width: ${mediaSizes.TABLET_MAX}) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 16px;
    padding-bottom: 16px;
    .StyledCard {
      :nth-child(9n + 1) {
        grid-column: auto / span 1;
      }
      :nth-child(7n + 1) {
        grid-column: auto / span 3;
      }
    }
  }

  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 16px;
    padding-bottom: 16px;
    .StyledCard {
      :nth-child(9n + 1) {
        grid-column: auto / span 1;
      }
      :nth-child(7n + 1) {
        grid-column: auto / span 1;
      }
    }
  }
  @media (max-width: ${mediaSizes.MOBILE_XL_MAX}) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 16px;
    padding-bottom: 16px;
    .StyledCard {
      :nth-child(9n + 1) {
        grid-column: auto / span 1;
      }
      :nth-child(7n + 1) {
        grid-column: auto / span 1;
      }
    }
  }
`;

export const StyledCard = styled.div.attrs(
  (props: { imageUrl: string }) => props,
)`
  cursor: pointer;
  padding: 8px !important;
  display: flex;
  flex-direction: column;
  padding: 0px;
  background: var(--bg-card-neutral-alt-default);
  border-radius: 20px;
  &.featured {
    display: flex;
    flex-direction: row;
    min-height: 225px;
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
      padding-top: 8px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 160%;
      color: var(--text-card-neutral-default);
      opacity: 0.75;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .link {
      cursor: pointer;
      border: none;
      background: transparent;
      padding-top: 20px;
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
