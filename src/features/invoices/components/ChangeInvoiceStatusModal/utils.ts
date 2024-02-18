import * as yup from 'yup';
import { InvoiceStatusEnumInput } from '@/apollo/generated/types';

export function createStatusSchema(outstandingAmount: number) {
  return yup.object({
    selectedStatus: yup
      .mixed<InvoiceStatusEnumInput>()
      .oneOf(Object.values(InvoiceStatusEnumInput))
      .required(),
    partialAmount: yup
      .number()
      .label('Partial amount')
      .when('selectedStatus', {
        is: InvoiceStatusEnumInput.PartiallyPaid,
        then: (schema) => schema.min(1).max(outstandingAmount).required(),
        otherwise: (schema) => schema.min(0).notRequired(),
      }),
  });
}

export type StatusSchemaValues = yup.InferType<
  ReturnType<typeof createStatusSchema>
>;
