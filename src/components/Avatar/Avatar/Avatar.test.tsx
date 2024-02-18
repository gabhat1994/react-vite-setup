import { render } from '@/test-utils';
import { Avatar, AVATAR_RADIUS, AVATAR_SIZE } from './index';

const URL = 'https://www.w3schools.com/howto/img_avatar2.png';

describe('<Avatar>', () => {
  test('Avatar XXXL', () => {
    const { getByTestId, container } = render(<Avatar url={URL} size="XXXL" />);

    const AvatarEle = getByTestId('avatarContainer');
    expect(AvatarEle).toHaveStyle(`
      position: relative;
      overflow: hidden;
      width: ${AVATAR_SIZE.XXXL}px;
      height: ${AVATAR_SIZE.XXXL}px;
      border-radius: ${AVATAR_RADIUS.XXXL}px;
    `);
    expect(container).toBeTruthy();
  });

  test('Avatar XXL', () => {
    const { getByTestId, container } = render(<Avatar url={URL} size="XXL" />);

    const AvatarEle = getByTestId('avatarContainer');
    expect(AvatarEle).toHaveStyle(`
      position: relative;
      overflow: hidden;
      width: ${AVATAR_SIZE.XXL}px;
      height: ${AVATAR_SIZE.XXL}px;
      border-radius: ${AVATAR_RADIUS.XXL}px;
    `);
    expect(container).toBeTruthy();
  });

  test('Avatar XL', () => {
    const { getByTestId, container } = render(<Avatar url={URL} size="XL" />);

    const AvatarEle = getByTestId('avatarContainer');
    expect(AvatarEle).toHaveStyle(`
      position: relative;
      overflow: hidden;
      width: ${AVATAR_SIZE.XL}px;
      height: ${AVATAR_SIZE.XL}px;
      border-radius: ${AVATAR_RADIUS.XL}px;
    `);
    expect(container).toBeTruthy();
  });

  test('Avatar L', () => {
    const { getByTestId, container } = render(<Avatar url={URL} size="L" />);

    const AvatarEle = getByTestId('avatarContainer');
    expect(AvatarEle).toHaveStyle(`
      position: relative;
      overflow: hidden;
      width: ${AVATAR_SIZE.L}px;
      height: ${AVATAR_SIZE.L}px;
      border-radius: ${AVATAR_RADIUS.L}px;
    `);
    expect(container).toBeTruthy();
  });

  test('Avatar M', () => {
    const { getByTestId, container } = render(<Avatar url={URL} size="M" />);

    const AvatarEle = getByTestId('avatarContainer');
    expect(AvatarEle).toHaveStyle(`
      position: relative;
      overflow: hidden;
      width: ${AVATAR_SIZE.M}px;
      height: ${AVATAR_SIZE.M}px;
      border-radius: ${AVATAR_RADIUS.M}px;
    `);
    expect(container).toBeTruthy();
  });

  test('Avatar S', () => {
    const { getByTestId, container } = render(<Avatar url={URL} size="S" />);

    const AvatarEle = getByTestId('avatarContainer');
    expect(AvatarEle).toHaveStyle(`
      position: relative;
      overflow: hidden;
      width: ${AVATAR_SIZE.S}px;
      height: ${AVATAR_SIZE.S}px;
      border-radius: ${AVATAR_RADIUS.S}px;
    `);
    expect(container).toBeTruthy();
  });

  test('Avatar Default Size', () => {
    const { getByTestId, container } = render(<Avatar url={URL} />);

    const AvatarEle = getByTestId('avatarContainer');
    expect(AvatarEle).toHaveStyle(`
      position: relative;
      overflow: hidden;
      width: ${AVATAR_SIZE.L}px;
      height: ${AVATAR_SIZE.L}px;
      border-radius: ${AVATAR_RADIUS.L}px;
    `);
    expect(container).toBeTruthy();
  });

  test('Avatar Default Image', () => {
    const { getByTestId, queryByTestId, container } = render(<Avatar />);

    const AvatarEle = getByTestId('avatarContainer');
    const AvatarImage = queryByTestId('avatarImage');
    expect(AvatarEle).toHaveStyle(`
      position: relative;
      overflow: hidden;
      width: ${AVATAR_SIZE.L}px;
      height: ${AVATAR_SIZE.L}px;
      border-radius: ${AVATAR_RADIUS.L}px;
    `);
    expect(AvatarImage).toBeNull();
    expect(container).toBeTruthy();
  });
});
