import styled from 'styled-components';
import { mediaSizes, sizes } from '@/constants/devices';

export const Container = styled.div<{ isAppUiV2: boolean }>`
  font-family: var(--font-family);
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
  img {
    height: auto;
    object-fit: cover;
  }

  ${(props) =>
    props.isAppUiV2
      ? `
    padding: 0;

    @media (min-width: ${mediaSizes.TABLET_MIN}) {
      max-width: 894px;
      margin: 0 auto;
    }
    `
      : `
  @media (max-width: ${mediaSizes.TABLET_MAX}) and (min-width: ${mediaSizes.TABLET_MIN}) {
    width: 100vw;
    padding: 0;
  }
  @media (max-width: ${mediaSizes.LAPTOP_MAX}) and (min-width: ${mediaSizes.LAPTOP_MIN}) {
    width: 894px;
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

export const StyledArticleDetail = styled.div`
  margin: 0 auto;
  width: 668px;
  font-family: var(--font-family);
  padding-bottom: 85px;

  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 140%;
    color: var(--text-body-header-neutral-default);
    margin: 16px 0;
  }

  h1:nth-of-type(2) {
    font-size: 24px;
  }

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 160%;
    color: var(--text-body-neutral-highlighted);
    img {
      width: 100%;
      height: 413px;
    }
  }

  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    width: 100vw;
    box-sizing: border-box;
    padding: 0 16px;
    padding-bottom: 60px;
  }
`;

export const StyledCategory = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 150%;
  color: var(--text-body-brand-primary-default);
  padding-bottom: 8px;
`;

export const StyledFeaturedImageContainer = styled.div.attrs(
  (props: { bgImage: string }) => props,
)`
  .clickable {
    cursor: pointer;
  }
  .relative-btn-ctr {
    position: relative;
    bottom: calc(40px + 24px);
    display: flex;
    justify-content: center;
  }
`;

export const StyledBanner = styled.div.attrs(
  (props: { bgImage: string }) => props,
)`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 48px;
  gap: 40px;
  isolation: isolate;
  background: url('${({ bgImage }) => bgImage}'),
    linear-gradient(
      267.32deg,
      var(--bg-card-brand-secondary-default) 33.52%,
      rgba(242, 238, 254, 0.4) 76.82%
    );
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 16px;
  margin-bottom: 100px;
  .left {
    .description {
      color: var(--text-card-brand-primary-default);
      padding: 0;
    }
    button {
      cursor: pointer;
    }
  }
  .right {
    width: 100%;
    max-width: 277px;
    > div {
      cursor: pointer;
      box-sizing: border-box;
      width: 100%;
      max-width: 277px;
      text-align: center;
    }
  }
  @media (max-width: ${mediaSizes.TABLET_MAX}) {
    border-radius: unset;
  }
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    flex-direction: column;
    text-align: center;
    padding: 24px 16px 16px;
    gap: 24px;
  }
`;

export const ArticeMainImage = styled.img`
  height: 360px;
  border-radius: 16px;
  width: 100%;
  @media (max-width: ${sizes.TABLET_L}) {
    border-radius: unset;
  }
  @media (max-width: ${sizes.TABLET}) {
    height: 216px;
  }
`;
