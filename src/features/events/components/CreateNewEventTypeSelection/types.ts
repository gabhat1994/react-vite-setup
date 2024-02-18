import { type TooltipPosition } from '@/components/Button/types';
import type { DropdownValueType } from '@/components/Dropdown';

export interface CreateNewEventTypeSelectionProps {
  chamberId: string;
  hasEvents?: boolean;
  isPrimaryBtn?: boolean;
  tooltipMessage?: string;
  tooltipVisibility?: boolean;
  tooltipPosition?: TooltipPosition;
  handleDropdownClick: (arg: DropdownValueType<number>) => void;
}
