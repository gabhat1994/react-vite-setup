import { Spinner } from '@/components/Spinner';

interface DocumentPdfFullPreviewProps {
  data: string | undefined;
  isLoading?: boolean;
}

export function DocumentPdfFullPreview({
  data,
  isLoading,
}: DocumentPdfFullPreviewProps) {
  // TODO: Replace with a document viewer. Extract from DocViewer component from LightBox?
  return isLoading ? (
    <Spinner />
  ) : (
    <iframe
      src={data}
      width="100%"
      height="100%"
      title="Document PDF with signatures"
    />
  );
}
