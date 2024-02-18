import { type Maybe } from '@/apollo/generated/types';

interface ChamberDisconnectProps {
  spaceName?: Maybe<string>;
  onDisconnect: () => void;
  onClose: () => void;
}

export default ChamberDisconnectProps;
