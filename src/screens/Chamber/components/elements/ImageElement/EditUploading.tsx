import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/Icon';
import { ProgressBar } from '@/components/ProgressBar';
import { Spacer } from '@/layout';
import fileSizeConverter from '@/utils/fileSizeConverter';
import { TSpan } from '@/components/Typography';
import ImageView from './ImageView';
import { type EditUploadingProps } from './types';
import {
  EditUploadingContainer,
  ProgressBarWrapper,
  ProgressErrorWrapper,
  VerticalCenterWrapper,
} from './styles';

const EditUploading = memo((props: EditUploadingProps) => {
  const { t } = useTranslation();
  const imageReady = !!(
    !props.error &&
    props.url &&
    props.isUploadComplete &&
    props.uploadPercentage === 100
  );

  return (
    <EditUploadingContainer
      {...props}
      data-testid="image-edit-uploading"
      isBackground={true}
    >
      {!imageReady && (
        <ProgressErrorWrapper
          draggable="false"
          onDragStart={(event) => event.preventDefault()}
        >
          <VerticalCenterWrapper isUploadComplete={imageReady}>
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
                {`${t('noumena.image_element.edit_uploading.error_text')} `}
                <TSpan
                  font="link-s"
                  colorToken="--text-card-danger-primary-default"
                  style={{ cursor: 'pointer' }}
                  onClick={props.onTryAgain}
                >
                  {t('noumena.image_element.edit_uploading.error_try_again')}
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

      {imageReady && (
        <ImageView
          url={props.url}
          meta={props.meta}
          elementId={props.elementId}
        />
      )}
    </EditUploadingContainer>
  );
});

export default EditUploading;
