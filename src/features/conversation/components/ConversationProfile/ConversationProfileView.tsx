import { UserStatus } from '@/apollo/generated/types';
import { Avatar } from '@/components/Avatar/Avatar';
import { DiagonalAvatar2 } from '@/components/Avatar/Diagonal2/Diagonal2';
import { DiagonalAvatar3 } from '@/components/Avatar/Diagonal3/Diagonal3';
import { TSpan } from '@/components/Typography';
import { Spacer } from '@/layout';
import { useCallback, useMemo, useState, type FC } from 'react';
import { type UserData } from '../../types';
import ConversationUserModal from '../ConversationUsersModal';
import { ProfileInfo, ProfileTitle, ProfileWrapper } from './styles';

interface ConversationProfileViewProps {
  isConversationBlocked?: boolean;
  users: UserData[];
  title: string;
}
export const ConversationProfileView: FC<ConversationProfileViewProps> = ({
  isConversationBlocked,
  users,
  title,
}) => {
  const [isOpenMembersModal, setIsOpenMembersModal] = useState<boolean>(false);

  const subTitle = useMemo(() => {
    if (users.length === 1) {
      return users[0].title;
    }
    return undefined;
  }, [users]);

  const url = useMemo(() => {
    const urls = users.map((user) => user.source);
    return urls;
  }, [users]);

  const avatar = useMemo(() => {
    if (url && url.length === 1) {
      return <Avatar data-testid="avatar-testid" url={url[0]} size="M" />;
    }
    if (url && url.length === 2) {
      return (
        <DiagonalAvatar2
          data-testid="diagonalavatar-testid"
          urls={url}
          size="M"
        />
      );
    }
    if (url && url.length > 2) {
      return (
        <DiagonalAvatar3
          data-testid="diagonalavatar3-testid"
          urls={url}
          size="M"
        />
      );
    }
    return undefined;
  }, [url]);

  const goHomeNoum = useCallback((user: UserData) => {
    const { userStatus, homeNoumId } = user;
    if (userStatus === UserStatus.Active && homeNoumId)
      window.open(`/noum/${homeNoumId}`, '_blank');
  }, []);

  const handleClick = useCallback(() => {
    if (users.length === 1) {
      goHomeNoum(users[0]);
    } else {
      setIsOpenMembersModal(true);
    }
  }, [goHomeNoum, users]);

  return (
    <>
      <ProfileWrapper data-testid="receiverprofile">
        <ProfileInfo onClick={handleClick}>
          {avatar}
          <Spacer width={16} />
          {!isConversationBlocked && (
            <ProfileTitle>
              <TSpan
                font="body-m-bold"
                overflow="ellipsis"
                colorToken="--text-tablecell-header-neutral-highlighted"
              >
                {title}
              </TSpan>
              <TSpan
                font="footnote"
                colorToken="--text-tablecell-body-neutral-default"
              >
                {subTitle}
              </TSpan>
            </ProfileTitle>
          )}
        </ProfileInfo>
      </ProfileWrapper>

      <ConversationUserModal
        users={users}
        isOpen={isOpenMembersModal}
        onClose={() => {
          setIsOpenMembersModal(false);
        }}
        onGoHomeNoum={goHomeNoum}
      />
    </>
  );
};
