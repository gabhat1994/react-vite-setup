import { type DropdownValueType } from '@/components/Dropdown';
import {
  createContext,
  type FC,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useLocation } from 'react-router';

import { SpaceTypeEnum } from '@/apollo/generated/types';
import {
  type NoumLinkFragment,
  type SpaceForListFragment,
} from '@/apollo/graphql';
import { useAuth } from '@/features/auth/contexts';
import {
  LinkedFilterOptions,
  updatedSortOptions,
} from '@/screens/Chamber/components/modals/ChambersFilter/constants';
import { NoumScopeEnum } from '@/screens/Chambers/types';
import { useNoums } from '@/features/noums/hooks/noums';

export const NoumsContext = createContext<{
  categoryID: string;
  sortInfo?: DropdownValueType<string>;
  sortLinkInfo?: DropdownValueType<string>;
  setSelectedCategoryID: (id: string) => void;
  setSortInfo: (info: DropdownValueType<string>) => void;
  setSortLinkInfo: (LinkInfo: DropdownValueType<string>) => void;
  fetchMore: () => Promise<void>;
  noums: SpaceForListFragment[];
  linkedNoums: NoumLinkFragment[];
  currentLoading: boolean;
  infiniteState: 'loading' | 'hasNextPage' | 'end' | 'end-with-force';
  refetchLinkedNoums: () => Promise<void>;
  setSelectedSort: (value: DropdownValueType<string>) => void;
  selectedSort: DropdownValueType<string> | undefined;
  selectedNoumType: SpaceTypeEnum | undefined;
  setSelectedNoumType: (value: SpaceTypeEnum | undefined) => void;
  selectedCateId: string | undefined;
  setSelectedCateId: (value: string) => void;
  selectedTab: NoumScopeEnum;
  setSelectedTab: (value: NoumScopeEnum) => void;
  selectedLinkSort: DropdownValueType<string> | undefined;
  setSelectedLinkSort: (value: DropdownValueType<string>) => void;
}>({
  categoryID: '-1',
  sortInfo: undefined,
  sortLinkInfo: undefined,
  setSelectedCategoryID: () => {},
  setSortInfo: () => {},
  setSortLinkInfo: () => {},
  fetchMore: () => Promise.resolve(),
  currentLoading: false,
  noums: [],
  linkedNoums: [],
  infiniteState: 'loading',
  refetchLinkedNoums: () => Promise.resolve(),
  setSelectedSort: () => {},
  selectedSort: undefined,
  selectedCateId: undefined,
  selectedLinkSort: undefined,
  selectedNoumType: undefined,
  selectedTab: NoumScopeEnum.Owned,
  setSelectedCateId: () => {},
  setSelectedLinkSort: () => {},
  setSelectedNoumType: () => {},
  setSelectedTab: () => {},
});

export const NoumsProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { search } = useLocation();

  const query = new URLSearchParams(search);
  const { user } = useAuth();

  const [selectedTab, setSelectedTab] = useState<NoumScopeEnum>(
    (query.get('tab') as NoumScopeEnum) || NoumScopeEnum.Owned,
  );
  const [selectedCateId, setSelectedCateId] = useState('-1');

  const userId = user?._id ?? '';
  const [selectedLinkSort, setSelectedLinkSort] = useState<
    DropdownValueType<string>
  >(LinkedFilterOptions()[0]);

  const [selectedNoumType, setSelectedNoumType] = useState<
    SpaceTypeEnum | undefined
  >(() => {
    const incomingType = query.get('type') as SpaceTypeEnum;
    return Object.values(SpaceTypeEnum).includes(incomingType)
      ? incomingType
      : undefined;
  });

  const [selectedSort, setSelectedSort] = useState<DropdownValueType<string>>(
    updatedSortOptions[0],
  );
  const [categoryID, setSelectedCategoryID] = useState('-1');
  const [sortInfo, setSortInfo] = useState(updatedSortOptions[0]);
  const [sortLinkInfo, setSortLinkInfo] = useState(LinkedFilterOptions()[0]);

  const {
    fetchMore,
    noums,
    linkedNoums,
    currentLoading,
    infiniteState,
    refetchLinkedNoums,
  } = useNoums(
    selectedTab,
    userId,
    selectedSort,
    selectedCateId,
    selectedLinkSort,
    selectedNoumType,
  );

  const payload = useMemo(
    () => ({
      categoryID,
      sortInfo,
      sortLinkInfo,
      setSelectedCategoryID,
      setSortInfo,
      setSortLinkInfo,
      fetchMore,
      noums,
      linkedNoums,
      currentLoading,
      infiniteState,
      refetchLinkedNoums,
      setSelectedSort,
      selectedSort,
      selectedNoumType,
      setSelectedNoumType,
      selectedCateId,
      setSelectedCateId,
      selectedTab,
      setSelectedTab,
      selectedLinkSort,
      setSelectedLinkSort,
    }),
    [
      categoryID,
      currentLoading,
      fetchMore,
      infiniteState,
      linkedNoums,
      noums,
      refetchLinkedNoums,
      selectedCateId,
      selectedLinkSort,
      selectedNoumType,
      selectedSort,
      selectedTab,
      sortInfo,
      sortLinkInfo,
    ],
  );

  return (
    <NoumsContext.Provider value={payload}>{children}</NoumsContext.Provider>
  );
};

export function useNoumsContext() {
  const context = useContext(NoumsContext);

  return context;
}
