import { type PostItemFragment } from '@/apollo/graphql';
import { NetworkStatus } from '@apollo/client';
import React from 'react';
import { ElementWrapperV2 } from '../../../ElementWrapperV2';
import { AllPosts } from './PostBody/styles';
import { PostItem } from './PostItem';
import { type PostItemProps } from './PostItem/types';

interface PostsListProps
  extends Pick<PostItemProps, 'collapsible' | 'isMasterNoum'> {
  data: PostItemFragment[];
  networkStatus?: NetworkStatus;
}

export const PostsList: React.FC<PostsListProps> = ({
  data,
  networkStatus,
  ...postItemProps
}) => (
  <AllPosts
    opacity={networkStatus === NetworkStatus.setVariables ? 0.5 : 1}
    data-testid="posts-list"
  >
    {data.map((post, index) => (
      <ElementWrapperV2.BodyListItemWrapper
        key={post._id}
        type="post"
        index={index}
        isLastItem={index === data.length - 1}
      >
        <PostItem.Content
          data={post}
          {...postItemProps}
          withMarginTop={index !== 0}
        />
      </ElementWrapperV2.BodyListItemWrapper>
    ))}
  </AllPosts>
);
