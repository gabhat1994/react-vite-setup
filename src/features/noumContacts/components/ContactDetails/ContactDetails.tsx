import { useTranslation } from 'react-i18next';
import { getCountryByCode } from '@/utils/country';
import { type SearchableNoumContact } from '../../types';
import { ContactDetailsUtils } from '../../utils/contactDetails';
import S from './styles';
import { type ValidationErrors } from '../ContactSelector/types';
import { Section } from './Section';

interface ContactDetailsProps {
  contact: SearchableNoumContact;
  errors: ValidationErrors;
}
export function ContactDetails({ contact, errors }: ContactDetailsProps) {
  const { t } = useTranslation();
  const formattedTitle = ContactDetailsUtils.formatCompanyAndTitle(contact);

  return (
    <S.Container>
      <S.SectionsContainer>
        <Section
          title={t(
            'noumena.noum_contacts.contact_details.account_information.title',
          )}
          hasErrors={!!errors.accountInformation}
        >
          {contact.displayName ? (
            <S.TextHighlighted>
              {`${t(
                'noumena.noum_contacts.contact_form.fields.contact_name',
              )}: ${contact.displayName}`}
            </S.TextHighlighted>
          ) : null}
          {errors.title ? (
            <S.MissingInfo>{errors.title}</S.MissingInfo>
          ) : formattedTitle ? (
            <S.TextHighlighted>{formattedTitle}</S.TextHighlighted>
          ) : (
            <S.MissingInfo>
              {t('noumena.noum_contacts.contact_form.missing_title')}
            </S.MissingInfo>
          )}
        </Section>

        <Section
          title={t(
            'noumena.noum_contacts.contact_details.billing_details.title',
          )}
          hasErrors={!!errors.billingDetails}
        >
          {errors.billingDetails ? (
            <S.MissingInfo>{errors.billingDetails}</S.MissingInfo>
          ) : (
            <>
              <S.Text>
                {errors.streetApartment ? (
                  <S.MissingInfo>{errors.streetApartment}</S.MissingInfo>
                ) : (
                  <>
                    {contact.apartmentNo} {contact.street}
                  </>
                )}
              </S.Text>
              <S.Text>
                {errors.city ? (
                  <S.MissingInfo>{errors.city}</S.MissingInfo>
                ) : (
                  contact.city
                )}
              </S.Text>
              <S.Text>
                {errors.stateZipCode ? (
                  <S.MissingInfo>{errors.stateZipCode}</S.MissingInfo>
                ) : (
                  <>
                    {contact.state}, {contact.zipCode}
                  </>
                )}
              </S.Text>
              <S.Text>
                {errors.country ? (
                  <S.MissingInfo>{errors.country}</S.MissingInfo>
                ) : (
                  getCountryByCode(contact.country)?.name ?? '--'
                )}
              </S.Text>
            </>
          )}
        </Section>
      </S.SectionsContainer>

      {/* {!contact.isConnectedWithNoum && (
        <Infobox type="secondary">
          This member is not connected to selected Noum. After you publish this
          document, they will be invited to connect.
        </Infobox>
      )} */}
    </S.Container>
  );
}
