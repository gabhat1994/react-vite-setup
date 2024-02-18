import { ProjectChamberType } from '@/apollo/generated/types';
import { type IconProps } from '@/components/Icon/Icon';

interface VisibilityOption {
  labelKey: string;
  value: ProjectChamberType;
  descriptionKey: string;
  iconName: IconProps['name'];
}

export const visibilityOptions: VisibilityOption[] = [
  {
    value: ProjectChamberType.Public,
    iconName: 'eye_on_m',
    labelKey: 'noumena.chamber_edit.visibility.public_label',
    descriptionKey: 'noumena.chamber_edit.visibility.public_description',
  },
  {
    value: ProjectChamberType.Private,
    iconName: 'lock_m',
    labelKey: 'noumena.chamber_edit.visibility.private_label',
    descriptionKey: 'noumena.chamber_edit.visibility.private_description',
  },
  {
    value: ProjectChamberType.Secret,
    iconName: 'eye_off_m',
    labelKey: 'noumena.chamber_edit.visibility.secret_label',
    descriptionKey: 'noumena.chamber_edit.visibility.secret_description',
  },
];
