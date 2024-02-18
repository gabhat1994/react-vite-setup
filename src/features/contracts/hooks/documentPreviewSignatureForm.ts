import { yupResolver } from '@hookform/resolvers/yup';
import { type DefaultValues, useForm, useFormContext } from 'react-hook-form';
import * as yup from 'yup';

const documentPreviewSignatureFormSchema = yup.object({
  documentContentsChecked: yup.boolean().oneOf([true]),
  validSignature: yup.boolean().oneOf([true]),
});

export type DocumentPreviewSignatureFormValues = yup.InferType<
  typeof documentPreviewSignatureFormSchema
>;

interface UseDocumentPreviewSignatureFormOptions {
  defaultValues?: DefaultValues<DocumentPreviewSignatureFormValues>;
}

export function useDocumentPreviewSignatureForm({
  defaultValues,
}: UseDocumentPreviewSignatureFormOptions = {}) {
  return useForm<DocumentPreviewSignatureFormValues>({
    defaultValues,
    resolver: yupResolver(documentPreviewSignatureFormSchema),
    mode: 'onSubmit',
  });
}

export function useDocumentPreviewSignatureFormContext() {
  return useFormContext<DocumentPreviewSignatureFormValues>();
}
