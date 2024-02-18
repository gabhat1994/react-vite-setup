import {
  ElementTypeEnum,
  PermissibleElementType,
} from '@/apollo/generated/types';
import { useSkeletonIsLoadingContext } from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { type ElementWrapperProps } from '@/screens/Chamber/components/ElementWrapper';
import SkeletonLoaderPostElement from '@/screens/Chamber/components/elements/SkeletonLoader/SkeletonLoaderPostElement';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { SpaceUtils } from '@/utils/space';
import { ElementContainer } from '../ElementContainer';
import { PostElementProvider } from './PostElementProvider';
import { PostViewMode } from './components/PostViewMode';

export const PostElement = (props: ElementWrapperProps) => {
  const { isLoading } = useSkeletonIsLoadingContext();
  const { space } = useNoumContext();
  const { isConnected } = useNoumUserConnectionContext();

  const { hasElementPermission } = useNoumAuthorization();

  const hasViewPostElementPermission =
    hasElementPermission(
      PermissibleElementType.Posts,
      'view-post-element',
      true,
    ) ||
    // TODO: Remove after we migrate followers to be regular member roles.
    !!space?.isFollowing;

  if (
    isConnected &&
    !SpaceUtils.isMasterNoum(space) &&
    !hasViewPostElementPermission
  ) {
    return null;
  }

  if (!space) {
    return null;
  }

  if (isLoading) return <SkeletonLoaderPostElement />;

  return (
    <ElementContainer
      isBorderContent={props.isEditing}
      elementType={ElementTypeEnum.Userposts}
    >
      <PostElementProvider
        space={space}
        isCustomPreview={props.isCustomPreview}
      >
        <PostViewMode {...props} />
      </PostElementProvider>
    </ElementContainer>
  );
};
