type CancelledExtraParams = {
  canceled?: boolean;
};

type FileSizeTooLargeParams = {
  isLargeFile?: boolean;
};

type ExtraParams = CancelledExtraParams & FileSizeTooLargeParams; // used for union

export interface FileError {
  isFileError: boolean;
  errorExtraParams?: ExtraParams;
}

export class UploadError extends Error implements FileError {
  public isFileError = true;

  private _errorExtraParams: ExtraParams | undefined;

  constructor(message: string, errorExtraParams?: ExtraParams) {
    super(message);
    this._errorExtraParams = errorExtraParams;
  }

  get errorExtraParams() {
    return this._errorExtraParams;
  }
}
