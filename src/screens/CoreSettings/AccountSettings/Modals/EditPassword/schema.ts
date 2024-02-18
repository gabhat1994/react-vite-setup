import { t } from 'i18next';
import * as yup from 'yup';

import { passwordSchema } from '@/features/social-authentication';

export const editPasswordSchema = yup
  .object({
    oldPassword: yup.string().required(t('noumena.input.complete_field')),
    newPassword: passwordSchema.fields.password.notOneOf(
      [yup.ref('oldPassword'), null],
      t('noumena.same.password.error.text'),
    ),
  })
  .required();
