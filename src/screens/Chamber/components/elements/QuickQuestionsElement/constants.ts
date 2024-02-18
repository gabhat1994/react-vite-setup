import { t } from 'i18next';
import { type InputListTypes } from '@/components/Tabs/types';
import { QuestionStatusEnum } from '@/apollo/generated/types';

export const PAGE_SIZE = 5;
export const NUM_ANSWERS_SHOWN_PER_QUESTION = 3;

export const quickQuestionsTabsOptions: InputListTypes[] = [
  {
    id: QuestionStatusEnum.Active,
    name: QuestionStatusEnum.Active,
    image: 'terms_m',
    text: t('noumena.quick_questions.open'),
    labelSize: 'small',
  },
  {
    id: QuestionStatusEnum.Closed,
    name: QuestionStatusEnum.Closed,
    image: 'terms_m',
    text: t('noumena.quick_questions.closed'),
    labelSize: 'small',
  },
  {
    id: QuestionStatusEnum.Answered,
    name: QuestionStatusEnum.Answered,
    image: 'terms_m',
    text: t('noumena.quick_questions.my_answers'),
    labelSize: 'small',
  },
  {
    id: QuestionStatusEnum.Tipped,
    name: QuestionStatusEnum.Tipped,
    image: 'terms_m',
    text: t('noumena.quick_questions.my_tips'),
    labelSize: 'small',
  },
];
