import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';

import {
  render,
  type StoryblokRichtext,
  MARK_LINK,
} from 'storyblok-rich-text-react-renderer';
import { getInternalLink } from './getInternalLink';

import {
  InternalLink,
  Link,
  StoryblokRichTextWrapper,
} from './StoryblokRichTextContainer.styled';

interface StoryblokRichTextContainerProps {
  content?: StoryblokRichtext;
}

export const StoryblokRichTextContainer = ({
  content,
}: StoryblokRichTextContainerProps) => {
  const navigate = useNavigate();

  const linkResolver = useCallback(
    (
      children: React.ReactNode,
      {
        href,
        linktype,
        target,
      }: { href?: string; linktype?: string; target?: string },
    ) => {
      const internalLink = getInternalLink(href);

      if (internalLink) {
        return (
          <InternalLink
            role="link"
            cursor="pointer"
            tabIndex={0}
            onClick={() => navigate(internalLink)}
          >
            {children}
          </InternalLink>
        );
      }

      const props = {
        href: linktype === 'email' ? `mailto:${href}` : href,
        target,
      };
      return React.createElement(Link, props, children);
    },
    [navigate],
  );

  return useMemo(() => {
    if (!content) {
      return null;
    }

    return (
      <StoryblokRichTextWrapper>
        {render(content, {
          markResolvers: {
            [MARK_LINK]: linkResolver,
          },
        })}
      </StoryblokRichTextWrapper>
    );
  }, [content, linkResolver]);
};
