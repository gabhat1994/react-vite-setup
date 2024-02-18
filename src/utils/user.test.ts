import { UserStatus, ActionType } from '@/apollo/generated/types';
import { type UserFragment } from '@/apollo/graphql/fragments';
import { type UserProfile, UserUtil } from './user';

describe('Test utils for user', () => {
  const user: UserProfile = {
    _id: '60e8051f986d605182c85af7',
    firstName: 'Morhaf',
    lastName: 'Shamia',
    username: 'morhaf-shamia',
    title: 'My tittle',
    bio: 'Morhafty',
    profile: {
      profilePicture:
        'https://noumena-img.s3-accelerate.amazonaws.com/60e8051f986d605182c85af7/profile/mrrYRf6ulLCC4eK9DoODx',
      profilePictureThumbnail:
        'https://noumena-img.s3-accelerate.amazonaws.com/60e8051f986d605182c85af7/profile/60e8051f986d605182c85af7-1632394671274-thumbnail.png',
    },
    userStatus: ActionType.Active,
  };

  test('renderName', () => {
    expect(UserUtil.renderName(user)).toEqual('Morhaf Shamia');
    expect(UserUtil.renderName({ ...user, username: undefined })).toEqual('');
    expect(UserUtil.renderName({ ...user, username: '' })).toEqual(
      'Inactive User',
    );
  });
  test('renderUsername', () => {
    expect(UserUtil.renderUsername('morhaf')).toEqual('@morhaf');
  });
  test('renderGroupName', () => {
    expect(UserUtil.renderGroupName(undefined)).toEqual('Inactive User');
    expect(UserUtil.renderGroupName([user as UserFragment])).toEqual(
      UserUtil.renderName(user),
    );

    const otherActiveUser = {
      ...user,
      firstName: 'John',
      lastName: 'Doe',
    } as UserFragment;
    const otherInactiveUser = {
      ...user,
      firstName: 'John',
      lastName: 'Doe',
      userStatus: UserStatus.Inactive,
    } as UserFragment;
    expect(
      UserUtil.renderGroupName([user as UserFragment, otherActiveUser]),
    ).toEqual([user.firstName, otherActiveUser.firstName].join(', '));
    expect(
      UserUtil.renderGroupName([user as UserFragment, otherInactiveUser]),
    ).toEqual([user.firstName, 'Inactive User'].join(', '));
    expect(
      UserUtil.renderGroupName([otherInactiveUser, user as UserFragment]),
    ).toEqual(['Inactive User', user.firstName].join(', '));
  });
  test('isInactive', () => {
    expect(UserUtil.isInactive({ ...user })).toBe(false);
    expect(
      UserUtil.isInactive({ ...user, userStatus: UserStatus.Unregistered }),
    ).toBe(false);
    expect(
      UserUtil.isInactive({ ...user, userStatus: UserStatus.Inactive }),
    ).toBe(true);
  });
  test('others', () => {
    expect(UserUtil.getProfilePicture(user)).toEqual(
      user.profile?.profilePicture,
    );

    expect(UserUtil.getAbbreviation(user.firstName, user.lastName)).toEqual(
      'MS',
    );

    expect(UserUtil.isDeleted(user)).toBe(false);
  });
});
