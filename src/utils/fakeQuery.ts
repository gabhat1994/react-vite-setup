import { useCallback, useMemo, useState } from 'react';

interface PaginatedListVariables<Filters> {
  limit: number;
  offset: number;
  filters?: Filters;
}
export interface PaginatedListResult<Item> {
  data: Item[];
  count: number;
}

interface GetPaginatedListOptions<Item, Variables> {
  items: Item[];
  variables: Variables;
  getFilteredData: (items: Item[], variables: Variables) => Item[];
}
export function getPaginatedList<Item, Filters>({
  items,
  variables: { limit, offset, filters },
  getFilteredData,
}: GetPaginatedListOptions<
  Item,
  PaginatedListVariables<Filters>
>): PaginatedListResult<Item> {
  const filteredData = getFilteredData(items, { limit, offset, filters });
  return {
    data: filteredData.slice(offset, limit + offset),
    count: filteredData.length,
  };
}

interface UseFakeQueryOptions<QueryResult, QueryVariables> {
  getResult: (variables: QueryVariables) => QueryResult;
  initialVariables: QueryVariables;
  delay?: number;
}

/**
 * Imitates an Apollo query hook.
 */
export function useFakeQuery<QueryResult, QueryVariables>({
  getResult,
  initialVariables,
  delay = 500,
}: UseFakeQueryOptions<QueryResult, QueryVariables>) {
  const [currentVariables, setCurrentVariables] =
    useState<QueryVariables>(initialVariables);
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const result = useMemo(() => getResult(currentVariables), [currentVariables]);

  const refetch = useCallback(
    (newVariables: Partial<QueryVariables>) => {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentVariables((prev) => ({ ...prev, ...newVariables }));
        setIsLoading(false);
      }, delay);
    },
    [delay],
  );

  const fetchMore = useCallback(
    ({ variables: newVariables }: { variables: Partial<QueryVariables> }) => {
      setIsLoading(true);
      setTimeout(() => {
        setCurrentVariables((prev) => ({ ...prev, ...newVariables }));
        setIsLoading(false);
      }, delay);
    },
    [delay],
  );

  return {
    loading: isLoading,
    data: result,
    variables: currentVariables,
    refetch,
    fetchMore,
  };
}
