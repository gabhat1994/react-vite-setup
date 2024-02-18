import { StyledSpacer } from './styles';
import { type SpacerProps } from './types';

export const Spacer = (props: SpacerProps) => (
  <StyledSpacer data-testid={props['data-testid'] || 'spacer'} {...props} />
);

export default Spacer;
