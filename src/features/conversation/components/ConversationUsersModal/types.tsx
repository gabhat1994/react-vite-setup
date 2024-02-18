import { type UserData } from '../../types';

export type ConversationUsersModalProps = {
  users: UserData[];
  isOpen: boolean;
  onClose: () => void;
  onGoHomeNoum: (user: UserData) => void;
};
