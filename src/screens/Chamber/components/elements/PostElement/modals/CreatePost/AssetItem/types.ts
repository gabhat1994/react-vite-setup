import { type PostCategory } from '@/apollo/generated/types';

export type AssetItemProps = {
  url?: string;
  filetype?: PostCategory;
  index: number;
  onDelete: (index: number) => void;
};
