import { useEffect } from 'react';
import { type SearchableNoumContactFragment } from '@/apollo/graphql';
import { type ValidationErrors } from '../types';

interface ContactValidatorOptions {
  contact?: SearchableNoumContactFragment;
}

function contactValidator({ contact }: ContactValidatorOptions) {
  if (!contact) {
    return {
      isValid: true,
      errors: {},
    };
  }

  const errors: ValidationErrors = {};
  if (!contact.title) {
    errors.title = 'Title not provided';
  }
  if (!contact.street) {
    errors.streetApartment = 'Street not provided';
  }
  if (!contact.city) {
    errors.city = 'City not provided';
  }
  if (!contact.state || !contact.zipCode) {
    errors.stateZipCode = 'State or Zip Code not provided';
  }
  if (!contact.country) {
    errors.country = 'Country not provided';
  }

  if (
    errors.city &&
    errors.streetApartment &&
    errors.stateZipCode &&
    errors.country
  ) {
    errors.billingDetails = 'Not provided';
  }
  if (errors.title) {
    errors.accountInformation = 'Incomplete';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

interface UseContactSelectorValidationOptions {
  selectedContact: SearchableNoumContactFragment | undefined;
  onContactInfoValidation?: (isValid: boolean) => void;
}

export function useContactSelectorValidation({
  selectedContact,
  onContactInfoValidation,
}: UseContactSelectorValidationOptions) {
  const contactValidation = contactValidator({
    contact: selectedContact,
  });

  useEffect(() => {
    onContactInfoValidation?.(contactValidation.isValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactValidation.isValid]);

  return contactValidation;
}
