import { type TFonts } from '@/common/types';
import { generateFonts } from './generateFont';

describe('getFontsFromResponse', () => {
  test('get fonts with undefined response', () => {
    expect(generateFonts(null)).toEqual('');
  });
  test('get fonts with Default fonts', () => {
    const fonts: TFonts = {
      header: "Suisse Int'l",
      body: "Suisse Int'l",
      button: "Suisse Int'l",
    };
    expect(generateFonts(fonts)).toContain(':root');
    expect(generateFonts(fonts)).not.toContain('header');
    expect(generateFonts(fonts)).not.toContain('body');
    expect(generateFonts(fonts)).not.toContain('button');
  });
  test('get fonts with other fonts', () => {
    const fonts: TFonts = {
      header: 'Alegreya',
      body: 'Alegreya',
      button: 'Alegreya',
    };
    expect(generateFonts(fonts)).toContain(':root');
    expect(generateFonts(fonts)).toContain('header');
    expect(generateFonts(fonts)).toContain('body');
    expect(generateFonts(fonts)).toContain('button');
  });
});
