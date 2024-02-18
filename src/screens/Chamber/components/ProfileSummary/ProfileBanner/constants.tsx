import { Icon } from '@/components/Icon';
import { t } from 'i18next';
import { type DropdownValueType } from '@/components/Dropdown';
import { cleanList } from '@/utils/list';
import { type ProfileImageActionType, type ProfileSizeType } from './types';
import { getGenerateImageWithGeniusLabel } from './utils';

export const PROFLE_SIZE: Record<ProfileSizeType, number> = {
  XXXXL: 343,
  XXXL: 168,
  XXL: 128,
  XVL: 80,
  XL: 56,
  L: 40,
  M: 24,
  S: 16,
};

export const PROFILE_RADIUS: Record<ProfileSizeType, number> = {
  XXXXL: 10,
  XXXL: 12,
  XXL: 12,
  XVL: 12,
  XL: 12,
  L: 12,
  M: 6,
  S: 4,
};

export const getBannerEditOptions = ({
  isGenerateImageEnabled,
  isRemovePhotoEnabled,
  isCoverPhoto,
}: {
  isGenerateImageEnabled?: boolean;
  isRemovePhotoEnabled?: boolean;
  isCoverPhoto?: boolean;
}): DropdownValueType<ProfileImageActionType>[] =>
  cleanList([
    {
      label: isCoverPhoto
        ? t('noumena.profile_summary.add_new_photo')
        : t('noumena.profile_summary.add_new_image'),
      key: 'add-new-image',
      type: 'value',
      value: 'add-new-image',
      icon: (
        <Icon
          color="--icon-tablecell-neutral-highlighted"
          size={24}
          name="plus_m"
        />
      ),
    },
    isGenerateImageEnabled
      ? {
          value: 'generate-image-with-genius',
          key: 'generate-image-with-genius',
          type: 'value',
          label: getGenerateImageWithGeniusLabel(isCoverPhoto),
          labelColor: '--text-tablecell-header-danger-primary-highlighted',
          icon: <Icon name="genius_m" size={24} />,
        }
      : null,
    isRemovePhotoEnabled
      ? {
          value: 'remove-image',
          key: 'remove-image',
          type: 'value',
          label: t('noumena.profile_summary.remove'),
          intent: 'danger',
          labelColor: '--text-tablecell-header-danger-primary-highlighted',
          icon: (
            <Icon
              name="delete_m"
              size={24}
              color="--text-tablecell-danger-primary-default"
            />
          ),
        }
      : null,
  ]);
