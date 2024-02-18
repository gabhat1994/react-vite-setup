import { getFullName } from './fullName';

describe('getFullName', () => {
  const firstName = 'first';
  const middleName = 'middle';
  const lastName = 'last';

  test('get full name with first only', () => {
    expect(getFullName(firstName, null, null)).toEqual('first');
  });

  test('get full name with first and last name', () => {
    expect(getFullName(firstName, null, lastName)).toEqual('first last');
  });

  test('get full name with all', () => {
    expect(getFullName(firstName, middleName, lastName)).toEqual(
      'first middle last',
    );
  });
});
