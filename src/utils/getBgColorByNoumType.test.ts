import getBgColorByNoumType from './getBgColorByNoumType';

describe('getBgColorByNoumType', () => {
  test('get bg color for types', () => {
    expect(getBgColorByNoumType('project')).toBe(
      '--bg-badge-chambers-project-default',
    );
    expect(getBgColorByNoumType('home')).toBe(
      '--bg-card-chambers-social-default',
    );
    expect(getBgColorByNoumType('social')).toBe(
      '--bg-badge-chambers-social-default',
    );
    expect(getBgColorByNoumType('special')).toBe(
      '--bg-badge-chambers-special-default',
    );
  });
});
