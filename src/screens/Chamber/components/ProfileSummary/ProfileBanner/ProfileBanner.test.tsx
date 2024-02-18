import { render } from '@/test-utils';
import { PROFLE_SIZE } from './constants';
import { ProfileBanner } from './ProfileBanner';

const URL = 'https://www.w3schools.com/howto/img_avatar2.png';

describe('<ProfileBanner>', () => {
  test('Profile XXXL', () => {
    const { getByTestId, container } = render(
      <ProfileBanner
        url={URL}
        size="XXXL"
        borderRadius={PROFLE_SIZE.XXXL}
        isBanner={false}
      />,
    );

    const ProfileEle = getByTestId('avatarContainer');
    expect(ProfileEle).toHaveStyle(`
      position: relative;
      overflow: hidden;
      width: ${PROFLE_SIZE.XXXL}px;
      height: ${PROFLE_SIZE.XXXL}px;
      border-radius: ${PROFLE_SIZE.XXXL}px;

    `);
    expect(container).toBeTruthy();
  });

  test('Profile XXL', () => {
    const { getByTestId, container } = render(
      <ProfileBanner
        url={URL}
        size="XXL"
        isBanner={false}
        borderRadius={PROFLE_SIZE.XXL}
      />,
    );

    const ProfileEle = getByTestId('avatarContainer');
    expect(ProfileEle).toHaveStyle(`
      position: relative;
      overflow: hidden;
      width: ${PROFLE_SIZE.XXL}px;
      height: ${PROFLE_SIZE.XXL}px;
      border-radius: ${PROFLE_SIZE.XXL}px;
    `);
    expect(container).toBeTruthy();
  });

  test('Profile XL', () => {
    const { getByTestId, container } = render(
      <ProfileBanner
        url={URL}
        size="XL"
        isBanner={false}
        borderRadius={PROFLE_SIZE.XL}
      />,
    );

    const ProfileEle = getByTestId('avatarContainer');
    expect(ProfileEle).toHaveStyle(`
      position: relative;
      overflow: hidden;
      width: ${PROFLE_SIZE.XL}px;
      height: ${PROFLE_SIZE.XL}px;
      border-radius: ${PROFLE_SIZE.XL}px;
    `);
    expect(container).toBeTruthy();
  });

  test('Profile L', () => {
    const { getByTestId, container } = render(
      <ProfileBanner
        url={URL}
        size="L"
        isBanner={false}
        borderRadius={PROFLE_SIZE.L}
      />,
    );

    const ProfileEle = getByTestId('avatarContainer');
    expect(ProfileEle).toHaveStyle(`
      position: relative;
      overflow: hidden;
      width: ${PROFLE_SIZE.L}px;
      height: ${PROFLE_SIZE.L}px;
      border-radius: ${PROFLE_SIZE.L}px;
    `);
    expect(container).toBeTruthy();
  });

  test('Profile M', () => {
    const { getByTestId, container } = render(
      <ProfileBanner
        url={URL}
        size="M"
        isBanner={false}
        borderRadius={PROFLE_SIZE.M}
      />,
    );

    const ProfileEle = getByTestId('avatarContainer');
    expect(ProfileEle).toHaveStyle(`
      position: relative;
      overflow: hidden;
      width: ${PROFLE_SIZE.M}px;
      height: ${PROFLE_SIZE.M}px;
      border-radius: ${PROFLE_SIZE.M}px;
     
    `);
    expect(container).toBeTruthy();
  });

  test('Profile S', () => {
    const { getByTestId, container } = render(
      <ProfileBanner
        url={URL}
        size="S"
        isBanner={false}
        borderRadius={PROFLE_SIZE.S}
      />,
    );

    const ProfileEle = getByTestId('avatarContainer');
    expect(ProfileEle).toHaveStyle(`
      position: relative;
      overflow: hidden;
      width: ${PROFLE_SIZE.S}px;
      height: ${PROFLE_SIZE.S}px;
      border-radius: ${PROFLE_SIZE.S}px;
     
    `);
    expect(container).toBeTruthy();
  });

  test('Profile Default Size', () => {
    const { getByTestId, container } = render(
      <ProfileBanner url={URL} isBanner={false} borderRadius={PROFLE_SIZE.L} />,
    );

    const ProfileEle = getByTestId('avatarContainer');
    expect(ProfileEle).toHaveStyle(`
      position: relative;
      overflow: hidden;
      width: ${PROFLE_SIZE.L}px;
      height: ${PROFLE_SIZE.L}px;
      border-radius: ${PROFLE_SIZE.L}px;
   
    `);
    expect(container).toBeTruthy();
  });

  test('Profile Default Image', () => {
    const { getByTestId, queryByTestId, container } = render(
      <ProfileBanner isBanner={false} borderRadius={PROFLE_SIZE.L} />,
    );

    const ProfileEle = getByTestId('avatarContainer');
    const AvatarImage = queryByTestId('avatarImage');
    expect(ProfileEle).toHaveStyle(`
      position: relative;
      overflow: hidden;
      width: ${PROFLE_SIZE.L}px;
      height: ${PROFLE_SIZE.L}px;
      border-radius: ${PROFLE_SIZE.L}px;
    `);
    expect(AvatarImage).toBeNull();
    expect(container).toBeTruthy();
  });
});
