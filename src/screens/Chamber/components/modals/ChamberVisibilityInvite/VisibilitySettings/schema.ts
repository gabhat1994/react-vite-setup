import { ProjectChamberType } from '@/apollo/generated/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { type DefaultValues, useForm } from 'react-hook-form';
import * as yup from 'yup';

const visibilitySettingsSchema = yup.object({
  visibility: yup
    .mixed<ProjectChamberType>()
    .oneOf(Object.values(ProjectChamberType)),
});

export type VisibilitySettingsValues = yup.InferType<
  typeof visibilitySettingsSchema
>;

interface UseVisibilitySettingsFormOptions {
  defaultValues: DefaultValues<VisibilitySettingsValues>;
}

export function useVisibilitySettingsForm({
  defaultValues,
}: UseVisibilitySettingsFormOptions) {
  return useForm<VisibilitySettingsValues>({
    defaultValues,
    resolver: yupResolver(visibilitySettingsSchema),
  });
}
