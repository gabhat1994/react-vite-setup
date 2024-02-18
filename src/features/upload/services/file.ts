import axios from 'axios';
import * as Sentry from '@sentry/react';
import parseAxiosError from '@/services/rest/utils';

export type FileUploadProcessEventType = {
  loaded: number;
  total: number;
};

export class FileServices {
  private controller = {} as AbortController;

  async uploadFileWithSignedUrl(
    signedUrl: string,
    file: File,
    callback: (processEvent: FileUploadProcessEventType) => void,
  ) {
    try {
      this.controller = new AbortController();
      const headers = { 'Content-Type': 'multipart/form-data' };
      const response = await axios.put(signedUrl, file, {
        headers,
        onUploadProgress: (progressEvent: FileUploadProcessEventType) => {
          callback(progressEvent);
        },
        signal: this.controller?.signal,
      });
      return response.data;
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
