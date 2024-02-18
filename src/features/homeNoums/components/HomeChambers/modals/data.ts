import { t } from 'i18next';
import * as yup from 'yup';
import { type InputListTypes } from '@/components/Tabs/types';

export const listOfTabs: InputListTypes[] = [
  {
    name: t('noumena.chambers.project_types'),
    image: 'terms_m',
    text: t('noumena.chambers.project_types'),
    labelSize: 'auto',
  },
  {
    name: t('noumena.chamber_view.references'),
    image: 'terms_m',
    text: t('noumena.chamber_view.references'),
    labelSize: 'auto',
  },
];


export const testFileImageUrl =
  'https://noumena-img.s3-accelerate.amazonaws.com/alex-gruber-ewHvqzqLQZU-unsplash.OhSVgh4J.jpg';

export const testFileVideoUrl =
  'https://noumena-img.s3-accelerate.amazonaws.com/alex-gruber-ewHvqzqLQZU-unsplash.OhSVgh4J.mp4';

export const addManualReferenceSchema = yup
  .object({
    providerName: yup
      .string()
      .min(3, t('noumena.chamber_edit.add_reference.input_length'))
      .required(t('noumena.input.not_empty')),
    capacity: yup
      .string()
      .min(3, t('noumena.input.not_empty'))
      .required(t('noumena.input.not_empty')),
    referenceText: yup
      .string()
      .test(
        'minLength',
        t('noumena.chamber_edit.add_reference.input_length_min_max'),
        (val) => (val?.length ? val.split(' ').length >= 3 : false),
      )
      .test(
        'maxLength',
        t('noumena.chamber_edit.add_reference.input_length_min_max'),
        (val) => (val?.length ? val.split(' ').length <= 2000 : false),
      )
      .required(t('noumena.input.not_empty')),
  })
  .required();

export const askForReferenceSchema = yup
  .object({
    providerName: yup
      .string()
      .min(3, t('noumena.chamber_edit.add_reference.input_length'))
      .required(t('noumena.input.not_empty')),
    capacity: yup
      .string()
      .min(3, t('noumena.input.not_empty'))
      .required(t('noumena.input.not_empty')),
    providerEmail: yup
      .string()
      .email(
        t('noumena.email_login_form.valid_email.error_message_without_example'),
      )
      .required(t('noumena.input.not_empty')),
  })
  .required();
