import { VideoPlayerView } from '@/components/VideoPlayer';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import NoumLayoutToolWrapper from '@/screens/Chamber/components/ElementWrapper/NoumLayoutToolWrapper';
import { memo, useCallback, useMemo } from 'react';
import { type VideoPlayerViewProps } from '@/components/VideoPlayer';
import { ElementResizable } from '@/components/ElementResizable';
import UploadProgress from '../MediaElement/UploadProgress';
import { type NoumLayoutToolMetaValues } from '../../ElementWrapper';

interface VideoViewProps extends VideoPlayerViewProps {
  meta?: NoumLayoutToolMetaValues;
}

const VideoView = memo((props: VideoViewProps) => {
  const {
    toolMetaValue,
    handleChangeToolMetaValue,
    updateToolMetaValue,
    activeEditingTool,
    mediaUploadPercentage,
    mediaUploadTempFile,
  } = useEditChamberState();

  const isActiveEditing = useMemo(
    () => activeEditingTool?._id === props.elementId,
    [activeEditingTool?._id, props.elementId],
  );

  const videoMetaData = isActiveEditing ? toolMetaValue : props.meta;
  const percentageSize = videoMetaData?.percentageSize || 30;
  const videoUrl = isActiveEditing
    ? activeEditingTool?.unSaved?.bodyContentJson?.videoURL
    : props.url;

  const handleResize = useCallback(
    (e, direction, ref) => {
      const numericPercentage = Math.floor(ref?.style?.width?.replace('%', ''));
      handleChangeToolMetaValue?.({ percentageSize: numericPercentage });
    },
    [handleChangeToolMetaValue],
  );

  return (
    <NoumLayoutToolWrapper
      meta={videoMetaData}
      data-testid="video-element-view"
    >
      <>
        {isActiveEditing && mediaUploadTempFile ? (
          <UploadProgress
            file={mediaUploadTempFile}
            uploadPercentage={mediaUploadPercentage}
          />
        ) : (
          <ElementResizable
            onResize={handleResize}
            onResizeStop={updateToolMetaValue}
            disable={!isActiveEditing}
            percentSize={percentageSize}
          >
            <VideoPlayerView
              url={videoUrl}
              fullHeight
              fileType={props.fileType}
              onLoadedData={props.onLoadedData}
              isCollapse={props.isCollapse}
              bigPlayButton={props.bigPlayButton}
              controls={props.controls}
              viewOnly={props.viewOnly}
              width={props.width}
              height={props.height}
              isSquare={props.isSquare}
            />
          </ElementResizable>
        )}
      </>
    </NoumLayoutToolWrapper>
  );
});

export default VideoView;
