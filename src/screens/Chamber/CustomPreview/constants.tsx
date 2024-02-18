import { t } from 'i18next';
import { ElementTypeEnum } from '@/apollo/generated/types';

export enum CustomPreviewTabEnum {
  Edit = 'Edit',
  Preview = 'Preview',
}

type RecordTooltipsProps = {
  [key in ElementTypeEnum]?: string;
};

export const CPVisiblityChangeButtonTooltips: RecordTooltipsProps = {
  [ElementTypeEnum.Userposts]: t(
    'noumena.noum_edit.custom_previews.hidden.post.tooltip',
  ),
};
