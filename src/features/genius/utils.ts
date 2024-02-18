import { type Maybe } from '@/common/types';
import { t } from 'i18next';
import {
  type GeniusDescriptionType,
  type GeniusAssistButtonType,
} from './components/GeniusAssistTag/types';
import {
  type GeniusImageResponse,
  type GeniusResponse,
  type GeniusTextResponse,
} from './contexts/GeniusContext';

const getAssistTagLabel = (type: GeniusAssistButtonType) => {
  switch (type) {
    case 'generate-description':
      return t('noumena.genius.generate_description');
    case 'generate-content':
      return t('noumena.genius.generate_content');
    case 'icon':
      return null;
    default:
      return t('noumena.genius.assist');
  }
};

const getDescriptionPlaceholderText = (
  descriptionType?: GeniusDescriptionType,
) => {
  switch (descriptionType) {
    case 'event':
      return t('noumena.genius.prompt_input.event_description.placeholder');
    default:
      return t('noumena.genius.prompt_input.noum_description.placeholder');
  }
};

export const GeniusUtils = {
  hasResponse: (response: Maybe<GeniusResponse>) => !!response?.type,
  isTextResponse: (
    response: Maybe<GeniusResponse>,
  ): response is GeniusTextResponse => response?.type === 'text',
  isImageResponse: (
    response: Maybe<GeniusResponse>,
  ): response is GeniusImageResponse => response?.type === 'image',
  formatChunksToText: (chunks: string[]) => chunks.join(' '),
  getAssistTagLabel,
  getDescriptionPlaceholderText,
};
