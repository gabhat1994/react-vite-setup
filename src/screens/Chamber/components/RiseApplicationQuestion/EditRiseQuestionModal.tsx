import { useCallback, useMemo, useState, useEffect } from 'react';
import { t } from 'i18next';
import { clone } from 'lodash';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { useWindowDimensions } from '@/hooks/dimensions';
import { breakpoints } from '@/constants/devices';
import {
  RichTextEditor,
  type ReactQuillChangeResult,
} from '@/features/richTextEditor';
import { useToast } from '@/hooks';
import { useUpdateNoumApplicationResultHelper } from '@/features/noums/hooks/spaceQuery';
import { type EditRiseQuestionModalProps } from './types';
import {
  StyledSaveButton,
  StyledSaveButtonTableMobile,
  StyledForm,
} from './styles';

const EditRiseQuestionModal = ({
  currentTitle,
  onClose,
  isOpen,
  initialValue,
  applicationId,
  questionId,
  refetch,
}: EditRiseQuestionModalProps) => {
  const { width } = useWindowDimensions();
  const [answer, setAnswer] = useState<string | undefined>();
  const [isDeleted, setIsDeleted] = useState<boolean>(true);
  const isDesktop = useMemo(() => width >= breakpoints.LAPTOP, [width]);
  const isTablet = useMemo(
    () => width >= breakpoints.TABLET && width < breakpoints.LAPTOP,
    [width],
  );
  const isMobile = useMemo(() => width < breakpoints.TABLET, [width]);
  const { addToast } = useToast();

  useEffect(() => {
    // const cleanAnswer = initialValue?.replace(/(<([^>]+)>)/gi, '') || '';
    // if(cleanAnswer.length >0){
    //   setIsDeleted(false)
    // }
    setAnswer(initialValue);
  }, [initialValue]);

  const { updateNoumApplicationNoumHelper } =
    useUpdateNoumApplicationResultHelper();

  const onContentChange = useCallback(async (next: ReactQuillChangeResult) => {
    setIsDeleted(false);
    const data = clone(next);
    setAnswer(data.value);
  }, []);

  const onSave = useCallback(async () => {
    const cleanAnswer = answer?.replace(/(<([^>]+)>)/gi, '') || '';
    if (applicationId && questionId && !!cleanAnswer) {
      const isSuccess = await updateNoumApplicationNoumHelper(applicationId, {
        resultJSON: { [`${questionId}`]: answer },
      });
      if (isSuccess) {
        refetch();
        onClose();
      }
    } else {
      setIsDeleted(false);
      addToast(
        'error',
        'none',
        t('noumena.rise_program.rise_essay_rise_check'),
      );
    }
  }, [
    answer,
    applicationId,
    onClose,
    questionId,
    refetch,
    updateNoumApplicationNoumHelper,
    addToast,
  ]);

  return (
    <Modal
      isFullScreen={isMobile || isTablet}
      enableCloseButton
      open={isOpen}
      onClose={onClose}
      disableBackdropClick
      testId="add_experience_modal"
      size={ModalSize.XL}
    >
      <ModalHeader
        isFullScreen={isMobile || isTablet}
        rightMobileContainer={
          <StyledSaveButtonTableMobile primary size="small" onClick={onSave}>
            {t('noumena.chamber_edit.visibility.save')}
          </StyledSaveButtonTableMobile>
        }
      >
        {currentTitle}
      </ModalHeader>
      <ModalBody style={{ height: isDesktop ? '420px' : '100%' }}>
        <StyledForm>
          <RichTextEditor
            data-testid="RichTextEditorView"
            basicToolbar={true}
            editEnabled={true}
            initialValue={answer}
            onContentChange={onContentChange}
            width="100%"
            inModal
          />
        </StyledForm>
      </ModalBody>
      <ModalFooter isFullScreen={!isDesktop}>
        {!isMobile && (
          <StyledSaveButton primary onClick={onSave} disabled={isDeleted}>
            {t('noumena.chamber_edit.visibility.save')}
          </StyledSaveButton>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default EditRiseQuestionModal;
