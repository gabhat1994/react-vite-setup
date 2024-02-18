import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath } from 'react-router';
import {
  useDeleteContractMutation,
  useGetContractsQuery,
} from '@/apollo/graphql';
import { DataGrid } from '@/components/DataGrid';
import { type PaginationProps } from '@/components/DataGrid/Pagination';
import { type TableColumn } from '@/components/DataGrid/Table/Table';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import routes from '@/constants/routes';
import { DeleteDocumentConfirmationModal } from '@/features/contracts/components/DeleteDocumentConfirmationModal/DeleteDocumentConfirmationModal';
import { DocumentStatusTag } from '@/features/contracts/components/DocumentStatusTag/DocumentStatusTag';
import { DocumentTypeTag } from '@/features/contracts/components/DocumentTypeTag/DocumentTypeTag';
import { type ContractBasic, DocumentType } from '@/features/contracts/types';
import { ContactDetailsUtils } from '@/features/noumContacts/utils/contactDetails';
import { useError, useToast } from '@/hooks';
import { useModalManager } from '@/hooks/modal/useModalManager';
import { Stack } from '@/layout';
import { ApiPayloadParser } from '@/utils/api/payloadParser';
import { formatDateString } from '@/utils/getTimeStampForDisplaying';
import { cleanList } from '@/utils/list';
import { useContractPermissions } from '@/features/contracts/hooks/contractPermissions';
import { ContractUtils } from '@/features/contracts/utils/contract';
import { useNavigateWithOrigin } from '@/hooks/navigation';
import { useDownloadContractPdfLazy } from '@/features/contracts/hooks/contractPdf';
import { type Filters, type ListPOV } from '../types';
import { mapToContractListFilters } from '../Filters/filterMapper';

type ModalType = 'delete';

enum RowAction {
  View = 'VIEW',
  DownloadPdf = 'DOWNLOAD_PDF',
  Amend = 'AMEND',
  Edit = 'EDIT',
  Delete = 'DELETE',
}

interface ContractsListProps {
  offset: number;
  filters: Partial<Filters>;
  listPerspective: ListPOV;
  enableBulkDownload: boolean;
  onPaginationChange: PaginationProps['onChange'];
}

export function ContractsList({
  offset,
  filters,
  listPerspective,
  enableBulkDownload,
  onPaginationChange,
}: ContractsListProps) {
  const { addPrimaryIconToast, addToast } = useToast();
  const { t } = useTranslation();
  const { logError } = useError();

  const { navigateAndSetOrigin } = useNavigateWithOrigin();

  const ContractPermissions = useContractPermissions();

  const { data, loading, refetch } = useGetContractsQuery({
    variables: {
      limit: 5,
      offset,
      filter: mapToContractListFilters(filters),
      viewingAs: listPerspective,
    },
    fetchPolicy: 'cache-and-network',
  });

  const downloadContractPdf = useDownloadContractPdfLazy();

  const documents = data?.getContractList.data;
  const totalCount = data?.getContractList.count ?? 0;

  const [deleteContract] = useDeleteContractMutation();

  const { modalType, contextData, openModal, closeModal } = useModalManager<
    ModalType,
    ContractBasic
  >();
  const deleteDocument = async () => {
    if (contextData) {
      try {
        await deleteContract({
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
        logError(err, 'contract-manager-delete-contract', true);
      }
    }
    closeModal();
  };

  const handleRowActionClick = useCallback(
    (document: ContractBasic, action: RowAction) => {
      switch (action) {
        case RowAction.View: {
          navigateAndSetOrigin(
            generatePath(routes.CONTRACT_PREVIEW, { id: document._id }),
          );
          break;
        }
        case RowAction.Edit: {
          navigateAndSetOrigin(
            generatePath(routes.CONTRACT_EDIT, { id: document._id }),
          );
          break;
        }
        case RowAction.Delete:
          openModal('delete', document);
          break;
        case RowAction.DownloadPdf:
          downloadContractPdf(
            document._id,
            ContractUtils.formatPdfFileName(document),
          );
          break;
        default: {
          // eslint-disable-next-line no-console
          console.log('Unsupported action', action, 'on document', document);
        }
      }
    },
    [downloadContractPdf, navigateAndSetOrigin, openModal],
  );

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
        width: '10%',
      },
      {
        id: 'actions',
        title: '',
        renderValue: (item) => (
          <DataGrid.ActionsMenu<RowAction>
            onClick={(value) => handleRowActionClick(item, value)}
            menuOptions={cleanList([
              ContractPermissions.canSeeSummary(item)
                ? {
                    key: 'view',
                    label: t('noumena.contract_manager.action.view'),
                    value: RowAction.View,
                    iconName: 'eye_on_m',
                  }
                : undefined,
              ContractPermissions.canDownloadPdf(item)
                ? {
                    key: 'download_pdf',
                    label: t('noumena.contract_manager.action.download_pdf'),
                    value: RowAction.DownloadPdf,
                    iconName: 'download_m',
                  }
                : undefined,
              ContractPermissions.canAmend(item)
                ? {
                    key: 'amend',
                    label: t('noumena.contract_manager.action.amend'),
                    value: RowAction.Amend,
                    iconName: 'repeat_xs',
                  }
                : undefined,
              ContractPermissions.canEdit(item)
                ? {
                    key: 'edit',
                    label: t('noumena.contract_manager.action.edit'),
                    value: RowAction.Edit,
                    iconName: 'edit_m',
                  }
                : undefined,
              ContractPermissions.canDelete(item)
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
    [ContractPermissions, handleRowActionClick, t],
  );

  return (
    <Stack gap={24} vertical align="stretch">
      <DataGrid.Table<ContractBasic>
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
        isDraft={ContractUtils.isDraft(contextData)}
        documentName={contextData?.title ?? ''}
        documentType={DocumentType.Contract}
        onCancel={closeModal}
        onDelete={deleteDocument}
      />
    </Stack>
  );
}
