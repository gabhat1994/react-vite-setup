import { footnoteTypography } from '@/components/Typography';
import styled from 'styled-components';

export const NavTooltipContent = styled.div`
  ${footnoteTypography.footnote}
  background-color: var(--bg-tooltip-neutral-default);
  padding: 4px 8px;
  border-radius: 4px;
  opacity: 0.95;
  color: var(--text-tooltip-neutral-alt-default);
  width: fit-content;
`;
