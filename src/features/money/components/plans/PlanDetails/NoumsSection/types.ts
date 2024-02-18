import { type Maybe } from '@/common/types';

export interface ICard {
  profileImage?: string | null;
  noumName?: string | null;
  noumId?: string;
  onRemoveNoum: () => void;
  subscriptionId: number;
}

export interface TProgress {
  totalSlots: Maybe<number>;
  usedSlots: Maybe<number>;
}
