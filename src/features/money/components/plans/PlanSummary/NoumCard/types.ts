import { type Maybe } from '@/common/types';

export interface INoumCard {
  chamberName: string | undefined | null;
  valid_till: string | null | undefined;
  profileImage?: string | null;
  planId: Maybe<number>;
}
