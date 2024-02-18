import * as yup from 'yup';
import { t } from 'i18next';
import { generateAnalysis } from '../helpers';

export const passwordSchema = yup
  .object({
    password: yup
      .string()
      .trim()
      .required(t('noumena.input.complete_field'))
      // Generic error massage for 'password-strength' . No requirement to show on UI
      .test('password-strength', 'Invalid password', (value = '') => {
        const { result } = generateAnalysis(value);
        return result;
      }),
  })
  .required();
