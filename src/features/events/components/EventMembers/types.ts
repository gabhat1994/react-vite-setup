import type { IUser } from '../../types/context';

export interface EventMembersViewProps {
  members: IUser[];
  loading: boolean;
  onRemoveMember: (u: IUser) => void;
}
