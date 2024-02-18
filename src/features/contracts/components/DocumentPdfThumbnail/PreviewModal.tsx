import LightBox from '@/components/LightBox';
import { ViewType } from '@/components/LightBox/types';

type PreviewModalProps = {
  isOpen: boolean;
  base64Data: string;
  onClose(): void;
  downloadFileName: string;
};

export function PreviewModal({
  isOpen,
  base64Data,
  downloadFileName,
  onClose,
}: PreviewModalProps) {
  return (
    <LightBox
      isOpen={isOpen}
      type={ViewType.PDF}
      url={base64Data}
      downloadFileName={downloadFileName}
      handleClose={onClose}
    />
  );
}
