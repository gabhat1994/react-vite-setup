import { ActionType, type UserOutput, UserStatus } from '@/apollo/generated/types';
import { formatMultipleUserNames } from './utils';

function makeUser(
  firstName: string,
  lastName: string,
  isActive: boolean = true,
): UserOutput {
  return {
    _id: '1234',
    firstName,
    lastName,
    status: isActive ? UserStatus.Active : UserStatus.Deactivated,
    userStatus: isActive ? ActionType.Active : ActionType.Deactivated,
  };
}

describe('formatMultipleUserNames', () => {
  test('Returns empty string for an empty array', () => {
    expect(formatMultipleUserNames([])).toBe('');
  });

  test('Returns full name when there is only one user', () => {
    expect(formatMultipleUserNames([makeUser('Jane', 'Smith')])).toBe(
      'Jane Smith',
    );
  });

  test('Returns a list of first names when there are up to 4', () => {
    expect(
      formatMultipleUserNames([
        makeUser('Jane', 'Smith'),
        makeUser('Mark', 'Spencer'),
      ]),
    ).toBe('Jane and Mark');
    expect(
      formatMultipleUserNames([
        makeUser('Jane', 'Smith'),
        makeUser('Mark', 'Spencer'),
        makeUser('Wallace', 'Novak'),
      ]),
    ).toBe('Jane, Mark and Wallace');
  });

  test('Returns 2 first names and counter for more than 4 users', () => {
    expect(
      formatMultipleUserNames([
        makeUser('Jane', 'Smith'),
        makeUser('Mark', 'Spencer'),
        makeUser('Wallace', 'Novak'),
        makeUser('Jarek', 'Kovalsky'),
      ]),
    ).toBe('Jane, Mark and 2 others');

    expect(
      formatMultipleUserNames([
        makeUser('Jane', 'Smith'),
        makeUser('Mark', 'Spencer'),
        makeUser('Wallace', 'Novak'),
        makeUser('Jarek', 'Kovalsky'),
        makeUser('Bruce', 'Lee'),
        makeUser('Will', 'Smith'),
      ]),
    ).toBe('Jane, Mark and 4 others');
  });

  test('Including inactive user: Returns "Inactive User" when there is only one inactive user', () => {
    expect(formatMultipleUserNames([makeUser('Jane', 'Smith', false)])).toBe(
      'Inactive User',
    );
  });

  test('Including inactive user: Returns a list of first names and "Inactive User" or "Inactive Users" when there are up to 4', () => {
    expect(
      formatMultipleUserNames([
        makeUser('Jane', 'Smith', false),
        makeUser('Mark', 'Spencer'),
      ]),
    ).toBe('Mark and Inactive User');
    expect(
      formatMultipleUserNames([
        makeUser('Jane', 'Smith'),
        makeUser('Mark', 'Spencer'),
        makeUser('Wallace', 'Novak', false),
      ]),
    ).toBe('Jane, Mark and Inactive User');
    expect(
      formatMultipleUserNames([
        makeUser('Jane', 'Smith', false),
        makeUser('Mark', 'Spencer', false),
        makeUser('Wallace', 'Novak'),
      ]),
    ).toBe('Wallace and Inactive Users');
    expect(
      formatMultipleUserNames([
        makeUser('Jane', 'Smith', false),
        makeUser('Mark', 'Spencer', false),
        makeUser('Wallace', 'Novak', false),
      ]),
    ).toBe('3 Inactive Users');
  });

  test('Including inactive user: Returns 2 first names and counter for more than 4 users', () => {
    expect(
      formatMultipleUserNames([
        makeUser('Jane', 'Smith'),
        makeUser('Mark', 'Spencer', false),
        makeUser('Wallace', 'Novak', false),
        makeUser('Jarek', 'Kovalsky'),
      ]),
    ).toBe('Jane, Jarek and Inactive Users');

    expect(
      formatMultipleUserNames([
        makeUser('Jane', 'Smith'),
        makeUser('Mark', 'Spencer', false),
        makeUser('Wallace', 'Novak'),
        makeUser('Jarek', 'Kovalsky'),
        makeUser('Bruce', 'Lee'),
        makeUser('Will', 'Smith', false),
      ]),
    ).toBe('Jane, Wallace and 4 others');
  });
});
