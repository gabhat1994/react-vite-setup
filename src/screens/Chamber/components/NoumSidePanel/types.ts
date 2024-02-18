import { t } from 'i18next';
import { type SideModalProps } from '@/components/SideModal/types';
import {
  ElementTypeEnum,
  type NoumLayoutSectionType,
} from '@/apollo/generated/types';
import { type SectionToolProps } from '../SectionElementRearrange/types';

export interface SidePanelProps extends SideModalProps {
  noumSidePanelType: SectionToolProps;
  onClose: () => void;
  noumSidePanelId: string;
}

export interface IColumnOptions {
  option: NoumLayoutSectionType;
  isSelected?: boolean;
  onChange?: (type: NoumLayoutSectionType) => void;
}

export type NoumEditSectionProps = {
  noumSidePanelId: string;
};

export type NoumEditToolProps = {
  noumSidePanelId: string;
};

export const elementDescription: Record<string, string> = {
  [ElementTypeEnum.AchievementAward]: t(
    'noumena.noum_editor.tool.project_work_experience.description',
  ),
  [ElementTypeEnum.BusinessBrief]: t(
    'noumena.noum_editor.tool.business_brief.description',
  ),
  [ElementTypeEnum.Calendar]: t('noumena.noum_editor.tool.event.description'),
  [ElementTypeEnum.Connection]: '',
  [ElementTypeEnum.ContractManager]: '',
  [ElementTypeEnum.EducationTraining]: t(
    'noumena.noum_editor.tool.project_work_experience.description',
  ),
  [ElementTypeEnum.FilesManager]: t(
    'noumena.noum_editor.tool.file_Manager.description',
  ),
  [ElementTypeEnum.Home]: '',
  [ElementTypeEnum.Image]: t('noumena.drag_drop_image_file_type_size.text'),
  [ElementTypeEnum.Instagram]: '',
  [ElementTypeEnum.Invitation]: '',
  [ElementTypeEnum.Message]: t('noumena.noum_editor.tool.message.description'),
  [ElementTypeEnum.PersonalInterest]: t(
    'noumena.noum_editor.tool.project_work_experience.description',
  ),
  [ElementTypeEnum.Profile]: '',
  [ElementTypeEnum.ProjectWorkExperience]: t(
    'noumena.noum_editor.tool.project_work_experience.description',
  ),
  [ElementTypeEnum.PublicationDesignPatterns]: t(
    'noumena.noum_editor.tool.project_work_experience.description',
  ),
  [ElementTypeEnum.QuickQuestions]: t(
    `noumena.noum_editor.tool.quick_questions.description`,
  ),
  [ElementTypeEnum.Skills]: '',
  [ElementTypeEnum.SocialInterest]: t(
    'noumena.noum_editor.tool.social_interests.description',
  ),
  [ElementTypeEnum.Text]: t('noumena.noum_editor.tool.text.description'),
  [ElementTypeEnum.Usernetwork]: '',
  [ElementTypeEnum.Userposts]: t('noumena.noum_editor.tool.post.description'),
  [ElementTypeEnum.Video]: t('noumena.drag_drop_video_file_type_size.text'),
  [ElementTypeEnum.Wallet]: '',
  [ElementTypeEnum.Events]: t('noumena.noum_editor.tool.event.description'),
};
