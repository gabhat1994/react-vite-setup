import { Icon, TSpan } from '@/components';
import { Modal, ModalFooter, ModalSize } from '@/components/ExtendedModal';
import { Stack } from '@/layout';
import { AnimatePresence } from 'framer-motion';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  type GeniusResponseFromType,
  type GeniusResponseType,
} from '../contexts/GeniusContext';
import {
  GeniusContextProvider,
  useGeniusContext,
} from '../contexts/GeniusContextProvider';
import { useGeniusForm } from '../hooks/useGeniusForm';
import { AnimatedContainer } from './AnimatedContainer';
import { ProcessLoading } from './ProcessLoading';
import { PromptInput } from './PromptInput';
import { ProvitePromptButtons } from './ProvidePromptButtons';
import { ResponseGateway } from './ResponseGateway';
import { ResponseManageButtons } from './ResponseManageButtons';
import S from './styles';

export type GeniusCompletionModalProps<T extends GeniusResponseType> = {
  type: T;
  isOpen: boolean;
  title: string;
  onClose(): void;
  onConfirm(response: GeniusResponseFromType<T>): void;
  promptInputPlaceholder?: string;
  processLoadingText: string;
};

function GeniusCompletionModalBase<T extends GeniusResponseType>({
  isOpen,
  onClose,
  onConfirm,
  processLoadingText,
  promptInputPlaceholder,
  title,
  type,
}: GeniusCompletionModalProps<T>) {
  const { t } = useTranslation();
  const { reset, mode, response, prompt } = useGeniusContext();
  const form = useGeniusForm({
    defaultValues: {
      prompt: '',
    },
  });

  const handleClose = () => {
    onClose();
    reset();
  };

  const handleConfirm = () => {
    reset();
    if (!response) {
      return;
    }

    onConfirm(response as GeniusResponseFromType<T>);
  };

  const modalTitle = type === 'text' && prompt ? prompt : title;

  return (
    <FormProvider {...form}>
      <Modal
        open={isOpen}
        size={ModalSize.L}
        onClose={handleClose}
        disableBackdropClick
        spacingMode="gap-content"
        testId="genius-completion-modal"
      >
        <Stack gap={8} align="center">
          <Icon color="--color-base-warning-50" name="genius_m" size={16} />
          <TSpan font="body-m" colorToken="--text-card-neutral-default">
            {modalTitle}
          </TSpan>
        </Stack>
        <S.StyledModalBody hidden={mode === 'generating'}>
          <AnimatedContainer>
            {mode === 'provide-prompt' ? (
              <PromptInput
                placeholder={
                  promptInputPlaceholder ||
                  t('noumena.genius.prompt_input.image.placeholder')
                }
              />
            ) : (
              <ResponseGateway />
            )}
          </AnimatedContainer>
        </S.StyledModalBody>
        <ModalFooter>
          <AnimatePresence>
            {mode === 'provide-prompt' ? (
              <ProvitePromptButtons onCancel={handleClose} />
            ) : mode === 'generating' ? (
              <ProcessLoading loadingMessage={processLoadingText} />
            ) : mode === 'generated' ? (
              <ResponseManageButtons onConfirm={handleConfirm} />
            ) : null}
          </AnimatePresence>
        </ModalFooter>
      </Modal>
    </FormProvider>
  );
}

export function GeniusCompletionModal<T extends GeniusResponseType>(
  props: GeniusCompletionModalProps<T>,
) {
  return (
    <GeniusContextProvider type={props.type}>
      <GeniusCompletionModalBase {...props} />
    </GeniusContextProvider>
  );
}
