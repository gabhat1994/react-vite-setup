import { ROUTING_NUMBER, VALID_NUMBER_REGEX } from '@/constants/regex';
import { t } from 'i18next';
import * as yup from 'yup';
import { AccountType } from './type';

export const addFundingSourceFormSchema = yup
  .object({
    accountName: yup
      .string()
      .trim()
      .required(t('noumena.input.complete_field')),
    accountType: yup.mixed<AccountType>().oneOf(Object.values(AccountType)),
    routingNumber: yup
      .string()
      .trim()
      .required(t('noumena.input.complete_field'))
      .matches(ROUTING_NUMBER, t('noumena.routing_number.incorrect')),
    accountNumber: yup
      .string()
      .trim()
      .required(t('noumena.input.complete_field'))
      .matches(VALID_NUMBER_REGEX, t('noumena.account_number.incorrect'))
      .min(4, t(`noumena.money_detail.account_number.validation`))
      .max(17, t(`noumena.money_detail.account_number.validation`))
      .test(
        'match',
        t(`noumena.money_detail.account_number.not_equal`),
        (accountNumber, { parent: { reAccountNumber } }) =>
          accountNumber && reAccountNumber
            ? accountNumber === reAccountNumber
            : true,
      ),
    reAccountNumber: yup
      .string()
      .trim()
      .required(t('noumena.input.complete_field'))
      .matches(VALID_NUMBER_REGEX, t('noumena.account_number.incorrect'))
      .min(4, t(`noumena.money_detail.account_number.validation`))
      .max(17, t(`noumena.money_detail.account_number.validation`))
      .oneOf(
        [yup.ref('accountNumber')],
        t(`noumena.money_detail.account_number.not_equal`),
      ),
  })
  .required();
