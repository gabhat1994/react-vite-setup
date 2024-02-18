import React, { useState } from 'react';
import { Avatar } from '@/components/Avatar/Avatar';
import { Icon } from '@/components/Icon';
import VideoPlayer from '@/components/VideoPlayer';
import { PostCategory } from '@/apollo/generated/types';
import { getFormattedDuration } from '@/utils/getFormattedDuration';
import { getFileExtension, getVideoMimeType } from '@/utils/file';
import { type AssetItemProps } from './types';
import {
  DeleteButton,
  AssetItemContainer,
  DurationItem,
  RoundedCorners,
} from './styles';

export const AssetItem: React.FC<AssetItemProps> = ({
  url,
  index,
  filetype,
  onDelete,
}) => {
  const [duration, setDuration] = useState<number | undefined>(undefined);

  const mimeType = getVideoMimeType(getFileExtension(url ?? ''));

  return (
    <AssetItemContainer data-testid="asset_item">
      {filetype !== PostCategory.Video && (
        <Avatar url={url || ''} width={124} height={124} borderRadius={8} />
      )}
      {filetype === PostCategory.Video && (
        <RoundedCorners enabled={mimeType === 'video/quicktime'}>
          <VideoPlayer
            url={url}
            fileType={getVideoMimeType(getFileExtension(url ?? ''))}
            controls={false}
            onGotDuration={(length) => setDuration(length)}
            isSquare
          />
        </RoundedCorners>
      )}
      <DeleteButton
        tertiary
        icon={
          <Icon
            size={24}
            name="close_m"
            color="--icon-button-neutral-default"
          />
        }
        onClick={() => onDelete(index)}
        testId="asset_delete_btn"
      />
      {filetype === PostCategory.Video && duration !== undefined && (
        <DurationItem>{getFormattedDuration(duration)}</DurationItem>
      )}
    </AssetItemContainer>
  );
};

export default AssetItem;
