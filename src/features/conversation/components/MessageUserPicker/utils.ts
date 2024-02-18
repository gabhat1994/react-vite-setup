import { getFullName } from '@/utils/fullName';
import { type UserBasicOutputFragment } from '@/apollo/graphql/fragments';
import { type IUserDropdown } from './types';

export const buildDropDownData = (
  data: UserBasicOutputFragment[],
): IUserDropdown[] =>
  data.map((datum: UserBasicOutputFragment) => ({
    key: datum._id,
    label: getFullName(datum.firstName, datum.middleName, datum.lastName),
    type: 'value',
    description: datum.title || undefined,
    value: datum,
  }));
