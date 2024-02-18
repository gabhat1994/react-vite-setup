import type { FileServices } from '../services/file';
import { type UploadMeta } from '../types';

type UploadFn = (mFile: File) => Promise<{
  downloadableLink: string;
  signedUrlDomain: string;
  meta: UploadMeta | undefined;
}>;

export type UseUploadReturnTypes = [UploadFn, FileServices];
