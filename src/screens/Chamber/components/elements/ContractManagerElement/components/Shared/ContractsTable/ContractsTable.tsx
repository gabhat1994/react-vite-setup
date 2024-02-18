import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DataGrid } from '@/components/DataGrid';
import { type TableColumn } from '@/components/DataGrid/Table/Table';
import { TSpan } from '@/components/Typography';
import { DocumentStatusTag } from '@/features/contracts/components/DocumentStatusTag/DocumentStatusTag';
import { DocumentTypeTag } from '@/features/contracts/components/DocumentTypeTag/DocumentTypeTag';
import { type ContractBasic, DocumentType } from '@/features/contracts/types';
import { ContactDetailsUtils } from '@/features/noumContacts/utils/contactDetails';
import { ApiPayloadParser } from '@/utils/api/payloadParser';
import { formatDateString } from '@/utils/getTimeStampForDisplaying';

interface ContractsTableProps {
  data: ContractBasic[];
  rowsPerPage: number;
  loading: boolean;
  navigateToContract(item: ContractBasic): void;
}

export function ContractsTable({
  data,
  rowsPerPage,
  loading,
  navigateToContract,
}: ContractsTableProps) {
  const { t } = useTranslation();

  const columns = useMemo<TableColumn<ContractBasic>[]>(
    () => [
      {
        id: 'title',
        title: t('noumena.contracts.title'),
        renderValue: (item) => (
          <>
            <DocumentTypeTag
              type={DocumentType.Contract}
              style={{ marginRight: 8 }}
            />
            <TSpan font="footnote-bold" color="--text-card-neutral-highlighted">
              {item.title}
            </TSpan>
          </>
        ),
        wordWrap: false,
      },
      {
        id: 'status',
        title: t('noumena.contracts.status'),
        renderValue: (item) => (
          <DocumentStatusTag
            status={item.status}
            size="small"
            contentFont="footnote-bold"
          />
        ),
        width: '10%',
      },
      {
        id: 'buyer',
        title: t('noumena.contracts.buyer'),
        renderValue: (item) =>
          item.buyer
            ? ContactDetailsUtils.formatCompanyAndName(item.buyer)
            : '',
        width: '20%',
        wordWrap: false,
      },
      {
        id: 'serviceProvider',
        title: t('noumena.contracts.service_provider'),
        renderValue: (item) =>
          item.seller
            ? ContactDetailsUtils.formatCompanyAndName(item.seller)
            : '',
        width: '20%',
        wordWrap: false,
      },
      {
        id: 'effectiveDate',
        title: t('noumena.contracts.effective_date'),
        renderValue: (item) =>
          item.effectiveDate
            ? formatDateString(
                ApiPayloadParser.parseDateString(item.effectiveDate),
              )
            : '--',
        width: '15%',
      },
    ],
    [t],
  );

  return (
    <DataGrid.Table
      loading={loading && !data.length}
      data={data}
      rowsPerPage={rowsPerPage}
      noResultsMessageRowSpan={5}
      columns={columns}
      keyExtractor={(item) => item._id}
      onRowClick={navigateToContract}
    />
  );
}
