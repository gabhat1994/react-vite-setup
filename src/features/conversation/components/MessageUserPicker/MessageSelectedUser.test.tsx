import { render, fireEvent } from '@/test-utils';
import { MessageSelectedUser } from './MessageSelectedUser';
import { type IUserDropdown } from './types';

describe('MessageSelectedUser', () => {
  const userWithoutProfile: IUserDropdown = {
    key: '6232f2aefd028201aff18b43',
    label: 'Mike Ko',
    type: 'value',
    description: 'Social Media Manager',
    value: {
      _id: '6232f2aefd028201aff18b43',
      firstName: 'Mike',
      lastName: 'Ko',
      title: 'Social Media Manager',
    },
  };
  const user: IUserDropdown = {
    key: '6232f2aefd028201aff18b43',
    label: 'Mike Ko',
    type: 'value',
    description: 'Social Media Manager',
    value: {
      _id: '6232f2aefd028201aff18b43',
      firstName: 'Mike',
      lastName: 'Ko',
      title: 'Social Media Manager',
    },
  };
  const onRemove = vi.fn();

  test('Should render with avatar', () => {
    const { getByTestId } = render(
      <MessageSelectedUser data={user} onRemove={onRemove} />,
    );
    expect(getByTestId('selected-user')).toBeInTheDocument();
  });
  test('Should render without avatar', () => {
    const { getByTestId } = render(
      <MessageSelectedUser data={userWithoutProfile} onRemove={onRemove} />,
    );
    expect(getByTestId('selected-user')).toBeInTheDocument();
  });

  test('Should not render remove icon', () => {
    const { queryByTestId } = render(
      <MessageSelectedUser
        data={user}
        multiselect={false}
        onRemove={onRemove}
      />,
    );
    expect(queryByTestId('remove-button')).toBeNull();
  });

  test('Should render remove icon and remove item', () => {
    const { getByTestId } = render(
      <MessageSelectedUser data={user} multiselect onRemove={onRemove} />,
    );
    expect(getByTestId('remove-button')).toBeInTheDocument();
    fireEvent.click(getByTestId('remove-button'));
    expect(onRemove.mock.calls.length).toEqual(1);
  });
});
