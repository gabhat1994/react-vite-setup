import { useSkeletonIsLoadingContext } from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import {
  ElementTypeEnum,
  PermissibleElementType,
} from '@/apollo/generated/types';
import { ElementWrapperV2 } from '@/screens/Chamber/components/ElementWrapperV2';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import FileManagerViewMode from './components/FileManagerViewMode';
import { type FileManagerElementProps } from './types';
import { FileManagerElementProvider } from './providers/FileManagerElementProvider';
import SkeletonLoaderFileManagerElement from '../SkeletonLoader/SkeletonLoaderFileManagerElement';
import { ElementContainer } from '../ElementContainer';

const FileManagerElement = (props: FileManagerElementProps) => {
  const { isLoading } = useSkeletonIsLoadingContext();
  const { isConnected } = useNoumUserConnectionContext();

  const { hasElementPermission } = useNoumAuthorization();

  const hasViewFileManagerElementPermission = hasElementPermission(
    PermissibleElementType.FileManager,
    'view-file-manager-element',
    true,
  );

  if (isConnected && !hasViewFileManagerElementPermission) {
    return null;
  }

  if (isLoading) return <SkeletonLoaderFileManagerElement />;

  return (
    <ElementContainer
      isBorderContent={props.isEditing}
      elementType={ElementTypeEnum.FilesManager}
    >
      <ElementWrapperV2.Container>
        <FileManagerElementProvider {...props}>
          <FileManagerViewMode />
        </FileManagerElementProvider>
      </ElementWrapperV2.Container>
    </ElementContainer>
  );
};
export default FileManagerElement;
