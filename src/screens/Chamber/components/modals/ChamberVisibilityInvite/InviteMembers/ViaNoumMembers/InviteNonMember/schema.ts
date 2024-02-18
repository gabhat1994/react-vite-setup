import { yupResolver } from '@hookform/resolvers/yup';
import { type DefaultValues, useForm } from 'react-hook-form';
import * as yup from 'yup';

const inviteNonMemberSchema = yup.object({
  email: yup.string().email().required().label('Email'),
  firstName: yup.string().required().label('First Name'),
  lastName: yup.string().required().label('Last Name'),
  message: yup.string().max(100).label('Message'),
});

export type InviteNonMemberValues = yup.InferType<typeof inviteNonMemberSchema>;

interface UseInviteNonMemberFormOptions {
  defaultValues: DefaultValues<InviteNonMemberValues>;
}

export function useInviteNonMemberForm({
  defaultValues,
}: UseInviteNonMemberFormOptions) {
  return useForm<InviteNonMemberValues>({
    defaultValues,
    resolver: yupResolver(inviteNonMemberSchema),
    mode: 'all',
  });
}
