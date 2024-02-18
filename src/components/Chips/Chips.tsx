import { type FC, forwardRef, type Ref } from 'react';
import {
  ChipsLeftIconStyled,
  ChipsRightIconStyled,
  ChipsStyled,
  ChipsText,
  StyledWrapper,
} from './styles';
import { type ChipsProps } from './types';

export const ChipsStyledComponent: FC<ChipsProps> = ({ children, ...rest }) => (
  <ChipsStyled {...rest}>{children}</ChipsStyled>
);

export const Chips = forwardRef(
  (
    {
      children,
      icon,
      rightIcon,
      textOnly,
      primary,
      secondary,
      ...rest
    }: ChipsProps,
    ref: Ref<HTMLSpanElement>,
  ) => (
    <StyledWrapper>
      <ChipsStyled
        data-testid="chipsSpan"
        ref={ref}
        textOnly={!!textOnly}
        primary={!!primary}
        secondary={!!secondary}
        icon={icon}
        rightIcon={rightIcon}
        {...rest}
      >
        {icon ? <ChipsLeftIconStyled>{icon}</ChipsLeftIconStyled> : undefined}
        <ChipsText data-testid="chipsText">{children}</ChipsText>
        {rightIcon ? (
          <ChipsRightIconStyled>{rightIcon}</ChipsRightIconStyled>
        ) : undefined}
      </ChipsStyled>
    </StyledWrapper>
  ),
);
