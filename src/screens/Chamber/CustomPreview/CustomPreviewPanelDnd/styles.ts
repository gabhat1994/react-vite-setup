import styled, { css } from 'styled-components';
import { TSpan } from '@/components/Typography';
import { mediaSizes, sizes } from '@/constants/devices';
import { Button } from '@/components/Button';

export const DropZone = styled.div<{
  isDraggingOver: boolean;
  isDraggingFrom: boolean;
}>`
  padding-bottom: 8px;
  width: 100%;
  &:empty {
    padding-bottom: 0px;
  }
  @media (max-width: ${sizes.TABLET_L}) {
    width: 100%;
    margin: auto;
  }
`;

export const DNDContainer = styled.div<{ isDragging?: boolean }>`
  &:first-child {
    padding-top: 0px;
  }
`;

const xsHidden = css`
  @media (max-width: ${mediaSizes.MOBILE_L_MAX}) {
    display: none;
  }
`;

export const WrapperIcons = styled.div<{
  disabled?: boolean;
}>`
  cursor: pointer;
  opacity: ${(p) => (p.disabled ? '0.2' : '1')};
  &.xs-hidden {
    ${xsHidden}
  }
`;

export const DnDHandlerButton = styled(Button)`
  cursor: inherit;
`;

export const IconButton = styled(Button)`
  width: 24px;
  &[data-tooltip]:hover::after {
    max-width: 200px;
    bottom: 20px;
  }
`;

export const ToolNameSpan = styled(TSpan)`
  text-overflow: ellipsis;
  overflow: hidden;
`;
