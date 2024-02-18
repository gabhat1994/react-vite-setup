import { Avatar } from '@/components/Avatar/Avatar';
import ReplyAvatar from '@/screens/Chamber/components/elements/Comments/CommentItem/ReplyAvatar';
import { UserUtil } from '@/utils/user';
import { type HTMLAttributes } from 'react';
import { type UserOutputFragment } from '@/apollo/graphql';
import { type Maybe } from '@/common/types';
import { AvatarContainer } from './styles';

type CommentAvatarProps = {
  uid: Maybe<UserOutputFragment> | undefined;
  onClick?: HTMLAttributes<HTMLDivElement>['onClick'];
  isReply?: boolean;
};

const CommentAvatar = ({
  uid,
  onClick,
  isReply = false,
}: CommentAvatarProps) => (
  <AvatarContainer onClick={onClick} isReply={isReply}>
    {uid?.profile?.profilePicture ? (
      <Avatar url={UserUtil.getProfilePicture(uid) ?? ''} size="L" />
    ) : (
      <ReplyAvatar uid={uid} />
    )}
  </AvatarContainer>
);
export default CommentAvatar;
