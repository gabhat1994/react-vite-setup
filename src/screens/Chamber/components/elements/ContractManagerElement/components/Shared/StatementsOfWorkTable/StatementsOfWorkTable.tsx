import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DataGrid } from '@/components/DataGrid';
import { type TableColumn } from '@/components/DataGrid/Table/Table';
import { TSpan } from '@/components/Typography';
import { DocumentStatusTag } from '@/features/contracts/components/DocumentStatusTag/DocumentStatusTag';
import { DocumentTypeTag } from '@/features/contracts/components/DocumentTypeTag/DocumentTypeTag';
import {
  DocumentType,
  type StatementOfWorkBasic,
} from '@/features/contracts/types';
import { ContactDetailsUtils } from '@/features/noumContacts/utils/contactDetails';
import { ApiPayloadParser } from '@/utils/api/payloadParser';
import { formatDateString } from '@/utils/getTimeStampForDisplaying';

interface StatementsOfWorkTableProps {
  data: StatementOfWorkBasic[];
  rowsPerPage: number;
  loading: boolean;
  navigateToStatementOfWork(item: StatementOfWorkBasic): void;
}

export function StatementsOfWorkTable({
  data,
  rowsPerPage,
  loading,
  navigateToStatementOfWork,
}: StatementsOfWorkTableProps) {
  const { t } = useTranslation();

  const columns = useMemo<TableColumn<StatementOfWorkBasic>[]>(
    () => [
      {
        id: 'title',
        title: t('noumena.contracts.title'),
        renderValue: (item) => (
          <>
            <DocumentTypeTag
              type={DocumentType.Sow}
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
          item.linkedContract?.buyer
            ? ContactDetailsUtils.formatCompanyAndName(
                item.linkedContract.buyer,
              )
            : '',
        width: '20%',
        wordWrap: false,
      },
      {
        id: 'serviceProvider',
        title: t('noumena.contracts.service_provider'),
        renderValue: (item) =>
          item.linkedContract?.seller
            ? ContactDetailsUtils.formatCompanyAndName(
                item.linkedContract.seller,
              )
            : '',
        width: '20%',
        wordWrap: false,
      },
      {
        id: 'effectiveDate',
        title: t('noumena.contracts.effective_date'),
        renderValue: (item) =>
          item.linkedContract?.effectiveDate
            ? formatDateString(
                ApiPayloadParser.parseDateString(
                  item.linkedContract.effectiveDate,
                ),
              )
            : '--',
        width: '15%',
      },
    ],
    [t],
  );

  return (
    <DataGrid.Table
      data={data}
      loading={loading && !data.length}
      rowsPerPage={rowsPerPage}
      noResultsMessageRowSpan={5}
      columns={columns}
      keyExtractor={(item) => item._id}
      onRowClick={navigateToStatementOfWork}
    />
  );
}
