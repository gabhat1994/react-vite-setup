import { type HTMLAttributes, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Spinner } from '@/components/Spinner';
import { TSpan } from '@/components/Typography';
import useRefDimensions from '@/hooks/useRefDimensions';
import { Button } from '../Button';
import { Icon } from '../Icon';
import S from './styles';

pdfjs.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.js`;

interface PdfPreviewProps extends HTMLAttributes<HTMLDivElement> {
  data?: string;
  isLoading?: boolean;
  onClick(): void;
  fitBy?: 'width' | 'height';
}

function PdfPreviewThumbnail({
  children,
  isLoading,
  data,
  fitBy = 'width',
  onClick,
  ...divProps
}: PdfPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useRefDimensions(ref);

  return (
    <S.PdfPreviewWrapper
      ref={ref}
      align="center"
      justify="center"
      {...divProps}
    >
      {data ? (
        children ?? (
          <S.Content>
            <Document file={data} loading={isLoading ? <Spinner /> : undefined}>
              <Page
                width={fitBy === 'width' ? width : undefined}
                height={fitBy === 'height' ? height : undefined}
                pageNumber={1}
              />
            </Document>

            {isLoading ? (
              <S.LoadingOverlay>
                <Button tertiary disabled>
                  {' '}
                  <Spinner />
                </Button>
              </S.LoadingOverlay>
            ) : (
              <S.ClickOverlay onClick={onClick}>
                <Button
                  tertiary
                  onClick={onClick}
                  icon={<Icon name="zoom_m" size={24} />}
                />
              </S.ClickOverlay>
            )}
          </S.Content>
        )
      ) : (
        <TSpan font="body-l-bold" colorToken="--text-card-neutral-disabled">
          No PDF Available
        </TSpan>
      )}
    </S.PdfPreviewWrapper>
  );
}

export default PdfPreviewThumbnail;
