import styled from 'styled-components';
import { devices, mediaSizes, sizes } from '@/constants/devices';
import { type LayoutType } from './types';

export const Container = styled.div`
  font-family: var(--font-family);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-body-neutral-alt-highlighted);
`;

const isManagerType = (type?: LayoutType) =>
  ['Contacts', 'Contracts', 'Invoices', 'Campaigns'].includes(type ?? '');

export const Main = styled.div<{ type?: LayoutType }>`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  gap: 0;

  ${({ type }) => type === 'Chambers' && `padding: 1px 0 0;`}
  ${({ type }) => type === 'Community' && `padding: 1px 0 0;`}
  ${({ type }) => type === 'Discovery' && `padding: 1px 0 0;`}

  /* ${({ type }) => type === 'Home' && `padding: 16px 0 80px;`} */
  ${({ type }) => isManagerType(type) && `width: 100%; box-sizing: border-box;`}

  @media ${devices.MOBILE_MAX} {
    ${({ type }) => type === 'Chambers' && `padding: 16px 16px 0;`}
    ${({ type }) => type === 'Community' && `padding: 0px 16px 0;`}
    /* ${({ type }) => type === 'Home' && `padding: 16px 16px 80px;`} */
    ${({ type }) => isManagerType(type) && `padding: 16px 16px 0;`}
  }
  @media ${devices.TABLET} {
    ${({ type }) => type === 'Chambers' && `padding: 16px 16px 0;`}
    ${({ type }) => type === 'Community' && `padding: 0px 16px 0;`}
    /* ${({ type }) => type === 'Home' && `padding: 16px 16px 80px;`} */
    ${({ type }) => isManagerType(type) && `padding: 16px 16px 0;`}
  }
  @media ${devices.LAPTOP} {
    ${({ type }) => type === 'Chambers' && `padding: 24px 40px 0; gap: 24px;`}
    ${({ type }) => type === 'Community' && `padding: 24px 40px 0; gap: 24px;`}
    ${({ type }) =>
      type === 'Discovery' && `padding: 24px 40px 48px; gap: 36px;`}
    ${({ type }) => type === 'Home' && `padding: 24px 40px 48px; gap: 24px;`}
    ${({ type }) =>
      type === 'Articles' && `padding: 24px 32px 48px; gap: 24px;`}
      ${({ type }) => isManagerType(type) && `padding: 24px 40px 0; gap: 24px;`}
  }
  @media (max-width: ${sizes.TABLET_L}) {
    ${({ type }) => type === 'Discovery' && `padding: 16px 16px 0;`}
  }
  @media (max-width: ${sizes.MOBILE_L}) {
    ${({ type }) => type === 'Discovery' && `padding: 16px 0 0 0;`}
  }
  @media (min-width: ${sizes.LAPTOP_L}) {
    ${({ type }) =>
      isManagerType(type) &&
      `
    width: 1360px;
    margin: 0 auto;
    `}
  }
`;
const widePagesTypes = ['Articles'];
export const Content = styled.div<{ type?: LayoutType }>`
  ${({ type }) => isManagerType(type) && `flex-grow: 1;`}

  @media (max-width: ${mediaSizes.TABLET_MIN}) {
    ${({ type }) => widePagesTypes.includes(type || '') && `width: 100%;`};
  }
  @media (min-width: ${mediaSizes.TABLET_MAX}) and (max-width: ${mediaSizes.LAPTOP_MAX}) {
    ${({ type }) =>
      widePagesTypes.includes(type || '') && `width: 100%; max-width: 1248px;`};
  }
  @media ${devices.LAPTOP_L} {
    ${({ type }) => widePagesTypes.includes(type || '') && `width: 1248px;`};
  }
`;

export const LeftContent = styled.div<{ type?: LayoutType }>`
  @media ${devices.LAPTOP} {
    width: 0px;
    ${({ type }) =>
      type === 'Chambers' && `margin-right: 12px; min-width: 100px;`}
    ${({ type }) =>
      type === 'Community' && `margin-right: 12px; min-width: 100px;`}
    ${({ type }) => type === 'Home' && `margin-right: 12px; min-width: 100px;`}
    ${({ type }) =>
      type === 'Discovery' && `margin-right: 12px; min-width: 100px;`}
    ${({ type }) =>
      type === 'Articles' && `margin-right: 12px; min-width: 100px;`}
    ${({ type }) =>
      isManagerType(type) && `margin-right: 12px; min-width: 100px;`}
  }
`;

export const StyledBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  background-color: var(--bg-campaign-banner-success-secondary-default);
  span {
    @media (max-width: ${sizes.TABLET_L}) {
      text-align: left;
    }
    text-align: center;
  }
  .action-buttons {
    margin-left: 40px;
    display: flex;
    align-items: center;
    span {
      cursor: pointer;
    }
    button {
      margin-right: 32px;
      min-height: 40px;
      max-height: 40px;
      padding-top: 0;
      padding-bottom: 0;
    }
  }
  @media (max-width: ${sizes.TABLET_L}) {
    flex-direction: column;
    align-items: flex-start;
    span {
      text-align: left;
    }
    .action-buttons {
      align-items: center;
      margin-left: 0;
      margin-top: 12px;
    }
  }
`;

export const RightContent = styled.div``;
