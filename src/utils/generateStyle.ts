import { type NoumColors, type ThemeColors, type ThemeOutput } from '@/apollo/generated/types';

const mapColors = (style: string, colors: Object, suffix: string) => {
  if (colors) {
    let st = style;
    Object.keys(colors).map((key: string) => {
      const colorKey = `${suffix}${key}`;
      const color = `${colorKey}: ${colors[key as keyof typeof colors]};`;
      st = st.concat(color);
      return true;
    });
    return st;
  }
  return style;
};

export const generateStyleFromTheme = (
  theme: ThemeOutput | undefined,
): string => {
  if (!theme) return '';
  if (theme.name === 'Default') return '';
  let style = `
    :root {
  `;
  // For base colors
  let suffix = '--color-base-';
  const keys = ['secondary', 'primary', 'gray', 'success', 'error'];
  keys.map((key) => {
    style = mapColors(
      style,
      theme.colors![key as keyof ThemeColors],
      `${suffix}${key}-`,
    );
    return true;
  });
  // For noum colors
  suffix = `${suffix}noums-`;
  Object.keys(theme.colors?.noums!).map((key) => {
    if (key !== '__typename') {
      style = mapColors(
        style,
        theme.colors?.noums![key as keyof NoumColors],
        `${suffix}${key}-`,
      );
    }
    return true;
  });
  // For misColors
  style = mapColors(style, theme.colors?.miscColors, '--');
  style = style.concat('}');
  style = style.replace(
    '/src/assets/images',
    'https://frontendasset.noumenati.com',
  );
  return style;
};
