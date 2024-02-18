import {
  type ConnectionPermissionTypeEnum,
  type ConnectionRequestTypeEnum,
} from '@/apollo/generated/types';
import { type NoumMemberWithInvitationFragment } from '@/apollo/graphql';
import { type Maybe } from '@/common/types';
import { type UserActionMode } from '@/screens/Chamber/components/RightPanel/elements/NoumActions/types';
import { createContext, useContext } from 'react';
import { type UserNoumConnection } from './types';

export interface NoumUserConnectionContextValues {
  loading: boolean;
  isConnected: boolean;
  noumMember?: NoumMemberWithInvitationFragment | null;
  connectionStatus: Maybe<ConnectionRequestTypeEnum>;
  connectionId: Maybe<string>;
  connectionRole: Maybe<ConnectionPermissionTypeEnum>;
  existingConnection: UserNoumConnection | null;
  lastUpdatedConnectionId: string | null;
  onChangeLastUpdatedConnectionId?: (connectionId: string) => void;
  onHandleConnection?: (
    nextStatus: ConnectionRequestTypeEnum,
  ) => Promise<boolean>;
  loadingConnectionStatus: boolean;
  userActionMode?: UserActionMode | null;
  refetchUserConnectionState: () => Promise<void>;
  isFollowing: boolean;
}

export const NoumUserConnectionContext =
  createContext<NoumUserConnectionContextValues>({
    loading: false,
    isConnected: false,
    noumMember: null,
    connectionStatus: null,
    connectionId: null,
    connectionRole: null,
    existingConnection: null,
    lastUpdatedConnectionId: null,
    onChangeLastUpdatedConnectionId: () => {},
    onHandleConnection: async () => false,
    loadingConnectionStatus: false,
    userActionMode: null,
    refetchUserConnectionState: async () => {},
    isFollowing: false,
  });

export function useNoumUserConnectionContext() {
  return useContext(NoumUserConnectionContext);
}
