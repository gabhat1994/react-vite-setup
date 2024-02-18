import { faker } from '@faker-js/faker';
import {
  getPaginatedList,
  type PaginatedListResult,
  useFakeQuery,
} from '@/utils/fakeQuery';

export enum RoleEnum {
  Admin = 'ADMIN',
  User = 'USER',
}

export enum StatusEnum {
  Inactive = 'INACTIVE',
  Active = 'ACTIVE',
  Deleted = 'DELETED',
}

export type Item = {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  role: RoleEnum;
  status: StatusEnum;
};

const fakeData: Item[] = Array.from({ length: 40 }).map(() => ({
  id: faker.datatype.uuid(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number({ min: 18, max: 60, precision: 1 }),
  role: faker.helpers.arrayElement(Object.values(RoleEnum)),
  status: faker.helpers.arrayElement(Object.values(StatusEnum)),
}));

export type QueryFilters = {
  search: string;
  role: RoleEnum | 'ALL';
  status: StatusEnum | 'ALL';
};

interface Variables {
  filters?: QueryFilters;
  limit: number;
  offset: number;
}

interface UseFakePaginatedListOptions {
  initialVariables: Variables;
}
export function useFakePaginatedList({
  initialVariables,
}: UseFakePaginatedListOptions) {
  return useFakeQuery<PaginatedListResult<Item>, Variables>({
    initialVariables,
    getResult: (currentVariables) =>
      getPaginatedList({
        items: fakeData,
        variables: currentVariables,
        getFilteredData: (items, { filters }) =>
          items
            .filter((item) =>
              filters?.role && filters.role !== 'ALL'
                ? item.role === filters.role
                : true,
            )
            .filter((item) =>
              filters?.status && filters.status !== 'ALL'
                ? item.status === filters.status
                : true,
            )
            .filter((item) =>
              filters?.search
                ? `${item.firstName} ${item.lastName}`.includes(filters.search)
                : true,
            ),
      }),
  });
}
