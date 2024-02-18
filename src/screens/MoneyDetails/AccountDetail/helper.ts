import { type GetPersonalInfoQuery } from '@/apollo/graphql';
import { dateAtTime } from '@/utils/date';
import countries from '@/assets/json/countries.json';
import { type InfoType } from './types';

export function respDataProcessor(data: GetPersonalInfoQuery | undefined) {
  return {
    firstName: data?.currentUser?.firstName || '',
    lastName: data?.currentUser?.lastName || '',
    dob: data?.userKyc?.dob ? new Date(data?.userKyc?.dob) : undefined,
    ssn: data?.userKyc?.ssn || '',
    citizenship: data?.currentUser?.citizenship || '',
    city: data?.userAddress?.city || '',
    state: data?.userAddress?.state || '',
    zipcode: data?.userAddress?.zipcode || '',
    street: data?.userAddress?.street || '',
    apartment: data?.userAddress?.apartment || '',
  };
}

export function updateAddressReq(values: InfoType) {
  return {
    apartment: values.apartment,
    state: values.state,
    zipcode: values.zipcode,
    street: values.street,
    city: values.city,
  };
}

export function updateUserKycReq(values: InfoType) {
  const date = dateAtTime(values.dob!.toDateString()).split(' ')[0].split('/');
  return {
    ssn: values.ssn,
    dob: `${date[2]}-${date[0]}-${date[1]}`,
  };
}

export function updateUserProfileReq(values: InfoType) {
  return {
    firstName: values.firstName,
    lastName: values.lastName,
    citizenship: countries.find(
      (_countery) =>
        _countery.name.toLocaleLowerCase() ===
        values.citizenship.toLocaleLowerCase(),
    )?.iso2,
  };
}

export function processAfterSave(values: InfoType) {
  const citizenship = countries.find(
    (_countery) =>
      _countery.name.toLocaleLowerCase() ===
      values.citizenship.toLocaleLowerCase(),
  )?.iso2;
  return {
    firstName: values.firstName || '',
    lastName: values.lastName || '',
    dob: values.dob,
    ssn: values.ssn || '',
    citizenship: citizenship || '',
    city: values.city || '',
    state: values.state || '',
    zipcode: values.zipcode || '',
    street: values.street || '',
    apartment: values.apartment || '',
  };
}
