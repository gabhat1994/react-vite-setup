import { t } from 'i18next';
import { ElementTypeEnum } from '@/apollo/generated/types';

export const elementTitle: Record<ElementTypeEnum, string> = {
  [ElementTypeEnum.Image]: t('noumena.chambers.toolbox.element.image'),
  [ElementTypeEnum.Video]: t('noumena.chambers.toolbox.element.video'),
  [ElementTypeEnum.Text]: t('noumena.chambers.toolbox.element.text'),
  [ElementTypeEnum.QuickQuestions]: t(
    'noumena.chambers.toolbox.element.quick_questions',
  ),
  [ElementTypeEnum.Message]: t('noumena.chambers.toolbox.element.message'),
  [ElementTypeEnum.ProjectWorkExperience]: t(
    'noumena.homeChambers.addExperience.currentTitle',
  ),
  [ElementTypeEnum.EducationTraining]: t(
    'noumena.homeChambers.addEducation.currentTitle',
  ),
  [ElementTypeEnum.AchievementAward]: t(
    'noumena.homeChambers.addAchievement.currentTitle',
  ),
  [ElementTypeEnum.PublicationDesignPatterns]: t(
    'noumena.homeChambers.publicationAndDesign.currentTitle',
  ),
  [ElementTypeEnum.PersonalInterest]: t(
    'noumena.homeChambers.personalInterest.currentTitle',
  ),
  [ElementTypeEnum.SocialInterest]: t(
    'noumena.homeChambers.socialInterest.currentTitle',
  ),
  [ElementTypeEnum.Calendar]: t('noumena.homeChambers.calendar.currentTitle'),
  [ElementTypeEnum.BusinessBrief]: t(
    'noumena.chambers.toolbox.element.businessBrief',
  ),
  [ElementTypeEnum.Connection]: '',
  [ElementTypeEnum.ContractManager]: t(
    'noumena.chambers.toolbox.element.contracts',
  ),
  [ElementTypeEnum.FilesManager]: t('noumena.chambers.toolbox.element.file'),
  [ElementTypeEnum.Skills]: t('noumena.homenoum.skills.title'),
  [ElementTypeEnum.Usernetwork]: t(
    'noumena.chambers.toolbox.element.usernetwork',
  ),
  [ElementTypeEnum.Userposts]: t('noumena.chambers.toolbox.element.posts'),
  [ElementTypeEnum.Wallet]: t(`noumena.noum_editor.tool.title.wallet`),
  [ElementTypeEnum.Home]: '',
  [ElementTypeEnum.Instagram]: '',
  [ElementTypeEnum.Invitation]: '',
  [ElementTypeEnum.Profile]: '',
  [ElementTypeEnum.Events]: '',
};
