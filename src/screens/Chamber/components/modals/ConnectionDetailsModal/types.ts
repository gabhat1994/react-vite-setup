import { type Maybe } from '@/apollo/generated/types';
import { type SpaceOutputFragment } from '@/apollo/graphql';

export enum ConnectionDetailModalTabEnum {
  Noums = 'Noums',
  Connections = 'Connections',
  Followers = 'Followers',
  Members = 'Members',
  ProjectSpaces = 'Project Spaces',
  OwnedNoums = 'Owned Noums',
  Events = 'Events',
}

export interface ConnectionDetailsModalProps {
  isOpen: boolean;
  handleClose: () => void;
  defaultTab?: string;
  followersCount: number;
  linkedNoumsCount: number;
  setInvitedInfo: (value: SpaceOutputFragment | undefined) => void;
  showInviteModal: () => void;
  setDefaultTab?: (value: string) => void;
  connectedProjectsCount?: number;
  userNoumsCount?: number;
  connectionsCount?: number;
}

export default interface IConnectionDetailsContent {
  item: Maybe<SpaceOutputFragment>;
  selectedTab: string;
  isOwner: boolean;
  isArchived: boolean;
  gap?: number;
  closeModal: () => void;
  setInvitedInfo: (value: SpaceOutputFragment | undefined) => void;
  showInviteModal: () => void;
}
