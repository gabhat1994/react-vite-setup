import { createRef } from 'react';
import { mergeRefs } from '../mergeRefs';

describe('mergeRefs', () => {
  test('should return function if refs passed', () => {
    const ref1 = createRef();
    const ref2 = createRef();
    const ref3 = createRef();

    const result = mergeRefs(ref1, ref2);

    expect(result).toBeInstanceOf(Function);
    expect(result(ref3)).toBe(undefined);
  });

  test('should return function if function refs are passed', () => {
    const ref1 = createRef();
    const ref2 = createRef();
    const ref3 = createRef();
    const result = mergeRefs(
      () => ref1,
      () => ref2,
    );
    expect(result).toBeInstanceOf(Function);
    expect(result(ref3)).toBe(undefined);
  });
});
