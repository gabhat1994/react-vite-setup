import { useLaunchDarkly, useLocalStorageItem } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { useModalManager } from '@/hooks/modal/useModalManager';
import accessLocalStorage from '@/constants/accessLocalStorage';
import { GeniusAssistTag } from '../components/GeniusAssistTag';
import { type GeniusAssistTagProps } from '../components/GeniusAssistTag/GeniusAssistTag';
import {
  type GeniusDescriptionType,
  type GeniusAssistButtonType,
} from '../components/GeniusAssistTag/types';
import {
  GeniusCompletionModal,
  type GeniusCompletionModalProps,
} from '../components/GeniusCompletionModal';
import { type GeniusResponseType } from '../contexts/GeniusContext';
import { GeniusUtils } from '../utils';
import { GeniusAssistModal } from '../components/GeniusAssistModal';

type ModalType = 'genius-completion' | 'genius-assist';

type UseGeniusCompletionModalProps<T extends GeniusResponseType> = Pick<
  GeniusAssistTagProps,
  'tooltipEnabled' | 'iconSize'
> &
  Pick<GeniusCompletionModalProps<T>, 'onConfirm' | 'title'> & {
    buttonType?: GeniusAssistButtonType;
    descriptionType?: GeniusDescriptionType;
    type: T;
  };

export const useGeniusCompletionModal = <T extends GeniusResponseType>({
  onConfirm,
  tooltipEnabled,
  type,
  title,
  buttonType,
  iconSize,
  descriptionType,
}: UseGeniusCompletionModalProps<T>) => {
  const { t } = useTranslation();
  const {
    flags: { geniusCompletionText, geniusCompletionImage },
  } = useLaunchDarkly();

  const { modalType, openModal, closeModal } = useModalManager<ModalType>();

  const [isGeniusAssist, setIsGeniusAssist] = useLocalStorageItem<boolean>(
    accessLocalStorage.GENIUS_ASSIST_FIRST_TIME,
    true,
  );

  const isGeniusEnabled =
    type === 'text'
      ? geniusCompletionText
      : type === 'image'
      ? geniusCompletionImage
      : false;

  const buttonElement = isGeniusEnabled ? (
    <GeniusAssistTag
      tooltipEnabled={tooltipEnabled}
      onClick={(event) => {
        event.stopPropagation();
        if (isGeniusAssist) {
          openModal('genius-assist');
        } else {
          openModal('genius-completion');
        }
      }}
      type={buttonType}
      iconSize={iconSize}
    />
  ) : null;

  const promptInputPlaceholder =
    type === 'text'
      ? buttonType === 'generate-description'
        ? GeniusUtils.getDescriptionPlaceholderText(descriptionType)
        : t('noumena.genius.prompt_input.text.placeholder')
      : t('noumena.genius.prompt_input.image.placeholder');

  const processLoadingText =
    type === 'text'
      ? t('noumena.genius.generating.text')
      : t('noumena.genius.generating.image', {
          imageType: t('noumena.genius.generating.image.images'),
        });

  const modalElement = isGeniusEnabled ? (
    isGeniusAssist ? (
      <GeniusAssistModal
        isOpen={modalType === 'genius-assist'}
        onClose={() => {
          closeModal();
          openModal('genius-completion');
          setIsGeniusAssist(false);
        }}
      />
    ) : (
      <GeniusCompletionModal
        type={type}
        title={title}
        isOpen={modalType === 'genius-completion'}
        onClose={closeModal}
        onConfirm={(response) => {
          onConfirm?.(response);
          closeModal();
        }}
        promptInputPlaceholder={promptInputPlaceholder}
        processLoadingText={processLoadingText}
      />
    )
  ) : null;

  return {
    buttonElement,
    modalElement,
  };
};
