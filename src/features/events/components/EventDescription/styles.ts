import styled from 'styled-components';
import { TSpan } from '@/components/Typography';

export const StyledSeeMoreButton = styled(TSpan)`
  font-size: var(--font-body-medium-size);
  text-decoration: underline;
  cursor: pointer;
  margin-left: 5px;
`;

export const StyledEventDescription = styled(TSpan)`
  word-break: break-word;
  cursor: pointer;
`;
