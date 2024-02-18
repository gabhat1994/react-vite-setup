import {
  UserRelationType,
  PermissibleElementType,
} from '@/apollo/generated/types';
import { useAllUsersWithOwnerQuery } from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';
import { DeviceTypeEnum, useDeviceType, useLaunchDarkly } from '@/hooks';
import { Stack } from '@/layout';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { PAGE_BIG_SIZE, PAGE_SIZE } from '@/screens/Chambers/constants';
import { cleanList } from '@/utils/list';
import { NetworkStatus } from '@apollo/client';
import { uniqBy } from 'lodash';
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
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { TSpan } from '@/components';
import { useTranslation } from 'react-i18next';
import { type UserBasicOutputFragment } from '@/apollo/graphql/fragments';
import { NewConversationContext } from '../../contexts/NewConversationContext';
import { MessageUserPicker } from '../MessageUserPicker/MessageUserPicker';
import { type MessageUserPickerForwardRefProps } from '../MessageUserPicker/types';

export const NewConversationUserSelector = forwardRef(
  (_, ref: ForwardedRef<MessageUserPickerForwardRefProps>) => {
    const { t } = useTranslation();
    const {
      flags: { elementPermission },
    } = useLaunchDarkly();
    const { user: currentUser } = useAuth();
    const { space } = useNoumContext();
    const deviceType = useDeviceType();
    const { selectedUsers, setSelectedUsers } = useContext(
      NewConversationContext,
    );
    const [search, setSearch] = useState('');
    const { hasElementPermission } = useNoumAuthorization();

    const hasCreateGroupPermission = hasElementPermission(
      PermissibleElementType.Messages,
      'create-new-group-message-conversation',
      true,
    );

    const { data, fetchMore, loading, networkStatus } =
      useAllUsersWithOwnerQuery({
        variables: {
          search,
          offset: 0,
          limit:
            deviceType === DeviceTypeEnum.MOBILE ? PAGE_BIG_SIZE : PAGE_SIZE,
          activeUserOnly: false,
          chamberId: space?._id,
          type: UserRelationType.Connected,
          filter: {
            includeNonMembers: true,
            includeNoumOwner: true,
          },
          ownerID: space?.uid?._id ?? '',
          oldConnectionFlow: !elementPermission,
        },
        fetchPolicy: 'cache-and-network',
        skip: !space?._id,
      });

    const totalCount = data?.allUsers?.count || 0;
    const users = useMemo(
      () =>
        uniqBy(
          cleanList(
            [data?.user, ...(data?.allUsers.data || [])].filter(
              (user) => user?._id !== currentUser?._id,
            ),
          ),
          '_id',
        ),
      [currentUser?._id, data?.allUsers.data, data?.user],
    );

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
        setSelectedUsers(_users.filter((user) => user !== undefined));
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

    const CustomOptionsContent = (
      <Stack padding="12px">
        <TSpan
          font="body-m"
          colorToken="--text-tablecell-header-neutral-default"
        >
          {t('noumena.chat.no_permission.create_group_conversation_text')}
        </TSpan>
      </Stack>
    );

    return (
      <Stack align="center" fullWidth data-testid="newconversation">
        <MessageUserPicker
          ref={messageUserPickerRef}
          data={users}
          initialValue={selectedUsers}
          CustomOptionsContent={
            selectedUsers.length > 0 && !hasCreateGroupPermission
              ? CustomOptionsContent
              : null
          }
          multiselect={hasCreateGroupPermission}
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
