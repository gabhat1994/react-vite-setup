import { type DropdownValueType } from '@/components/Dropdown';
import { type TNoumEditModal } from '@/screens/Chamber/components/modals/NoumEditOptionsModal/types';

export type { TNoumEditModal };

export type NavItemType = {
  label: string;
  show: boolean;
  disableBeforeFirstPublish: boolean;
  value: TNoumEditModal;
  type: 'primary' | 'error' | 'success' | 'warning' | 'gray' | undefined;
};

export type NoumEditOptionsProps = {
  onSelect?: (value: TNoumEditModal | DropdownValueType<string>) => void;
  isNoumPublishedAtAll: boolean;
  projectType?: string | null;
  enableAds?: boolean | null;
  isShowRestore?: boolean;
};
