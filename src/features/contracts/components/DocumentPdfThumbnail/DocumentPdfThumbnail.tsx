import { useState } from 'react';
import { PdfPreviewThumbnail } from '@/components/PdfPreviewThumbnail';
import { PreviewModal } from './PreviewModal';

interface DocumentPdfThumbnailProps {
  data: string | null;
  downloadFileName: string;
  isLoading?: boolean;
}

function DocumentPdfThumbnail({
  data,
  downloadFileName,
  isLoading,
}: DocumentPdfThumbnailProps) {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  return (
    <>
      <PdfPreviewThumbnail
        data={data ?? undefined}
        isLoading={isLoading}
        onClick={() => {
          setIsPreviewModalOpen(true);
        }}
      />
      {data && (
        <PreviewModal
          isOpen={isPreviewModalOpen}
          base64Data={data}
          onClose={() => setIsPreviewModalOpen(false)}
          downloadFileName={downloadFileName}
        />
      )}
    </>
  );
}

export default DocumentPdfThumbnail;
