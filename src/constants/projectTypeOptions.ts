import { t } from 'i18next';
import { type DropdownValueType } from '@/components/Dropdown';
import { ProjectChamberType } from '@/apollo/generated/types';

export const projectTypeLabelMap = {
  [ProjectChamberType.Public]: t(
    'noumena.chamber_create.projectType_public_label',
  ),
  [ProjectChamberType.Private]: t(
    'noumena.chamber_create.projectType_private_label',
  ),
  [ProjectChamberType.Secret]: t(
    'noumena.chamber_create.projectType_secret_label',
  ),
};

const projectTypeOptionsArr: DropdownValueType<ProjectChamberType>[] = [
  {
    key: ProjectChamberType.Public,
    label: t('noumena.chamber_create.projectType_public_label'),
    type: 'value',
    value: ProjectChamberType.Public,
    description: t('noumena.chamber_create.projectType_public_description'),
  },
  {
    key: ProjectChamberType.Private,
    label: t('noumena.chamber_create.projectType_private_label'),
    type: 'value',
    value: ProjectChamberType.Private,
    description: t('noumena.chamber_create.projectType_private_description'),
  },
  {
    key: ProjectChamberType.Secret,
    label: t('noumena.chamber_create.projectType_secret_label'),
    type: 'value',
    value: ProjectChamberType.Secret,
    description: t('noumena.chamber_create.projectType_secret_description'),
  },
] as DropdownValueType<ProjectChamberType>[];

export default projectTypeOptionsArr;
