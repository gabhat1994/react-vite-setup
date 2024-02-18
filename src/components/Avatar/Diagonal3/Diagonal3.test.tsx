import { render } from '@/test-utils';

import {
  DIAGONAL_3_AVATAR_AREA,
  DIAGONAL_3_AVATAR_RADIUS,
  DiagonalAvatar3,
} from './Diagonal3';

const URL1 = 'https://www.w3schools.com/howto/img_avatar2.png';
const URL2 = 'https://www.w3schools.com/w3images/avatar5.png';
const URL3 = 'https://www.w3schools.com/w3images/avatar6.png';

describe('<DiagonalAvatar3>', () => {
  test('DiagonalAvatar3 XL', () => {
    render(<DiagonalAvatar3 urls={[URL1, URL2, URL3]} size="XL" />);
    const separatorClass = DiagonalAvatar3({
      urls: [URL1, URL2, URL3],
      size: 'XL',
    }).type.styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.width).toBe(`${DIAGONAL_3_AVATAR_AREA.XL}px`);
    expect(style.height).toBe(`${DIAGONAL_3_AVATAR_AREA.XL}px`);
    expect(style.borderRadius).toBe(`${DIAGONAL_3_AVATAR_RADIUS.XL}px`);
  });

  test('DiagonalAvatar3 L', () => {
    render(<DiagonalAvatar3 urls={[URL1, URL2, URL3]} size="L" />);
    const separatorClass = DiagonalAvatar3({
      urls: [URL1, URL2, URL3],
      size: 'L',
    }).type.styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.width).toBe(`${DIAGONAL_3_AVATAR_AREA.L}px`);
    expect(style.height).toBe(`${DIAGONAL_3_AVATAR_AREA.L}px`);
    expect(style.borderRadius).toBe(`${DIAGONAL_3_AVATAR_RADIUS.L}px`);
  });

  test('DiagonalAvatar3 M', () => {
    render(<DiagonalAvatar3 urls={[URL1, URL2, URL3]} size="M" />);
    const separatorClass = DiagonalAvatar3({
      urls: [URL1, URL2, URL3],
      size: 'M',
    }).type.styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.width).toBe(`${DIAGONAL_3_AVATAR_AREA.M}px`);
    expect(style.height).toBe(`${DIAGONAL_3_AVATAR_AREA.M}px`);
    expect(style.borderRadius).toBe(`${DIAGONAL_3_AVATAR_RADIUS.M}px`);
  });

  test('DiagonalAvatar3 S', () => {
    render(<DiagonalAvatar3 urls={[URL1, URL2, URL3]} size="S" />);
    const separatorClass = DiagonalAvatar3({
      urls: [URL1, URL2, URL3],
      size: 'S',
    }).type.styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.width).toBe(`${DIAGONAL_3_AVATAR_AREA.S}px`);
    expect(style.height).toBe(`${DIAGONAL_3_AVATAR_AREA.S}px`);
    expect(style.borderRadius).toBe(`${DIAGONAL_3_AVATAR_RADIUS.S}px`);
  });

  test('DiagonalAvatar3 Default Size', () => {
    render(<DiagonalAvatar3 urls={[URL1, URL2, URL3]} />);
    const separatorClass = DiagonalAvatar3({ urls: [URL1, URL2, URL3] }).type
      .styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.width).toBe(`${DIAGONAL_3_AVATAR_AREA.L}px`);
    expect(style.height).toBe(`${DIAGONAL_3_AVATAR_AREA.L}px`);
    expect(style.borderRadius).toBe(`${DIAGONAL_3_AVATAR_RADIUS.L}px`);
  });

  test('DiagonalAvatar3 Default Image', () => {
    render(
      <DiagonalAvatar3 urls={[undefined, undefined, undefined]} size="L" />,
    );
    const separatorClass = DiagonalAvatar3({
      urls: [undefined, undefined, undefined],
      size: 'L',
    }).type.styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.width).toBe(`${DIAGONAL_3_AVATAR_AREA.L}px`);
    expect(style.height).toBe(`${DIAGONAL_3_AVATAR_AREA.L}px`);
    expect(style.borderRadius).toBe(`${DIAGONAL_3_AVATAR_RADIUS.L}px`);
  });

  test('DiagonalAvatar3 Default Image & Size', () => {
    render(<DiagonalAvatar3 urls={[undefined, undefined, undefined]} />);
    const separatorClass = DiagonalAvatar3({
      urls: [undefined, undefined, undefined],
    }).type.styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.width).toBe(`${DIAGONAL_3_AVATAR_AREA.L}px`);
    expect(style.height).toBe(`${DIAGONAL_3_AVATAR_AREA.L}px`);
    expect(style.borderRadius).toBe(`${DIAGONAL_3_AVATAR_RADIUS.L}px`);
  });
});
