import { type ConnectionRequestTypeEnum } from '@/apollo/generated/types';
import { type UserBasicOutputFragment } from '@/apollo/graphql';

export interface UserNoumConnection {
  _id: string;
  status: ConnectionRequestTypeEnum;
  requestFrom: Omit<UserBasicOutputFragment, '__typename'> | null;
  // requestTo: UserBasicOutputFragment;
}
