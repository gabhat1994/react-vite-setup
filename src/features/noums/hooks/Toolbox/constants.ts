import { t } from 'i18next';
import { ElementTypeEnum } from '@/apollo/generated/types';
import {
  type ListOfOptionsTypes,
  type TabsHeaderTypes,
} from '@/features/noums/components/Toolbox';

export const Tabs: TabsHeaderTypes[] = [
  {
    name: 'test1',
    image: 'terms_m',
    text: t('noumena.chambers.toolbox.element.all'),
    id: 'xss1',
    labelSize: 'medium',
    group: 'all',
  },
  {
    name: 'test1',
    image: 'terms_m',
    text: t('noumena.chambers.toolbox.element.layout'),
    id: 'xsds1',
    labelSize: 'medium',
    group: 'layout',
  },
  {
    name: 'test1',
    image: 'terms_m',
    text: t('noumena.chambers.toolbox.element.socialTools'),
    id: 'xs1',
    labelSize: 'medium',
    group: 'socialmedia',
  },
  {
    name: 'test1',
    image: 'terms_m',
    text: t('noumena.chambers.toolbox.group.money'),
    id: 'xsss1',
    labelSize: 'medium',
    group: 'finance',
  },
];

export const allToolsInToolBox: ListOfOptionsTypes[] = [
  {
    size: 24,
    name: 'text_m',
    type: ElementTypeEnum.Text,
    text: t('noumena.chambers.toolbox.element.text'),
    group: ['all', 'layout'],
    disabled: false,
    allowedNoumTypes: ['HOME', 'PROJECT', 'RISE_APPLICATION'],
    toolTipText: t('noumena.chambers.toolbox.element.text_tool_tip'),
  },
  {
    size: 24,
    name: 'picture_m',
    type: ElementTypeEnum.Image,
    text: t('noumena.chambers.toolbox.element.image'),
    group: ['all', 'layout'],
    disabled: false,
    allowedNoumTypes: ['HOME', 'PROJECT', 'RISE_APPLICATION'],
    toolTipText: t('noumena.chambers.toolbox.element.image_tool_tip'),
  },
  {
    size: 24,
    name: 'play_m',
    type: ElementTypeEnum.Video,
    text: t('noumena.chambers.toolbox.element.video'),
    group: ['all', 'layout'],
    disabled: false,
    allowedNoumTypes: ['HOME', 'PROJECT', 'RISE_APPLICATION'],
    toolTipText: t('noumena.chambers.toolbox.element.video_tool_tip'),
  },
  {
    size: 24,
    name: 'wallet_m',
    type: ElementTypeEnum.Wallet,
    text: t('noumena.chambers.toolbox.element.CreateNoumWallet'),
    group: ['all', 'finance'],
    disabled: false,
    allowedNoumTypes: ['PROJECT', 'RISE_APPLICATION'],
    toolTipText: t(
      'noumena.chambers.toolbox.element.CreateNoumWallet_tool_tip',
    ),
  },
  {
    size: 24,
    name: 'message_m',
    type: ElementTypeEnum.Message,
    text: t('noumena.chambers.toolbox.element.message'),
    group: ['all', 'socialmedia'],
    disabled: false,
    allowedNoumTypes: ['PROJECT', 'HOME', 'RISE_APPLICATION'],
    toolTipText: t('noumena.chambers.toolbox.element.message_tool_tip'),
  },
  {
    size: 24,
    name: 'quick_questions_m',
    type: ElementTypeEnum.QuickQuestions,
    text: t('noumena.chambers.toolbox.element.quick_questions'),
    group: ['all', 'socialmedia'],
    disabled: false,
    allowedNoumTypes: ['PROJECT', 'RISE_APPLICATION'],
    toolTipText: t('noumena.chambers.toolbox.element.quick_questions_tool_tip'),
  },
  {
    size: 24,
    name: 'lecterm_m',
    type: ElementTypeEnum.BusinessBrief,
    text: t('noumena.chambers.toolbox.element.businessBrief'),
    group: ['all', 'layout'],
    disabled: false,
    allowedNoumTypes: ['HOME'],
  },
  {
    size: 24,
    name: 'briefcase_s',
    type: ElementTypeEnum.ProjectWorkExperience,
    text: t('noumena.chambers.toolbox.element.projectWorkExperience'),
    group: ['all', 'layout'],
    disabled: false,
    allowedNoumTypes: ['HOME'],
  },
  {
    size: 24,
    name: 'education_s',
    type: ElementTypeEnum.EducationTraining,
    text: t('noumena.chambers.toolbox.element.educationTraining'),
    group: ['all', 'layout'],
    disabled: false,
    allowedNoumTypes: ['HOME'],
  },
  {
    size: 24,
    name: 'avard_s',
    type: ElementTypeEnum.AchievementAward,
    text: t('noumena.chambers.toolbox.element.achievementAward'),
    group: ['all', 'layout'],
    disabled: false,
    allowedNoumTypes: ['HOME'],
  },
  {
    size: 24,
    name: 'blub_s',
    type: ElementTypeEnum.PublicationDesignPatterns,
    text: t('noumena.chambers.toolbox.element.publicationDesignPatterns'),
    group: ['all', 'layout'],
    disabled: false,
    allowedNoumTypes: ['HOME'],
  },
  {
    size: 24,
    name: 'interest_s',
    type: ElementTypeEnum.PersonalInterest,
    text: t('noumena.chambers.toolbox.element.personalInterest'),
    group: ['all', 'layout'],
    disabled: false,
    allowedNoumTypes: ['HOME'],
  },
  {
    size: 24,
    name: 'heart_s',
    type: ElementTypeEnum.SocialInterest,
    text: t('noumena.chambers.toolbox.element.socialInterest'),
    group: ['all', 'layout'],
    disabled: false,
    allowedNoumTypes: ['HOME'],
  },
  {
    size: 24,
    name: 'calendar_m',
    type: ElementTypeEnum.Calendar,
    text: t('noumena.chambers.toolbox.element.calendar'),
    group: ['all', 'socialmedia'],
    disabled: false,
    allowedNoumTypes: ['HOME', 'PROJECT', 'RISE_APPLICATION'],
    toolTipText: t('noumena.chambers.toolbox.element.calendar_tool_tip'),
  },
  {
    size: 24,
    name: 'posts_m',
    type: ElementTypeEnum.Userposts,
    text: t('noumena.chambers.toolbox.element.posts'),
    group: ['all', 'socialmedia'],
    disabled: false,
    allowedNoumTypes: ['PROJECT', 'RISE_APPLICATION'],
    toolTipText: t('noumena.chambers.toolbox.element.posts_tool_tip'),
  },
  {
    size: 24,
    name: 'network_m',
    type: ElementTypeEnum.Usernetwork,
    text: t('noumena.chambers.toolbox.element.usernetwork'),
    group: ['all', 'socialmedia'],
    disabled: false,
    allowedNoumTypes: ['HOME'],
  },
  {
    size: 24,
    name: 'file_m',
    type: ElementTypeEnum.FilesManager,
    text: t('noumena.chambers.toolbox.element.file'),
    group: ['all', 'layout'],
    disabled: false,
    allowedNoumTypes: ['PROJECT', 'RISE_APPLICATION'],
  },
  {
    size: 24,
    name: 'contract_m',
    type: ElementTypeEnum.ContractManager,
    text: t('noumena.chambers.toolbox.element.contracts'),
    group: ['all', 'layout'],
    disabled: false,
    allowedNoumTypes: ['PROJECT'],
  },
];

export const allToolsInToolBoxV2: ListOfOptionsTypes[] = [
  {
    size: 24,
    name: 'text_m',
    type: ElementTypeEnum.Text,
    text: t('noumena.chambers.toolbox_v2.element.text'),
    group: ['all', 'layout'],
    disabled: false,
    allowedNoumTypes: ['HOME', 'PROJECT', 'RISE_APPLICATION'],
    toolTipText: t('noumena.chambers.toolbox.element.text_tool_tip'),
  },
  {
    size: 24,
    name: 'picture_m',
    type: ElementTypeEnum.Image,
    text: t('noumena.chambers.toolbox_v2.element.image'),
    group: ['all', 'layout'],
    disabled: false,
    allowedNoumTypes: ['HOME', 'PROJECT', 'RISE_APPLICATION'],
    toolTipText: t('noumena.chambers.toolbox.element.image_tool_tip'),
  },
  {
    size: 24,
    name: 'file_m',
    type: ElementTypeEnum.FilesManager,
    text: t('noumena.chambers.toolbox.element.document'),
    toolTipText: t('noumena.chambers.toolbox.element.document_tool_tip'),
    group: ['all', 'layout'],
    disabled: false,
    allowedNoumTypes: ['PROJECT', 'RISE_APPLICATION'],
  },
  {
    size: 24,
    name: 'play_m',
    type: ElementTypeEnum.Video,
    text: t('noumena.chambers.toolbox_v2.element.video'),
    group: ['all', 'layout'],
    disabled: false,
    allowedNoumTypes: ['HOME', 'PROJECT', 'RISE_APPLICATION'],
    toolTipText: t('noumena.chambers.toolbox.element.video_tool_tip'),
  },
  {
    size: 24,
    name: 'wallet_m',
    type: ElementTypeEnum.Wallet,
    text: t('noumena.chambers.toolbox_v2.element.wallet'),
    group: ['all', 'finance'],
    disabled: false,
    allowedNoumTypes: ['PROJECT', 'RISE_APPLICATION'],
    toolTipText: t(
      'noumena.chambers.toolbox.element.CreateNoumWallet_tool_tip',
    ),
  },
  {
    size: 24,
    name: 'message_m',
    type: ElementTypeEnum.Message,
    text: t('noumena.chambers.toolbox.element.message'),
    group: ['all', 'socialmedia'],
    disabled: false,
    allowedNoumTypes: ['PROJECT', 'HOME', 'RISE_APPLICATION'],
    toolTipText: t('noumena.chambers.toolbox.element.message_tool_tip'),
  },
  {
    size: 24,
    name: 'quick_questions_m',
    type: ElementTypeEnum.QuickQuestions,
    text: t('noumena.chambers.toolbox_v2.element.questions'),
    group: ['all', 'socialmedia'],
    disabled: false,
    allowedNoumTypes: ['PROJECT', 'RISE_APPLICATION'],
    toolTipText: t('noumena.chambers.toolbox.element.quick_questions_tool_tip'),
  },
  {
    size: 24,
    name: 'lecterm_m',
    type: ElementTypeEnum.BusinessBrief,
    text: t('noumena.chambers.toolbox.element.businessBrief'),
    toolTipText: t('noumena.chambers.toolbox.element.businessBrief'),
    group: ['all', 'layout'],
    disabled: false,
    allowedNoumTypes: ['HOME'],
  },
  {
    size: 24,
    name: 'briefcase_s',
    type: ElementTypeEnum.ProjectWorkExperience,
    text: t('noumena.chambers.toolbox.element.projectWorkExperience'),
    toolTipText: t('noumena.chambers.toolbox.element.projectWorkExperience'),
    group: ['all', 'layout'],
    disabled: false,
    allowedNoumTypes: ['HOME'],
  },
  {
    size: 24,
    name: 'education_s',
    type: ElementTypeEnum.EducationTraining,
    text: t('noumena.chambers.toolbox.element.educationTraining'),
    group: ['all', 'layout'],
    disabled: false,
    toolTipText: t('noumena.chambers.toolbox.element.educationTraining'),
    allowedNoumTypes: ['HOME'],
  },
  {
    size: 24,
    name: 'avard_s',
    type: ElementTypeEnum.AchievementAward,
    text: t('noumena.chambers.toolbox.element.achievementAward'),
    toolTipText: t('noumena.chambers.toolbox.element.achievementAward'),
    group: ['all', 'layout'],
    disabled: false,
    allowedNoumTypes: ['HOME'],
  },
  {
    size: 24,
    name: 'blub_s',
    type: ElementTypeEnum.PublicationDesignPatterns,
    text: t('noumena.chambers.toolbox.element.publicationDesignPatterns'),
    toolTipText: t(
      'noumena.chambers.toolbox.element.publicationDesignPatterns',
    ),
    group: ['all', 'layout'],
    disabled: false,
    allowedNoumTypes: ['HOME'],
  },
  {
    size: 24,
    name: 'interest_s',
    type: ElementTypeEnum.PersonalInterest,
    text: t('noumena.chambers.toolbox.element.personalInterest'),
    toolTipText: t('noumena.chambers.toolbox.element.personalInterest'),
    group: ['all', 'layout'],
    disabled: false,
    allowedNoumTypes: ['HOME'],
  },
  {
    size: 24,
    name: 'heart_s',
    type: ElementTypeEnum.SocialInterest,
    text: t('noumena.chambers.toolbox.element.socialInterest'),
    toolTipText: t('noumena.chambers.toolbox.element.socialInterest'),
    group: ['all', 'layout'],
    disabled: false,
    allowedNoumTypes: ['HOME'],
  },
  {
    size: 24,
    name: 'calendar_m',
    type: ElementTypeEnum.Calendar,
    text: t('noumena.chambers.toolbox.element.calendar'),
    group: ['all', 'socialmedia'],
    disabled: false,
    allowedNoumTypes: ['HOME', 'PROJECT', 'RISE_APPLICATION'],
    toolTipText: t('noumena.chambers.toolbox.element.calendar_tool_tip'),
  },
  {
    size: 24,
    name: 'posts_m',
    type: ElementTypeEnum.Userposts,
    text: t('noumena.chambers.toolbox.element.posts'),
    group: ['all', 'socialmedia'],
    disabled: false,
    allowedNoumTypes: ['PROJECT', 'RISE_APPLICATION', 'HOME'],
    toolTipText: t('noumena.chambers.toolbox.element.posts_tool_tip'),
  },
  {
    size: 24,
    name: 'network_m',
    type: ElementTypeEnum.Usernetwork,
    text: t('noumena.chambers.toolbox.element.usernetwork'),
    group: ['all', 'socialmedia'],
    disabled: false,
    allowedNoumTypes: ['HOME'],
  },
  {
    size: 24,
    name: 'contract_m',
    type: ElementTypeEnum.ContractManager,
    text: t('noumena.chambers.toolbox.element.contracts'),
    toolTipText: t('noumena.chambers.toolbox.element.contracts'),
    group: ['all', 'layout'],
    disabled: false,
    allowedNoumTypes: ['PROJECT'],
  },
];