import { type Dispatch, type SetStateAction } from 'react';
import { type NoumLayoutSectionType } from '@/apollo/generated/types';
import { type SelectLayout } from '../../shared/types/selectSectionLayout';

export type EmptySectionsProps = {
  handleSelectSectionType: (
    sectionType: NoumLayoutSectionType,
  ) => Promise<void>;
};

export type SectionLayoutItemProps = EmptySectionsProps & {
  layoutSectionType: NoumLayoutSectionType;
  columnsArray: number[];
};

export type SectionsLayoutPickerProps = SelectLayout & {
  setIsPopover: Dispatch<SetStateAction<boolean>>;
};
