import { DataGrid } from '@/components/DataGrid';
import { DocumentStatusTag } from '@/features/contracts/components/DocumentStatusTag/DocumentStatusTag';
import { DocumentTypeTag } from '@/features/contracts/components/DocumentTypeTag/DocumentTypeTag';
import { type ContractBasic, DocumentType } from '@/features/contracts/types';
import { Stack } from '@/layout';
import { formatDateString } from '@/utils/getTimeStampForDisplaying';
import { ApiPayloadParser } from '@/utils/api/payloadParser';
import { ButtonLink } from '@/components/Link';
import { useTranslation } from 'react-i18next';
import * as S from './styles';

interface ContractsCollapsibleListProps {
  data: ContractBasic[];
  rowsPerPage: number;
  loading: boolean;
  navigateToContract(item: ContractBasic): void;
}

export function ContractsCollapsibleList({
  data,
  loading,
  rowsPerPage,
  navigateToContract,
}: ContractsCollapsibleListProps) {
  const { t } = useTranslation();

  return (
    <DataGrid.CollapsibleList
      data={data}
      loading={loading}
      keyExtractor={(item) => item._id}
      rowsPerPage={rowsPerPage}
      enableRowSelection={false}
      renderLeft={(item) => (
        <>
          <DocumentTypeTag
            type={DocumentType.Contract}
            style={{ marginRight: 8 }}
          />
          <ButtonLink
            font="footnote-bold"
            colorToken="--text-card-neutral-highlighted"
            onClick={() => navigateToContract(item)}
          >
            {item.title}
          </ButtonLink>
          <DocumentStatusTag
            status={item.status}
            size="small"
            contentFont="footnote-bold"
          />
        </>
      )}
      renderRight={() => <></>}
      renderContent={(item) => (
        <Stack gap={8} vertical fullWidth padding="16px 0">
          <S.ItemRow>
            <S.KeyText>{t('noumena.contracts.buyer')}</S.KeyText>
            <S.ValueText onClick={() => navigateToContract(item)}>
              {item.buyer?.displayName}
            </S.ValueText>
          </S.ItemRow>
          <S.ItemRow>
            <S.KeyText>{t('noumena.contracts.service_provider')}</S.KeyText>
            <S.ValueText onClick={() => navigateToContract(item)}>
              {item.seller?.displayName}
            </S.ValueText>
          </S.ItemRow>
          <S.ItemRow>
            <S.KeyText>{t('noumena.contracts.effective_date')}</S.KeyText>
            <S.ValueText onClick={() => navigateToContract(item)}>
              {item.effectiveDate
                ? formatDateString(
                    ApiPayloadParser.parseDateString(item.effectiveDate),
                  )
                : '--'}
            </S.ValueText>
          </S.ItemRow>
        </Stack>
      )}
    />
  );
}
