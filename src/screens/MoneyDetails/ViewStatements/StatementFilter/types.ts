import { type DropdownValueType } from '@/components/Dropdown/types';

export interface StatementFilterProps {
  isOpen: boolean;
  handleClose: (isSuccess?: boolean) => void;
  accounts: DropdownValueType<string>[];
  selctedDropdownValue: DropdownValueType<string>;
  handleDropdoenUpdate: Function;
  startDate: Date | undefined;
  endDate: Date | undefined;
  handleStartDate: (date?: Date) => void;
  handleEndDate: (date?: Date) => void;
  setFilters: Function;
}
