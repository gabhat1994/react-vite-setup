import { DataGrid } from '@/components/DataGrid';
import { ListPOV } from '@/screens/Contracts/ContractManager/types';
import { type FiltersProps, type Filters } from '../../../types';
import { InputFilters } from '../InputFilters';

const FiltersViewMode = ({
  filterType,
  filters,
  setFilters,
  isEmpty,
}: FiltersProps) => (
  <DataGrid.Filters<Filters> defaultValues={filters} onSubmit={setFilters}>
    <InputFilters
      filterType={filterType}
      isOwner={filters.listPerspective === ListPOV.Owner}
      isEmpty={isEmpty}
    />
  </DataGrid.Filters>
);

export default FiltersViewMode;
