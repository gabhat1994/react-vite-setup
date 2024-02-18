import { Button } from '@/components/Button';
import {
  Dropdown,
  type DropdownTargetProps,
  type DropdownValueType,
} from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { QuestionModal } from '@/screens/Chamber/components/elements/QuickQuestionsElement/modals/QuestionModal/QuestionModal';
import { t } from 'i18next';
import { useMemo, useState } from 'react';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { PermissibleElementType } from '@/apollo/generated/types';
import { useEllipsisMenuHelper } from '../../hooks/useEllipsisMenuHelper';
import { type EllipsisMenuProp } from './types';

const EllipsisMenu = ({
  questionId,
  isOwner,
  isQuestionOwner,
  isClosed,
  refetch,
}: EllipsisMenuProp) => {
  const { hasElementPermission } = useNoumAuthorization();

  const hasCloseRemoveQuestionPermission = hasElementPermission(
    PermissibleElementType.QuickQuestions,
    'close-remove-question',
    isOwner,
  );

  const canCloseRemoveQuestion =
    isQuestionOwner || hasCloseRemoveQuestionPermission;

  const menuOptions = useMemo(() => {
    const options: DropdownValueType<string>[] = [];
    if (canCloseRemoveQuestion && !isClosed) {
      options.push({
        label: t(`noumena.quick_questions.close_question`),
        key: t(`noumena.quick_questions.close_question`),
        type: 'value',
        value: t(`noumena.quick_questions.close_question`),
        icon: (
          <Icon
            size={24}
            name="close_m"
            color="--icon-tablecell-neutral-highlighted"
          />
        ),
        labelColor: '--text-tablecell-header-neutral-highlighted',
      });
    }
    if (canCloseRemoveQuestion) {
      options.push({
        label: t(`noumena.quick_questions.delete_question`),
        key: t(`noumena.quick_questions.delete_question`),
        type: 'value',
        value: t(`noumena.quick_questions.delete_question`),
        icon: (
          <Icon
            size={24}
            name="delete_m"
            color="--icon-tablecell-danger-primary-default"
          />
        ),
        labelColor: '--text-tablecell-header-danger-primary-highlighted',
        intent: 'danger',
      });
    }
    return options;
  }, [canCloseRemoveQuestion, isClosed]);

  const [isOpen, setIsOpen] = useState(false);
  const [isClosedModal, setIsCloseModal] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    setIsCloseModal(false);
  };

  const { loading, deleteQuestion, closeQuestion } = useEllipsisMenuHelper({
    questionId,
    isClosedModal,
    onClose,
    refetch,
  });

  const onConfirm = () => {
    if (isClosedModal) {
      closeQuestion();
    } else {
      deleteQuestion();
    }
  };

  const onMenuOptionSelect = (value: string) => {
    if (value === t('noumena.quick_questions.close_question')) {
      setIsCloseModal(true);
    }
    setIsOpen(true);
  };

  if (menuOptions.length === 0) {
    return null;
  }

  return (
    <>
      <Dropdown
        placement="bottom-end"
        onSelectOption={(options) => {
          onMenuOptionSelect(options.value);
        }}
        observerMinHeight="0"
        isAnimation={false}
        options={menuOptions}
      >
        {({ targetRef, toggle }: DropdownTargetProps<HTMLButtonElement>) => (
          <Button ref={targetRef} size="small" neutral onClick={toggle}>
            <Icon
              size={24}
              name="more_m"
              color="--icon-button-brand-primary-default"
            />
          </Button>
        )}
      </Dropdown>
      <QuestionModal
        refetch={refetch}
        isClosedModal={isClosedModal}
        questionId={questionId}
        onClose={onClose}
        onConfirm={onConfirm}
        isOpenModal={isOpen}
        loading={loading}
      />
    </>
  );
};

export default EllipsisMenu;
