import { type DeepPartial } from 'react-hook-form';
import {
  type AddNewNoumContactInput,
  type UpdateNoumContactInput,
} from '@/apollo/generated/types';
import { UserUtil } from '@/utils/user';
import {
  type NoumContactFormValues,
  SelectedUserType,
} from '../hooks/contactForm';
import { type SearchableNoumContact } from '../types';

function toAddNewNoumContactInput(
  values: NoumContactFormValues,
): AddNewNoumContactInput {
  return {
    fullName: values.fullName,
    displayName: values.contactName,
    userId:
      values.userType === SelectedUserType.New ? undefined : values.userId,
    email: values.email,
    title: values.title,
    companyName: values.companyName,
    country: values.country,
    street: values.street,
    apartmentNo: values.apartmentNo,
    city: values.city,
    state: values.state,
    zipCode: values.zipCode,
  };
}

function toUpdateNoumContactInput(
  contactId: string,
  values: NoumContactFormValues,
): UpdateNoumContactInput {
  return {
    contactId,
    displayName: values.contactName,
    title: values.title,
    companyName: values.companyName,
    country: values.country,
    street: values.street,
    apartmentNo: values.apartmentNo,
    city: values.city,
    state: values.state,
    zipCode: values.zipCode,
  };
}

function fromSearchableNoumContact(
  contact: SearchableNoumContact,
): DeepPartial<NoumContactFormValues> {
  return {
    userId: contact.user._id,
    userType: SelectedUserType.Existing,
    fullName: UserUtil.renderFullName(contact.user),
    contactName: contact.displayName ?? contact.fullName ?? '',
    email: contact.user.email ?? '',
    title: contact.title ?? '',
    companyName: contact.companyName ?? '',
    country: contact.country ?? 'us',
    street: contact.street ?? '',
    apartmentNo: contact.apartmentNo ?? '',
    city: contact.city ?? '',
    state: contact.state ?? '',
    zipCode: contact.zipCode ?? '',
  };
}

function getDefaultValues(): DeepPartial<NoumContactFormValues> {
  return {
    userId: '',
    contactName: '',
    email: '',
    title: '',
    city: '',
    companyName: '',
    country: 'us',
    street: '',
    apartmentNo: '',
    state: '',
    zipCode: '',
  };
}

export const ContactFormMapper = {
  toAddNewNoumContactInput,
  toUpdateNoumContactInput,
  fromSearchableNoumContact,
  getDefaultValues,
};
