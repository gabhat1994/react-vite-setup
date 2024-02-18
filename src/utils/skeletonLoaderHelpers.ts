import { type SpaceOutputFragment } from '@/apollo/graphql';

export const chambersForSkeletonLoader = (countPerPage: number = 4) =>
  Array.from(
    { length: countPerPage },
    (_, i) =>
      ({
        _id: `${i + 1}`,
        key: `${i + 1}`,
      } as SpaceOutputFragment),
  );
