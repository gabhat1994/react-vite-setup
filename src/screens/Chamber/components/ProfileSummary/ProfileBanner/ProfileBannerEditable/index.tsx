import { memo, useState } from 'react';
import { imageTypes } from '@/constants/fileTypes';
import { Upload } from '@/features/upload/components';
import { GeniusCompletionModal } from '@/features/genius/components/GeniusCompletionModal';
import { useLaunchDarkly } from '@/hooks';
import { type CommonProfileProps } from '../types';
import { ProfileBanner } from '../ProfileBanner';
import {
  getGenerateImageWithGeniusLabel,
  getGenerateImageLoadingMessage,
} from '../utils';

export interface EditableAvatarProps extends CommonProfileProps {
  onContentChange: (next: string) => void;
  loading?: boolean;
}

export const ProfileBannerEditable = memo(
  ({
    url,
    size,
    maximumFileSize,
    defaultImagePlaceHolder,
    onContentChange,
    onClear,
    onlyEditable,
    isBanner,
    height,
    borderRadius,
    loading,
  }: EditableAvatarProps) => {
    const {
      flags: { geniusCompletionImage },
    } = useLaunchDarkly();

    const [isGeniusOpen, setGeniusOpen] = useState(false);

    return (
      <>
        <Upload<HTMLDivElement>
          type="profile"
          url={url || ''}
          maxSize={maximumFileSize}
          acceptedFileTypes={imageTypes}
          onContentChange={onContentChange}
        >
          {({ triggerElRef, ...rest }) => (
            <ProfileBanner
              isUploadComplete={rest.isUploadComplete}
              isUploadStarted={rest.isUploadStarted}
              url={url || defaultImagePlaceHolder}
              size={size}
              editable={onlyEditable}
              fileSize={rest.fileSize}
              maximumFileSize={maximumFileSize}
              onClear={onClear}
              onClose={rest.onCloseHandler}
              onHandleUpload={rest.onClickHandler}
              onGenerateImage={
                geniusCompletionImage ? () => setGeniusOpen(true) : undefined
              }
              isBanner={isBanner}
              height={height}
              borderRadius={borderRadius}
              isLoadingBanner={loading}
            />
          )}
        </Upload>

        {geniusCompletionImage && (
          <GeniusCompletionModal
            type="image"
            title={getGenerateImageWithGeniusLabel(isBanner)}
            isOpen={isGeniusOpen}
            onClose={() => setGeniusOpen(false)}
            processLoadingText={getGenerateImageLoadingMessage(isBanner)}
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
