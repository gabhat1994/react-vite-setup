import { ElementTypeEnum } from '@/apollo/generated/types';
import {
  type HomeChambersElementsProps,
  type HomeChambersEnum,
} from '@/screens/Chamber/components/Element/types';

const homeChambersElements: HomeChambersElementsProps = {
  [ElementTypeEnum.PublicationDesignPatterns]: {
    image: 'bulb_m',
    text: 'No Publications, Designs or Patents Added Yet',
    buttonText: 'Add New',
  },
  [ElementTypeEnum.EducationTraining]: {
    image: 'education_m',
    text: 'No Education Added Yet',
    buttonText: 'Add Education',
    AddNewbuttonText: 'Add New Education',
  },
  [ElementTypeEnum.AchievementAward]: {
    image: 'avard_m',
    text: 'No Achievements Added Yet',
    buttonText: 'Add Achievement',
  },
  [ElementTypeEnum.PersonalInterest]: {
    image: 'interest_m',
    text: 'No Personal Interests Added Yet',
    buttonText: 'Add New',
  },
  [ElementTypeEnum.SocialInterest]: {
    image: 'heart_m',
    text: 'No Social Interests Added Yet',
    buttonText: 'Add New',
  },
  [ElementTypeEnum.ProjectWorkExperience]: {
    image: 'briefcase_m',
    text: 'No Experience Added Yet',
    buttonText: 'Add Experience',
    AddNewbuttonText: 'Add New Experience',
  },
};

export const homeChamberUtils = {
  getHomeChamberElements: () => homeChambersElements,
  getHomeChamberElementByType: (type: HomeChambersEnum) =>
    homeChambersElements[type as HomeChambersEnum],
};
