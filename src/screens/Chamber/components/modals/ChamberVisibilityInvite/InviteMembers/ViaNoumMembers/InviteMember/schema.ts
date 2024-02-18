import { yupResolver } from '@hookform/resolvers/yup';
import { type DefaultValues, useForm } from 'react-hook-form';
import * as yup from 'yup';

const inviteMembersSchema = yup.object({
  userIds: yup.array(yup.string().required()).required().ensure().min(1),
  roleId: yup.string().required(),
  message: yup.string().max(100),
});

export type InviteMembersValues = yup.InferType<typeof inviteMembersSchema>;

interface UseInviteMembersFormOptions {
  defaultValues: DefaultValues<InviteMembersValues>;
}

export function useInviteMembersForm({
  defaultValues,
}: UseInviteMembersFormOptions) {
  return useForm<InviteMembersValues>({
    defaultValues,
    resolver: yupResolver(inviteMembersSchema),
  });
}
