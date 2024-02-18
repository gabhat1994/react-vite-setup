import { type Dispatch, type SetStateAction } from 'react';
import { type ResultType } from '@/screens/Search/types';
import { type SpaceOutputFragment } from '@/apollo/graphql';

export enum GlobalSearchResultType {
  Member,
  Noum,
  Post,
  Event,
}

export type GlobalSearchProps = {
  type?: string;
  recentSearchesResults?: SpaceOutputFragment[];
  setResults?: Dispatch<SetStateAction<ResultType | undefined>>;
  fullWidth?: boolean;
};
