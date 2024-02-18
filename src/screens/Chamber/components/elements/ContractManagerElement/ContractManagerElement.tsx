import { useSkeletonIsLoadingContext } from '@/components/SkeletonLoader/SkeletonLoaderProvider';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import {
  ElementTypeEnum,
  PermissibleElementType,
} from '@/apollo/generated/types';
import { useNoumUserConnectionContext } from '@/features/noums/contexts/NoumUserConnectionContext';
import { ElementContainer } from '../ElementContainer';
import SkeletonLoaderContractManagerElement from '../SkeletonLoader/SkeletonLoaderContractManagerElement';
import ContractManagerViewMode from './components/Shared/ContractManagerViewMode';
import { type ContractManagerElementProps } from './types';

const ContractManagerElement = (props: ContractManagerElementProps) => {
  const { isEditing } = props;

  const { isLoading } = useSkeletonIsLoadingContext();
  const { hasElementPermission } = useNoumAuthorization();
  const { isConnected } = useNoumUserConnectionContext();

  const hasViewContractElementPermission = hasElementPermission(
    PermissibleElementType.ContractTool,
    'view-contract-sow-element',
    true,
  );

  if (isConnected && !hasViewContractElementPermission) {
    return null;
  }

  if (isLoading) return <SkeletonLoaderContractManagerElement />;

  return (
    <ElementContainer
      isBorderContent={isEditing}
      elementType={ElementTypeEnum.ContractManager}
    >
      <ContractManagerViewMode
        isOwner={props.isOwner}
        spaceId={props.spaceId}
        currentTitle={props.currentTitle}
        element={props.element}
        isEditing={isEditing!}
      />
    </ElementContainer>
  );
};
export default ContractManagerElement;
