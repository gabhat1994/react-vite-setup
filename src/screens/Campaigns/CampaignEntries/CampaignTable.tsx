import { DataGrid } from '@/components/DataGrid';
import { type TableColumn } from '@/components/DataGrid/Table/Table';

interface CampaignTableProps<PropType> {
  campaigns: PropType[];
  columns: TableColumn<PropType>[];
  keyExtractor: (item: PropType) => string;
  loading: boolean;
  onRowClick: (campaign: PropType) => void;
}

export function CampaignTable<PropType extends Record<string, unknown>>({
  campaigns,
  columns,
  keyExtractor,
  loading,
  onRowClick,
}: CampaignTableProps<PropType>) {
  return (
    <DataGrid.Table
      keyExtractor={keyExtractor}
      columns={columns}
      data={campaigns}
      loading={loading}
      rowsPerPage={5}
      onRowClick={onRowClick}
    />
  );
}
