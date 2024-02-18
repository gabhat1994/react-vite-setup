import styled from 'styled-components';
import { Stack } from '@/layout';
import { TSpan } from '@/components/Typography';

export const Wrapper = styled.div`
  font-family: var(--font-family);
  display: flex;
`;

export const RejectedWrapper = styled(Stack)`
  font-family: var(--font-family);
  max-width: 343px;
`;

export const StyledTitle = styled(TSpan)`
  line-height: var(--font-otp-xlarge-lineheight);
  margin: 0;
`;

export const StyledSubTitle = styled(TSpan)`
  margin: 0;
  font-size: 16px;
  line-height: var(--font-body-small-lineheight);
`;
