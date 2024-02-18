import { faker } from '@faker-js/faker';
import { render } from '@/test-utils';
import { NotificationAvatars } from './Avatar';

describe('NotificationAvatars', () => {
  test('Should render one avatar', () => {
    const { getAllByRole } = render(
      <NotificationAvatars avatars={[faker.image.avatar()]} />,
    );
    expect(getAllByRole('img')).toHaveLength(1);
  });

  test('Should render two avatars', () => {
    const { getAllByRole } = render(
      <NotificationAvatars
        avatars={[faker.image.avatar(), faker.image.avatar()]}
      />,
    );
    expect(getAllByRole('img')).toHaveLength(2);
  });

  test('Should render three avatars', () => {
    const { getAllByRole } = render(
      <NotificationAvatars
        avatars={[
          faker.image.avatar(),
          faker.image.avatar(),
          faker.image.avatar(),
        ]}
      />,
    );
    expect(getAllByRole('img')).toHaveLength(3);
  });

  test('Should render nested avatars (limit to two)', () => {
    const expectedCount = 2;

    const avatarCounts = [2, 3, 4, 5];

    avatarCounts.forEach((count) => {
      const avatars = Array.from({ length: count }).map(() =>
        faker.image.avatar(),
      );
      const { getAllByRole, unmount } = render(
        <NotificationAvatars avatars={avatars} mode="nested" />,
      );

      expect(getAllByRole('img')).toHaveLength(expectedCount);
      unmount();
    });
  });
});
