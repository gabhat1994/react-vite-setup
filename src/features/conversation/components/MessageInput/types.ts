export type MessageInputProps = {
  disabled?: boolean;
  withLeftPadding?: boolean;
  onSendMessage: (text: string, files: File[]) => void;
};

export type PreviewFileProps = {
  file: File;
  index: number;
  onRemoveFile?: (index: number) => void;
};
