import { memo, useMemo } from 'react';
import {
  ElementWrapper,
  type ElementWrapperProps,
} from '@/screens/Chamber/components/ElementWrapper';
import { useSkeletonIsLoadingContext } from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import SkeletonLoaderImageElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderImageElement';
import { ElementUtils } from '@/utils/element';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import {
  ElementTypeEnum,
  PermissibleElementType,
} from '@/apollo/generated/types';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { SpaceUtils } from '@/utils/space';
import { type ImageEditorProps } from './types';
import ImageView from './ImageView';
import ImageEditor from './ImageEditor';
import { ElementContainer } from '../ElementContainer';

interface ImageElementProps extends ElementWrapperProps, ImageEditorProps {
  url?: string;
}

const Content = memo((props: ImageElementProps) => {
  const { isEditing, isCustomPreview, isActiveTool } = props;
  const { isLoading } = useSkeletonIsLoadingContext();
  const isView = !isEditing || isCustomPreview;

  const { meta } = useMemo(
    () =>
      isView
        ? ElementUtils.getPublished(props.element)
        : ElementUtils.getUnpublished(props.element),
    [isView, props.element],
  );

  const imageUrl = isEditing
    ? ElementUtils.getBodyContent(props.element)
    : props.url;

  if (isView && !imageUrl) {
    return null;
  }

  if (isLoading) return <SkeletonLoaderImageElement />;

  return (isActiveTool && imageUrl) || isView ? (
    <ImageView
      url={imageUrl || undefined}
      viewOnly={isView}
      meta={meta}
      isCustomPreview={props.isCustomPreview}
      elementId={props.element._id}
    />
  ) : (
    <ImageEditor
      url={imageUrl || undefined}
      onContentChange={props.onContentChange}
      meta={meta}
      elementId={props.element._id}
    />
  );
});

const ImageElement = memo(
  ({ onContentChange, ...props }: ImageElementProps) => {
    const { hasElementPermission } = useNoumAuthorization();
    const { space } = useNoumContext();
    const { isConnected } = useNoumUserConnectionContext();

    const hasViewImagePermission = hasElementPermission(
      PermissibleElementType.Image,
      'view-image-element',
      true,
    );

    if (
      isConnected &&
      !SpaceUtils.isMasterNoum(space) &&
      !hasViewImagePermission
    )
      return null;
    return (
      <ElementContainer isBorderContent elementType={ElementTypeEnum.Image}>
        <ElementWrapper {...props} isSpecialCollapsing={false}>
          <Content {...props} onContentChange={onContentChange} />
        </ElementWrapper>
      </ElementContainer>
    );
  },
);

export default ImageElement;
