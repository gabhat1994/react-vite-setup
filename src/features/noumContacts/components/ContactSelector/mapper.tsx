import { type UserStatus } from '@/apollo/generated/types';
import { type NoumContactFragment } from '@/apollo/graphql';
import { Avatar } from '@/components/Avatar/Avatar';
import { type DropdownValueType } from '@/components/Dropdown';
import { UserUtil } from '@/utils/user';
import { type SearchableNoumContact, type SelectedContact } from '../../types';

export function mapToDropdownValue(
  contact: SearchableNoumContact,
): DropdownValueType<SearchableNoumContact, string> {
  return {
    key: contact._id,
    type: 'value',
    value: contact,
    label: contact.isCurrentUser
      ? `${contact.displayName} (You)`
      : contact.displayName,
    description: contact.user.email ?? undefined,
    icon: <Avatar url={UserUtil.getProfilePicture(contact.user)} size="M" />,
  };
}

function isNoumContact(
  contact: NoumContactFragment | SearchableNoumContact,
): contact is NoumContactFragment {
  return contact.__typename === 'NoumContactOutput';
}

export function mapToSelectedContact(
  contact: NoumContactFragment | SearchableNoumContact,
): SelectedContact;
export function mapToSelectedContact(
  contact: NoumContactFragment | SearchableNoumContact,
): SelectedContact {
  if (isNoumContact(contact)) {
    return {
      name: contact.displayName ?? '',
      email: contact.userId.email ?? undefined,
      country: contact.country ?? undefined,
      city: contact.city ?? undefined,
      state: contact.state ?? undefined,
      street: contact.street ?? undefined,
      apartmentNo: contact.apartmentNo ?? undefined,
      zipCode: contact.zipCode ?? undefined,
      title: contact.title ?? undefined,
      isConnectedWithNoum: contact.isConnectedWithNoum ?? false,
      userStatus: (contact.userId.userStatus as UserStatus) ?? undefined,
    };
  }

  return {
    name: contact.displayName ?? '',
    email: contact.user.email ?? undefined,
    country: contact.country ?? undefined,
    city: contact.city ?? undefined,
    state: contact.state ?? undefined,
    street: contact.street ?? undefined,
    apartmentNo: contact.apartmentNo ?? undefined,
    zipCode: contact.zipCode ?? undefined,
    title: contact.title ?? undefined,
    isConnectedWithNoum: contact.isConnectedWithNoum ?? false,
    userStatus: (contact.user.userStatus as UserStatus) ?? undefined,
  };
}
