import styled from 'styled-components';
import { Button } from '@/components/Button';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
`;

export const Carousel = styled.div`
  flex: 1;
  justify-content: flex-start;
  display: flex;
  flex-direction: row;
  position: absolute;
  height: 100%;
  align-items: center;
`;

export const Gallery = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex: 1;
`;

export const GalleryItem = styled.div<{ gutterSpace?: number }>`
  padding: ${({ gutterSpace }) => (gutterSpace ? `${gutterSpace}px` : 0)};
  box-sizing: border-box;
`;

const SocialHallPaginationButton = styled(Button)<{
  active?: boolean;
  disabled?: boolean;
}>`
  width: 40px;
  height: 8px;
  max-width: 40px;
  min-width: 40px;
  min-height: 8px;
  max-height: 8px;
  display: flex;
  align-items: center;
  padding: 0px 1px 0px 0px;
  justify-content: center;
`;

export const PageButton = styled(SocialHallPaginationButton)<{
  active?: boolean;
  disabled?: boolean;
}>`
  border-radius: 32px;
  border-style: solid;
  border-color: transparent;
  background-color: ${({ active }) =>
    active
      ? 'var(--bg-stepper-brand-primary-default)'
      : 'var(--bg-stepper-brand-secondary-default)'};
`;

export const JumpButton = styled(SocialHallPaginationButton)<{
  disabled?: boolean;
}>`
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

export const PaginationControl = styled.div`
  position: absolute;
  bottom: 0;
`;
