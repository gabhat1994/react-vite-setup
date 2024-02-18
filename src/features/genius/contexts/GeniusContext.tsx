import { createContext } from 'react';
import { type useGeniusStateService } from '../hooks/useGeniusStateService';

export type GeniusResponseType = 'image' | 'text';

export type GeniusTextResponse = {
  text: string;
  type: 'text';
};

export type GeniusImageResponse = {
  images: string[];
  image?: string;
  type: 'image';
};

export type GeniusResponseFromType<T extends GeniusResponseType> =
  T extends 'text' ? GeniusTextResponse : Omit<GeniusImageResponse, 'images'>;

export type GeniusResponse = GeniusTextResponse | GeniusImageResponse;

export type GeniusContextType = ReturnType<typeof useGeniusStateService> & {
  type: GeniusResponseType;
};

export const GeniusContext = createContext<GeniusContextType>({
  response: undefined,
  setResponse: () => {},
  retry: () => {},
  reset: () => {},
  generate: () => {},
  cancel: () => {},
  prompt: undefined,
  type: 'text',
  mode: 'provide-prompt',
  cancelling: false,
  selectedIndex: undefined,
  selectImage: () => {},
});
