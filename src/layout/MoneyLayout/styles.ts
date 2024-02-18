import styled from 'styled-components';
import { breakpoints, devices } from '@/constants/devices';
import { type LayoutType } from './types';

export const Container = styled.div.attrs(
  (props: { backgroundColor: string }) => props,
)`
  font-family: var(--font-family);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(
    ${(props) => props.backgroundColor || '--bg-body-neutral-alt-highlighted'}
  );
`;

export const Main = styled.div<{ type?: LayoutType }>`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  gap: 0;

  ${({ type }) => type === 'Chambers' && `padding: 1px 0 0;`}
  ${({ type }) => type === 'Discovery' && `padding: 16px 0 80px;`}
  ${({ type }) => type === 'Money' && `padding: 0px 0 80px;`}

  @media ${devices.TABLET} {
    ${({ type }) => type === 'Chambers' && `padding: 16px 16px 0;`}
    ${({ type }) => type === 'Discovery' && `padding: 16px 16px 80px;`}
    ${({ type }) => type === 'Money' && `padding: 0px 0px 80px;`}
  }
  @media ${devices.LAPTOP} {
    ${({ type }) => type === 'Chambers' && `padding: 24px 40px 0;`}
    ${({ type }) => type === 'Money' && `padding: 24px 40px 0;`}
    ${({ type }) =>
      type === 'Discovery' && `padding: 24px 40px 48px;      gap: 36px;    `}
    ${({ type }) => type === 'Chambers' && `gap: 24px;`}
    ${({ type }) => type === 'Money' && `gap: 24px;`}
  }
`;

export const Content = styled.div<{ type?: LayoutType }>`
  ${({ type }) => type === 'Chambers' && `width: 100%;`}
  ${({ type }) => type === 'Money' && `width: 100%;`}

  @media ${devices.LAPTOP_L} {
    ${({ type }) => type === 'Chambers' && `width: 1224px;`};
    ${({ type }) => type === 'Money' && `width: 1224px;`};
  }
  @media ${devices.TABLET} {
    ${({ type }) => type === 'Chambers' && `max-width: 920px;`};
    ${({ type }) => type === 'Money' && `max-width: 100%;`};
  }
  @media (min-width: ${breakpoints.TABLET_L + 1}px) {
    ${({ type }) => type === 'Money' && `max-width: 924px;`};
  }
`;

export const LeftContent = styled.div<{ type?: LayoutType }>`
  @media ${devices.LAPTOP} {
    ${({ type }) =>
      type === 'Chambers' && `margin-right: 12px; min-width:100px`}
    ${({ type }) =>
      type === 'Money' && `margin-right: 12px; min-width: 100px; width:120px;`}
  }
`;

export const RightContent = styled.div<{ $isAppUiV2?: boolean }>`
  ${(props) =>
    props.$isAppUiV2 &&
    `
    display: none;
    
    @media ${devices.LAPTOP} {
      display: block;
    }
  `}
`;

export const FullWidthMainContainer = styled.div`
  width: 100%;
`;
