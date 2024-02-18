import { bodyTypography } from '@/components/Typography';
import { ButtonLink, RouterLink } from '@/components/Link';
import styled from 'styled-components';

const StyledRouteLink = styled(RouterLink)`
  ${bodyTypography.bodyLargeBold}
  color: var(--text-modal-neutral-default)
`;

const StyledButtonLink = styled(ButtonLink)`
  min-height: auto;
  max-height: none;
  height: auto;
`;

export default {
  StyledRouteLink,
  StyledButtonLink,
};
