import { t } from 'i18next';
import * as yup from 'yup';

export const getCalendarInviteSchema = (
  requiredErrorMsg?: string,
  maxErrorMsg?: string,
) => {
  const maxMsg = maxErrorMsg ?? t('noumena.error.text.max_length');
  const requiredMsg = requiredErrorMsg ?? t('noumena.input.not_empty');

  return yup
    .object({
      eventName: yup.string().max(100, maxMsg).required(requiredMsg),
    })
    .required();
};
