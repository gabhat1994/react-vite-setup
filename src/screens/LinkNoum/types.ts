export type NoumVisibility = 'Public' | 'Private' | 'Secret';

export enum VisibiltiyType {
  Public = 'Public',
  Private = 'Private',
  Secret = 'Secret',
}

export const defaultVisibilityType = 'Public';

export type OptionType = {
  name: string;
  connections: number;
  followers: number;
  visibility: NoumVisibility;
  type: string;
  checked: boolean;
  linked: number;
  linkedNoums?: OptionType[];
  spaceId: string;
  disabled: boolean;
  profileImage: string;
  isSubNoum: boolean;
  key: string;
  linkId?: string;
};
