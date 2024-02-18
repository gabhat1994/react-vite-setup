import * as yup from 'yup';
import { t } from 'i18next';
import {
  InstitutionsEnum,
  type ProjectChamberInput,
  ProjectChamberType,
  SpacePermissionEnum,
  SpaceStatusEnum,
} from '@/apollo/generated/types';

export const initialDetails: ProjectChamberInput = {
  name: '',
  description: undefined,
  profileImage: undefined,
  category: '',
  institution: InstitutionsEnum.Noumena,
  status: SpaceStatusEnum.Draft,
  permission: SpacePermissionEnum.All,
  projectType: ProjectChamberType.Private,
};

export const newProjectSchema = yup
  .object({
    name: yup
      .string()
      .required(t('noumena.chamber_create.error.name_required'))
      .max(75, t(`noumena.chamber_create.error.description_maximum_length`)),
    description: yup
      .string()
      .notRequired()
      .max(1000, t(`noumena.chamber_create.error.description_maximum_length`)),
    category: yup
      .string()
      .required(t('noumena.chamber_create.error.category_required')),
  })
  .required();

  export const newRiseProjectSchema = yup
  .object({
    name: yup
      .string()
      .required(t('noumena.chamber_create.error.name_required'))
      .max(75, t(`noumena.chamber_create.error.description_maximum_length`)),
    description: yup
      .string()
      .notRequired()
      .max(1000, t(`noumena.chamber_create.error.description_maximum_length`)),
    category: yup
      .string()
      .notRequired(),
  })
  .required();
