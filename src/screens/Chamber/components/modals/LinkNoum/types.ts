import {
  type LinkedNoumFragment,
  type NoumLinkFragment,
  type SpaceOutputFragment,
} from '@/apollo/graphql';

export interface UnlinkMultipleNoumProps {
  isOpen: boolean;
  acceptUnlinking: () => void;
  handleClose: () => void;
  linkedNoums: LinkedNoumFragment[];
}

export interface UnlinkMultipleNoumRef {
  handleSubmit: () => string[];
}
export interface HandleUnlinkNoumProp {
  space?: SpaceOutputFragment;
  noumLink: Pick<NoumLinkFragment, '_id' | 'linkedNoums' | 'linkedNoumsCount'>;
  refetch: () => void;
}

export interface HandleUnlinkNoumRef {
  toggleUnlinkMultipleNoum: () => void;
  toggleUnlinkConfirmationOpen: () => void;
}
