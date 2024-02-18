import { type Client } from '@twilio/conversations';
import { createContext } from 'react';

type TwilioClientContextProps = {
  client: Client | undefined;
  isInitialized: boolean;
};

export const TwilioClientContext = createContext<TwilioClientContextProps>({
  client: undefined,
  isInitialized: false,
});
