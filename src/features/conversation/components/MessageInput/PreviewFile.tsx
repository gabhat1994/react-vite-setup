import { type FC, useCallback, useMemo, useState } from 'react';
import { Icon } from '@/components/Icon';
import LightBox from '@/components/LightBox';
import { ViewType } from '@/components/LightBox/types';
import { getMediaType } from '../../helpers';

import {
  PreviewFileWrapper,
  PreivewImage,
  PreviewVideo,
  RemoveFileWrapper,
} from './styles';
import { type PreviewFileProps } from './types';

export const PreviewFile: FC<PreviewFileProps> = ({
  file,
  index,
  onRemoveFile,
}) => {
  const [isControl, setIsControl] = useState<boolean>(false);
  const [showFullScreen, setShowFullScreen] = useState(false);

  const mediaType = getMediaType(file.type);

  const blobURL = useMemo(() => URL.createObjectURL(file), [file]);

  const onMouseEnterHandler = () => setIsControl(true);

  const onMouseLeaveHandler = () => setIsControl(false);

  const onRemoveHandler = useCallback(
    () => onRemoveFile?.(index),
    [index, onRemoveFile],
  );

  return (
    <PreviewFileWrapper
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      {mediaType === 'image' && (
        <PreivewImage
          data-testid="preivew-image"
          src={blobURL}
          alt=""
          onClick={() => setShowFullScreen(true)}
        />
      )}
      {mediaType === 'video' && (
        <PreviewVideo
          data-testid="preivew-video"
          autoPlay
          loop
          muted
          onClick={() => setShowFullScreen(true)}
        >
          <source src={blobURL} type={file.type} />
        </PreviewVideo>
      )}

      <RemoveFileWrapper isControl={isControl} onClick={onRemoveHandler}>
        <Icon name="clear_m" size={20} color="--icon-button-neutral-pressed" />
      </RemoveFileWrapper>

      <LightBox
        url={blobURL || ''}
        isOpen={showFullScreen}
        type={mediaType === 'video' ? ViewType.VIDEO : ViewType.IMAGE}
        contentType={file.type}
        handleClose={() => setShowFullScreen(false)}
      />
    </PreviewFileWrapper>
  );
};
