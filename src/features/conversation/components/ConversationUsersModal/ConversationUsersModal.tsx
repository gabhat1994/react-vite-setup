import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { TSpan } from '@/components/Typography';
import { useAuth } from '@/features/auth/contexts';
import { Avatar } from '@/components/Avatar/Avatar';
import { type ConversationUsersModalProps } from './types';
import * as S from './styles';
import { type UserData } from '../../types';

const ConversationUserModal: FC<ConversationUsersModalProps> = ({
  users,
  isOpen,
  onClose,
  onGoHomeNoum,
}) => {
  const { isUnregistered } = useAuth();
  const { t } = useTranslation();

  const handleClick = (user: UserData) => {
    onClose();
    if (!isUnregistered) onGoHomeNoum(user);
  };

  return (
    <Modal
      testId="conversation-user-modal"
      open={isOpen}
      onClose={onClose}
      enableCloseButton
      size={ModalSize.L}
      disableBackdropClick
    >
      <ModalHeader>{t(`noumena.message.chat_memebers`)}</ModalHeader>
      <ModalBody mobileFlex noFooter>
        {users.map((user, index) => (
          <S.UserWrapper
            key={user._id}
            onClick={() => handleClick(user)}
            data-testid={`conversation-user-item-${index}`}
          >
            <Avatar url={user.source || ''} />
            <S.UserBody>
              <S.UserName>
                <TSpan
                  font="body-l-bold"
                  colorToken="--text-tablecell-header-neutral-highlighted"
                >
                  {user.firstName} {user.lastName}
                </TSpan>
                {!!user.title && (
                  <S.UserTitle
                    font="body-m"
                    colorToken="--text-tablecell-body-neutral-default"
                  >
                    {user.title}
                  </S.UserTitle>
                )}
              </S.UserName>
            </S.UserBody>
          </S.UserWrapper>
        ))}
      </ModalBody>
    </Modal>
  );
};

export default ConversationUserModal;
