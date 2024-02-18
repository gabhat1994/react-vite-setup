import { type TFonts } from '@/common/types';
import { fonts } from '@/constants/fonts';

const keys = [
  'xxlarge',
  'xlarge',
  'large',
  'regular',
  'medium',
  'small',
  'xsmall',
  'bold',
];
const subKeys = ['bold', 'regular'];

const subKeyTypes = ['header', 'body', 'input'];

const mapFonts = (
  style: string,
  fontName: string | undefined,
  suffix: string,
  fKey: string,
) => {
  if (fontName && fontName !== "Suisse Int'l") {
    let st = style;
    keys.map((key: string) => {
      const value = fonts.find((f) => f.name === fontName)?.value;
      if (subKeyTypes.includes(fKey)) {
        subKeys.map((k) => {
          const fontKey = `${suffix}${key}-${k}-font`;
          const font = `${fontKey}: ${value};`;
          st = st.concat(font);
          return true;
        });
      } else {
        const fontKey = `${suffix}${key}-font`;
        const font = `${fontKey}: ${value};`;
        st = st.concat(font);
      }
      return true;
    });
    return st;
  }
  return style;
};

export const generateFonts = (styleFonts: TFonts | null): string => {
  if (!styleFonts || Object.keys(styleFonts).length === 0) return '';
  let style = `
    :root {
  `;
  // For base colors
  const suffix = '--font-';
  Object.keys(styleFonts).map((key: string) => {
    style = mapFonts(
      style,
      styleFonts[key as keyof typeof styleFonts],
      `${suffix}${key}-`,
      key,
    );
    return true;
  });
  style = style.concat('}');
  return style;
};
