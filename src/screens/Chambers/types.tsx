import { type SpaceTypeEnum } from '@/apollo/generated/types';
import { type ButtonSize } from '@/components/Button/types';
import { type DropdownValueType } from '@/components/Dropdown/types';
import { type ICategoryOption } from '@/screens/Chamber/components/modals/ChambersFilter/types';
import { type Placement } from '@popperjs/core';

export enum NoumScopeEnum {
  Owned = 'Owned',
  Connected = 'Connected',
  Following = 'Following',
  Archived = 'Archived',
  Linked = 'Linked',
}

export enum LinkedNoumEnum {
  Noum = 'Noum',
  Connection = 'Connection',
  Following = 'Following',
}

export interface IChambersHead {
  selectedId: NoumScopeEnum;
  categoryOptions: ICategoryOption[];
  onChange: (value: NoumScopeEnum) => void;
  onSelectOption: (value: DropdownValueType<string>) => void;
  onSelectCategory: (id: string) => void;
  onSelectLinkOption: (value: DropdownValueType<string>) => void;
  onSelectNoumType?: (noumType: string) => void;
  noumType: SpaceTypeEnum | undefined;
}

export interface IEllipsisMenu<ValueType = string> {
  menuOptions: DropdownValueType<ValueType>[];
  textOnly?: boolean;
  neutral?: boolean;
  tertiary?: boolean;
  isMobile?: boolean;
  size?: ButtonSize;
  containerWidth?: string;
  onClick?: (value: ValueType) => void;
  loadingLinked?: boolean;
  iconColorToken?: string;
  placement?: Placement;
}
export interface ChamberMobileActionsProps {
  onToggleFilter: () => void;
  onToggleCreate: () => void;
  openBottomSheet: () => void;
  isFiltered: boolean;
}
