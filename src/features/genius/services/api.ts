import parseAxiosError from '@/services/rest/utils';
import * as Sentry from '@sentry/react';

const API_URL = import.meta.env.VITE_ALB_URL;

const fetchGeniusTextCompletion = async (
  prompt: string,
  options: RequestInit = {},
) => {
  try {
    const url = `${API_URL}/chamber/ai/text-chat-completion`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
      }),
      credentials: 'same-origin',
      ...options,
    });

    if (!response.ok) {
      Sentry.captureException(response, {
        tags: {
          section: 'fetchGeniusTextCompletion',
        },
      });
      return parseAxiosError(response);
    }
    return response.body;
  } catch (error: unknown) {
    if (parseAxiosError(error).errorStatus !== 400) {
      Sentry.captureException(error, {
        tags: {
          section: 'fetchGeniusTextCompletion',
        },
      });
    }
    return parseAxiosError(error);
  }
};

export const GeniusAPIService = {
  fetchGeniusTextCompletion,
};
