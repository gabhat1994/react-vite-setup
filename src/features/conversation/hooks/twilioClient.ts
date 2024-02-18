import { useContext } from 'react';
import { TwilioClientV3Context } from '@/providers/TwilioClientV3Provider';

export const useTwilioClient = () => {
  const { client, isInitialized } = useContext(TwilioClientV3Context);

  return { client, isInitialized };
};
