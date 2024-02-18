export enum ViewType {
  IMAGE = 'image',
  VIDEO = 'video',
  PDF = 'pdf',
}
export interface LightBoxProps {
  isOpen: boolean;
  handleClose: (isSuccess?: boolean) => void;
  type: ViewType;
  url: string;
  contentType?: string;
  downloadFileName?: string;
}

export interface DocSuccess {
  numPages: number;
}

export interface DocViewerProps {
  isOpen: boolean;
  handleClose: (isSuccess?: boolean) => void;
  url: string;
  setDocError: (fail: boolean) => void;
  handleDownload?: () => void;
}

export interface ImageViewerProps {
  isOpen: boolean;
  handleClose: (isSuccess?: boolean) => void;
  url: string;
  setImageError: (fail: boolean) => void;
}

export interface VideoViewerProps {
  isOpen: boolean;
  handleClose: (isSuccess?: boolean) => void;
  url: string;
  contentType?: string;
  setVideoError: (fail: boolean) => void;
}
