import { cleanPercentage } from './percentage';

describe('cleanPercentage', () => {
  test('clean percentage', () => {
    expect(cleanPercentage(-1)).toBe(0);
    expect(cleanPercentage(111)).toBe(100);
    expect(cleanPercentage(11)).toBe(11);
  });
});
