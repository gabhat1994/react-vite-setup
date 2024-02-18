import {
  type CommissionAndReimbursement,
  type DeliverablesAndMilestones,
  FeesCategoryTypes,
  type FeesInfo,
} from '@/apollo/generated/types';
import { ApiPayloadParser } from '@/utils/api/payloadParser';
import { cleanList } from '@/utils/list';
import { type StatementOfWork } from '../../types';
import { type SummaryListItemProps } from '../SummaryList';

type FeeListItem = Omit<SummaryListItemProps, 'index'>;

function getFeesList(
  type: FeesCategoryTypes,
  feesData: FeesInfo[],
  milestones: DeliverablesAndMilestones[],
): FeeListItem[] {
  switch (type) {
    case FeesCategoryTypes.Inadvance: {
      const inAdvance = feesData[0];
      return [
        {
          title: 'In Advance',
          amount: inAdvance.amount ?? 0,
          dueDate: ApiPayloadParser.parseDateString(inAdvance.dueDate),
        },
      ];
    }
    case FeesCategoryTypes.Installments: {
      return feesData.map((installment, index) => ({
        title: `Installment #${index + 1}`,
        amount: installment.amount ?? 0,
        dueDate: ApiPayloadParser.parseDateString(installment.dueDate),
      }));
    }
    case FeesCategoryTypes.Milestones: {
      const cleanMilestones = cleanList(milestones);
      return feesData.map((milestone, index) => ({
        title: cleanMilestones[index].title ?? '',
        amount: milestone.amount ?? 0,
        dueDate: ApiPayloadParser.parseDateString(milestone.dueDate),
      }));
    }
    case FeesCategoryTypes.Lumpsum: {
      const lumpSum = feesData[0];
      return [
        {
          title: 'Lump Sum',
          amount: lumpSum.amount ?? 0,
          dueDate: ApiPayloadParser.parseDateString(lumpSum.dueDate),
        },
      ];
    }
    default: {
      return [];
    }
  }
}

function getExpenseReimbursement(
  expenseReimbursement: CommissionAndReimbursement[],
): FeeListItem[] {
  return expenseReimbursement.map((expense) => ({
    title: expense.description ?? '',
    description: 'Type: Expense Reimbursement',
    amount: expense.amount ?? 0,
  }));
}

function getBonusCommission(
  bonusCommission: CommissionAndReimbursement[],
): FeeListItem[] {
  return bonusCommission.map((commission) => ({
    title: commission.description ?? '',
    description: 'Type: Bonus / Commission',
    amount: commission.amount ?? 0,
  }));
}

export function getFeesAndOthers(
  statementOfWork: StatementOfWork,
): FeeListItem[] {
  const items: FeeListItem[] = [];

  const type = statementOfWork.fees?.type;
  const feesData = cleanList(statementOfWork.fees?.feesData);
  const expenseReimbursement = cleanList(statementOfWork.expenseReimbursement);
  const bonusCommission = cleanList(statementOfWork.commission);

  if (type && feesData.length > 0) {
    items.push(
      ...getFeesList(type, feesData, cleanList(statementOfWork.milestones)),
    );
  }

  if (expenseReimbursement.length > 0) {
    items.push(...getExpenseReimbursement(expenseReimbursement));
  }

  if (bonusCommission.length > 0) {
    items.push(...getBonusCommission(bonusCommission));
  }

  return items;
}
