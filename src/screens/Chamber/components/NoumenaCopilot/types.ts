import { type SideModalProps } from '@/components/SideModal/types';

export interface NoumenaCopilotProps extends SideModalProps {
  noumId: string;
}

export type NoumenaCopilotInputs = {
  keyWord: string;
};

export type SearchHistory = {
  name: string;
  text: string;
};
