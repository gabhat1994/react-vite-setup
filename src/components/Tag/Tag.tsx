import { forwardRef, type Ref } from 'react';
import { type TagProps } from './types';
import * as Styles from './styles';
import { TagStyled } from './styles';

const { TagContent } = Styles;

export const TagStyledComponent: React.FC<TagProps> = ({
  children,
  ...rest
}) => <TagStyled {...rest}>{children}</TagStyled>;

export const Tag = forwardRef(
  (
    {
      avatar,
      icon,
      rightIcon,
      secondary,
      primary = true,
      tertiary,
      danger,
      children,
      size = 'medium',
      color,
      bgColor,
      warning,
      contentFont = 'body-m-bold',
      contentMaxWidth = '40ch',
      border,
      isCursorPointer = true,
      ...rest
    }: TagProps,
    ref: Ref<HTMLSpanElement>,
  ) => (
    <TagStyled
      ref={ref}
      primary={primary}
      secondary={secondary}
      tertiary={tertiary}
      danger={danger}
      warning={warning}
      size={size}
      data-testid="tags"
      color={color}
      bgColor={bgColor}
      border={border}
      isCursorPointer={isCursorPointer}
      className={navigator.userAgent.search('Firefox') >= 0 ? 'firefox' : ''}
      {...rest}
    >
      {avatar ?? ''}
      {icon ?? ''}
      <TagContent font={contentFont} $maxWidth={contentMaxWidth}>
        {children}
      </TagContent>
      {rightIcon ?? ''}
    </TagStyled>
  ),
);

export default Tag;
