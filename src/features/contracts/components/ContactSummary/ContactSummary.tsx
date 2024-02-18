import { ContactDetailsUtils } from '@/features/noumContacts/utils/contactDetails';
import { getCountryByCode } from '@/utils/country';
import { UserUtil } from '@/utils/user';
import { type ContactSummaryFragment } from '../../types';
import { EntityDisplay } from '../EntityDisplay/EntityDisplay';
import S from './styles';

interface ContactSummaryProps {
  contact: ContactSummaryFragment;
}

export function ContactSummary({ contact }: ContactSummaryProps) {
  return (
    <S.Wrapper>
      <S.Contact>
        <EntityDisplay
          name={contact.displayName}
          avatarUrl={UserUtil.getProfilePicture(contact.userId)}
        />
      </S.Contact>

      <S.AccountLabel>Account Information</S.AccountLabel>
      <S.AccountValue>
        {contact.displayName}
        <br />
        {ContactDetailsUtils.formatCompanyAndTitle(contact)}
        <br />
        {contact.userId.email}
      </S.AccountValue>

      <S.BillingLabel>Billing Details</S.BillingLabel>
      <S.BillingValue>
        {contact.apartmentNo} {contact.street}
        <br />
        {contact.city}
        <br />
        {contact.state}, {contact.zipCode}
        <br />
        {getCountryByCode(contact.country)?.name ?? '--'}
      </S.BillingValue>
    </S.Wrapper>
  );
}
