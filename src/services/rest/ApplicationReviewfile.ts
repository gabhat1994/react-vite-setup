import axios from 'axios';
import * as Sentry from '@sentry/react';
import parseAxiosError from './utils';

export class ApplicationReviewFileServices {
  private controller = {} as AbortController;

  async uploadFileWithSignedUrl(signedUrl: string, file: File) {
    try {
      this.controller = new AbortController();
      const headers = { 'Content-Type': file.type };
      const response = await axios.put(signedUrl, file, {
        headers,
        signal: this.controller?.signal,
      });
      return response.status;
    } catch (error: unknown) {
      if (axios.isCancel(error)) {
        return parseAxiosError(error);
      }
      Sentry.captureException(error, {
        tags: {
          section: 'uploadFileWithSignedUrl',
        },
      });
      return parseAxiosError(error);
    }
  }

  cancelUpload() {
    if (this.controller?.abort) {
      this.controller?.abort();
    }
  }
}
