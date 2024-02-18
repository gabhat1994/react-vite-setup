import { t } from 'i18next';
import { ElementTypeEnum } from '@/apollo/generated/types';
import { TextAlignType } from '../components/NoumSections/constants';

const errorMessage = (elementType: string | null | undefined) => {
  switch (elementType) {
    case ElementTypeEnum.ProjectWorkExperience:
      return t('noumena.noums.experience_message');
    case ElementTypeEnum.AchievementAward:
      return t('noumena.noums.achive_award_message');
    case ElementTypeEnum.EducationTraining:
      return t('noumena.noums.edu_training_message');
    case ElementTypeEnum.PersonalInterest:
    case ElementTypeEnum.SocialInterest:
      return t('noumena.noums.interest_message');
    case ElementTypeEnum.Calendar:
      return t('noumena.noums.calendar_message');
    case ElementTypeEnum.PublicationDesignPatterns:
      return t('noumena.noums.publication_message');
    case ElementTypeEnum.BusinessBrief:
      return t('noumena.noums.business_message');
    case ElementTypeEnum.Skills:
      return t('noumena.myaccount.skills.close_button_text');
    default:
      return '';
  }
};

export const defaultMediaElementMetaValue = {
  percentageSize: 30,
  align: TextAlignType.CENTER,
};

export default errorMessage;
