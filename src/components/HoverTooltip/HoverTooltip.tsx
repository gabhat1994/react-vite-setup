import { type FC, type HTMLAttributes } from 'react';
import S from './styles';
import { type TooltipPosition } from './types';

type HoverTooltipProps = HTMLAttributes<HTMLDivElement> & {
  position: TooltipPosition;
  text: string;
  visible?: boolean;
  delay?: number;
};

export const HoverTooltip: FC<HoverTooltipProps> = ({
  position,
  text,
  children,
  visible,
  delay = 0,
}) =>
  visible ? (
    <S.Container
      delay={delay}
      text={text}
      data-tooltip={text}
      position={position}
    >
      {children}
    </S.Container>
  ) : (
    <>{children}</>
  );
