import { type ThemeOutput } from '@/apollo/generated/types';
import { generateStyleFromTheme } from './generateStyle';

describe('getStyleFromThemeResponse', () => {
  test('get style with undefined response', () => {
    expect(generateStyleFromTheme(undefined)).toEqual('');
  });
  test('get style with Default theme', () => {
    const theme: ThemeOutput = {
      _id: '635ab6ace948c6000c16ca81',
      name: 'Default',
      colors: {},
    };
    expect(generateStyleFromTheme(theme)).toEqual('');
  });
  test('get style with other theme', () => {
    const theme: ThemeOutput = {
      _id: '635ab6ace948c6000c16ca81',
      name: 'Greenery',
      colors: {
        secondary: {
          '5': '#222f2b',
        },
        noums: {
          __typename: 'NoumColors',
          social: {},
        },
        miscColors: {},
      },
    };
    expect(generateStyleFromTheme(theme)).toContain(':root');
    expect(generateStyleFromTheme(theme)).toContain('--color-base-secondary-5');
  });
});
