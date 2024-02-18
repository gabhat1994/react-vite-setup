import { yupResolver } from '@hookform/resolvers/yup';
import { type DefaultValues, useForm, useFormContext } from 'react-hook-form';
import * as yup from 'yup';

const statementOfWorkPreviewFormSchema = yup.object({
  isAuthorized: yup.boolean().oneOf([true]),
  termsAndConditions: yup.boolean().oneOf([true]),
  eSign: yup.boolean().oneOf([true]),
});

type StatementOfWorkPreviewFormValues = yup.InferType<
  typeof statementOfWorkPreviewFormSchema
>;

interface UseStatementOfWorkPreviewFormOptions {
  defaultValues?: DefaultValues<StatementOfWorkPreviewFormValues>;
}

export function useStatementOfWorkPreviewForm({
  defaultValues,
}: UseStatementOfWorkPreviewFormOptions = {}) {
  return useForm<StatementOfWorkPreviewFormValues>({
    defaultValues,
    resolver: yupResolver(statementOfWorkPreviewFormSchema),
    mode: 'onChange',
  });
}

export function useStatementOfWorkPreviewFormContext() {
  return useFormContext<StatementOfWorkPreviewFormValues>();
}
