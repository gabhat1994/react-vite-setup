import {
  type SpaceProfileValue,
  type ElementStatusEnum,
} from '@/apollo/generated/types';
import { type DropdownValueType } from '@/components/Dropdown';

export interface IncompletedItemProps extends SpaceProfileValue {
  status?: ElementStatusEnum;
}

export interface IncompletedItemDropdownOptionProps
  extends DropdownValueType<string, string> {
  status?: ElementStatusEnum;
}
