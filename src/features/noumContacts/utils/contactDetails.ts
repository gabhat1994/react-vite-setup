import { type NoumContactSummaryFragment } from '@/apollo/graphql';
import { getCountryByCode } from '@/utils/country';
import { type SearchableNoumContact } from '../types';

function formatCompanyAndTitle(
  contact: Pick<SearchableNoumContact, 'companyName' | 'title'>,
) {
  return contact.title
    ? [contact.title, contact.companyName].filter(Boolean).join(' @ ')
    : '';
}

function formatCompanyAndName(
  contact: Pick<NoumContactSummaryFragment, 'companyName' | 'displayName'>,
) {
  return [contact.companyName, contact.displayName].filter(Boolean).join(', ');
}

function formatAddress(
  contact: Pick<
    NoumContactSummaryFragment,
    'country' | 'city' | 'apartmentNo' | 'state' | 'street' | 'zipCode'
  >,
) {
  const streetAndNo = [contact.apartmentNo, contact.street]
    .filter(Boolean)
    .join(' ');
  return [
    streetAndNo,
    contact.city,
    contact.state,
    contact.zipCode,
    getCountryByCode(contact.country)?.name,
  ]
    .filter(Boolean)
    .join(', ');
}

export const ContactDetailsUtils = {
  formatCompanyAndTitle,
  formatCompanyAndName,
  formatAddress,
};
