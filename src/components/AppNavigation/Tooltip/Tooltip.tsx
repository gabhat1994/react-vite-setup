import { zIndex } from '@/constants/zIndex';
import { type CSSProperties, forwardRef, type ReactNode } from 'react';
import * as S from './styles';

interface TooltipProps {
  children: ReactNode;
  isOpen: boolean;
  style?: CSSProperties;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, isOpen, style, ...props }, ref) => (
    <div
      ref={ref}
      style={{
        zIndex: zIndex.tooltip,
        minWidth: 'min-content',
        maxWidth: 300,
        ...style,
        visibility: isOpen ? 'visible' : 'hidden',
        pointerEvents: isOpen ? 'initial' : 'none',
      }}
      {...props}
    >
      <S.NavTooltipContent>{children}</S.NavTooltipContent>
    </div>
  ),
);
