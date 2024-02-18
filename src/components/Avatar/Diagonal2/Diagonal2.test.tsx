import { render } from '@/test-utils';

import {
  DIAGONAL_2_AVATAR_AREA,
  DIAGONAL_2_AVATAR_RADIUS,
  DiagonalAvatar2,
} from './Diagonal2';

const URL1 = 'https://www.w3schools.com/howto/img_avatar2.png';
const URL2 = 'https://www.w3schools.com/w3images/avatar5.png';

describe('<DiagonalAvatar2>', () => {
  test('DiagonalAvatar2 XL', () => {
    render(<DiagonalAvatar2 urls={[URL1, URL2]} size="XL" />);
    const separatorClass = DiagonalAvatar2({ urls: [URL1, URL2], size: 'XL' })
      .type.styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.width).toBe(`${DIAGONAL_2_AVATAR_AREA.XL}px`);
    expect(style.height).toBe(`${DIAGONAL_2_AVATAR_AREA.XL}px`);
    expect(style.borderRadius).toBe(`${DIAGONAL_2_AVATAR_RADIUS.XL}px`);
  });

  test('DiagonalAvatar2 L', () => {
    render(<DiagonalAvatar2 urls={[URL1, URL2]} size="L" />);
    const separatorClass = DiagonalAvatar2({ urls: [URL1, URL2], size: 'L' })
      .type.styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.width).toBe(`${DIAGONAL_2_AVATAR_AREA.L}px`);
    expect(style.height).toBe(`${DIAGONAL_2_AVATAR_AREA.L}px`);
    expect(style.borderRadius).toBe(`${DIAGONAL_2_AVATAR_RADIUS.L}px`);
  });

  test('DiagonalAvatar2 M', () => {
    render(<DiagonalAvatar2 urls={[URL1, URL2]} size="M" />);
    const separatorClass = DiagonalAvatar2({ urls: [URL1, URL2], size: 'M' })
      .type.styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.width).toBe(`${DIAGONAL_2_AVATAR_AREA.M}px`);
    expect(style.height).toBe(`${DIAGONAL_2_AVATAR_AREA.M}px`);
    expect(style.borderRadius).toBe(`${DIAGONAL_2_AVATAR_RADIUS.M}px`);
  });

  test('DiagonalAvatar2 S', () => {
    render(<DiagonalAvatar2 urls={[URL1, URL2]} size="S" />);
    const separatorClass = DiagonalAvatar2({ urls: [URL1, URL2], size: 'S' })
      .type.styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.width).toBe(`${DIAGONAL_2_AVATAR_AREA.S}px`);
    expect(style.height).toBe(`${DIAGONAL_2_AVATAR_AREA.S}px`);
    expect(style.borderRadius).toBe(`${DIAGONAL_2_AVATAR_RADIUS.S}px`);
  });

  test('DiagonalAvatar2 Default Size', () => {
    render(<DiagonalAvatar2 urls={[URL1, URL2]} />);
    const separatorClass = DiagonalAvatar2({ urls: [URL1, URL2] }).type
      .styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.width).toBe(`${DIAGONAL_2_AVATAR_AREA.L}px`);
    expect(style.height).toBe(`${DIAGONAL_2_AVATAR_AREA.L}px`);
    expect(style.borderRadius).toBe(`${DIAGONAL_2_AVATAR_RADIUS.L}px`);
  });

  test('DiagonalAvatar2 Default Image', () => {
    render(<DiagonalAvatar2 urls={[undefined, undefined]} size="L" />);
    const separatorClass = DiagonalAvatar2({
      urls: [undefined, undefined],
      size: 'L',
    }).type.styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.width).toBe(`${DIAGONAL_2_AVATAR_AREA.L}px`);
    expect(style.height).toBe(`${DIAGONAL_2_AVATAR_AREA.L}px`);
    expect(style.borderRadius).toBe(`${DIAGONAL_2_AVATAR_RADIUS.L}px`);
  });

  test('DiagonalAvatar2 Default Image & Size', () => {
    render(<DiagonalAvatar2 urls={[undefined, undefined]} />);
    const separatorClass = DiagonalAvatar2({ urls: [undefined, undefined] })
      .type.styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.width).toBe(`${DIAGONAL_2_AVATAR_AREA.L}px`);
    expect(style.height).toBe(`${DIAGONAL_2_AVATAR_AREA.L}px`);
    expect(style.borderRadius).toBe(`${DIAGONAL_2_AVATAR_RADIUS.L}px`);
  });
});
