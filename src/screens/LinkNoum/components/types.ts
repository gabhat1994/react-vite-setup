import { type SpaceOutputFragment } from '@/apollo/graphql';
import { type Dispatch, type SetStateAction } from 'react';
import { type NoumVisibility, type OptionType } from '../types';

type CommonProps = {
  connections: number;
  followers: number;
  visibility: string;
  loading: boolean;
};

export type ResultContainerProps = CommonProps & {
  selectedNoums: number;
};

export type NoumPreviewProps = CommonProps & {
  options: OptionType[];
  isDesktop: boolean;
  unLinkedSelected: boolean;
};
export type LinkedNoumOptionType = Pick<
  SpaceOutputFragment,
  '_id' | 'name' | 'profileImage' | 'type'
> & {
  checked?: boolean;
  linked?: number;
  connections?: number;
  followers?: number;
  visibility?: NoumVisibility;
  disabled?: boolean;
};

export interface LinkNoumActionFooterProps {
  isDesktop: boolean;
  isConfirmScreen: boolean;
  setConfirmScreen: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  checkedOptions: OptionType[];
  defaultOptions: OptionType[];
  handleConfirmLinkNoums: () => void;
  handleGoBack: () => void;
  handleLinkNoums: () => void;
  parentNoums: number;
}
