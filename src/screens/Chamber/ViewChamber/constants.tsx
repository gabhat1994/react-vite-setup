import { type IChamberContext } from './types';

export const initialValue: IChamberContext = {
  loading: false,
  loadingSpace: false,
  space: undefined,
  spaceConfig: undefined,
  isOwner: false,
  editDisabled: false,
  refetchSpaceById: () => null,
  refetchSpaceByConfig: () => null,
};
