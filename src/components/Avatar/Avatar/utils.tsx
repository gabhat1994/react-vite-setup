import { type DropdownItemType } from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { cleanList } from '@/utils/list';
import { t } from 'i18next';

export type AvatarDropdownValueType = 'add-new-image' | 'generate-new-image';

export const getAvatarDropdownOptions = ({
  isGenerateImageEnabled,
}: {
  isGenerateImageEnabled?: boolean;
}): DropdownItemType<AvatarDropdownValueType>[] =>
  cleanList([
    {
      key: 'add-new-image',
      label: t('noumena.profile_summary.add_new_image'),
      value: 'add-new-image',
      type: 'value',
      icon: <Icon name="add_m" size={24} />,
    },
    isGenerateImageEnabled
      ? {
          key: 'generate-new-image',
          label: t('noumena.genius.generate_noum_image'),
          value: 'generate-new-image',
          type: 'value',
          icon: <Icon name="genius_m" size={24} />,
        }
      : null,
  ]);
