import { Document, Page, pdfjs } from 'react-pdf';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import { type NoumFile } from '@/apollo/generated/types';
import { useWindowDimensions } from '@/hooks';
import { Spinner } from '@/components/Spinner';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import {
  isImageType,
  isSupportedMediaType,
  isSupportedVideoType,
} from '../../../elements/FileManagerElement/utils';
import S from './styles';

type FilePreviewProps = {
  file: NoumFile;
};

pdfjs.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.js`;

const FilePreview = (props: FilePreviewProps) => {
  const { file } = props;
  const { height: windowHeight } = useWindowDimensions();
  const { t } = useTranslation();

  const [isLoaded, setIsLoaded] = useState(
    () => !isSupportedMediaType(file.extension ?? ''),
  );

  const { isDesktop } = useBreakpoints();

  const previewHeight = windowHeight - (isDesktop ? 240 : 100); // window height - modal paddings - modal header height - modal footer height

  const onLoad = () => setIsLoaded(true);

  return (
    <S.FilePreviewWrapper>
      {isSupportedVideoType(file.extension ?? '') ? (
        <S.PreviewVideo
          data-testid="preivew-video"
          autoPlay
          muted
          loop
          onLoadedData={onLoad}
        >
          <source src={file.fileUrl ?? ''} />
        </S.PreviewVideo>
      ) : isImageType(file.extension ?? '') ? (
        <S.Image
          src={file.fileUrl ?? ''}
          data-testid="image-preview"
          onLoad={onLoad}
        />
      ) : file.extension === 'pdf' ? (
        <Document file={file.fileUrl} onLoadSuccess={onLoad}>
          <Page height={previewHeight} pageNumber={1} />
        </Document>
      ) : (
        <S.PreviewNotAvailableContainer>
          <Icon
            name="eye_off_m"
            size={64}
            color="--icon-image-placeholder-neutral-default"
          />
          <S.PreviewNotAvailableText>
            {t('noumena.file_manager.preview_modal.not_available')}
          </S.PreviewNotAvailableText>
        </S.PreviewNotAvailableContainer>
      )}
      {!isLoaded && (
        <S.SpinnerContainer>
          <Spinner />
        </S.SpinnerContainer>
      )}
    </S.FilePreviewWrapper>
  );
};

export default FilePreview;
