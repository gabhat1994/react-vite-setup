import { cleanup, render, fireEvent } from '@/test-utils';
import {
  AVATAR_EDIT_BUTTON,
  AVATAR_EDIT_ICON_POSITION,
  AVATAR_EDIT_ICON_RADIUS,
} from './constants';
import { AvatarEditButton } from './AvatarEditButton';

describe('<AvatarEditButton>', () => {
  afterEach(() => {
    cleanup();
  });

  test('AvatarEditButton XXXL', () => {
    const { getByTestId, container } = render(
      <AvatarEditButton
        size="XXXL"
        name="edit_m"
        edit={false}
        color="--icon-button-neutral-default"
      />,
    );

    const avatarEditButtonEle = getByTestId('avatarEditButton');
    expect(avatarEditButtonEle).toHaveStyle(`
        width: ${AVATAR_EDIT_BUTTON.XXXL}px;
        height: ${AVATAR_EDIT_BUTTON.XXXL}px;
        border-radius: ${AVATAR_EDIT_ICON_RADIUS.XXXL}px;
        position: absolute;
        bottom: ${AVATAR_EDIT_ICON_POSITION.XXXL}px;
        right: ${AVATAR_EDIT_ICON_POSITION.XXXL}px;
        cursor: pointer;
        vertical-align: middle;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: '#ffffff;
       `);
    expect(container).toBeTruthy();
  });

  test('AvatarEditButton XXL', () => {
    const { getByTestId, container } = render(
      <AvatarEditButton
        size="XXL"
        name="edit_m"
        edit={false}
        color="--icon-button-neutral-default"
      />,
    );

    const avatarEditButtonEle = getByTestId('avatarEditButton');
    expect(avatarEditButtonEle).toHaveStyle(`
        width: ${AVATAR_EDIT_BUTTON.XXL}px;
        height: ${AVATAR_EDIT_BUTTON.XXL}px;
        border-radius: ${AVATAR_EDIT_ICON_RADIUS.XXL}px;
        position: absolute;
        bottom: ${AVATAR_EDIT_ICON_POSITION.XXL}px;
        right: ${AVATAR_EDIT_ICON_POSITION.XXL}px;
        cursor: pointer;
        vertical-align: middle;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: '#ffffff;
    `);
    expect(container).toBeTruthy();
  });

  test('AvatarEditButton XL', () => {
    const { getByTestId, container } = render(
      <AvatarEditButton
        size="XL"
        name="edit_m"
        edit={false}
        color="--icon-button-neutral-default"
      />,
    );

    const avatarEditButtonEle = getByTestId('avatarEditButton');
    expect(avatarEditButtonEle).toHaveStyle(`
            width: ${AVATAR_EDIT_BUTTON.XL}px;
            height: ${AVATAR_EDIT_BUTTON.XL}px;
            border-radius: ${AVATAR_EDIT_ICON_RADIUS.XL}px;
            position: absolute;
            bottom: ${AVATAR_EDIT_ICON_POSITION.XL}px;
            right: ${AVATAR_EDIT_ICON_POSITION.XL}px;
            cursor: pointer;
            vertical-align: middle;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: '#ffffff;
        `);
    expect(container).toBeTruthy();
  });

  test('AvatarEditButton L', () => {
    const { getByTestId, container } = render(
      <AvatarEditButton
        size="L"
        name="edit_m"
        edit={false}
        color="--icon-button-neutral-default"
      />,
    );

    const avatarEditButtonEle = getByTestId('avatarEditButton');
    expect(avatarEditButtonEle).toHaveStyle(`
            width: ${AVATAR_EDIT_BUTTON.L}px;
            height: ${AVATAR_EDIT_BUTTON.L}px;
            border-radius: ${AVATAR_EDIT_ICON_RADIUS.L}px;
            position: absolute;
            bottom: ${AVATAR_EDIT_ICON_POSITION.L}px;
            right: ${AVATAR_EDIT_ICON_POSITION.L}px;
            cursor: pointer;
            vertical-align: middle;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: '#ffffff;
        `);
    expect(container).toBeTruthy();
  });

  test('AvatarEditButton L', async () => {
    const handleClick = vi.fn();
    const { getByTestId, container } = render(
      <AvatarEditButton
        size="L"
        name="edit_m"
        edit={true}
        color="--icon-button-danger-secondary-default"
        onClick={handleClick}
      />,
    );

    const avatarEditButtonEle = getByTestId('avatarEditButton');
    const avatarEditButtonIconEle = getByTestId('svgIcon');
    await fireEvent.click(avatarEditButtonEle);

    expect(avatarEditButtonEle).toHaveStyle(`
            width: ${AVATAR_EDIT_BUTTON.L}px;
            height: ${AVATAR_EDIT_BUTTON.L}px;
            border-radius: ${AVATAR_EDIT_ICON_RADIUS.L}px;
            position: absolute;
            bottom: ${AVATAR_EDIT_ICON_POSITION.L}px;
            right: ${AVATAR_EDIT_ICON_POSITION.L}px;
            cursor: pointer;
            vertical-align: middle;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: '#ffffff;
        `);
    expect(avatarEditButtonIconEle).toBeTruthy();
    expect(handleClick).toHaveBeenCalled();
    expect(container).toBeTruthy();
  });
});
