import { type ReceivedConnectionRequestQuery } from '@/apollo/graphql';
import { type Maybe } from '@/apollo/generated/types';

export interface IInvitedByME {
  data?: ReceivedConnectionRequestQuery;
  loading?: boolean;
  connectionId?: string | null;
}

export interface InvitedByMEProps {
  noumId: Maybe<string> | undefined;
}

export type InvitesMeProp = {
  isChambersScreen?: boolean;
  noumId?: string | null;
  disabled?: boolean;
};
