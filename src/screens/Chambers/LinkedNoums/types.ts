import { type Maybe, type ProjectChamberType } from '@/apollo/generated/types';
import { type LinkedNoumFragment } from '@/apollo/graphql';

export interface ILinkDetails {
  isOpen: boolean;
  handleClose: () => void;
  noumsCount: number;
  connectionsCount: number;
  followersCount: number;
  noumLinkId: string;
  linkedNoums?: LinkedNoumFragment[];
  projectType?: ProjectChamberType;
}

export default interface ILinkRequest {
  name?: Maybe<string> | undefined;
  title?: Maybe<string> | undefined;
  profileImage?: string | undefined;
  category?: string | null;
  updateAt?: string;
  tabId: string;
}

export interface INoumContent {
  linkedNoums?: LinkedNoumFragment[];
  noumsCount: number;
  connectionsCount: number;
  followersCount: number;
  linkedAt: string;
  noumLinkId: string;
  projectType?: ProjectChamberType;
}
