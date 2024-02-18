import type { offsetLimitPagination } from '@apollo/client/utilities';

export function offsetLimitPaginationData(
  keyArgs: ReturnType<typeof offsetLimitPagination>['keyArgs'],
  dataTypes: string[] = ['data'],
  skipForMissingInIncoming = false,
) {
  // eslint-disable-next-line no-void
  if (keyArgs === void 0) {
    // eslint-disable-next-line
    keyArgs = false;
  }
  return {
    // eslint-disable-next-line
    keyArgs: keyArgs,
    // eslint-disable-next-line
    merge(existing: any, incoming: any, options: any) {
      // temporary workaround for non-standard query input
      const offset = options?.args?.offset ?? options?.args?.input?.offset ?? 0;

      // In case a query fetches only part of the paginated data
      // but does not include 'dataType' field, we don't want to override it with blank.
      const initData = skipForMissingInIncoming
        ? { ...existing, ...incoming }
        : { ...incoming };

      // some of the queries return multiple arrays of data,
      // so we need to merge them together based on the array of their keys
      const mergedData = dataTypes.reduce((acc, dataType) => {
        const merged = mergeListsForCache(
          existing ? existing[dataType] : [],
          incoming ? incoming[dataType] : [],
          offset,
        );

        return { ...acc, [dataType]: merged };
      }, {});

      return { ...initData, ...mergedData };
    },
  };
}

export function mergeListsForCache<T>(
  existing: T[],
  incoming: T[],
  offset: number,
): T[] {
  if (!incoming) {
    return existing;
  }

  // merge doesn't return me if this is triggered by a query / refetch or fetch more
  // I use the offset = 0 to detect a refetch and overwrite the cache
  const merged = existing && !!offset ? [...existing] : [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < incoming.length; ++i) {
    merged[offset + i] = incoming[i];
  }

  return merged;
}
