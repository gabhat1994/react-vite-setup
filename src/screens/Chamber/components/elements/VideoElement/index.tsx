import { memo, useMemo } from 'react';
import {
  ElementWrapper,
  type ElementWrapperProps,
} from '@/screens/Chamber/components/ElementWrapper';

import { getFileExtension, getVideoMimeType } from '@/utils/file';
import { useSkeletonIsLoadingContext } from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import SkeletonLoaderImageElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderImageElement';
import { ElementUtils } from '@/utils/element';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import {
  ElementTypeEnum,
  PermissibleElementType,
} from '@/apollo/generated/types';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { SpaceUtils } from '@/utils/space';
import { type VideoEditorProps } from './types';
import VideoView from './VideoView';
import VideoEditor from './VideoEditor';
import { ElementContainer } from '../ElementContainer';

interface VideoElementProps extends ElementWrapperProps, VideoEditorProps {
  url?: string;
}

const Content = memo((props: VideoElementProps) => {
  const { isEditing, isCustomPreview, element, url, onContentChange } = props;
  const isView = !isEditing || isCustomPreview;
  const { isLoading } = useSkeletonIsLoadingContext();
  const videoUrl =
    (isEditing ? ElementUtils.getBodyContent(element) : url) || undefined;

  const { meta } = useMemo(
    () =>
      isView
        ? ElementUtils.getPublished(element)
        : ElementUtils.getUnpublished(element),
    [isView, element],
  );

  if (isLoading) return <SkeletonLoaderImageElement />;

  if (isView && !videoUrl) {
    return null;
  }

  const fileExtension = getFileExtension(url ?? '');
  const mimeType = getVideoMimeType(fileExtension);

  return isView ? (
    <VideoView
      url={videoUrl}
      fileType={mimeType}
      isCollapse={false}
      viewOnly={true}
      isCustomPreview={isCustomPreview}
      elementId={element?._id}
      meta={meta}
    />
  ) : (
    <VideoEditor
      url={videoUrl}
      onContentChange={onContentChange}
      meta={meta}
      elementId={element._id}
    />
  );
});

const VideoElement = memo(
  ({ onContentChange, ...props }: VideoElementProps) => {
    const { hasElementPermission } = useNoumAuthorization();
    const { space } = useNoumContext();
    const { isConnected } = useNoumUserConnectionContext();

    const hasViewVideoPermission = hasElementPermission(
      PermissibleElementType.Video,
      'view-video-element',
      true,
    );

    if (
      isConnected &&
      !SpaceUtils.isMasterNoum(space) &&
      !hasViewVideoPermission
    )
      return null;
    return (
      <ElementContainer isBorderContent elementType={ElementTypeEnum.Video}>
        <ElementWrapper {...props}>
          <Content {...props} onContentChange={onContentChange} />
        </ElementWrapper>
      </ElementContainer>
    );
  },
);

export default VideoElement;
