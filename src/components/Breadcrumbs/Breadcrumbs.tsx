import { type FC, forwardRef, type Ref } from 'react';
import {
  StyledWrapper,
  Title,
  IconWrapper,
  SecondaryIconWrapper,
} from './styles';
import { type BreadcrumbsProps } from './types';

export const Breadcrumbs: FC<BreadcrumbsProps> = forwardRef(
  (props, ref: Ref<HTMLDivElement>) => {
    const {
      title,
      leftIcon,
      leftSecondaryIcon,
      rightIcon,
      rightSecondaryIcon,
      titleAlign = 'left',
      titleFont = 'body-l-bold',
    } = props;

    return (
      <StyledWrapper ref={ref}>
        {leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
        {leftSecondaryIcon && <IconWrapper>{leftSecondaryIcon}</IconWrapper>}
        <Title
          $fill
          titleAlign={titleAlign}
          font={titleFont}
          colorToken="--text-appbar-neutral-default"
        >
          {title}
        </Title>
        {rightIcon && <IconWrapper>{rightIcon}</IconWrapper>}
        {rightSecondaryIcon && (
          <SecondaryIconWrapper>{rightSecondaryIcon}</SecondaryIconWrapper>
        )}
      </StyledWrapper>
    );
  },
);
