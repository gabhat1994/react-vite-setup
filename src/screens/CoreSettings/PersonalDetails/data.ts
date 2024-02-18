import * as yup from 'yup';
import { t } from 'i18next';
import { type UserOutput } from '@/apollo/generated/types';
import { type DropdownValueType } from '@/components/Dropdown';
import {
  NAME_REGEX,
  USER_NAME_REGEX,
  TWO_LETTERED_NAME_REGEX,
} from '@/constants/regex';
import { MAX_BIO_LENGTH } from '@/screens/CoreSettings/PersonalDetails/consts';
import { type UserFragment } from '@/apollo/graphql/fragments';
import { type Maybe } from './types';

export const ageGroups: DropdownValueType<string>[] = [
  {
    key: '-',
    type: 'value',
    value: '-',
    label: '-',
  },
  {
    key: '18-20',
    type: 'value',
    value: '18-20',
    label: '18-20',
  },
  {
    key: '21-30',
    type: 'value',
    value: '21-30',
    label: '21-30',
  },
  {
    key: '31-40',
    type: 'value',
    value: '31-40',
    label: '31-40',
  },
  {
    key: '41-50',
    type: 'value',
    value: '41-50',
    label: '41-50',
  },
  {
    key: '51-60',
    type: 'value',
    value: '51-60',
    label: '51-60',
  },
  {
    key: '61+',
    type: 'value',
    value: '61+',
    label: '61+',
  },
];

export const freelancingExperience: DropdownValueType<string>[] = [
  {
    key: '-',
    type: 'value',
    value: '-',
    label: '-',
  },
  {
    key: '1-3',
    type: 'value',
    value: '1-3',
    label: '1-3',
  },
  {
    key: '4-5',
    type: 'value',
    value: '4-5',
    label: '4-5',
  },
  {
    key: '6-8',
    type: 'value',
    value: '6-8',
    label: '6-8',
  },
  {
    key: '9-11',
    type: 'value',
    value: '9-11',
    label: '9-11',
  },
  {
    key: '12-14',
    type: 'value',
    value: '12-14',
    label: '12-14',
  },
  {
    key: '15+',
    type: 'value',
    value: '15+',
    label: '15+',
  },
];

export const formValues = (user: Maybe<UserOutput | UserFragment>) => ({
  firstName: user?.firstName ?? '',
  lastName: user?.lastName ?? '',
  username: user?.username ?? '',
  title: user?.title ?? '',
  bio: user?.bio ?? '',
  ageGroup: {
    min: user?.ageGroup?.min,
    max: user?.ageGroup?.max,
  },
  freelancingExperience: {
    min: user?.freelancingExperience?.min,
    max: user?.freelancingExperience?.max,
  },
  profile: {
    // we need below commented line for the MyNetworks component. Maybe, we will use the MyNetworks component in the near future.
    // socialLinks: defaultSocialLinks(user?.profile?.socialLinks),
    profilePicture: user?.profile?.profilePicture ?? '',
  },
  location: user?.location ?? '',
});

export const userProfileInputSchema = yup
  .object({
    firstName: yup
      .string()
      .required(t('noumena.home_noum.about_me.error.name_required'))
      .min(2, t('noumena.signup.first_name.too_short'))
      .max(20, t('noumena.signup.first_name.too_long'))
      .test(
        'Two letter name validation',
        t('noumena.signup.two_digit_first_name.incorrect'),
        (value) => {
          if (value && value.length <= 2) {
            return TWO_LETTERED_NAME_REGEX.test(value);
          }
          return true;
        },
      )
      .matches(
        NAME_REGEX,
        t('noumena.home_noum.about_me.error.first_name_alpha_only'),
      ),
    lastName: yup
      .string()
      .required(t('noumena.home_noum.about_me.error.name_required'))
      .min(2, t('noumena.signup.last_name.too_short'))
      .max(20, t('noumena.signup.last_name.too_long'))
      .test(
        'Two letter name validation',
        t('noumena.signup.two_digit_last_name.incorrect'),
        (value) => {
          if (value && value.length <= 2) {
            return TWO_LETTERED_NAME_REGEX.test(value);
          }
          return true;
        },
      )
      .matches(
        NAME_REGEX,
        t('noumena.home_noum.about_me.error.last_name_alpha_only'),
      ),
    username: yup
      .string()
      .required(t('noumena.home_noum.about_me.error.name_required'))
      .matches(USER_NAME_REGEX, t('noumena.home_noum.about_me.error.username')),
    title: yup
      .string()
      .max(64, t('noumena.home_noum.about_me.error.title_maximum_length')),
    bio: yup
      .string()
      .max(
        MAX_BIO_LENGTH,
        `${t(`noumena.input.not_exceed-100-1`)} ${MAX_BIO_LENGTH} ${t(
          `noumena.input.not_exceed-100-2`,
        )}`,
      ),
    location: yup
      .string()
      .test(
        'Value not same as one of the suggested values',
        `${t('noumena.home_noum.about_me.error.location_suggested')}`,
        (value, locationContext) => {
          const suggestions = locationContext.options.context
            ?.locationSuggestions as DropdownValueType<string, string>[];

          return (
            value === '' || suggestions.some((option) => option.value === value)
          );
        },
      ),
  })
  .required();
