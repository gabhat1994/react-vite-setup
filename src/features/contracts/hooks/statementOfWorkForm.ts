import { yupResolver } from '@hookform/resolvers/yup';
import { type DefaultValues, useForm, useFormContext } from 'react-hook-form';
import * as yup from 'yup';
import { FeesCategoryTypes } from '@/apollo/generated/types';
import { type PickRequiredRestDeepPartial } from '@/utils/types';

export const statementOfWorkFormSchema = yup.object({
  title: yup.string().required().label('Title'),
  noumId: yup.string().required().ensure().label('Noum Assignment'),
  scopeOfWork: yup.string().required().max(3000).label('Scope of Work'),
  effectiveDate: yup.date().required().label('Effective Date'),
  contractId: yup.string().required().label('Contract Attachment'),
  deliverables: yup
    .array(
      yup.object({
        name: yup.string().required().label('Deliverable Name'),
        dueDate: yup.date().nullable().label('Due Date'),
        description: yup.string().optional().max(300).label('Description'),
      }),
    )
    .required()
    .min(1)
    .label('Deliverables'),
  milestones: yup
    .array(
      yup.object({
        name: yup.string().required().label('Milestone Name'),
        dueDate: yup.date().required().label('Due Date'),
        description: yup.string().optional().max(3000).label('Description'),
      }),
    )
    .label('Milestones')
    .when('fees.feeCategory', {
      is: FeesCategoryTypes.Milestones,
      then: (schema) => schema.required().min(1),
      otherwise: (schema) => schema.optional(),
    }),
  payments: yup.object({
    currency: yup.string().required().label('Currency'),
  }),
  fees: yup.object({
    feeCategory: yup
      .mixed<FeesCategoryTypes>()
      .oneOf(Object.values(FeesCategoryTypes))
      .required()
      .label('Fee Category'),
    inAdvance: yup
      .object({
        amount: yup
          .number()
          .required()
          .label('Amount')
          .typeError(({ label }) => `${label} must be a number.`),
        dueDate: yup.date().required().label('Due Date'),
      })
      .when('feeCategory', {
        is: FeesCategoryTypes.Inadvance,
        then: (schema) => {
          schema.fields.amount.withMutation((s) => s.required());
          schema.fields.dueDate.withMutation((s) => s.required());
          return schema.required();
        },
        otherwise: (schema) => {
          schema.fields.amount.withMutation((s) => s.notRequired());
          schema.fields.dueDate.withMutation((s) => s.notRequired());
          return schema.notRequired();
        },
      }),
    instalments: yup
      .array(
        yup.object({
          amount: yup
            .number()
            .required()
            .label('Amount')
            .typeError(({ label }) => `${label} must be a number.`),
          dueDate: yup.date().required().label('Due Date'),
        }),
      )
      .when('feeCategory', {
        is: FeesCategoryTypes.Installments,
        then: (schema) => schema.required().min(1),
        otherwise: (schema) => schema.optional().min(0),
      }),
    milestones: yup
      .array(
        yup.object({
          amount: yup
            .number()
            .required()
            .label('Amount')
            .typeError(({ label }) => `${label} must be a number.`),
          dueDate: yup.date().required().label('Due Date'),
        }),
      )
      .when('feeCategory', {
        is: FeesCategoryTypes.Milestones,
        then: (schema) => schema.required().min(1),
        otherwise: (schema) => schema.optional().min(0),
      }),
    lumpSum: yup
      .object({
        amount: yup
          .number()
          .label('Amount')
          .typeError(({ label }) => `${label} must be a number.`),
        dueDate: yup.date().required().label('Due Date'),
      })
      .when('feeCategory', {
        is: FeesCategoryTypes.Lumpsum,
        then: (schema) => {
          schema.fields.amount.withMutation((s) => s.required());
          schema.fields.dueDate.withMutation((s) => s.required());
          return schema.required();
        },
        otherwise: (schema) => {
          schema.fields.amount.withMutation((s) => s.notRequired());
          schema.fields.dueDate.withMutation((s) => s.notRequired());
          return schema.notRequired();
        },
      }),
  }),
  expenseReimbursement: yup.array(
    yup.object({
      name: yup.string().required().label('Description'),
      amount: yup
        .number()
        .required()
        .label('Amount')
        .typeError(({ label }) => `${label} must be a number.`),
    }),
  ),
  bonusCommission: yup.array(
    yup.object({
      name: yup.string().required().label('Description'),
      amount: yup
        .number()
        .required()
        .label('Amount')
        .typeError(({ label }) => `${label} must be a number.`),
    }),
  ),
  logo: yup.string().url(),
});

export type StatementOfWorkFormValues = yup.InferType<
  typeof statementOfWorkFormSchema
>;
export type DraftStatementOfWorkFormValues = PickRequiredRestDeepPartial<
  StatementOfWorkFormValues,
  'noumId'
>;

interface UseStatementOfWorkFormOptions {
  defaultValues?: DefaultValues<StatementOfWorkFormValues>;
}

export function useStatementOfWorkForm({
  defaultValues,
}: UseStatementOfWorkFormOptions = {}) {
  return useForm<StatementOfWorkFormValues>({
    defaultValues,
    resolver: yupResolver(statementOfWorkFormSchema),
    mode: 'onSubmit',
  });
}

export function useStatementOfWorkFormContext() {
  return useFormContext<StatementOfWorkFormValues>();
}
