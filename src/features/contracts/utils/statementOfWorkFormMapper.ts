import { type DeepPartial } from 'react-hook-form';
import {
  type CreateNewSowInput,
  CurrencyEnum,
  FeesCategoryTypes,
  type FeesInfoInput,
  type UpdateSowInput,
} from '@/apollo/generated/types';
import { ApiPayloadParser } from '@/utils/api/payloadParser';
import { type PickRequiredRestDeepPartial } from '@/utils/types';
import { convertDateToUtcNoon } from '@/utils/date';
import {
  type DraftStatementOfWorkFormValues,
  type StatementOfWorkFormValues,
} from '../hooks/statementOfWorkForm';
import { type StatementOfWork } from '../types';

function toFeesData(
  values: Pick<StatementOfWorkFormValues, 'fees' | 'milestones'>,
): FeesInfoInput[] | undefined {
  switch (values.fees.feeCategory) {
    case FeesCategoryTypes.Inadvance:
      return [
        {
          amount: values.fees.inAdvance.amount,
          dueDate: convertDateToUtcNoon(
            values.fees.inAdvance.dueDate,
          ).toISOString(),
        },
      ];
    case FeesCategoryTypes.Installments:
      return values.fees.instalments?.map((instalment) => ({
        amount: instalment.amount,
        dueDate: convertDateToUtcNoon(instalment.dueDate).toISOString(),
      }));
    case FeesCategoryTypes.Milestones:
      return values.fees.milestones?.map((milestone, index) => ({
        description: values.milestones?.[index].name,
        amount: milestone.amount,
        dueDate: convertDateToUtcNoon(milestone.dueDate).toISOString(),
      }));
    case FeesCategoryTypes.Lumpsum:
      return [
        {
          amount: values.fees.lumpSum.amount,
          dueDate: convertDateToUtcNoon(
            values.fees.lumpSum.dueDate,
          ).toISOString(),
        },
      ];
    default:
      return undefined;
  }
}

function toCreateNewSowInput(
  values: DraftStatementOfWorkFormValues,
): CreateNewSowInput {
  return {
    title: values.title,
    linkedNoum: values.noumId,
  };
}

function toUpdateSowInput(
  values: PickRequiredRestDeepPartial<
    StatementOfWorkFormValues,
    | 'noumId'
    | 'deliverables'
    | 'milestones'
    | 'expenseReimbursement'
    | 'bonusCommission'
    | 'fees'
  >,
): UpdateSowInput {
  return {
    title: values.title,
    linkedNoum: values.noumId,
    scopeOfWork: values.scopeOfWork,
    effectiveDate: values.effectiveDate
      ? convertDateToUtcNoon(values.effectiveDate).toISOString()
      : null,
    linkedContract: values.contractId || null,
    deliverables: values.deliverables?.map((deliverable) => ({
      title: deliverable.name,
      description: deliverable.description,
      dueDate: deliverable.dueDate
        ? convertDateToUtcNoon(deliverable.dueDate).toISOString()
        : null,
    })),
    milestones: values.milestones?.map((milestone) => ({
      title: milestone.name,
      description: milestone.description,
      dueDate: convertDateToUtcNoon(milestone.dueDate).toISOString(),
    })),
    commission: values.bonusCommission?.map((commission) => ({
      description: commission.name,
      amount: commission.amount,
    })),
    expenseReimbursement: values.expenseReimbursement?.map((expense) => ({
      description: expense.name,
      amount: expense.amount,
    })),
    fees: {
      type: values.fees.feeCategory,
      feesData: toFeesData(values) ?? null,
    },
  };
}

function fromStatementOfWork(
  statementOfWork: StatementOfWork,
): DraftStatementOfWorkFormValues {
  if (!statementOfWork.linkedNoum._id) {
    throw new Error('Invalid linkedNoum for provided statement of work.');
  }

  return {
    ...getDefaultValues({ noumId: statementOfWork.linkedNoum._id }),
    noumId: statementOfWork.linkedNoum._id,
    title: statementOfWork.title ?? '',
    contractId: statementOfWork.linkedContract?._id ?? undefined,
    scopeOfWork: statementOfWork.scopeOfWork ?? undefined,
    effectiveDate: ApiPayloadParser.parseDateString(
      statementOfWork.effectiveDate,
    ),
    deliverables:
      statementOfWork.deliverables?.map((deliverable) => ({
        name: deliverable?.title ?? '',
        description: deliverable?.description ?? '',
        dueDate: ApiPayloadParser.parseDateString(deliverable?.dueDate),
      })) ?? undefined,
    milestones:
      statementOfWork.milestones?.map((milestone) => ({
        name: milestone?.title ?? '',
        description: milestone?.description ?? '',
        dueDate: ApiPayloadParser.parseDateString(milestone?.dueDate),
      })) ?? undefined,
    bonusCommission: statementOfWork.commission?.map((commission) => ({
      name: commission?.description ?? undefined,
      amount: commission?.amount ?? undefined,
    })),
    expenseReimbursement: statementOfWork.expenseReimbursement?.map(
      (expense) => ({
        name: expense?.description ?? undefined,
        amount: expense?.amount ?? undefined,
      }),
    ),
    fees: {
      feeCategory: statementOfWork.fees?.type ?? undefined,
      inAdvance:
        statementOfWork.fees?.type === FeesCategoryTypes.Inadvance
          ? {
              amount: statementOfWork.fees.feesData?.[0]?.amount ?? undefined,
              dueDate: ApiPayloadParser.parseDateString(
                statementOfWork.fees.feesData?.[0]?.dueDate,
              ),
            }
          : undefined,
      milestones:
        statementOfWork.fees?.type === FeesCategoryTypes.Milestones
          ? statementOfWork.fees?.feesData?.map((feeInfo) => ({
              amount: feeInfo?.amount ?? undefined,
              dueDate: ApiPayloadParser.parseDateString(feeInfo?.dueDate),
            }))
          : undefined,
      instalments:
        statementOfWork.fees?.type === FeesCategoryTypes.Installments
          ? statementOfWork.fees?.feesData?.map((feeInfo) => ({
              amount: feeInfo?.amount ?? undefined,
              dueDate: ApiPayloadParser.parseDateString(feeInfo?.dueDate),
            }))
          : undefined,
      lumpSum:
        statementOfWork.fees?.type === FeesCategoryTypes.Lumpsum
          ? {
              amount: statementOfWork.fees.feesData?.[0]?.amount ?? 0,
              dueDate: ApiPayloadParser.parseDateString(
                statementOfWork.fees.feesData?.[0]?.dueDate,
              ),
            }
          : undefined,
    },
    logo: statementOfWork.logo ?? undefined,
  };
}

interface GetDefaultValuesOptions {
  noumId?: string;
}
function getDefaultValues({
  noumId,
}: GetDefaultValuesOptions): DeepPartial<StatementOfWorkFormValues> {
  return {
    title: 'Statement of Work',
    noumId: noumId ?? '',
    scopeOfWork: '',
    payments: {
      currency: CurrencyEnum.Usd,
    },
  };
}

export const StatementOfWorkFormMapper = {
  toCreateNewSowInput,
  toUpdateSowInput,
  fromStatementOfWork,
  getDefaultValues,
};
