import { type InputMaybe, type SortOperator } from '@/apollo/generated/types';
import { type DropdownValueType } from '@/components/Dropdown/types';

export interface ICategoryOption extends DropdownValueType<string> {
  name: string;
}
export interface ChambersFilterProps {
  onClose: () => void;
  onSelectOption: (value: DropdownValueType<string>) => void;
  selectedSortOption: DropdownValueType<string> | undefined;
  categoryOptions: ICategoryOption[];
  onSelectCategory: (id: string) => void;
  selectedCategoryID: string | undefined;
  selectedId: string | undefined;
  onSelectLinkOption: (value: DropdownValueType<string>) => void;
  selectedLinkSort: DropdownValueType<string> | undefined;
  shouldShowFilter: boolean;
}

export type SortValueTypes = {
  key: string;
  column: string;
  operator: InputMaybe<SortOperator>;
};
