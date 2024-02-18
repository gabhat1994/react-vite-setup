import { type GlobalSearchEntityUser } from '@/apollo/generated/types';
import { type SelectedUserType } from '@/features/noumContacts/hooks/contactForm';

export type UserSearchData = Partial<GlobalSearchEntityUser> & {
  fullName: string;
  userType: SelectedUserType;
};
