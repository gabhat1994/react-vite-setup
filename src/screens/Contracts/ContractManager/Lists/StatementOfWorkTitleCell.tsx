import { RouterLink } from '@/components/Link';
import { DocumentTypeTag } from '@/features/contracts/components/DocumentTypeTag/DocumentTypeTag';
import {
  DocumentType,
  type StatementOfWorkBasic,
} from '@/features/contracts/types';
import { ContractUtils } from '@/features/contracts/utils/contract';
import { ContractToolRoutes } from '@/features/contracts/utils/routes';
import { Stack } from '@/layout';
import S from './styles';

interface StatementOfWorkTitleCellProps {
  statementOfWork: StatementOfWorkBasic;
}

export function StatementOfWorkTitleCell({
  statementOfWork,
}: StatementOfWorkTitleCellProps) {
  return (
    <Stack gap={8} align="center" justify="stretch">
      <DocumentTypeTag type={DocumentType.Sow} />
      <S.StatementOfWorkItemTitleContainer>
        <S.StatementOfWorkItemTitle>
          {statementOfWork.title}
        </S.StatementOfWorkItemTitle>
        {statementOfWork.linkedContract?.title && (
          <RouterLink
            // TODO: Decide where to go based on status and isCompleted flag.
            to={ContractToolRoutes.viewContract({
              id: statementOfWork.linkedContract._id,
            })}
          >
            <S.StatementOfWorkItemContractContainer>
              <S.StatementOfWorkItemContractTitle>
                {statementOfWork.linkedContract?.title}
              </S.StatementOfWorkItemContractTitle>
              <S.StatementOfWorkItemContractNumber shrink={0}>
                (
                {ContractUtils.formatDocumentNumber(
                  statementOfWork.linkedContract.contractNumber,
                )}
                )
              </S.StatementOfWorkItemContractNumber>
            </S.StatementOfWorkItemContractContainer>
          </RouterLink>
        )}
      </S.StatementOfWorkItemTitleContainer>
    </Stack>
  );
}
