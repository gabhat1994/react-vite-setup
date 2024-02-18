import { type ElementStatusEnum } from '@/apollo/generated/types';

export type SingleOptionsProps = SingleArrayOptionProps & {
  isEditMode?: boolean;
  isOpen?: boolean;
  handleOpenAddExperienceModal: () => void;
  handleDeleteOption: (id: string) => void;
  handleSelectOption: (next: SingleArrayOptionProps) => void;
  setDefaultData: (arg: SingleArrayOptionProps) => void;
  isContianerWidth: boolean;
};

export type SingleArrayOptionProps = {
  id: string;
  _id?: string;
  title: string;
  body: string;
  position: number;
  status: ElementStatusEnum;
};

export type HomeChamberOptionsProps = {
  arrayOfOptions: SingleArrayOptionProps[];
  isEditMode?: boolean;
  isOpen?: boolean;
  handleOpenAddExperienceModal: () => void;
  handleDeleteOption: (id: string) => void;
  handleSelectOption: (next: SingleArrayOptionProps) => void;
  setDefaultData: (arg: SingleArrayOptionProps) => void;
  columnWidth?: number;
};

export type SingleOptionHeaderProps = {
  isEditMode: boolean;
};
