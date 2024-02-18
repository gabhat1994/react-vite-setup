import {
  QuestionStatusEnum,
  type NoumQuestionOutput,
} from '@/apollo/generated/types';
import { cleanList } from '@/utils/list';
import { UserUtil } from '@/utils/user';
import { t } from 'i18next';
import {
  NUM_ANSWERS_SHOWN_PER_QUESTION,
  quickQuestionsTabsOptions,
} from './constants';

const getAnswersFromQuestion = (
  question: NoumQuestionOutput,
  userId: string | undefined,
) => {
  const answers = cleanList(
    question?.answers?.filter(
      (answer) =>
        answer?.tipDetails?.some((tip) => tip.tipBy?._id === userId) ||
        (answer?.user?._id === userId && !!answer?.tipDetails?.length),
    ),
  );

  return {
    questionerNoumId: question?.user?.chamber?._id,
    questionId: question?._id ?? '',
    name:
      userId === question?.user?._id
        ? t('noumena.you')
        : UserUtil.renderFullName(question.user),
    closesDate: question?.expiryDate,
    questionBody: question?.body,
    profileImageURL: UserUtil.getProfilePicture(question?.user),
    questionImageURL: question?.questionImage,
    isQuestionOwner: userId === question?.user?._id,
    answerCount: question?.answers?.length ?? 0,
    ownAnswer: question?.answers?.find(
      (answer) => answer?.user?._id === userId,
    ),
    answersWithTip: answers.filter(
      (_item, index) => index < NUM_ANSWERS_SHOWN_PER_QUESTION,
    ),
    moreAnswersCount:
      answers.length > NUM_ANSWERS_SHOWN_PER_QUESTION
        ? answers.length - NUM_ANSWERS_SHOWN_PER_QUESTION
        : 0,
  };
};

type GetAvailableTabOptionsParams = {
  isConnected?: boolean;
  isOwner?: boolean;
  isShowPlaceholder?: boolean;
  answeredQuestionCount: number;
  webTips: boolean;
  tippedQuestionCount: number;
};

const getAvailableTabOptions = ({
  isConnected,
  isOwner,
  isShowPlaceholder,
  answeredQuestionCount,
  webTips,
  tippedQuestionCount,
}: GetAvailableTabOptionsParams) => {
  const availableTabs: string[] = [
    QuestionStatusEnum.Active,
    QuestionStatusEnum.Closed,
  ];
  if (isShowPlaceholder) {
    availableTabs.push(QuestionStatusEnum.Answered, QuestionStatusEnum.Tipped);
  } else {
    if (answeredQuestionCount > 0 && (isConnected || isOwner)) {
      availableTabs.push(QuestionStatusEnum.Answered);
    }
    if (webTips && tippedQuestionCount > 0) {
      availableTabs.push(QuestionStatusEnum.Tipped);
    }
  }
  return [...quickQuestionsTabsOptions].filter((item) =>
    availableTabs.includes(item.name),
  );
};

export const QuickQuestionsUtils = {
  getAnswersFromQuestion,
  getAvailableTabOptions,
};
