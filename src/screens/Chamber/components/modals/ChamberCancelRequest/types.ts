import { type Maybe } from '@/apollo/generated/types';

interface ChamberCancelRequestProps {
  spaceName?: Maybe<string>;
  onCancelRequest: () => void;
  onClose: () => void;
  loading?: boolean;
}

export default ChamberCancelRequestProps;
