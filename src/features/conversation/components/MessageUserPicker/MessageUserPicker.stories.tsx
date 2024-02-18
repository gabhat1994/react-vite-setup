import { useCallback, useState } from 'react';
import { type Meta } from '@storybook/react';

import { type UserOutput } from '@/apollo/generated/types';
import { mockUsers } from '../../mocks';
import { MessageUserPicker } from './MessageUserPicker';
import { type MessageUserPickerProps } from './types';

export default {
  title: 'UI/Conversation/Messages/MessageUserPicker',
  component: MessageUserPicker,
  argTypes: {
    multiselect: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
} as Meta<typeof MessageUserPicker>;

const PrimaryWithHooks = (props: MessageUserPickerProps) => {
  const [users, setUsers] = useState<UserOutput[]>(mockUsers(15));
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<UserOutput[]>([]);

  const onLoadMore = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setUsers((u) => [...u, ...mockUsers(15)]);
      setLoading(false);
    }, 2000);
  }, []);

  const onSelect = useCallback((_users: UserOutput[]) => {
    setSelectedUsers(_users);
  }, []);

  return (
    <MessageUserPicker
      {...props}
      data={users}
      initialValue={selectedUsers}
      onSelectUsers={onSelect}
      loading={loading}
      hasMore={users.length < 45}
      onFetchMore={onLoadMore}
    />
  );
};

export const Primary = {
  render: PrimaryWithHooks,
};
