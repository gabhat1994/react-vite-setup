import { render } from '@/test-utils';
import { NestedAvatar } from './NestedAvatar';

const URL = [
  'https://www.w3schools.com/howto/img_avatar2.png',
  'https://www.w3schools.com/w3images/avatar6.png',
];

describe('<NestedAvatar>', () => {
  test('Avatar Render', () => {
    const { getByTestId, container } = render(<NestedAvatar urls={URL} />);

    const AvatarEle = getByTestId('avatarHead');
    expect(AvatarEle).toHaveStyle(`
    position: relative;
    width: 40px;
    height: 40px;
    `);
    expect(container).toBeTruthy();
  });

  test('Should render with only one image', () => {
    const { queryByTestId } = render(
      <NestedAvatar
        urls={['https://www.w3schools.com/howto/img_avatar2.png']}
      />,
    );

    expect(queryByTestId('ChildAvatar')).toBeNull();
  });
});
