import {
  PermissibleElementType,
  QuestionStatusEnum,
} from '@/apollo/generated/types';
import { Button, Icon, TSpan } from '@/components';
import { ButtonUtils } from '@/components/Button/utils';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { t } from 'i18next';
import { useMemo } from 'react';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import {
  AddFirstQuestionButtonTestId,
  NoQuestionsAddedYetTextTestId,
  NoQuestionsIconTestId,
} from '../../testIds';
import { QuickQuestionsBodyWrapper, TextPadding } from './styles';

const NoQuestions: React.FC<{
  openAddQuestionModal: () => void;
  totalQuestionCount: number;
  openQuestionCount: number;
  closeQuestionCount: number;
  selectedTab: QuestionStatusEnum | undefined;
}> = ({
  openAddQuestionModal,
  totalQuestionCount,
  openQuestionCount,
  closeQuestionCount,
  selectedTab,
}) => {
  const { isOwner } = useNoumContext();
  const { isConnected } = useNoumUserConnectionContext();
  const text = useMemo(() => {
    if (selectedTab === QuestionStatusEnum.Active && closeQuestionCount) {
      return t('noumena.quick_questions.no_active_questions', {
        count: closeQuestionCount,
      });
    }
    if (selectedTab === QuestionStatusEnum.Closed && openQuestionCount) {
      return t('noumena.quick_questions.no_closed_questions');
    }
    return t('noumena.quick_questions.no_questions_added_yet');
  }, [closeQuestionCount, openQuestionCount, selectedTab]);

  const { hasElementPermission } = useNoumAuthorization();

  const hasAddQuestionPermission = hasElementPermission(
    PermissibleElementType.QuickQuestions,
    'add-quick-question',
    isConnected || isOwner,
  );

  return (
    <QuickQuestionsBodyWrapper>
      <Icon
        data-testid={NoQuestionsIconTestId}
        name="quick_questions_m"
        size={80}
        color="--icon-placeholder-neutral-default"
      />

      <TextPadding>
        <TSpan
          data-testid={NoQuestionsAddedYetTextTestId}
          colorToken="--text-placeholder-neutral-default"
          font="body-m"
        >
          {text}
        </TSpan>
      </TextPadding>
      <Button
        data-testid={AddFirstQuestionButtonTestId}
        size="small"
        secondary
        disabled={!hasAddQuestionPermission}
        onClick={openAddQuestionModal}
        {...ButtonUtils.getTooltipProps({
          message: t('noumena.quick_questions.no_permission.add_question'),
          visible: !hasAddQuestionPermission,
        })}
      >
        {totalQuestionCount
          ? t('noumena.chamber.quick_question.add_qustion')
          : t('noumena.chamber.quick_question.add_first_qustion')}
      </Button>
    </QuickQuestionsBodyWrapper>
  );
};

export default NoQuestions;
