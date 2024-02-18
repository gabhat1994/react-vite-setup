import { intersectionObserver } from '@/test-utils/stubs';
import { render } from '@/test-utils';
import { type UserOutput } from '@/apollo/generated/types';
import { MessageUserPicker } from './MessageUserPicker';

describe('MessageUserPicker', () => {
  const users: UserOutput[] = [
    {
      _id: '6232f2aefd028201aff18b43',
      firstName: 'Mike',
      lastName: 'Ko',
      profileUrl: 'https://www.w3schools.com/howto/img_avatar2.png',
      title: 'Social Media Manager',
    },
  ];
  const onSelectUsers = vi.fn();

  beforeEach(() => intersectionObserver.mock());
  afterEach(() => {
    intersectionObserver.restore();
  });

  test('Should render', () => {
    const { getByTestId } = render(
      <MessageUserPicker data={users} onSelectUsers={onSelectUsers} />,
    );
    expect(getByTestId('users-picker')).toBeInTheDocument();
  });
});
