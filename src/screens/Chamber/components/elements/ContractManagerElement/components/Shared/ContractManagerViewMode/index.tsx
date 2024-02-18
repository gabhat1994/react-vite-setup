import { PermissibleElementType } from '@/apollo/generated/types';
import { Button } from '@/components/Button';
import { DataGrid } from '@/components/DataGrid';
import { DocumentType } from '@/features/contracts/types';
import { NoumLayoutViewMode } from '@/features/conversation/types';
import { useNoumAuthorization } from '@/features/noums/contexts/NoumAuthorizationContext';
import { useElementLayoutMode } from '@/features/noums/hooks/noums';
import { Stack } from '@/layout';
import { t } from 'i18next';
import { useState } from 'react';
import { type ContractManagerViewProp } from '../../../types';
import { useContractsElement } from '../../../useContractsElement';
import ContractManagerHeader from '../ContractManagerHeader';
import { EmptyElement } from '../EmptyElement/EmptyElement';
import { ViewModeWrapper } from '../ViewModeWrapper/ViewModeWrapper';
import BodyViewMode from './Body';
import FiltersViewMode from './Filters';
import { ContractViewAllModal } from './Modal';

function ContractManagerViewMode({
  isOwner,
  spaceId,
  element,
  currentTitle,
  isEditing,
}: ContractManagerViewProp) {
  const layoutMode = useElementLayoutMode() ?? NoumLayoutViewMode.NOUMLAYOUTBIG;

  const { hasElementPermission } = useNoumAuthorization();

  const isOwnerPerspective = hasElementPermission(
    PermissibleElementType.ContractTool,
    'view-owned-contracts-sows',
    isOwner,
  );

  const {
    filters,
    setFilters,
    handleNavigateToContractManager,
    handleNavigateToStatementOfWork,
    handleNavigateToContract,
    handleNewStatementOfWork,
    handleNewContract,
    hasNoDocuments,
    statementsOfWork,
    contracts,
    isLoading,
    setIsCollapse,
  } = useContractsElement({
    isOwner: !!(isOwner || isEditing),
    spaceId,
  });

  const headerProps = {
    element,
    currentTitle,
    isOwner,
    handleNewContract,
    handleNewStatementOfWork,
    setIsCollapse,
    spaceId,
    isEditing,
  };

  const [isViewAll, setViewAll] = useState(false);

  const handleViewAll = () => {
    setViewAll((prev) => !prev);
  };

  if (hasNoDocuments) {
    return (
      <ViewModeWrapper>
        <ContractManagerHeader {...headerProps} />
        {isOwnerPerspective && (
          <DataGrid.Provider data={[]}>
            <FiltersViewMode
              isEmpty
              filters={filters}
              setFilters={setFilters}
            />
          </DataGrid.Provider>
        )}
        <EmptyElement
          isOwner={isOwner}
          handleNewContract={handleNewContract}
          handleNewStatementOfWork={handleNewStatementOfWork}
        />
      </ViewModeWrapper>
    );
  }

  return (
    <ViewModeWrapper isEditing={isEditing}>
      <ContractManagerHeader {...headerProps} />
      <DataGrid.Provider data={[]}>
        <Stack gap={16} align="center" vertical fullWidth>
          <FiltersViewMode filters={filters} setFilters={setFilters} />
          <BodyViewMode
            layoutMode={layoutMode}
            isLoading={isLoading}
            handleNavigateToStatementOfWork={handleNavigateToStatementOfWork}
            handleNavigateToContract={handleNavigateToContract}
            isContract={filters.type === DocumentType.Contract}
            contracts={contracts}
            statementsOfWork={statementsOfWork}
          />
          <Button
            size="full_small"
            disabled={isEditing}
            textOnly
            primary
            onClick={handleViewAll}
          >
            {t('noumena.contracts.see_all')}
          </Button>
        </Stack>
        <ContractViewAllModal
          isOpen={isViewAll}
          onClose={handleViewAll}
          isOwner={isOwner}
          spaceId={spaceId}
          filterType={filters.type}
          handleNewContract={handleNewContract}
          handleNavigateToContractManager={handleNavigateToContractManager}
        />
      </DataGrid.Provider>
    </ViewModeWrapper>
  );
}
export default ContractManagerViewMode;
