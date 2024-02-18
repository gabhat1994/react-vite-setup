import { type Maybe } from 'graphql/jsutils/Maybe';

export type ChamberArchiveModalProps = {
  noumName: string;
  isOpen: boolean;
  handleClose: () => void;
  onArchive: () => void;
  loading?: boolean;
};

export type ChamberUnarchiveModalProps = {
  isOpen: boolean;
  handleClose: () => void;
  onUnarchive: () => void;
  loading?: boolean;
  spaceId?: Maybe<string>;
};
