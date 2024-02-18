import { NoumLayoutViewMode } from '@/features/conversation/types';
import { type BodyViewModeProps } from '../../../types';
import { ContractsTable } from '../ContractsTable/ContractsTable';
import { StatementsOfWorkTable } from '../StatementsOfWorkTable/StatementsOfWorkTable';
import { ContractsCollapsibleList } from '../ContractsTable/ContractsCollapsibleList';
import { StatementsOfWorkCollapsibleList } from '../StatementsOfWorkTable/StatementsOfWorkCollapsibleList';

function BodyViewMode({
  isLoading,
  isContract,
  contracts,
  statementsOfWork,
  handleNavigateToContract,
  handleNavigateToStatementOfWork,
  rowsPerPage = 5,
  layoutMode,
}: BodyViewModeProps) {
  if (layoutMode === NoumLayoutViewMode.NOUMLAYOUTSMALL) {
    return isContract && contracts ? (
      <ContractsCollapsibleList
        data={contracts}
        loading={isLoading}
        rowsPerPage={rowsPerPage}
        navigateToContract={handleNavigateToContract}
      />
    ) : statementsOfWork ? (
      <StatementsOfWorkCollapsibleList
        data={statementsOfWork}
        loading={isLoading}
        rowsPerPage={rowsPerPage}
        navigateToStatementOfWork={handleNavigateToStatementOfWork}
      />
    ) : (
      <></>
    );
  }

  return isContract && contracts ? (
    <ContractsTable
      data={contracts}
      loading={isLoading}
      rowsPerPage={rowsPerPage}
      navigateToContract={handleNavigateToContract}
    />
  ) : statementsOfWork ? (
    <StatementsOfWorkTable
      data={statementsOfWork}
      loading={isLoading}
      rowsPerPage={rowsPerPage}
      navigateToStatementOfWork={handleNavigateToStatementOfWork}
    />
  ) : (
    <></>
  );
}
export default BodyViewMode;
