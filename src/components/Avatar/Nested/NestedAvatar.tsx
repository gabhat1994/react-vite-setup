import { Avatar } from '@/components/Avatar/Avatar';
import { type NestedAvatarProps } from './types';
import { AvatarChild, StyledNestedAvatarContainer } from './styles';

export const NestedAvatar = ({ urls = [] }: NestedAvatarProps) => {
  const url1 = urls[0];
  const url2 = urls[1];

  return (
    <StyledNestedAvatarContainer
      // TODO: Make it more customizable, like other Avatar variants.
      size={40}
      borderRadius={12}
      data-testid="avatarHead"
    >
      <Avatar url={url1} />
      {url2 && (
        <AvatarChild data-testid="ChildAvatar">
          {' '}
          <Avatar url={url2} width={20} />
        </AvatarChild>
      )}
    </StyledNestedAvatarContainer>
  );
};
