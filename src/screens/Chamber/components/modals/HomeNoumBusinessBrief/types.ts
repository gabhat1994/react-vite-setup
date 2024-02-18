import { type Maybe } from '@/apollo/generated/types';

export interface HomeNoumBusinessBriefProps {
  isOpen: boolean;
  handleClose: (isSuccess?: boolean) => void;
  handleSuccess: () => void;
  position: Maybe<number>;
}
