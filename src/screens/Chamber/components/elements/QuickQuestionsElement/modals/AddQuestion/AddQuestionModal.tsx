import { Button } from '@/components/Button';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { useBreakpoints } from '@/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { startOfDay } from 'date-fns';
import { AddQuestionForm } from './EditElement';
import { type AddQuestionProps, type EditElementSchema } from './types';
import { useAddQuestionHelper } from './useAddQuestionHelper';

const elementSchema = yup.object({
  question: yup.string().min(1).max(250).required().label('Question'),
  date: yup.date().min(startOfDay(new Date())).required().label('Expiry Date'),
  url: yup.string().label('Image'),
});

export const AddQuestionModal = ({
  spaceId,
  refetch,
  onClose,
  isOpen,
}: AddQuestionProps) => {
  const { isDesktop } = useBreakpoints();

  const {
    formState: { isValid },
    control,
    handleSubmit,
  } = useForm<EditElementSchema>({
    resolver: yupResolver(elementSchema),
    mode: 'all',
    defaultValues: {
      question: '',
      date: new Date(),
    },
  });

  const { handleSaveChanges, loading } = useAddQuestionHelper({
    onSuccess: () => {
      refetch?.();
      onClose();
    },
  });

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      testId="add_question_modal"
      enableCloseButton
      spacingMode="gap-content"
      size={ModalSize.XL}
      disableBackdropClick
    >
      <ModalHeader>{t('noumena.chamber_edit.add_question')}</ModalHeader>
      <ModalBody tabletFlex isFullScreen={!isDesktop}>
        <AddQuestionForm control={control} />
      </ModalBody>
      <ModalFooter gap={16}>
        <Button
          data-testid="cancel_button"
          tertiary
          size="full"
          onClick={onClose}
        >
          {t('noumena.cancel')}
        </Button>
        <Button
          data-testid="ask_question_button"
          size="full"
          primary={isValid}
          disabled={!isValid || loading}
          onClick={handleSubmit((values) => handleSaveChanges(spaceId, values))}
          loading={loading}
        >
          {t('noumena.chamber_edit.visibility.ask_question')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
