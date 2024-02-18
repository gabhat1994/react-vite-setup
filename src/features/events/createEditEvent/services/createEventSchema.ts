import { t } from 'i18next';
import * as yup from 'yup';

export const createEventSchema = yup
  .object({
    title: yup
      .string()
      .trim()
      .required(t('noumena.event_title_field_cant_be_empty'))
      .max(60, t('noumena.event.title_too_long'))
      .matches(
        /^(?=.*[a-zA-Z0-9!@#\\/~$%\\^\\&*\\)\\(+=,._-])/,
        t('noumena.event_title_field_cant_be_empty'),
      ),
    eventDate: yup.string().required(''),
    duration: yup.number().required('').min(1),
    timezone: yup.string().required(''),
    privacy: yup.string().required(''),
  })
  .required();
