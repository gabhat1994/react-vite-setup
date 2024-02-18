import { type AriaAttributes } from 'react';
import { BorderedWrapper } from './styles';

type PostItemLayoutProps = {
  isPinned?: boolean;
  withBorder?: boolean;
} & Pick<AriaAttributes, 'aria-label'>;

export const PostItemLayout: React.FC<PostItemLayoutProps> = ({
  isPinned = false,
  children,
  withBorder,
  ...ariaAttributes
}) => (
  <BorderedWrapper
    withBorder={withBorder}
    isPinned={isPinned}
    data-testid="post-item-layout"
    {...ariaAttributes}
  >
    {children}
  </BorderedWrapper>
);
