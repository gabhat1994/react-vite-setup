import { type Dispatch, type SetStateAction } from 'react';

export interface AddressDropDownProps {
  setSelectedAddress: Dispatch<SetStateAction<string | null>>;
  setShowForm?: Dispatch<SetStateAction<boolean>>;
  onLookupFailed?: () => void;
}
