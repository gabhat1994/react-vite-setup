import styled from 'styled-components';
import { Button } from '@/components/Button';
import { Stack } from '@/layout/Stack';

export const StoryWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  gap: 5px;
  padding: 15px 30px;
  background-color: var(--color-base-gray-100);
`;

export const GalleryViewBody = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  gap: 16px;
`;

export const Steps = styled(Button)<{
  active?: boolean;
  disabled?: boolean;
}>`
  background: var(--bg-button-neutral-default);
  width: 40px;
  height: 40px;
  &:active {
    background-color: transparent !important;
  }
  &:disabled {
    background-color: transparent !important;
  }

  svg path {
    fill: ${({ disabled }) =>
      disabled
        ? `var(--icon-pagination-neutral-disabled) !important`
        : `var(--icon-pagination-brand-primary-default) !important`};
  }
`;

export const HostItem = styled.div`
  width: 169px;
  height: 95px;
  align-items: center;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  background-color: var(--bg-card-neutral-default);
  cursor: pointer;
`;

export const SpeakerCarouselWrapper = styled(Stack)<{ isFullScreen?: boolean }>`
  .carousel.carousel-slider {
    overflow: ${({ isFullScreen }) => (isFullScreen ? `visible` : `hidden`)};
  }
  .carousel .slider-wrapper {
    overflow: ${({ isFullScreen }) => (isFullScreen ? `visible` : `hidden`)};
  }
`;
