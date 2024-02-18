import { type Dispatch, type SetStateAction } from 'react';
import { type SideModalProps } from '@/components/SideModal/types';
import { type ThemeOutput } from '@/apollo/generated/types';

export interface ThemePanelProps extends SideModalProps {
  noumId: string;
}
export type NoumThemeItemWrapperProps = {
  isSelected: boolean;
};

export type ThemeItemProps = {
  id?: string;
  isSelected: boolean;
  title: string;
  onChangeTheme: () => void;
};

export type ThemePickerProps = {
  isApply: boolean;
  setIsApply: Dispatch<SetStateAction<boolean>>;
  themes: Array<ThemeOutput | null | undefined>;
  noumId: string;
};

export type FontPickerProps = {
  title: string;
  isLastItem: boolean;
  name: string;
  selected: string;
  setFonts: (name: string, value: string) => void;
};

export type FontProps = {
  name: string;
  value: string;
};

export type FontOptionProps = {
  key: string;
  label: string;
  type: 'value';
  value: FontProps;
  fontFamily?: string;
};

export type RevertModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  onCloseModal?: () => void;
};

export enum CustomizeOptions {
  THEME = 'theme',
  FONTS = 'fonts',
}
