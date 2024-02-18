import { type Dispatch, type SetStateAction } from 'react';

export type SelectLayout = {
  position: number;
  setIsLoading?: Dispatch<SetStateAction<boolean>>;
};
