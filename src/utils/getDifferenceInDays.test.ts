import { getDifferenceInDays } from './getDifferenceInDays';

describe('getDifferenceInDays', () => {
  test('validate days', () => {
    expect(
      getDifferenceInDays(
        '2022-03-30T10:43:44.965Z',
        '2022-04-04T10:43:44.965Z',
      ),
    ).toBe(-5);
    expect(
      getDifferenceInDays(
        '2022-04-09T10:43:44.965Z',
        '2022-03-30T10:43:44.965Z',
      ),
    ).toBe(10);
    expect(
      getDifferenceInDays(
        '2022-05-12T10:43:44.965Z',
        '2022-05-04T10:43:44.965Z',
      ),
    ).toBe(8);
  });
});
