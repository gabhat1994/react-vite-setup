import { type FC, type HTMLAttributes } from 'react';
import { StyledLabelGroup, LabelStyled, LabelWrapStyled } from './styles';

export const LabelGroup: FC<
  { columns: number } & HTMLAttributes<HTMLDivElement>
> = ({ children, columns, ...props }) => (
  <StyledLabelGroup columns={columns} {...props}>
    {children}
  </StyledLabelGroup>
);

export const LabelWrap: FC<{ label: string }> = ({ children, label }) => (
  <LabelWrapStyled>
    <LabelStyled>{label}</LabelStyled>
    {children}
  </LabelWrapStyled>
);
