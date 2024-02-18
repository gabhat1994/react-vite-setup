import {
  useState,
  type FC,
  type ReactNode,
  createContext,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { type CampaignFilters } from '@/screens/Campaigns/CampaignEntries/types';
import { Utils } from '@/screens/Campaigns/utils';
import { useLocation } from 'react-router';

type FilterState = { offset: number } & CampaignFilters;

type FilterContext = FilterState & {
  updateFilterState: (next: Partial<FilterState>) => void;
};

const CampaignFilterContext = createContext<FilterContext>({
  offset: 0,
  updateFilterState: () => null,
  ...Utils.getFilters(),
});

export const useCampaignFilterContext = () => {
  const values = useContext(CampaignFilterContext);
  if (!values) {
    throw new Error(
      'Filter Context should be used within the CampaignFilterContext',
    );
  }

  return { ...values };
};

export const CampaignListFilterProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [filterState, setFilterState] = useState<FilterState>({
    offset: 0,
    ...Utils.getFilters(),
  });

  const location = useLocation();

  const updateFilterState = useCallback((next: Partial<FilterState>) => {
    setFilterState((f) => ({ ...f, ...next }));
  }, []);

  useEffect(() => {
    // Reset Filter if route is not related to campaign
    if (!location.pathname.includes('campaign')) {
      const filterWithOutOffset = {
        status: filterState.status,
        noums: filterState.noums,
        search: filterState.search,
      };
      // Check the filter contains a value, If value is available then only update a state, avoid if value is not present
      if (!Object.values(filterWithOutOffset).every(Utils.isEmpty)) {
        updateFilterState({ offset: 0, noums: [], status: [], search: '' });
      }
    }
  }, [filterState, location, updateFilterState]);

  const value = useMemo(
    () => ({ ...filterState, updateFilterState }),
    [filterState, updateFilterState],
  );

  return (
    <CampaignFilterContext.Provider value={value}>
      {children}
    </CampaignFilterContext.Provider>
  );
};
