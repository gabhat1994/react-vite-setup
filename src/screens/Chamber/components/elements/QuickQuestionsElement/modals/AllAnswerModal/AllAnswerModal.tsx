import { useCallback, useMemo, useState } from 'react';
import { t } from 'i18next';
import { endOfYesterday } from 'date-fns';
import { ModalBody, ModalHeader, ModalSize } from '@/components/ExtendedModal';
import { Modal } from '@/components/ExtendedModal/Modal';
import { TSpan } from '@/components/Typography';
import { Spacer, Stack } from '@/layout';
import { cleanList, sortList } from '@/utils/list';
import { TransactionModal } from '@/features/TransactionModal';
import { TransactionModalType } from '@/features/TransactionModal/types';
import { type AnswerOutput } from '@/apollo/generated/types';
import {
  useCheckWalletExistsLazyQuery,
  useGetQuestionAnswersQuery,
} from '@/apollo/graphql';
import { Spinner } from '@/components';
import Answer, { AnswerElementType } from '../../components/Answer';
import { type AllAnswerProps } from './types';
import { SpinnerContainer } from './styles';

const AllAnswerModal = ({
  question,
  onClose,
  isOpen,
  onShowAllTips,
}: AllAnswerProps) => {
  const [openTransactionModal, setOpenTransactionModal] = useState<
    AnswerOutput | false
  >(false);

  const isClosed = useMemo(
    () =>
      question.expiryDate
        ? new Date(question.expiryDate).getTime() <
          new Date(endOfYesterday()).getTime()
        : true,
    [question],
  );

  const { data, refetch, loading } = useGetQuestionAnswersQuery({
    skip: !isOpen,
    variables: {
      spaceId: question.spaceId?._id!,
      questionId: question._id!,
      offset: 0,
    },
  });

  const [checkWalletExists] = useCheckWalletExistsLazyQuery({
    fetchPolicy: 'network-only',
  });

  const answers = useMemo(
    () => sortList(cleanList(data?.getQuestionAnswers?.data), 'createdAt'),
    [data?.getQuestionAnswers?.data],
  );

  const handleInitTip = useCallback(
    async (answer: AnswerOutput) => {
      await checkWalletExists({
        variables: { targetUserId: answer.user?._id! },
        onCompleted: (res) => {
          if (res.checkWalletExists?.success) {
            setOpenTransactionModal(answer);
            return;
          }
          if (!res.checkWalletExists?.source) {
            // TODO Display a modal for setting up my wallet: NOUM-3973
            return;
          }
          if (!res.checkWalletExists?.target) {
            // TODO Display a modal for notifying to receiver: NOUM-3974
          }
        },
      });
    },
    [checkWalletExists],
  );

  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        testId="all_answer_modal"
        enableCloseButton
        size={ModalSize.XL}
        spacingMode="gap-content"
        disableBackdropClick
      >
        <ModalHeader>
          {t('noumena.chamber.quick_question.all_answers')}
        </ModalHeader>
        <ModalBody>
          <TSpan font="body-l" colorToken="--text-modal-header-neutral-default">
            {question.body}
          </TSpan>
          <Spacer height={24} />
          <Stack gap={16} vertical fullWidth>
            {!answers.length && loading ? (
              <SpinnerContainer>
                <Spinner />
              </SpinnerContainer>
            ) : (
              answers.map((answer) => (
                <Answer
                  key={answer._id}
                  answer={answer}
                  type={AnswerElementType.ALL_ANSWERS_MODAL}
                  isClosedQuestion={isClosed}
                  onTip={() => handleInitTip(answer)}
                  onShowAllTips={() => onShowAllTips?.(answer)}
                />
              ))
            )}
          </Stack>
        </ModalBody>
      </Modal>

      {openTransactionModal && (
        <TransactionModal
          type={TransactionModalType.TIP}
          open
          handleClose={() => setOpenTransactionModal(false)}
          onSuccessfulTransaction={refetch}
          answerForTip={openTransactionModal}
        />
      )}
    </>
  );
};

export default AllAnswerModal;
