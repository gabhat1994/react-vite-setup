import styled, { css } from 'styled-components';
import { TSpan } from '../Typography';

export const StoryblokRichTextWrapper = styled.div``;

const commonLinkStyles = css`
  color: var(--link-card-brand-primary-default);

  &:hover {
    color: var(--text-button-brand-primary-default);
  }
`;

export const Link = styled('a')`
  ${commonLinkStyles}
`;

export const InternalLink = styled(TSpan)`
  text-decoration: underline;
  ${commonLinkStyles}
`;
