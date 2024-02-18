import styled from 'styled-components';
import { Stack } from '@/layout';

import {
  footnote,
  linkTypography,
  TSpan,
} from '@/components/Typography/Typography';

export const Screen = styled(Stack)`
  font-family: var(--font-family);
  max-width: 343px;
`;

export const LinkContainer = styled(Stack)`
  width: 100%;
  ${footnote}

  div span {
    cursor: pointer;
    color: var(--text-button-brand-secondary-default);
  }

  div p {
    ${linkTypography.linkSmall}
    display: inline-flex;
    cursor: default;
    text-decoration: none;
    padding: 0px 3px;
    color: var(--text-body-neutral-default);
  }
`;

export const Terms = styled.div`
  font-size: var(--font-link-small-size);
  a {
    font-weight: var(--font-link-large-weight);
  }
`;

export const LinksSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3px;
`;

export const FormText = styled(TSpan)`
  padding: 0px 10px;
  display: inline-flex;
  cursor: default;
`;

export const SpacerText = styled.p`
  margin: 0;
  font-weight: var(--font-input-small-regular-weight) !important;
`;

export const StyledTabPanel = styled.div`
  width: 100%;
  height: 100%;
  font-family: var(--font-family);
`;
