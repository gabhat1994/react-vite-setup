import axios from 'axios';
import * as Sentry from '@sentry/react';
import getApiUrl from '@/apollo/getApiUrl';
import { type NoumReferenceMetadata } from '@/screens/Reference/types';
import parseAxiosError from './utils';

const API_URL = `${getApiUrl()}/chamber/v2`;

export const NoumReferenceServices = {
  fillOutReferenceByExternalUser: async ({
    capacity,
    referenceText,
    imageUrl,
    referenceToken,
  }: {
    referenceToken: string;
    referenceText: string;
    capacity?: string;
    imageUrl?: string;
  }) => {
    try {
      const body = {
        capacity: capacity ?? undefined,
        referenceText,
        imageUrl,
      };
      const url = `${API_URL}/noum-references/external`;
      const headers = {
        headers: {
          'x-reference-token': referenceToken,
        },
      };
      const response = await axios.post(url, body, headers);
      return response.data;
    } catch (error: unknown) {
      Sentry.captureException(error, {
        tags: {
          section: 'NoumReference',
        },
      });
      const { errorMessage } = parseAxiosError(error);
      throw new Error(errorMessage);
    }
  },
  getNoumReferenceMetadata: async (
    token: string,
  ): Promise<NoumReferenceMetadata> => {
    try {
      const url = `${API_URL}/noum-references/metadata`;
      const headers = {
        headers: {
          'x-reference-token': token,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.get(url, headers);
      return response.data;
    } catch (error: unknown) {
      Sentry.captureException(error, {
        tags: {
          section: 'NoumReference',
        },
      });
      const { errorMessage } = parseAxiosError(error);
      throw new Error(errorMessage);
    }
  },
};

export default NoumReferenceServices;
