import { type Maybe } from '@/apollo/generated/types';

export interface ISubmitRiseApplication {
  onClose: () => void;
  open: boolean;
  refresh: () => void;
  applicationId?: string;
  resultJson?: Maybe<JSON>;
}
