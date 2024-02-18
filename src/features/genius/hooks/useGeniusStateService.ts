import { type Maybe } from '@/common/types';
import { useCallback, useReducer } from 'react';
import { type GeniusResponse } from '../contexts/GeniusContext';
import { GeniusUtils } from '../utils';

export type GeniusModalMode = 'provide-prompt' | 'generating' | 'generated';

interface ModalState {
  mode: GeniusModalMode;
  prompt?: string;
  response?: Maybe<GeniusResponse>;
  cancelling?: boolean;
  selectedIndex?: number;
}

type ModalStateAction =
  | {
      mode: 'provide-prompt';
    }
  | {
      mode: 'generating';
      prompt: string;
      cancelling: boolean;
    }
  | {
      mode: 'generated';
      response: GeniusResponse;
      prompt: string;
      selectedIndex?: number;
    };

function modalStateReducer(
  state: ModalState,
  action: ModalStateAction,
): ModalState {
  switch (action.mode) {
    case 'provide-prompt':
      return { mode: 'provide-prompt' };
    case 'generating':
      return {
        mode: 'generating',
        prompt: action.prompt,
        cancelling: action.cancelling,
      };
    case 'generated':
      return {
        mode: 'generated',
        prompt: action.prompt,
        response: action.response,
        selectedIndex: action.selectedIndex,
      };
    default:
      return state;
  }
}

export const useGeniusStateService = () => {
  const [{ mode, prompt, response, cancelling, selectedIndex }, dispatch] =
    useReducer(modalStateReducer, {
      mode: 'provide-prompt',
    });

  const generate = useCallback((value: string) => {
    dispatch({ mode: 'generating', prompt: value, cancelling: false });
  }, []);

  const setResponse = useCallback(
    (value: GeniusResponse) => {
      if (!prompt) {
        return;
      }
      dispatch({ mode: 'generated', response: value, prompt });
    },
    [prompt],
  );

  const selectImage = useCallback(
    (index: number) => {
      if (!prompt || !response) {
        return;
      }
      if (GeniusUtils.isImageResponse(response)) {
        dispatch({
          mode: 'generated',
          response: {
            ...response,
            image: response.images[index],
          },
          prompt,
          selectedIndex: index,
        });
      }
    },
    [prompt, response],
  );

  const reset = () => {
    dispatch({ mode: 'provide-prompt' });
  };

  const retry = useCallback(() => {
    if (!prompt) {
      return;
    }
    dispatch({ mode: 'generating', prompt, cancelling: false });
  }, [prompt]);

  const cancel = useCallback(() => {
    if (!prompt) {
      return;
    }
    dispatch({ mode: 'generating', prompt, cancelling: true });
  }, [prompt]);

  return {
    mode,
    prompt,
    response,
    cancelling,
    selectedIndex,
    generate,
    setResponse,
    reset,
    retry,
    cancel,
    selectImage,
  };
};
