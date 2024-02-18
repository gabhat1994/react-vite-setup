import { debounce } from 'lodash';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { DataGrid } from '@/components/DataGrid';
import routes from '@/constants/routes';
import {
  type Contract,
  DocumentType,
  type StatementOfWork,
} from '@/features/contracts/types';
import { Stack } from '@/layout';
import ListLayout from '@/layout/ListLayout';
import { getDefaultFilterValues } from './Filters/filterMapper';
import { ListHeader } from './ListHeader';
import { ContractsList } from './Lists/ContractsList';
import { StatementOfWorkList } from './Lists/StatementOfWorkList';
import S from './styles';
import { type Filters } from './types';
import { useContractManagerSearchParams } from './useContractManagerSearchParams';

export function ContractManager() {
  const navigate = useNavigate();

  const { searchParams, updateSearchParams } = useContractManagerSearchParams();

  const [filters, setFilters] = useState<Filters>(
    getDefaultFilterValues(searchParams),
  );
  const [offset, setOffset] = useState(0);

  const submitFilters = useMemo(
    () =>
      debounce((newFilters: Filters) => {
        setOffset(0);
        setFilters(newFilters);
        updateSearchParams(newFilters);
      }, 500),
    [updateSearchParams],
  );

  const navigateToCreateContract = () => {
    navigate(routes.CONTRACT_CREATE);
  };
  const navigateToCreateStatementOfWork = () => {
    navigate(routes.STATEMENT_OF_WORK_CREATE);
  };

  return (
    <ListLayout type="Contracts" onGoBack={() => navigate(-1)}>
      <Stack gap={24}>
        <S.PageCard>
          <DataGrid.Provider<Contract | StatementOfWork> data={[]}>
            <Stack vertical align="stretch">
              <DataGrid.Filters<Filters>
                defaultValues={filters}
                onSubmit={submitFilters}
                clearRowSelectionOnSubmit
              >
                <Stack gap={24} vertical align="stretch">
                  <ListHeader
                    onCreateContract={navigateToCreateContract}
                    onCreateStatementOfWork={navigateToCreateStatementOfWork}
                  />
                </Stack>
              </DataGrid.Filters>

              {filters.type === DocumentType.Contract ? (
                <ContractsList
                  offset={offset}
                  filters={filters}
                  listPerspective={filters.perspective}
                  onPaginationChange={(state) => setOffset(state.offset)}
                  enableBulkDownload={false}
                />
              ) : (
                <StatementOfWorkList
                  offset={offset}
                  filters={filters}
                  listPerspective={filters.perspective}
                  onPaginationChange={(state) => setOffset(state.offset)}
                  enableBulkDownload={false}
                />
              )}
            </Stack>
          </DataGrid.Provider>
        </S.PageCard>
      </Stack>
    </ListLayout>
  );
}
