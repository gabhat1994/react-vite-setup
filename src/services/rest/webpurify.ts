import * as Sentry from '@sentry/react';
import axios from 'axios';

const WebPurifyServices = {
  /** @deprecated This service is not used anywhere in our app, but we plan to use it at some point, just like we did in the Mobile App. Leaving this code for now to accelerate. */
  profanityFilter: async (message: string) => {
    try {
      const apiUrl = process.env.VITE_WEBPURIFY_TEXT_API_ENDPOINT;
      const apiKey = process.env.VITE_WEBPURIFY_TEXT_API_KEY;
      if (!apiKey || !apiUrl) return message;
      const searchParams = new URLSearchParams();
      searchParams.append('api_key', apiKey);
      searchParams.append('format', 'json');
      searchParams.append('replacesymbol', '*');
      searchParams.append('method', 'webpurify.live.replace');
      searchParams.append('text', message);
      const uri = `${apiUrl}/?${searchParams.toString()}`;
      const { data } = await axios.get(uri);
      return data?.rsp.text;
    } catch (error) {
      Sentry.captureException(error, {
        tags: {
          section: 'WebPurifyServices',
        },
      });
      return message;
    }
  },
};

export default WebPurifyServices;
