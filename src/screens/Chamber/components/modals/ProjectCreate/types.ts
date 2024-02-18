import { type FieldErrors, type UseFormSetValue } from 'react-hook-form';
import {
  type ProjectChamberInput,
  type InstitutionsEnum,
  type ProjectChamberType,
  type SpacePermissionEnum,
  type SpaceStatusEnum,
} from '@/apollo/generated/types';
import { type DropdownValueType } from '@/components/Dropdown';

export interface ProjectCreateProps {
  isOpen: boolean;
  handleClose: (isSuccess?: boolean) => void;
  handleSuccess: (id: string) => void;
  isUpdateMode?: boolean;
  summaryData?: IProjectSummaryData;
}

interface IProjectSummaryData {
  spaceId?: string;
  name?: string;
  categoryId?: string;
  description?: string;
  profileImage?: string;
}

export type NewProjectType = {
  name: string;
  description?: string;
  profileImage?: string;
  category: string;
  visibility: string;
  institution: InstitutionsEnum;
  status: SpaceStatusEnum;
  permission?: SpacePermissionEnum;
  projectType?: ProjectChamberType;
};

export interface ProjectTypeDropdownProps {
  selectedProjectType: DropdownValueType<ProjectChamberType> | undefined;
  handleSelectProjectType: (
    option: DropdownValueType<ProjectChamberType>,
  ) => void;
  errors: FieldErrors<NewProjectType>;
  setValue: UseFormSetValue<NewProjectType>;
  projectTypeOptions: DropdownValueType<ProjectChamberType>[];
}

export type NoumData = ProjectChamberInput &
  Pick<NewProjectType, 'name' | 'category' | 'description' | 'profileImage'>;
