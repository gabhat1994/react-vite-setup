import * as Sentry from '@sentry/react';
import axios from 'axios';
import parseAxiosError from '@/services/rest/utils';

const SmartyInstance = axios.create({
  baseURL: process.env.VITE_SMARTY_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const smartyKey = process.env.VITE_SMARTY_KEY;

interface Suggestion {
  city: string;
  entries: string;
  secondary: string;
  state: string;
  street_line: string;
  zipcode: string;
}

interface SuggestionData {
  suggestions: Suggestion[];
}

export const SmartyServices = {
  lookup: async (searchKeyword: string): Promise<SuggestionData> => {
    try {
      const response = await SmartyInstance.get<SuggestionData>(
        `/lookup?key=${smartyKey}&search=${searchKeyword}`,
      );
      return response.data;
    } catch (error: unknown) {
      Sentry.captureException(error, {
        tags: {
          section: 'SmartyServices',
        },
      });
      const { errorMessage } = parseAxiosError(error);
      throw new Error(errorMessage);
    }
  },
};
