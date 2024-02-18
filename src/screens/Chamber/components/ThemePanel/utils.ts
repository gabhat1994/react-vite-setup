import { isEqual } from 'lodash';
import { type ThemeOutput } from '@/apollo/generated/types';
import { type TFonts } from '@/common/types';
import { DefaultFonts } from './constants';

const isDefaultTheme = (
  themes: (ThemeOutput | null | undefined)[],
  selectedThemeId?: string,
) =>
  themes.some(
    (themeItem) =>
      themeItem?._id === selectedThemeId && themeItem?.name === 'Default',
  );

const isDefaultFontSet = (selectedFonts: TFonts) =>
  isEqual(selectedFonts, DefaultFonts);

export const ThemePanelUtils = {
  isDefaultTheme,
  isDefaultFontSet,
};
