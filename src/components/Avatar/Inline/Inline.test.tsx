import { render } from '@/test-utils';

import { InlineAvatar } from '@/components/Avatar/Inline/Inline';
import {
  INLINE_AVATAR_AREA_2,
  INLINE_AVATAR_AREA_3,
  INLINE_AVATAR_RADIUS,
  INLINE_AVATAR_SIZE,
} from './consts';

const URL1 = 'https://www.w3schools.com/howto/img_avatar2.png';
const URL2 = 'https://www.w3schools.com/w3images/avatar5.png';
const URL3 = 'https://www.w3schools.com/w3images/avatar6.png';

describe('<InlineAvatar>', () => {
  test('InlineAvatar XL', () => {
    render(<InlineAvatar urls={[URL1, URL2]} size="XL" />);
    const separatorClass = InlineAvatar({ urls: [URL1, URL2], size: 'XL' }).type
      .styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.width).toBe(`${INLINE_AVATAR_AREA_2.XL}px`);
    expect(style.height).toBe(`${INLINE_AVATAR_SIZE.XL}px`);
    expect(style.borderRadius).toBe(`${INLINE_AVATAR_RADIUS.XL}px`);
    expect(style.overflow).toBe('hidden');
  });

  test('InlineAvatar L', () => {
    render(<InlineAvatar urls={[URL1, URL2]} size="L" />);
    const separatorClass = InlineAvatar({ urls: [URL1, URL2], size: 'L' }).type
      .styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.width).toBe(`${INLINE_AVATAR_AREA_2.L}px`);
    expect(style.height).toBe(`${INLINE_AVATAR_SIZE.L}px`);
    expect(style.borderRadius).toBe(`${INLINE_AVATAR_RADIUS.L}px`);
    expect(style.overflow).toBe('hidden');
  });

  test('InlineAvatar M', () => {
    render(<InlineAvatar urls={[URL1, URL2]} size="M" />);
    const separatorClass = InlineAvatar({ urls: [URL1, URL2], size: 'M' }).type
      .styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.width).toBe(`${INLINE_AVATAR_AREA_2.M}px`);
    expect(style.height).toBe(`${INLINE_AVATAR_SIZE.M}px`);
    expect(style.borderRadius).toBe(`${INLINE_AVATAR_RADIUS.M}px`);
    expect(style.overflow).toBe('hidden');
  });

  test('InlineAvatar S', () => {
    render(<InlineAvatar urls={[URL1, URL2]} size="S" />);
    const separatorClass = InlineAvatar({ urls: [URL1, URL2], size: 'S' }).type
      .styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.width).toBe(`${INLINE_AVATAR_AREA_2.S}px`);
    expect(style.height).toBe(`${INLINE_AVATAR_SIZE.S}px`);
    expect(style.borderRadius).toBe(`${INLINE_AVATAR_RADIUS.S}px`);
    expect(style.overflow).toBe('hidden');
  });

  test('InlineAvatar Default Size', () => {
    render(<InlineAvatar urls={[URL1, URL2]} />);
    const separatorClass = InlineAvatar({ urls: [URL1, URL2] }).type
      .styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.width).toBe(`${INLINE_AVATAR_AREA_2.L}px`);
    expect(style.height).toBe(`${INLINE_AVATAR_SIZE.L}px`);
    expect(style.borderRadius).toBe(`${INLINE_AVATAR_RADIUS.L}px`);
    expect(style.overflow).toBe('hidden');
  });

  test('InlineAvatar Default Image', () => {
    render(<InlineAvatar urls={[undefined, undefined]} size="L" />);
    const separatorClass = InlineAvatar({
      urls: [undefined, undefined],
      size: 'L',
    }).type.styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.width).toBe(`${INLINE_AVATAR_AREA_2.L}px`);
    expect(style.height).toBe(`${INLINE_AVATAR_SIZE.L}px`);
    expect(style.borderRadius).toBe(`${INLINE_AVATAR_RADIUS.L}px`);
    expect(style.overflow).toBe('hidden');
  });

  test('InlineAvatar Default Size', () => {
    render(<InlineAvatar urls={[URL1, URL2, URL3]} />);
    const separatorClass = InlineAvatar({ urls: [URL1, URL2, URL3] }).type
      .styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.width).toBe(`${INLINE_AVATAR_AREA_3.L}px`);
    expect(style.height).toBe(`${INLINE_AVATAR_SIZE.L}px`);
    expect(style.borderRadius).toBe(`${INLINE_AVATAR_RADIUS.L}px`);
    expect(style.overflow).toBe('hidden');
  });

  test('InlineAvatar Default Image & Size', () => {
    render(<InlineAvatar urls={[undefined, undefined]} />);
    const separatorClass = InlineAvatar({ urls: [undefined, undefined] }).type
      .styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.width).toBe(`${INLINE_AVATAR_AREA_2.L}px`);
    expect(style.height).toBe(`${INLINE_AVATAR_SIZE.L}px`);
    expect(style.borderRadius).toBe(`${INLINE_AVATAR_RADIUS.L}px`);
    expect(style.overflow).toBe('hidden');
  });
});
