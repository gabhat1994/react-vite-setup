import styled from 'styled-components';
import { sizes, devices } from '@/constants/devices';
import { Button } from '@/components/Button/';
import { type LabelType, type StepsType, type SliderBodyType } from './types';

export const StoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  padding: 5px 5px;
  background-color: var(--bg-body-neutral-alt-highlighted);
  margin: auto;
  @media (min-width: ${sizes.LAPTOP_L}) {
    width: 1224px;
  }
  @media (max-width: ${sizes.TABLET}) and (min-width: ${sizes.MOBILE_MAX}) {
    width: 763px;
  }
`;
export const SliderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: var(--font-family);
  font-style: normal;
  overflow: hidden;
  position: relative;
  padding-bottom: 24px;
`;
export const SliderHeader = styled.div<{ direction?: 'column' | 'row' }>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'row'};
  gap: 16px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
export const SliderBody = styled.div<SliderBodyType>`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: ${(props) =>
    props.flexStart ? 'flex-start' : 'space-between'};
  overflow-x: scroll;
  @media (max-width: ${sizes.MOBILE_L}) {
    width: 100%;
  }
`;
export const SliderInfo = styled.div<{ showTabs?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    padding: 0 16px;
  }
  @media (min-width: ${sizes.MOBILE_MAX}) {
    ${({ showTabs }) => showTabs && 'width: 100%'};
  }
`;
export const SliderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 0;
  width: 256px;
  height: 40px;
  left: 968px;
  top: 7px;
  @media (max-width: 478px) {
    display: none;
  }
`;
export const Steps = styled.div<StepsType>`
  background: ${(props) =>
    props.disabled
      ? 'var(--bg-button-neutral-disabled)'
      : 'var(--bg-button-neutral-alt-default)'};
  padding: 8px;
  border-radius: 8px;
  z-index: 1;
  margin-right: ${(props) =>
    props.marginRight ? `${props.marginRight}px` : 0};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;
export const ShowAllButton = styled(Button)``;
export const CardContainer = styled.div<LabelType>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: ${(props) =>
    props.marginBottom ? `${props.marginBottom}px` : 0};
  height: max-content;
  margin-right: 16px;
  width: ${(props) =>
    props.countPerPage
      ? props?.isNotFilledItems
        ? `calc(calc(100% - 32px)/${props.countPerPage})`
        : `${100 / props.countPerPage}%`
      : '100%'};
  @media ${devices.TABLET} and (max-width: ${sizes.LAPTOP}) {
    min-width: 230px;
    margin-bottom: 16px;
  }
  @media (max-width: 767px) {
    min-width: 260px;
    margin-right: 16px;
    ${(props) =>
      props.deviceWidth && !props?.isNotFilledItems
        ? ' width: calc(100vw - 50px) !important'
        : ''};
  }
  :last-of-type {
    margin-right: 0;
  }
`;
export const MobileShowAllButton = styled(Button)`
  background-color: var(--bg-button-neutral-alt-default);
  margin: 16px 16px 0;
  display: none;
  @media (max-width: ${sizes.TABLET}) {
    display: block;
  }
`;

export const ResponsiveSlider = styled.div`
  @media (min-width: ${sizes.MOBILE_L}) {
    .slide {
      display: flex;
      flex-direction: row !important;
      justify-content: flex-start;
    }
  }
`;

export const ChamberItem = styled.div<{ isBordered?: boolean }>`
  cursor: pointer;
  ${({ isBordered }) =>
    isBordered
      ? 'border: 1px solid var(--border-card-neutral-highlighted); border-radius: 16px;'
      : ''};
`;

export const SwiperContainer = styled.div<{
  isSwiping?: boolean;
  isEnd?: boolean;
}>`
  width: 100%;
  padding: 0 16px;
  ${({ isSwiping }) => (isSwiping ? 'padding: 0;' : '')};
  ${({ isEnd }) => (isEnd ? 'padding-right: 16px;' : '')};
`;

export const RecommendedSectionHeader = styled.div<{ full?: boolean }>`
  display: flex;
  align-items: center;
  ${({ full }) => full && 'width: 100%'};
`;

export const TabContainer = styled.div`
  width: fit-content;
  flex: 1;
  margin-left: -6px;
  @media (max-width: ${sizes.MOBILE_MAX}) {
    padding: 0 16px;
  }
`;
