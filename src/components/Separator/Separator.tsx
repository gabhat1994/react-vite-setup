import { type FC } from 'react';
import StyledHr from './styles';
import { type SeparatorProps } from './types';

export const Separator: FC<SeparatorProps> = ({
  size = 'thin',
  colorToken = '--bg-separator-neutral-default',
  ...rest
}) => {
  const sizeStyle = size === 'thick' ? '4' : '1';
  return (
    <StyledHr
      data-testid="separator"
      colorToken={colorToken}
      sizeStyle={sizeStyle}
      {...rest}
    />
  );
};
