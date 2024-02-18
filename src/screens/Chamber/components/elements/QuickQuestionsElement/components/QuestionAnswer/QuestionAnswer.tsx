import {
  PermissibleElementType,
  QuestionStatusEnum,
  type AnswerOutput,
  type NoumQuestionOutput,
} from '@/apollo/generated/types';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import ROUTES from '@/constants/routes';
import { useAuth } from '@/features/auth/contexts';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { useBreakpoints } from '@/hooks';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { CustomPreviewTabEnum } from '@/screens/Chamber/CustomPreview/constants';
import Answer, {
  AnswerElementType,
} from '@/screens/Chamber/components/elements/QuickQuestionsElement/components/Answer';
import AllAnswerModal from '@/screens/Chamber/components/elements/QuickQuestionsElement/modals/AllAnswerModal/AllAnswerModal';
import { UserUtil } from '@/utils/user';
import { endOfYesterday, format } from 'date-fns';
import { t } from 'i18next';
import { forwardRef, useCallback, useMemo, type Ref } from 'react';
import { generatePath } from 'react-router';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { QuickQuestionsUtils } from '../../utils';
import { AnswerForm } from './AnswerForm';
import EllipsisMenu from './EllipsisMenu';
import {
  AnswerCount,
  ClosesText,
  Container,
  QuestionBodyWrapper,
  StyleImage,
  SubConatiner,
} from './styles';

type ModalType = 'answer-modal';

type QuestionAnswerProps = {
  question: NoumQuestionOutput;
  onRefetch?: () => Promise<void>;
  selectedCustomPreviewTab?: string;
  selectedTab?: QuestionStatusEnum;
  isOwner?: boolean;
};

export const QuestionAnswer = forwardRef(
  (
    {
      question,
      onRefetch,
      selectedCustomPreviewTab,
      selectedTab,
      isOwner,
    }: QuestionAnswerProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const { user } = useAuth();
    const { isConnected, isFollowing } = useNoumUserConnectionContext();

    const {
      questionerNoumId,
      questionId,
      name,
      closesDate,
      questionBody,
      questionImageURL,
      isQuestionOwner,
      answerCount,
      ownAnswer,
      answersWithTip,
      moreAnswersCount,
    } = QuickQuestionsUtils.getAnswersFromQuestion(question, user?._id);

    const expiryDate = useMemo(
      () =>
        closesDate ? format(new Date(closesDate), 'MM/dd/yyyy') : undefined,
      [closesDate],
    );
    const hasAnswers = answerCount > 0;
    const isClosed = useMemo(
      () =>
        new Date(closesDate).getTime() < new Date(endOfYesterday()).getTime(),
      [closesDate],
    );

    const shouldShowAnswerField =
      !isClosed && !isQuestionOwner && !ownAnswer?._id;

    const { hasElementPermission } = useNoumAuthorization();

    const hasAnswerQuickQuestionPermission = hasElementPermission(
      PermissibleElementType.QuickQuestions,
      'answer-quick-question',
      isConnected || isOwner,
    );

    const { closeModal, openModal, modalType } = useModalManager<ModalType>();

    const showAllAnswersModal = () => {
      if (hasAnswers) {
        openModal('answer-modal');
      }
    };

    const { isMobile } = useBreakpoints();

    const onClickUser = useCallback(() => {
      if (
        !questionerNoumId ||
        isQuestionOwner ||
        UserUtil.isUnregistered(user) ||
        UserUtil.isUnregistered(question.user)
      ) {
        return;
      }

      window.open(
        generatePath(ROUTES.NOUM, { id: questionerNoumId }),
        '_blank',
      );
    }, [isQuestionOwner, question.user, questionerNoumId, user]);

    const handleShowMoreTips = (answerData?: AnswerOutput) => {
      closeModal();
      if (answerData) {
        // TODO Show the modal to display tips per answer
        // eslint-disable-next-line no-alert
        alert('Display the modal for tips per answer');
      } else {
        // TODO Show the modal to display tips for all answers
        // eslint-disable-next-line no-alert
        alert('Display the modal for tips for all answers');
      }
    };

    const showAnswers =
      (selectedTab === QuestionStatusEnum.Answered ||
        selectedTab === QuestionStatusEnum.Active) &&
      !!ownAnswer?._id;

    if (!question._id) {
      return null;
    }

    return (
      <Container ref={ref} data-testid="tQuestionAnswer" gap={16}>
        <SubConatiner gap={16} justify="center" fullWidth>
          <SubConatiner vertical grow gap={16} justify="center" fullWidth>
            <QuestionBodyWrapper isMobile={isMobile}>
              <TSpan font="body-m" colorToken="--text-card-neutral-highlighted">
                {questionBody}
              </TSpan>
            </QuestionBodyWrapper>
            {questionImageURL && (
              <StyleImage
                data-testid="tQINotCollapsed"
                alt={t('noumena.quick_questions.question_image')}
                src={questionImageURL}
              />
            )}
            {selectedTab !== QuestionStatusEnum.Tipped && (
              <SubConatiner gap={8}>
                <SubConatiner gap={4} align="center">
                  <TSpan
                    font="footnote"
                    colorToken={
                      isQuestionOwner
                        ? '--text-card-brand-primary-default'
                        : '--text-card-neutral-highlighted'
                    }
                    onClick={onClickUser}
                  >
                    {name}
                  </TSpan>
                  <TSpan
                    font="footnote"
                    colorToken="--text-card-neutral-default"
                  >
                    {' · '}
                  </TSpan>
                  {isClosed ? (
                    <TSpan
                      colorToken="--text-card-neutral-default"
                      font="footnote"
                    >
                      {t('noumena.quick_questions.closed')}
                    </TSpan>
                  ) : (
                    <ClosesText
                      font="footnote-bold"
                      colorToken="--text-card-neutral-highlighted"
                    >
                      {t('noumena.quick_questions.closes_on')}{' '}
                      {expiryDate ?? ''}
                    </ClosesText>
                  )}
                  <TSpan
                    font="footnote"
                    colorToken="--text-card-neutral-default"
                  >
                    {' · '}
                  </TSpan>
                  <AnswerCount
                    onClick={showAllAnswersModal}
                    isActive={hasAnswers}
                    font={hasAnswers ? 'link-s' : 'footnote-bold'}
                    colorToken={
                      hasAnswers
                        ? '--link-card-brand-primary-default'
                        : '--text-card-neutral-default'
                    }
                  >
                    {t(
                      'noumena.chambers.toolbox.element.quick_questions.answers',
                      { count: answerCount },
                    )}
                  </AnswerCount>
                </SubConatiner>
              </SubConatiner>
            )}
          </SubConatiner>
          <SubConatiner gap={16}>
            {selectedTab &&
              ![
                QuestionStatusEnum.Answered,
                QuestionStatusEnum.Tipped,
              ].includes(selectedTab) &&
              selectedCustomPreviewTab !== CustomPreviewTabEnum.Preview && (
                <EllipsisMenu
                  refetch={onRefetch}
                  questionId={questionId}
                  isOwner={isOwner}
                  isQuestionOwner={isQuestionOwner}
                  isClosed={isClosed}
                />
              )}
            {selectedTab === QuestionStatusEnum.Tipped &&
              selectedCustomPreviewTab !== CustomPreviewTabEnum.Preview && (
                <Button size="small" neutral onClick={showAllAnswersModal}>
                  <Icon
                    size={24}
                    name="chevron_small_right_m"
                    color="--icon-button-brand-primary-default"
                  />
                </Button>
              )}
          </SubConatiner>
        </SubConatiner>
        {showAnswers && (
          <Answer
            answer={ownAnswer}
            type={AnswerElementType.MY_ANSWERS}
            isClosedQuestion={isClosed}
          />
        )}
        {selectedTab === QuestionStatusEnum.Tipped && answersWithTip.length
          ? answersWithTip.map((answerData) => (
              <Answer
                key={answerData._id}
                answer={answerData}
                type={AnswerElementType.MY_TIPS}
                isClosedQuestion={isClosed}
              />
            ))
          : null}
        {selectedTab === QuestionStatusEnum.Tipped && !!moreAnswersCount && (
          <TSpan
            style={{ margin: 'auto' }}
            cursor="pointer"
            font="button-m"
            colorToken="--text-button-brand-primary-default"
            onClick={() => handleShowMoreTips()}
          >
            {t('noumena.quick_questions.show_more_tips', {
              count: moreAnswersCount,
            })}
          </TSpan>
        )}

        {shouldShowAnswerField && (
          <AnswerForm
            disabled={!(isFollowing || hasAnswerQuickQuestionPermission)}
            questionId={question._id}
            onRefetch={onRefetch}
          />
        )}
        <AllAnswerModal
          question={question}
          onClose={closeModal}
          isOpen={modalType === 'answer-modal'}
          onShowAllTips={handleShowMoreTips}
        />
      </Container>
    );
  },
);
