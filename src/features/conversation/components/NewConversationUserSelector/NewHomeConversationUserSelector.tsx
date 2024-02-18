import { useAuth } from '@/features/auth/contexts';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { Stack } from '@/layout';
import { PAGE_BIG_SIZE, PAGE_SIZE } from '@/screens/Chambers/constants';
import { cleanList } from '@/utils/list';
import {
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ForwardedRef,
} from 'react';
import { useAllUsersWithoutEventQuery } from '@/apollo/graphql';
import { NetworkStatus } from '@apollo/client';
import { type UserBasicOutputFragment } from '@/apollo/graphql/fragments';
import { NewConversationContext } from '../../contexts/NewConversationContext';
import { MessageUserPicker } from '../MessageUserPicker/MessageUserPicker';
import { type MessageUserPickerForwardRefProps } from '../MessageUserPicker/types';

export const NewHomeConversationUserSelector = forwardRef(
  (_, ref: ForwardedRef<MessageUserPickerForwardRefProps>) => {
    const { user: currentUser } = useAuth();
    const deviceType = useDeviceType();
    const { selectedUsers, setSelectedUsers } = useContext(
      NewConversationContext,
    );
    const [search, setSearch] = useState('');

    const { data, fetchMore, loading, networkStatus } =
      useAllUsersWithoutEventQuery({
        fetchPolicy: 'cache-and-network',
        variables: {
          search,
          offset: 0,
          limit:
            deviceType === DeviceTypeEnum.MOBILE ? PAGE_BIG_SIZE : PAGE_SIZE,
          activeUserOnly: true,
        },
      });

    const users = cleanList(
      data?.allUsers?.data?.filter((user) => user?._id !== currentUser?._id),
    );
    const totalCount = useMemo(() => data?.allUsers?.count || 0, [data]);

    const messageUserPickerRef =
      useRef<React.ElementRef<typeof MessageUserPicker>>(null);

    const onLoadMore = useCallback(async () => {
      fetchMore({
        variables: {
          offset: users.length,
        },
      });
    }, [fetchMore, users.length]);

    const onSelect = useCallback(
      (_users: UserBasicOutputFragment[]) => {
        setSelectedUsers(_users);
      },
      [setSelectedUsers],
    );

    const onCancel = useCallback(() => {
      messageUserPickerRef?.current?.cancel?.();
    }, [messageUserPickerRef]);

    useImperativeHandle(
      ref,
      () => ({
        cancel() {
          onCancel();
        },
      }),
      [onCancel],
    );

    return (
      <Stack align="center" fullWidth data-testid="newhomeconversation">
        <MessageUserPicker
          ref={messageUserPickerRef}
          data={users}
          initialValue={selectedUsers}
          onSelectUsers={onSelect}
          initLoading={loading && !users.length}
          loading={loading && networkStatus === NetworkStatus.fetchMore}
          hasMore={users.length < totalCount}
          onFetchMore={onLoadMore}
          onSetSearch={setSearch}
        />
      </Stack>
    );
  },
);
