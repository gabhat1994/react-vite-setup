import type { Maybe } from 'graphql/jsutils/Maybe';
import { type IUser } from '../../../types/context';

type TEventUserPickerType = 'host' | 'member';

export interface EventHostsViewProps {
  loading: boolean;
  members: IUser[];
  isOpen?: boolean;
  type: TEventUserPickerType;
  onRemove: (user: IUser) => void;
}

export interface EventUserItemProps {
  user: IUser;
  splitter?: boolean;
  isNoumEditor?: boolean;
  type: TEventUserPickerType;
  currentUser?: Maybe<string>;
  onRemove?: (u: IUser) => void;
}
