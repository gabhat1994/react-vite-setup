import { Avatar } from '@/components/Avatar/Avatar';
import { type CommonAvatarProps } from '@/components/Avatar/Avatar/types';
import { imageTypes } from '@/constants/fileTypes';
import { memo, useState } from 'react';
import { GeniusCompletionModal } from '@/features/genius/components/GeniusCompletionModal';
import { useLaunchDarkly } from '@/hooks';
import { useTranslation } from 'react-i18next';
import { getGenerateImageLoadingMessage } from '@/screens/Chamber/components/ProfileSummary/ProfileBanner/utils';
import { Upload } from '../Upload';
import { Container } from './styles';

interface EditableAvatarProps
  extends Omit<CommonAvatarProps, 'onGenerateImage'> {
  onContentChange: (next: string) => void;
  noMargin?: boolean;
}

export const EditableAvatar = memo(
  ({
    url,
    size,
    maximumFileSize,
    defaultImagePlaceHolder,
    onContentChange,
    onClear,
    onlyEditable,
    noMargin = false,
  }: EditableAvatarProps) => {
    const {
      flags: { geniusCompletionImage },
    } = useLaunchDarkly();
    const { t } = useTranslation();
    const [isGeniusOpen, setGeniusOpen] = useState(false);

    return (
      <>
        <Upload<HTMLDivElement>
          url={url || ''}
          maxSize={maximumFileSize}
          acceptedFileTypes={imageTypes}
          onContentChange={onContentChange}
          type="profile"
        >
          {({ triggerElRef, ...rest }) => (
            <Container ref={triggerElRef} noMargin={noMargin}>
              <Avatar
                isUploadComplete={rest.isUploadComplete}
                isUploadStarted={rest.isUploadStarted}
                url={url || defaultImagePlaceHolder}
                size={size}
                editable
                fileSize={rest.fileSize}
                maximumFileSize={maximumFileSize}
                onHandleUpload={rest.onClickHandler}
                onGenerateImage={
                  geniusCompletionImage ? () => setGeniusOpen(true) : undefined
                }
                onClear={onClear}
                onClose={rest.onCloseHandler}
                onlyEditable={onlyEditable}
              />
            </Container>
          )}
        </Upload>

        {geniusCompletionImage && (
          <GeniusCompletionModal
            type="image"
            title={t('noumena.genius.generate_noum_image')}
            isOpen={isGeniusOpen}
            onClose={() => setGeniusOpen(false)}
            processLoadingText={getGenerateImageLoadingMessage()}
            onConfirm={(response) => {
              if (response.image) {
                onContentChange?.(response.image);
                setGeniusOpen(false);
              }
            }}
          />
        )}
      </>
    );
  },
);
