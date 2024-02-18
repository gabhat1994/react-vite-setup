export type Filters = {
  search: string;
  limit: number;
  perspective: ListPOV;
};

export enum ListPOV {
  ACTIVE = 'ACTIVE',
  ACHIVED = 'ACHIVED',
}
