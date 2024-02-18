import { ButtonMenu } from '@/components/ContextMenu';
import { Icon } from '@/components/Icon';
import { ViewMode } from '@/screens/Chamber/components/ElementWrapper/ViewMode';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { PermissibleElementType } from '@/apollo/generated/types';
import { Container, HeaderRightWrapper } from './styles';
import { type ContractManagerHeaderProps } from '../../../types';

function ContractManagerHeader({
  spaceId,
  element,
  currentTitle,
  isOwner,
  handleNewContract,
  handleNewStatementOfWork,
  isEditing,
}: ContractManagerHeaderProps) {
  const { hasElementPermission } = useNoumAuthorization();

  const canAddDocuments = hasElementPermission(
    PermissibleElementType.ContractTool,
    'add-contract-sow',
    isOwner || isEditing,
  );

  return (
    <Container>
      <ViewMode
        spaceId={spaceId}
        element={element}
        currentTitle={currentTitle}
      />
      <HeaderRightWrapper>
        {canAddDocuments && (
          <ButtonMenu
            secondary
            icon={<Icon name="add_s" size={16} />}
            size="small"
            disabled={isEditing}
            onClick={(value) => {
              switch (value) {
                case 'new_contract':
                  return handleNewContract();
                case 'new_sow':
                  return handleNewStatementOfWork();
                default:
                  return null;
              }
            }}
            menuOptions={[
              {
                type: 'value',
                key: 'new_contract',
                label: 'New Contract',
                value: 'new_contract',
                icon: <Icon name="add_m" size={16} />,
              },
              {
                type: 'value',
                key: 'new_sow',
                label: 'New Statement of Work (SOW)',
                value: 'new_sow',
                icon: <Icon name="add_m" size={16} />,
              },
            ]}
          />
        )}
      </HeaderRightWrapper>
    </Container>
  );
}

export default ContractManagerHeader;
