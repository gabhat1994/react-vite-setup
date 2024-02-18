import axios from 'axios';
import getApiUrl from '@/apollo/getApiUrl';
import parseAxiosError from './utils';
import BlockedError from './errors/BlockedError';

export const CloudFlareService = {
  checkBlockedIP: async () => {
    await axios.get(`${getApiUrl()}/api/status`).catch((error) => {
      const parseError = parseAxiosError(error);
      if (parseError.errorStatus === null || parseError.errorStatus === 403) {
        throw new BlockedError();
      } else {
        throw error;
      }
    });
  },
};
