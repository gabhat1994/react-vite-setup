import { t } from 'i18next';
import generate from 'uniqid';
import { type InputListTypes } from '@/components/Tabs/types';
import defaultTheme from '@/assets/images/theme-thumbnail-default.svg';
import darkTheme from '@/assets/images/theme-thumbnail-dark.svg';
import origamiTheme from '@/assets/images/theme-thumbnail-origami.svg';
import celcticBlueTheme from '@/assets/images/theme-thumbnail-blueone.svg';
import frostedTheme from '@/assets/images/theme-thumbnail-frosted.svg';
import greeneryTheme from '@/assets/images/theme-thumbnail-greenary.svg';
import amaranthTheme from '@/assets/images/theme-thumbnail-amaranth.svg';
import desertTheme from '@/assets/images/theme-thumbnail-desert.svg';
import memphisTheme from '@/assets/images/theme-thumbnail-memphis.svg';
import emeraldTheme from '@/assets/images/theme-thumbnail-emerald.svg';
import defaultDarkTheme from '@/assets/images/theme-thumbnail-defaultdark.svg';
import pastelTheme from '@/assets/images/theme-thumbnail-pastel.svg';
import electricPurpleTheme from '@/assets/images/theme-thumbnail-electric-purple.svg';
import silkTheme from '@/assets/images/theme-thumbnail-silk.svg';
import jadeTheme from '@/assets/images/theme-thumbnail-jade.svg';
import ruddyBlueTheme from '@/assets/images/theme-thumbnail-ruddy-blue.svg';
import { fonts } from '@/constants/fonts';
import { type TFonts } from '@/common/types';
import { type FontOptionProps } from './types';

export const ThemeIcons = {
  Default: defaultTheme,
  'Deep Purple': darkTheme,
  Greenery: greeneryTheme,
  'Frosted Glass': frostedTheme,
  'Celtic Blue': celcticBlueTheme,
  Origami: origamiTheme,
  Amaranth: amaranthTheme,
  Desert: desertTheme,
  Memphis: memphisTheme,
  Emerald: emeraldTheme,
  'Dark Mode': defaultDarkTheme,
  Pastel: pastelTheme,
  'Electric Purple': electricPurpleTheme,
  Silk: silkTheme,
  Jade: jadeTheme,
  'Ruddy Blue': ruddyBlueTheme,
};

export const fontLabels: { name: string; label: string }[] = [
  { name: 'header', label: t('noumena.customize.font_heading') },
  { name: 'body', label: t('noumena.customize.font_body') },
  { name: 'button', label: t('noumena.customize.font_button_and_label') },
];

export const fontOptions: FontOptionProps[] = fonts.map((font) => ({
  key: generate(),
  label: font.name,
  type: 'value',
  value: font,
  fontFamily: font.value,
}));

export const customizeOptions: InputListTypes[] = [
  {
    id: 'theme',
    name: 'theme',
    image: 'filters_m',
    text: t('noumena.customize.theme'),
    labelSize: 'auto',
  },
  {
    id: 'fonts',
    name: 'fonts',
    image: 'filters_m',
    text: t('noumena.customize.fonts'),
    labelSize: 'auto',
  },
];

export const DefaultFonts: TFonts = {
  header: "Suisse Int'l",
  body: "Suisse Int'l",
  button: "Suisse Int'l",
  footnote: "Suisse Int'l",
  input: "Suisse Int'l",
  link: "Suisse Int'l",
  systeminfo: "Suisse Int'l",
};

export const DefaultFont: string = "Suisse Int'l";
