import getColorByNoumType from './getColorByNoumType';

describe('getColorByNoumType', () => {
  test('get bg color for types', () => {
    expect(getColorByNoumType('project')).toBe(
      '--text-badge-chambers-project-highlighted',
    );
    expect(getColorByNoumType('home')).toBe(
      '--text-badge-chambers-social-highlighted',
    );
    expect(getColorByNoumType('social')).toBe(
      '--text-badge-chambers-social-highlighted',
    );
    expect(getColorByNoumType('special')).toBe(
      '--text-badge-chambers-special-highlighted',
    );
  });
});
