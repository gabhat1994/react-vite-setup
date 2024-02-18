import { type Maybe } from '@/common/types';

export interface EditorBlock {
  key: string;
  text: string;
  type: string;
  depth: number;
  inlineStyleRanges: InlineStyleRange[];
  entityRanges: EntityRange[];
}

interface InlineStyleRange {
  offset: number;
  length: number;
  style: string;
}

interface EntityRange {
  offset: number;
  length: number;
  key: number;
}

export type EditorDataProps = {
  content?: Maybe<string>;
  text?: Maybe<string>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rawJSON?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tags?: any[] | null;
};
