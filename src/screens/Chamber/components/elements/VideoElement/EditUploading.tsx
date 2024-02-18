import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import { ProgressBar } from '@/components/ProgressBar';
import { Spacer } from '@/layout';
import fileSizeConverter from '@/utils/fileSizeConverter';

import { TSpan } from '@/components/Typography';
import { getFileExtension, getVideoMimeType } from '@/utils/file';
import VideoView from './VideoView';
import { type EditUploadingProps } from './types';
import {
  EditUploadingContainer,
  ProgressBarWrapper,
  ProgressErrorWrapper,
  VerticalCenterWrapper,
} from './styles';

const EditUploading = memo((props: EditUploadingProps) => {
  const { t } = useTranslation();
  const videoReady = !!(
    !props.error &&
    props.url &&
    props.isUploadComplete &&
    props.uploadPercentage === 100
  );

  const fileExtension = getFileExtension(props.url ?? '');
  const mimeType = getVideoMimeType(fileExtension);

  return (
    <EditUploadingContainer {...props} isBackground={true}>
      {!videoReady && (
        <ProgressErrorWrapper>
          <VerticalCenterWrapper isUploadComplete={videoReady}>
            <div>
              <TSpan
                font="body-m"
                $fill
                colorToken="--text-card-header-neutral-highlighted"
              >
                {props.fileName}
              </TSpan>
              <Spacer height={4} />
              {props.fileSize && (
                <TSpan
                  font="systemInfo-s"
                  $fill
                  colorToken="--text-card-neutral-default"
                >
                  {fileSizeConverter(props.fileSize || 0)}
                </TSpan>
              )}
            </div>
            <Spacer isFlex />
            <Icon
              name="close_m"
              size={24}
              onClick={props.onClose}
              color="--icon-card-neutral-default"
            />
          </VerticalCenterWrapper>
        </ProgressErrorWrapper>
      )}

      <div>
        {props.error ? (
          <>
            <Spacer height={6} />
            <ProgressErrorWrapper>
              <TSpan
                font="footnote"
                colorToken="--text-card-danger-primary-default"
              >
                {`${t('noumena.video_element.edit_uploading.error_text')} `}
                <TSpan
                  font="link-s"
                  colorToken="--text-card-danger-primary-default"
                  style={{ cursor: 'pointer' }}
                  onClick={props.onTryAgain}
                >
                  {t('noumena.video_element.edit_uploading.error_try_again')}
                </TSpan>
              </TSpan>
            </ProgressErrorWrapper>
          </>
        ) : null}

        {!props.error && !props.isUploadComplete && (
          <>
            <Spacer height={16} />
            <ProgressBarWrapper>
              <ProgressBar
                backgroudColor="var(--bg-progressbar-neutral-default)"
                percentage={props.uploadPercentage}
                barSize={8}
              />
            </ProgressBarWrapper>
          </>
        )}
      </div>

      {videoReady && (
        <VideoView
          fileType={mimeType}
          url={props.url}
          meta={props.meta}
          elementId={props.elementId}
        />
      )}
    </EditUploadingContainer>
  );
});

export default EditUploading;
