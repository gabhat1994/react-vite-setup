import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { uniqBy } from 'lodash';

import {
  type PickerUsersQuery,
  type EventAllFavoriteMembersQuery,
  useEventAllFavoriteMembersQuery,
  usePickerUsersQuery,
} from '@/apollo/graphql';
import { getBottomStatusFromQuery } from '@/components/Infinite';
import { type BottomStatus } from '@/components/Infinite/types';
import { getFullName } from '@/utils/fullName';
import { type Maybe } from '@/common/types';
import { UserUtil } from '@/utils/user';
import {
  type SearchUserFilter,
  UserRelationType,
  GlobalSearchUserEntityStatus,
} from '@/apollo/generated/types';
import { useAuth } from '@/features/auth/contexts';
import {
  type UserBasicOutputFragment,
  type UserFragment,
} from '@/apollo/graphql/fragments';
import type { IUser, IUserDropdown } from '../types/context';

interface IUseUsersPicker {
  filter: Maybe<SearchUserFilter>;
  chamberId: Maybe<string>;
  isMobile: boolean;
  isOpened: boolean;
  searchText: string | undefined;
  multiselect: boolean;
  initialData: IUser[];
  onlyConnected?: boolean;
  onlyFavorites?: boolean;
  excludeCurrentUser?: boolean;
  onChangeSelectedUsers: (u: IUser[]) => void;
  fetchAllUsers: boolean;
}

interface IUseUsersPickerRes {
  selectableOptions: IUserDropdown[];
  selectedOptions: IUserDropdown[];
  noOptions: boolean;
  loading: boolean;
  fetchMoreStatus: BottomStatus;
  onSelectUser: (option: IUserDropdown, saveNow: boolean) => void;
  onUnSelectUser: (k: string) => void;
  onFetchMore: () => void;
  onSave: () => void;
}

const buildDropDownData = (data: IUser[]): IUserDropdown[] =>
  data.map((datum: IUser, index) => ({
    key: datum._id || `key-${index}`,
    label: getFullName(
      datum.firstName,
      datum.middleName,
      datum.lastName,
      datum.email,
    ),
    type: 'value',
    description: datum.title || '',
    value: datum,
  }));

const fetchLimit = 10;

export const useUsersPicker = ({
  filter,
  chamberId,
  isMobile,
  isOpened,
  searchText,
  multiselect,
  initialData,
  onlyConnected,
  onlyFavorites,
  excludeCurrentUser,
  onChangeSelectedUsers,
}: IUseUsersPicker): IUseUsersPickerRes => {
  const [selected, setSelected] = useState<IUser[] | undefined>();
  const [favoriteUsers, setFavoriteUsers] = useState<IUser[]>([]);
  const [favoriteUsersTotalCount, setFavoriteUsersTotalCount] =
    useState<number>(0);
  const [connectedUsers, setConnectedUsers] = useState<IUser[]>([]);
  const [tempUsers, setTempUsers] = useState<IUserDropdown[]>([]);
  const [connectedUsersTotalCount, setConnectedUsersTotalCount] =
    useState<number>(0);
  const [otherUsers, setOtherUsers] = useState<IUser[]>([]);
  const [otherUsersTotalCount, setOtherUsersTotalCount] = useState<number>(0);
  const [text, setText] = useState<string | undefined>(undefined);
  const { user: currentUser } = useAuth();

  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpened && selected === undefined) {
      setSelected(initialData);
    }
  }, [initialData, selected, isOpened]);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    const debounce = searchText ? 500 : 0;
    if (searchText !== undefined) {
      timer.current = setTimeout(() => {
        setText(searchText.trim());
      }, debounce);
    }

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [text, searchText]);

  const getUserData = useCallback(
    (user?: Maybe<Partial<UserBasicOutputFragment>>) => ({
      _id: user?._id,
      firstName: user?.firstName,
      middleName: user?.middleName,
      lastName: user?.lastName,
      email: user?.email,
      title: user?.title,
      profilePictureThumbnail:
        UserUtil.getProfilePicture(user as UserFragment) ?? '',
      chamberId: user?.chamber?._id ?? '',
      isHost: false,
    }),
    [],
  );

  const getUserDetails = useCallback(
    (curVal: PickerUsersQuery['other']['data'][0]) => ({
      _id: curVal.user.id || '',
      firstName: curVal.user.firstName,
      middleName: curVal.user.middleName,
      lastName: curVal.user.lastName,
      email: '',
      title: curVal.user.title,
      chamberId: curVal.id,
      profilePictureThumbnail: curVal.user.thumbnailUrl,
      isHost: false,
    }),
    [],
  );

  const setUsers = useCallback(
    (
      res: PickerUsersQuery | EventAllFavoriteMembersQuery,
      shouldReset: boolean = true,
    ) => {
      let hasFavorites = false;
      let hasConnected = false;
      let hasOther = false;

      if ('favorites' in res && res.favorites.data) {
        hasFavorites = !!res?.favorites?.count;
        setFavoriteUsersTotalCount(res.favorites.count || 0);
        setFavoriteUsers((fu) => [
          ...(shouldReset ? [] : fu),
          ...(res.favorites.data || []).map((u) => getUserData(u)),
        ]);
      }
      if ('connected' in res && res.connected.data) {
        hasConnected = !!res?.connected?.count;
        setConnectedUsersTotalCount(res.connected.count || 0);
        setConnectedUsers((cu) => [
          ...(shouldReset ? [] : cu),
          ...(res.connected.data || []).map((u) => ({
            ...getUserData(u),
            isConnected: true,
          })),
        ]);
      }
      if ('other' in res && res.other.data) {
        hasOther = !!res?.other?.count;
        setOtherUsersTotalCount(res.other.count || 0);
        setOtherUsers((ou) => [
          ...(shouldReset ? [] : ou),
          ...(res.other.data || []).map((u) => ({
            ...getUserDetails(u),
            isConnected: false,
          })),
        ]);
      }
      const useByEmail = !hasFavorites && !hasConnected && !hasOther;
      if (useByEmail && 'other' in res && res.other.data) {
        const reducedByEmail = res.other.data.reduce(
          (acc, curVal) => {
            if (curVal.chamber?.isConnected) {
              acc.connected = [
                ...acc.connected,
                {
                  ...getUserDetails(curVal),
                  isConnected: true,
                },
              ];
            } else {
              acc.other = [
                ...acc.other,
                {
                  ...getUserDetails(curVal),
                  isConnected: false,
                },
              ];
            }
            return acc;
          },
          {
            connected: [] as IUser[],
            other: [] as IUser[],
          },
        );
        setConnectedUsersTotalCount(reducedByEmail.connected.length);
        setConnectedUsers(reducedByEmail.connected);
        setOtherUsersTotalCount(reducedByEmail.other.length);
        setOtherUsers(reducedByEmail.other);
      }
    },
    [getUserData, getUserDetails],
  );

  const {
    loading: loading0,
    fetchMore: fetchMore0,
    networkStatus: nStatus0,
  } = useEventAllFavoriteMembersQuery({
    fetchPolicy: 'cache-and-network',
    skip: !isOpened || !chamberId || !onlyFavorites,
    variables: {
      filter,
      search: text,
      chamberId: chamberId || '',
      favoritesLimit: text ? null : fetchLimit,
      favoritesOffset: 0,
      type: UserRelationType.Connected,
    },
    onCompleted: setUsers,
  });

  const {
    loading: loading1,
    fetchMore: fetchMore1,
    networkStatus: nStatus1,
  } = usePickerUsersQuery({
    fetchPolicy: 'cache-and-network',
    skip: !isOpened || !chamberId || onlyFavorites,
    variables: {
      search: text,
      chamberId: chamberId || '',
      connectedLimit: text ? null : fetchLimit,
      connectedOffset: 0,
      limit: fetchLimit,
      offset: 0,
      fetchAll: !onlyConnected,
      userStatuses: [GlobalSearchUserEntityStatus.NoumenaMember],
    },
    onCompleted: setUsers,
  });

  const selectedIds = useMemo(
    () => (selected || []).map((s) => s._id),
    [selected],
  );

  const others = useMemo(
    () => (onlyConnected ? [] : otherUsers),
    [onlyConnected, otherUsers],
  );

  const othersTotalCount = useMemo(
    () => (onlyConnected ? 0 : otherUsersTotalCount),
    [onlyConnected, otherUsersTotalCount],
  );

  const initialOptions: IUserDropdown[] = useMemo(
    () => buildDropDownData(selected || []),
    [selected],
  );

  const fUsersOptions: IUserDropdown[] = useMemo(
    () => buildDropDownData(favoriteUsers),
    [favoriteUsers],
  );
  const cUsersOptions: IUserDropdown[] = useMemo(
    () => buildDropDownData(connectedUsers),
    [connectedUsers],
  );
  const oUsersOptions: IUserDropdown[] = useMemo(
    () => buildDropDownData(others),
    [others],
  );

  const selectedOptions: IUserDropdown[] = useMemo(() => {
    const ids: string[] = [];
    selected?.forEach((s) => {
      if (s._id && !s.isSaved && !s.isTemporarySaved) {
        ids.push(s._id);
      }
    });

    return tempUsers.filter((o) =>
      onlyConnected
        ? !!o.value.isConnected &&
          !o.value.isSaved &&
          !o.value.isTemporarySaved &&
          ids.includes(o.key)
        : !o.value.isSaved && !o.value.isTemporarySaved && ids.includes(o.key),
    );
  }, [onlyConnected, selected, tempUsers]);

  useEffect(() => {
    setTempUsers((tu) =>
      uniqBy(
        [
          ...tu,
          ...initialOptions,
          ...fUsersOptions,
          ...cUsersOptions,
          ...oUsersOptions,
        ],
        'key',
      ),
    );
  }, [cUsersOptions, fUsersOptions, initialOptions, oUsersOptions]);

  useEffect(() => {
    if (!isOpened) {
      setFavoriteUsers([]);
      setFavoriteUsersTotalCount(0);
      setConnectedUsers([]);
      setConnectedUsersTotalCount(0);
      setOtherUsers([]);
      setOtherUsersTotalCount(0);
      setSelected(undefined);
      setText('');
    }
  }, [isOpened]);

  const hasMore = useMemo(
    () =>
      favoriteUsersTotalCount > favoriteUsers.length ||
      connectedUsersTotalCount > connectedUsers.length ||
      othersTotalCount > others.length,
    [
      connectedUsers.length,
      connectedUsersTotalCount,
      favoriteUsers.length,
      favoriteUsersTotalCount,
      others.length,
      othersTotalCount,
    ],
  );

  const fetchMoreStatus: BottomStatus = useMemo(() => {
    if (hasMore) {
      return getBottomStatusFromQuery({
        networkStatus: onlyFavorites ? nStatus0 : nStatus1,
        totalCount: onlyFavorites
          ? favoriteUsersTotalCount
          : connectedUsersTotalCount + othersTotalCount,
        currentCount: onlyFavorites
          ? favoriteUsers.length
          : connectedUsers.length + others.length,
        withForce: true,
      });
    }

    return 'end';
  }, [
    connectedUsers.length,
    connectedUsersTotalCount,
    favoriteUsers.length,
    favoriteUsersTotalCount,
    hasMore,
    nStatus0,
    nStatus1,
    onlyFavorites,
    others.length,
    othersTotalCount,
  ]);

  const selectableOptions: IUserDropdown[] = useMemo(() => {
    const availableFOptions: IUserDropdown[] = [];
    const availableCOptions: IUserDropdown[] = [];
    const availableOOptions: IUserDropdown[] = [];

    fUsersOptions.forEach((option) => {
      if (isMobile) {
        const cur = tempUsers.find((tu) => tu.key === option.key);

        // In mobile, we show all items with selected status
        availableFOptions.push({
          ...option,
          selected: selectedIds.includes(String(option.key)),
          disabled: Boolean(cur?.value.isSaved || cur?.value.isTemporarySaved),
        });
        // In web/tablet, we only show unselected items
      } else if (!selectedIds.includes(String(option.key))) {
        availableFOptions.push({
          ...option,
          selected: false,
        });
      }
    });

    cUsersOptions.forEach((option) => {
      if (isMobile) {
        const cur = tempUsers.find((tu) => tu.key === option.key);

        // In mobile, we show all items with selected status
        availableCOptions.push({
          ...option,
          selected: selectedIds.includes(String(option.key)),
          disabled: Boolean(cur?.value.isSaved || cur?.value.isTemporarySaved),
        });
        // In web/tablet, we only show unselected items
      } else if (!selectedIds.includes(String(option.key))) {
        availableCOptions.push({
          ...option,
          selected: false,
        });
      }
    });

    oUsersOptions.forEach((option) => {
      if (isMobile) {
        const isSaved = tempUsers.find((tu) => tu.key === option.key)?.value
          .isSaved;
        // In mobile, we show all items with selected status
        availableOOptions.push({
          ...option,
          selected: selectedIds.includes(String(option.key)),
          disabled: Boolean(isSaved),
        });
        // In web/tablet, we only show unselected items
      } else if (!selectedIds.includes(String(option.key))) {
        availableOOptions.push({
          ...option,
          selected: false,
        });
      }
    });

    const merged = [
      ...availableFOptions,
      ...availableCOptions,
      ...availableOOptions,
    ];

    if (excludeCurrentUser) {
      return merged.filter((option) => option.value._id !== currentUser?._id);
    }

    return merged;
  }, [
    fUsersOptions,
    cUsersOptions,
    oUsersOptions,
    isMobile,
    selectedIds,
    tempUsers,
    currentUser?._id,
    excludeCurrentUser,
  ]);

  const noOptions = useMemo(
    () => [...fUsersOptions, ...cUsersOptions, ...oUsersOptions].length === 0,
    [cUsersOptions, fUsersOptions, oUsersOptions],
  );

  const onFetchMore = useCallback(async () => {
    if (!hasMore) return;

    if (onlyFavorites) {
      const res = await fetchMore0({
        variables: {
          search: text,
          favoritesLimit: fetchLimit,
          favoritesOffset: favoriteUsers.length,
        },
      });
      setUsers(res.data, false);
    } else {
      const res = await fetchMore1({
        variables: {
          search: text,
          connectedLimit: fetchLimit,
          connectedOffset: connectedUsers.length,
          limit: fetchLimit,
          offset: otherUsers.length,
        },
      });
      setUsers(res.data, false);
    }
  }, [
    hasMore,
    onlyFavorites,
    fetchMore0,
    text,
    favoriteUsers.length,
    setUsers,
    fetchMore1,
    connectedUsers.length,
    otherUsers.length,
  ]);

  const onSelectUser = useCallback(
    (option: IUserDropdown, saveNow: boolean) => {
      let newSelected: IUser[] = [];
      if (multiselect) {
        if (selectedIds.includes(option.key)) {
          newSelected = (selected || []).filter((s) => s._id !== option.key);
        } else {
          newSelected = [
            ...(selected || []),
            { ...option.value, isTemporarySaved: saveNow },
          ];
        }
      } else {
        newSelected = [{ ...option.value, isTemporarySaved: saveNow }];
      }
      setSelected(newSelected);
      onChangeSelectedUsers(newSelected);
    },
    [multiselect, onChangeSelectedUsers, selected, selectedIds],
  );

  const onUnSelectUser = useCallback((id: string) => {
    setSelected((s) => (s || []).filter((_s) => _s._id !== id));
  }, []);

  const onSave = useCallback(() => {
    if (isOpened) {
      onChangeSelectedUsers(
        (selected || []).map((d) => ({ ...d, isTemporarySaved: true })),
      );
    }
  }, [isOpened, onChangeSelectedUsers, selected]);

  return {
    selectableOptions,
    selectedOptions,
    noOptions,
    loading: (loading0 || loading1) && (!selectableOptions.length || !!text),
    fetchMoreStatus,
    onFetchMore,
    onSelectUser,
    onUnSelectUser,
    onSave,
  };
};

export default useUsersPicker;
