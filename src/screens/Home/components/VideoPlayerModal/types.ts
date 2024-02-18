export interface VideoPlayerModalProps {
  testId?: string;
  onClose?: () => void;
  open: boolean;
  videoURL: string;
}
