import { type ElementWrapperProps } from '@/screens/Chamber/components/ElementWrapper';
import { ElementWrapperV2 } from '@/screens/Chamber/components/ElementWrapperV2';
import PostBody from '../PostBody';
import PostHeader from '../PostHeader';

export const PostViewMode = (props: ElementWrapperProps) => (
  <ElementWrapperV2.Container data-testid="view-userpost" id="post">
    <PostHeader {...props} />

    <PostBody {...props} />
  </ElementWrapperV2.Container>
);
