import { type ElementWrapperProps } from '@/screens/Chamber/components/ElementWrapper';
import { type Icons } from '@/components/Icon/Icon';
import { type ElementTypeEnum } from '@/apollo/generated/types';
import { type UploadMeta } from '@/features/upload/types';

export type ElementProps = ElementWrapperProps & {
  textEditorContentPadding?: number;
};

export type HomeChambersEnum =
  | ElementTypeEnum.ProjectWorkExperience
  | ElementTypeEnum.EducationTraining
  | ElementTypeEnum.PublicationDesignPatterns
  | ElementTypeEnum.PersonalInterest
  | ElementTypeEnum.SocialInterest
  | ElementTypeEnum.AchievementAward;

export type TypeEnum =
  | ElementTypeEnum.Image
  | ElementTypeEnum.Text
  | ElementTypeEnum.Video
  | ElementTypeEnum.QuickQuestions;

export type TitleProps = {
  [key in TypeEnum]: string;
};

export type HomeChambersElementsProps = {
  [key in HomeChambersEnum]: {
    image: keyof typeof Icons;
    text: string;
    buttonText: string;
    AddNewbuttonText?: string;
  };
};

export type ChangeMeta = UploadMeta;
