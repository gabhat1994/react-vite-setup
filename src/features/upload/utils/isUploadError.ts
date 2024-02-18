import { type FileError } from './UploadError';

const isUploadError = (error: FileError | unknown): error is FileError =>
  typeof error === 'object' && error !== null && 'isFileError' in error;

export default isUploadError;
