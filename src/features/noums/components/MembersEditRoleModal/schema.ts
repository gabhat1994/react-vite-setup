import { yupResolver } from '@hookform/resolvers/yup';
import { type DefaultValues, useForm } from 'react-hook-form';
import * as yup from 'yup';

const memberEditRoleFormSchema = yup.object({
  roleId: yup.string().required(),
});

export type MemberEditRoleFormValues = yup.InferType<
  typeof memberEditRoleFormSchema
>;

interface UseMemberEditRoleFormOptions {
  defaultValues: DefaultValues<MemberEditRoleFormValues>;
}

export function useMemberEditRoleForm({
  defaultValues,
}: UseMemberEditRoleFormOptions) {
  return useForm<MemberEditRoleFormValues>({
    defaultValues,
    resolver: yupResolver(memberEditRoleFormSchema),
  });
}
