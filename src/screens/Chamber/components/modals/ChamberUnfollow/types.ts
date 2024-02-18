import { type Maybe } from '@/apollo/generated/types';

interface ChamberUnfollowProps {
  spaceName?: Maybe<string>;
  onUnfollow: () => void;
  onClose: () => void;
}

export default ChamberUnfollowProps;
