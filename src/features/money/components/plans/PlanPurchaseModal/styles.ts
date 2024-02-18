import { noScrollBar } from '@/common/globalStyles';
import { Button, TSpan } from '@/components';
import { ModalBody } from '@/components/ExtendedModal';
import { Stack } from '@/layout';
import styled, { css } from 'styled-components';

export const SwiperContainer = styled(Stack).attrs({
  fullWidth: true,
  align: 'center',
  justify: 'start',
})`
  .swiper-slide {
    min-width: 316px;
  }
`;

export const Indicator = styled.span<{ isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--bg-progressbar-neutral-default);
  ${({ isActive }) =>
    isActive &&
    css`
      background: var(--bg-stepper-brand-primary-default);
    `}
`;

export const MainTable = styled(Stack).attrs({
  align: 'end',
})`
  width: 1360px;
`;

export const CommonFeatures = styled.div`
  width: 410px;
  padding: 0;
`;

export const PlanLevelFeatures = styled.div`
  width: 950px;
  position: relative;
`;

export const PricingTiles = styled.div`
  width: 100%;
  padding: 0;
`;

export const Category = styled(TSpan).attrs({
  font: 'heading-xs-bold',
  colorToken: '--text-tablecell-brand-primary-default',
})``;

export const Feature = styled(TSpan).attrs({
  font: 'body-m-bold',
  colorToken: '--text-tablecell-header-neutral-highlighted',
})``;

export const FeatureCell = styled.div<{
  context: 'menu' | 'feature';
  highlight?: boolean;
}>`
  width: 100%;
  border-right: 1px solid var(--border-card-neutral-default);
  box-sizing: border-box;
  padding: 12px;
  height: 48px;

  ${({ highlight }) =>
    highlight &&
    css`
      background: var(--color-base-gray-90);
    `}

  ${({ context }) =>
    context === 'menu' &&
    css`
      padding: 16px;
      height: 56px;
    `}
`;

export const PropertyCell = styled(Stack).attrs({
  fullWidth: true,
  align: 'center',
  justify: 'center',
})<{
  context: 'menu' | 'property';
  hightLight?: boolean;
}>`
  border-right: 1px solid var(--border-card-neutral-default);
  box-sizing: border-box;
  padding: 12px;
  height: 48px;
  ${({ hightLight }) =>
    hightLight &&
    css`
      background: var(--color-base-gray-90);
    `}
  ${({ context }) =>
    context === 'menu' &&
    css`
      padding: 16px;
      height: 56px;
    `}
`;

export const SlidWrapper = styled.div`
  min-width: 316px;
  width: 316px;
`;

export const ComparePlansButton = styled(Button).attrs({
  textOnly: true,
})`
  position: absolute;
  right: 24px;
`;

export const PreviousButtonWrapper = styled.span`
  position: sticky;
  top: 27.5%;
  margin-left: -8%;
  z-index: 2;
`;

export const NextButtonWrapper = styled.span`
  position: sticky;
  top: 27.5%;
  margin-left: 102%;
  z-index: 2;
`;

export const PlanCustomizationStack = styled(Stack).attrs({
  fullWidth: true,
})`
  background: var(--bg-body-neutral-alt-highlighted);
  height: 100%;
`;

export const PlanCardStack = styled(Stack).attrs({
  fullWidth: true,
  align: 'center',
})`
  width: 384px;
  padding: 24px 12px 24px 24px;
`;

export const PlanFrequencyStack = styled(PlanCardStack)`
  padding: 24px 24px 24px 12px;
  align-items: flex-start;
`;

export const FrequencyCardWrapper = styled(Stack).attrs({
  align: 'center',
  fullWidth: true,
  justify: 'space-between',
})<{ hightLight: boolean }>`
  height: 78px;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid var(--border-card-neutral-highlighted);
  background: var(--bg-tablecell-neutral-alt-default);
  ${({ hightLight }) =>
    hightLight &&
    css`
      border: 1px solid var(--border-card-brand-primary-default);
    `}
`;

export const LoadingWrapper = styled.div`
  height: 500px;
`;

export const LeftMask = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 72px;
  height: 100%;
  background: linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, 0) 100%);
  z-index: 2;
`;

export const RightMask = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 72px;
  height: 100%;
  background: linear-gradient(270deg, #fff 0%, rgba(255, 255, 255, 0) 100%);
  z-index: 2;
`;

export const StyledModalBody = styled(ModalBody)<{
  shouldJustifyCenter: boolean;
}>`
  ${({ shouldJustifyCenter }) =>
    shouldJustifyCenter &&
    css`
      justify-content: center;
    `}
`;

export const ExistingNoumCard = styled(Stack).attrs({
  fullWidth: true,
  align: 'center',
  justify: 'space-between',
})`
  padding: 16px;
  border: 1px solid var(--border-card-neutral-default);
  border-radius: 8px;
`;

export const Image = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 6px;
`;

export const IframeWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

export const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
`;

export const CheckoutModalBody = styled(ModalBody)`
  ${noScrollBar}
`;
