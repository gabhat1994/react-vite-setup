import {
  PermissibleElementType,
  PostVisibility,
  SortOperator,
  SpaceTypeEnum,
  UserStatus,
  type UserOutput,
} from '@/apollo/generated/types';
import {
  useDeletePostMutation,
  useGetAllUidForChamberPostsQuery,
  useGetPostsByChamberIdQuery,
  useUserPostsQuery,
  type PostItemFragment,
  type SpaceOutputFragment,
} from '@/apollo/graphql';
import { Avatar } from '@/components/Avatar/Avatar';
import { type DropdownValueType } from '@/components/Dropdown/types';
import { useAuth } from '@/features/auth/contexts';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { usePermissions } from '@/features/posts/hooks';
import useDebounce from '@/hooks/useDebounce';
import { getFullName } from '@/utils/fullName';
import { cleanList } from '@/utils/list';
import { trimAndLowerString } from '@/utils/strings';
import { NetworkStatus } from '@apollo/client';
import { isEqual } from 'lodash';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type FC,
  type ReactNode,
} from 'react';
import { UserUtil } from '@/utils/user';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { type FilterType, type IPostElementContext } from './types';

const initialValue: IPostElementContext = {
  loading: false,
  isDeleting: false,
  posts: [],
  allPostsLoading: true,
  showCreate: false,
  isCreatable: false,
  spaceId: undefined,
  setShowCreate: () => {},
  filter: {},
  setFilter: () => {},
  setLoading: () => {},
  deletePost: async () => false,
  showFilter: false,
  setShowFilter: () => {},
  authors: [],
  refetchPosts: async () => {},
  fetchMore: async () => {},
  setAllPostsLoading: () => {},
  isSpaceOwner: false,
  space: undefined,
  networkStatusPosts: NetworkStatus.ready,
  networkStatus: NetworkStatus.ready,
  totalCount: 0,
  isCustomPreview: false,
  isMasterNoum: false,
  authorFilterKeyword: '',
  setAuthorFilterKeyword: () => {},
  authorFilterOptions: [],
};

const PAGE_SIZE = 10;
const SORT_DEFAULT = {
  sort: {
    column: 'createdAt',
    operator: SortOperator.Desc,
  },
};

const FILTER_DEFAULT = {
  filter: {
    visibility: [PostVisibility.Connection, PostVisibility.Follower],
  },
};

const PostElementContext = createContext<IPostElementContext>(initialValue);

export const PostElementProvider: FC<{
  children: ReactNode;
  space?: SpaceOutputFragment;
  isCustomPreview?: boolean;
}> = ({ children, space, isCustomPreview }) => {
  const [loading, setLoading] = useState(false);
  const [allPostsLoading, setAllPostsLoading] = useState(true);
  const { user, isUnregistered } = useAuth();
  const isOwner = user?._id === space?.uid?._id;
  const [showCreate, setShowCreate] = useState(false);
  const [posts, setPosts] = useState<PostItemFragment[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [networkStatus, setNetworkStatus] = useState(NetworkStatus.ready);
  const [filter, setFilter] = useState<FilterType>({
    ...SORT_DEFAULT,
    ...FILTER_DEFAULT,
  });
  const [showFilter, setShowFilter] = useState(false);

  const { isConnected } = useNoumUserConnectionContext();

  const spaceId = space?._id ?? '';
  const isFollowing = !!space?.isFollowing;
  const isSpaceOwner = space?.uid?._id === user?._id;

  const [deletePostMutation, { loading: isDeleting }] = useDeletePostMutation();
  const {
    data: authorData,
    loading: loadingAuthors,
    refetch: refetchAuthors,
  } = useGetAllUidForChamberPostsQuery({
    variables: {
      chamberId: spaceId,
    },
    fetchPolicy: 'cache-and-network',
    skip: !spaceId,
  });

  const authors = useMemo(
    () => cleanList(authorData?.getAllUidForChamberPosts?.data),
    [authorData?.getAllUidForChamberPosts?.data],
  );

  const { hasElementPermission } = useNoumAuthorization();

  const hasViewNoumPostsPermission = hasElementPermission(
    PermissibleElementType.Posts,
    'view-posts',
    isOwner || isConnected || isFollowing,
  );

  const homeNoumUser =
    space?.type === SpaceTypeEnum.Home ? space.uid : undefined;

  const allowToViewNoumPosts =
    !!spaceId && (hasViewNoumPostsPermission || isFollowing);

  const skipToFetchNoumPosts =
    !spaceId || !!homeNoumUser || !allowToViewNoumPosts;

  const offset = posts.length || 0;

  const {
    data,
    loading: loadingPosts,
    fetchMore: fetchMorePosts,
    refetch,
    networkStatus: networkStatusPosts,
  } = useGetPostsByChamberIdQuery({
    variables: {
      chamberId: spaceId,
      filter: filter.filter,
      sort: filter.sort || SORT_DEFAULT.sort,
      limit: PAGE_SIZE,
    },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    skip: skipToFetchNoumPosts,
  });

  const {
    data: byAuthorData = {},
    loading: loadingUsersPosts,
    refetch: refetchUserPosts,
    fetchMore: fetchMoreUserPosts,
    networkStatus: networkStatusUsersPosts,
  } = useUserPostsQuery({
    variables: { uid: homeNoumUser?._id || '', limit: PAGE_SIZE },
    skip: !homeNoumUser?._id,
    fetchPolicy: 'cache-and-network',
  });
  const { userPosts } = byAuthorData;

  const deletePost = useCallback(
    async (id) => {
      let isSuccess;
      try {
        await deletePostMutation({
          variables: {
            _id: id,
          },
        });
        setPosts(posts.filter((post) => post._id !== id));
        isSuccess = true;
      } catch {
        isSuccess = false;
      }
      return isSuccess;
    },
    [deletePostMutation, setPosts, posts],
  );

  const refetchPosts = useCallback(async () => {
    if (homeNoumUser) {
      refetchUserPosts({
        uid: homeNoumUser?._id,
      });
      setNetworkStatus(networkStatusUsersPosts);
    } else {
      refetch({
        chamberId: spaceId,
        filter: filter.filter,
        limit: offset > PAGE_SIZE ? offset : PAGE_SIZE,
        offset: 0,
        sort: filter.sort || {
          column: 'createdAt',
          operator: SortOperator.Desc,
        },
      });
      setNetworkStatus(networkStatusPosts);
      refetchAuthors();
    }
  }, [
    homeNoumUser,
    refetchUserPosts,
    networkStatusUsersPosts,
    refetch,
    spaceId,
    filter.filter,
    filter.sort,
    offset,
    networkStatusPosts,
    refetchAuthors,
  ]);

  const fetchMore = useCallback(async () => {
    if (homeNoumUser) {
      const res = await fetchMoreUserPosts({
        variables: {
          limit: PAGE_SIZE,
          offset,
        },
      });
      const updatedPosts =
        cleanList([...(posts || []), ...(res?.data?.userPosts?.data || [])]) ||
        [];
      setPosts(updatedPosts);
      setTotalCount(res?.data?.userPosts?.count || 0);
      setNetworkStatus(networkStatusUsersPosts);
    } else {
      fetchMorePosts({
        variables: {
          limit: PAGE_SIZE,
          offset,
          filter: filter.filter,
          sort: filter.sort,
        },
      });
      setNetworkStatus(networkStatusPosts);
    }
  }, [
    fetchMorePosts,
    fetchMoreUserPosts,
    filter.filter,
    filter.sort,
    homeNoumUser,
    networkStatusPosts,
    networkStatusUsersPosts,
    offset,
    posts,
  ]);

  useEffect(() => {
    if (
      data?.getPostsByChamberId?.data &&
      !isEqual(data?.getPostsByChamberId?.data, posts)
    ) {
      setPosts(cleanList(data?.getPostsByChamberId?.data || []));
      setTotalCount(data?.getPostsByChamberId?.count || 0);
    }
  }, [
    data?.getPostsByChamberId?.count,
    data?.getPostsByChamberId?.data,
    posts,
  ]);

  useEffect(() => {
    if (homeNoumUser && userPosts?.data?.length) {
      setPosts(cleanList(userPosts?.data) || []);
      setTotalCount(userPosts?.count || 0);
    }
  }, [homeNoumUser, isSpaceOwner, userPosts?.count, userPosts?.data]);

  useEffect(() => {
    if (!skipToFetchNoumPosts) refetch();
  }, [refetch, skipToFetchNoumPosts]);

  const [authorfilterKeyword, setAuthorFilterKeyword] = useState('');
  const debouncedKeyword = useDebounce(authorfilterKeyword, 500);

  const searchedAuthors = useMemo(() => {
    const list = authors.filter((author) => {
      const fullSearchableWord = trimAndLowerString(
        `${author.firstName || ''}${author.middleName || ''}${
          author.lastName || ''
        }`,
      );
      return fullSearchableWord.includes(trimAndLowerString(debouncedKeyword));
    });
    return list.slice(0, 20);
  }, [authors, debouncedKeyword]);

  const authorFilterOptions = useMemo(() => {
    const options: DropdownValueType<UserOutput | string>[] =
      searchedAuthors.map((item) => ({
        type: 'value',
        value: item,
        key: item._id,
        label: getFullName(item.firstName, item.middleName, item.lastName),
        icon: <Avatar url={UserUtil.getProfilePicture(item)} size="M" />,
      }));

    return options;
  }, [searchedAuthors]);

  const getUserPermission = usePermissions();

  const isCreatable = useMemo(() => {
    if (space?.type === SpaceTypeEnum.Home && !isSpaceOwner) {
      return false;
    }
    if (isUnregistered) {
      return getUserPermission('POST', 'CREATE', 'UNREGISTERED');
    }
    return !!(
      (isSpaceOwner || isConnected) &&
      user?.userStatus === UserStatus.Active
    );
  }, [
    isConnected,
    isSpaceOwner,
    space,
    user,
    isUnregistered,
    getUserPermission,
  ]);

  const value = useMemo(
    () => ({
      loading: loading || loadingPosts || loadingAuthors || loadingUsersPosts,
      isDeleting,
      setLoading,
      posts,
      fetchMore,
      showCreate,
      setShowCreate,
      filter,
      setFilter,
      showFilter,
      setShowFilter,
      deletePost,
      authors,
      refetchPosts,
      setAllPostsLoading,
      isCreatable,
      isSpaceOwner,
      space,
      isMasterNoum: space?.type === SpaceTypeEnum.Home,
      networkStatus,
      totalCount,
      spaceId: space?._id ?? undefined,
      isCustomPreview,
      allPostsLoading:
        allPostsLoading || loadingPosts || loadingAuthors || loadingUsersPosts,
      networkStatusPosts,
      authorfilterKeyword,
      setAuthorFilterKeyword,
      authorFilterOptions,
      isConnectedSpace: isConnected,
    }),
    [
      loading,
      loadingPosts,
      loadingAuthors,
      loadingUsersPosts,
      isDeleting,
      isCreatable,
      posts,
      networkStatusPosts,
      fetchMore,
      showCreate,
      filter,
      showFilter,
      deletePost,
      authors,
      refetchPosts,
      isSpaceOwner,
      space,
      networkStatus,
      totalCount,
      isCustomPreview,
      allPostsLoading,
      authorfilterKeyword,
      setAuthorFilterKeyword,
      authorFilterOptions,
      isConnected,
    ],
  );

  return (
    <PostElementContext.Provider value={value}>
      {children}
    </PostElementContext.Provider>
  );
};

export const usePostElement = () => useContext(PostElementContext);
