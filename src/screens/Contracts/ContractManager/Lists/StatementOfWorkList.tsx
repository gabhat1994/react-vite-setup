import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router';
import {
  useDeleteSowMutation,
  useGetStatementsOfWorkQuery,
} from '@/apollo/graphql';
import { DataGrid } from '@/components/DataGrid';
import { type PaginationProps } from '@/components/DataGrid/Pagination';
import { type TableColumn } from '@/components/DataGrid/Table/Table';
import { Icon } from '@/components/Icon';
import routes from '@/constants/routes';
import { DeleteDocumentConfirmationModal } from '@/features/contracts/components/DeleteDocumentConfirmationModal/DeleteDocumentConfirmationModal';
import { DocumentStatusTag } from '@/features/contracts/components/DocumentStatusTag/DocumentStatusTag';
import { useStatementOfWorkPermissions } from '@/features/contracts/hooks/statementOfWorkPermissions';
import {
  DocumentType,
  type StatementOfWorkBasic,
} from '@/features/contracts/types';
import { StatementOfWorkUtils } from '@/features/contracts/utils/statementOfWork';
import { ContactDetailsUtils } from '@/features/noumContacts/utils/contactDetails';
import { useError, useToast } from '@/hooks';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { useNavigateWithOrigin } from '@/hooks/navigation';
import { Stack } from '@/layout';
import { ApiPayloadParser } from '@/utils/api/payloadParser';
import { formatDateString } from '@/utils/getTimeStampForDisplaying';
import { cleanList } from '@/utils/list';
import { useDownloadStatementOfWorkPdfLazy } from '@/features/contracts/hooks/statementOfWorkPdf';
import { mapToStatementOfWorkListFilters } from '../Filters/filterMapper';
import { type Filters, type ListPOV } from '../types';
import { StatementOfWorkTitleCell } from './StatementOfWorkTitleCell';

type ModalType = 'delete';

enum RowAction {
  View = 'VIEW',
  DownloadPdf = 'DOWNLOAD_PDF',
  Amend = 'AMEND',
  Edit = 'EDIT',
  Delete = 'DELETE',
}

interface StatementOfWorkListProps {
  offset: number;
  filters: Partial<Filters>;
  listPerspective: ListPOV;
  enableBulkDownload: boolean;
  onPaginationChange: PaginationProps['onChange'];
}

export function StatementOfWorkList({
  offset,
  filters,
  listPerspective,
  enableBulkDownload,
  onPaginationChange,
}: StatementOfWorkListProps) {
  const { navigateAndSetOrigin } = useNavigateWithOrigin();
  const { addPrimaryIconToast, addToast } = useToast();
  const { t } = useTranslation();
  const { logError } = useError();
  const { modalType, contextData, openModal, closeModal } = useModalManager<
    ModalType,
    StatementOfWorkBasic
  >();

  const StatementOfWorkPermissions = useStatementOfWorkPermissions();

  const { data, loading, refetch } = useGetStatementsOfWorkQuery({
    variables: {
      limit: 5,
      offset,
      filter: mapToStatementOfWorkListFilters(filters),
      viewingAs: listPerspective,
    },
    fetchPolicy: 'cache-and-network',
  });

  const documents = data?.getAllSOW.data;
  const totalCount = data?.getAllSOW.count ?? 0;

  const downloadStatementOfWorkPdf = useDownloadStatementOfWorkPdfLazy();

  const [deleteStatementOfWork] = useDeleteSowMutation();

  const deleteDocument = async () => {
    if (contextData) {
      try {
        await deleteStatementOfWork({
          variables: {
            id: contextData._id,
          },
        });
        refetch();
        addToast(
          'primary',
          'none',
          t('noumena.contract_manager.toast.draft_deleted'),
        );
      } catch (err) {
        logError(err, 'contract-manager-delete-sow', true);
      }
    }
    closeModal();
  };

  const handleRowActionClick = useCallback(
    (document: StatementOfWorkBasic, action: RowAction) => {
      switch (action) {
        case RowAction.View: {
          navigateAndSetOrigin(
            generatePath(routes.STATEMENT_OF_WORK_PREVIEW, {
              id: document._id,
            }),
          );
          break;
        }
        case RowAction.Edit: {
          navigateAndSetOrigin(
            generatePath(routes.STATEMENT_OF_WORK_EDIT, { id: document._id }),
          );
          break;
        }
        case RowAction.Delete:
          openModal('delete', document);
          break;
        case RowAction.DownloadPdf:
          downloadStatementOfWorkPdf(
            document._id,
            StatementOfWorkUtils.formatPdfFileName(document),
          );
          break;
        default: {
          // eslint-disable-next-line no-console
          console.log('Unsupported action', action, 'on document', document);
        }
      }
    },
    [downloadStatementOfWorkPdf, navigateAndSetOrigin, openModal],
  );

  const columns = useMemo<TableColumn<StatementOfWorkBasic>[]>(
    () => [
      {
        id: 'title',
        title: t('noumena.contracts.title'),
        renderValue: (item) => (
          <StatementOfWorkTitleCell statementOfWork={item} />
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
                item.linkedContract?.buyer,
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
                item.linkedContract?.seller,
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
                  item.linkedContract?.effectiveDate,
                ),
              )
            : '--',
        width: '10%',
      },
      {
        id: 'actions',
        title: '',
        renderValue: (item) => (
          <DataGrid.ActionsMenu<RowAction>
            onClick={(value) => handleRowActionClick(item, value)}
            menuOptions={cleanList([
              StatementOfWorkPermissions.canSeeSummary(item)
                ? {
                    key: 'view',
                    label: t('noumena.contract_manager.action.view'),
                    value: RowAction.View,
                    iconName: 'eye_on_m',
                  }
                : undefined,
              StatementOfWorkPermissions.canDownloadPdf(item)
                ? {
                    key: 'download_pdf',
                    label: t('noumena.contract_manager.action.download_pdf'),
                    value: RowAction.DownloadPdf,
                    iconName: 'download_m',
                  }
                : undefined,
              StatementOfWorkPermissions.canAmend(item)
                ? {
                    key: 'amend',
                    label: t('noumena.contract_manager.action.amend'),
                    value: RowAction.Amend,
                    iconName: 'repeat_xs',
                  }
                : undefined,
              StatementOfWorkPermissions.canEdit(item)
                ? {
                    key: 'edit',
                    label: t('noumena.contract_manager.action.edit'),
                    value: RowAction.Edit,
                    iconName: 'edit_m',
                  }
                : undefined,
              StatementOfWorkPermissions.canDelete(item)
                ? {
                    key: 'delete',
                    label: t('noumena.contract_manager.action.delete'),
                    value: RowAction.Delete,
                    iconName: 'delete_m',
                    intent: 'danger',
                  }
                : undefined,
            ])}
          />
        ),
        width: '10%',
      },
    ],
    [StatementOfWorkPermissions, handleRowActionClick, t],
  );

  return (
    <Stack gap={24} vertical align="stretch">
      <DataGrid.Table<StatementOfWorkBasic>
        keyExtractor={(item) => item._id}
        data={cleanList(documents)}
        columns={columns}
        rowsPerPage={5}
        loading={loading}
        enableRowSelection={enableBulkDownload}
        wordWrap
      />
      <DataGrid.Footer
        leftElement={
          <DataGrid.Pagination
            totalCount={totalCount}
            itemsPerPage={5}
            currentOffset={offset}
            onChange={onPaginationChange}
          />
        }
        rightElement={
          enableBulkDownload && (
            <DataGrid.BulkAction
              label={t('noumena.contracts.cta.download')}
              rightIcon={<Icon name="download_m" size={24} />}
              onClick={(selectedItems) =>
                addPrimaryIconToast(
                  `QA Note: Not implemented. Would download ${selectedItems.length} items.`,
                )
              }
            />
          )
        }
      />
      <DeleteDocumentConfirmationModal
        isOpen={modalType === 'delete'}
        isDraft={StatementOfWorkUtils.isDraft(contextData)}
        documentName={contextData?.title ?? ''}
        documentType={DocumentType.Sow}
        onCancel={closeModal}
        onDelete={deleteDocument}
      />
    </Stack>
  );
}
