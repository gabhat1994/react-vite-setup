import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { PermissibleElementType } from '@/apollo/generated/types';
import S from './styles';
import { type EmptyElementProps } from '../../../types';

export function EmptyElement({
  isOwner,
  handleNewContract,
  handleNewStatementOfWork,
}: EmptyElementProps) {
  const { t } = useTranslation();

  const { hasElementPermission } = useNoumAuthorization();

  const canAddDocuments = hasElementPermission(
    PermissibleElementType.ContractTool,
    'add-contract-sow',
    isOwner,
  );

  return (
    <S.EmptyState>
      <Icon
        name="contract_m"
        size={64}
        color="--icon-card-placeholder-neutral-default"
      />
      <S.EmptyStateText>
        {t('noumena.noum_contract_manager.empty_state_message.contract')}
      </S.EmptyStateText>

      {canAddDocuments && (
        <S.EmptyStateButtons>
          <Button
            primary
            size="small"
            leftIcon={<Icon name="plus_m" size={24} />}
            onClick={handleNewContract}
          >
            {t('noumena.noum_contract_manager.new_contract')}
          </Button>
          <Button
            secondary
            size="small"
            leftIcon={<Icon name="plus_m" size={24} />}
            onClick={handleNewStatementOfWork}
          >
            {t('noumena.noum_contract_manager.new_statement_of_work')}
          </Button>
        </S.EmptyStateButtons>
      )}
    </S.EmptyState>
  );
}
