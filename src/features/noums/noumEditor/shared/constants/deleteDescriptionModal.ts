import { t } from 'i18next';
import { ElementTypeEnum } from '@/apollo/generated/types';

export const elementDeleteModalDescription: Record<ElementTypeEnum, string> = {
  [ElementTypeEnum.Userposts]: t(
    'noumena.noum_editor.tool.posts.delete_modal_description',
  ),
  [ElementTypeEnum.Calendar]: t(
    'noumena.noum_editor.tool.calendar.delete_modal_description',
  ),
  [ElementTypeEnum.FilesManager]: t(
    'noumena.noum_editor.tool.file_manager.delete_modal_description',
  ),
  [ElementTypeEnum.Image]: '',
  [ElementTypeEnum.Video]: '',
  [ElementTypeEnum.Text]: '',
  [ElementTypeEnum.QuickQuestions]: '',
  [ElementTypeEnum.Message]: '',
  [ElementTypeEnum.ProjectWorkExperience]: '',
  [ElementTypeEnum.EducationTraining]: '',
  [ElementTypeEnum.AchievementAward]: '',
  [ElementTypeEnum.PublicationDesignPatterns]: '',
  [ElementTypeEnum.PersonalInterest]: '',
  [ElementTypeEnum.SocialInterest]: '',
  [ElementTypeEnum.BusinessBrief]: '',
  [ElementTypeEnum.Connection]: '',
  [ElementTypeEnum.ContractManager]: '',
  [ElementTypeEnum.Skills]: '',
  [ElementTypeEnum.Usernetwork]: '',
  [ElementTypeEnum.Wallet]: '',
  [ElementTypeEnum.Home]: '',
  [ElementTypeEnum.Instagram]: '',
  [ElementTypeEnum.Invitation]: '',
  [ElementTypeEnum.Profile]: '',
  [ElementTypeEnum.Events]: '',
};
