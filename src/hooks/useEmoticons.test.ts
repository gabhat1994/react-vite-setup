import { useEmoticons } from './useEmoticons';

describe('getFullName', () => {
  test('Nervous emotIcon', () => {
    expect(useEmoticons(',:)')).toEqual('😅');
  });

  test('roubled or shy, emoticon', () => {
    expect(useEmoticons(',:(')).toEqual('😓');
  });

  test('Straight face emoticon', () => {
    expect(useEmoticons(':|')).toEqual('😐');
  });

  test('crying emoticon', () => {
    expect(useEmoticons(';(')).toEqual('😭');
  });

  test('sad emoticon', () => {
    expect(useEmoticons(':(')).toEqual('😦');
  });

  test('crying face 1 emoticon', () => {
    expect(useEmoticons(':,(')).toEqual('😢');
  });

  test('crying face 2 emoticon', () => {
    expect(useEmoticons(`:'(`)).toEqual('😢');
  });

  test('like emoticon', () => {
    expect(useEmoticons(`(y)`)).toEqual('👍');
  });

  test('unlike emoticon', () => {
    expect(useEmoticons(`(n)`)).toEqual('👎');
  });

  test('heart emoticon', () => {
    expect(useEmoticons(`<3`)).toEqual('❤️');
  });

  test('broken heart 1 emoticon', () => {
    expect(useEmoticons(`</3`)).toEqual('💔');
  });

  test('broken heart 2 emoticon', () => {
    expect(useEmoticons(`<\\3`)).toEqual('💔');
  });
});
