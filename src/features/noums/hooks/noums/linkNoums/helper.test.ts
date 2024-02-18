import { transformNoum } from './helper';
import { expected, mockInputOwnNoumToLink } from './mock';

describe('transformNoum', () => {
  test('transformNoum', () => {
    const result = transformNoum({ data: mockInputOwnNoumToLink });
    expect(result).toStrictEqual(expected);
  });
});
