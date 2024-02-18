import * as yup from 'yup';
import { type ObjectShape } from 'yup/lib/object';
import { t } from 'i18next';

export const initialAnswers = {
  age_range: undefined,
  year_of_self_employed: undefined,
  business_stage: undefined,
  business_country: 'us',
  business_industry: undefined,
  revenue: undefined,
  business_entity: undefined,
};

export const questionsFormSchema = () => {
  const schemaObj: ObjectShape = {
    year_of_self_employed: yup
      .string()
      .required(
        t(
          'noumena.register.onboarding_questions.error.message.answer_required',
        ),
      ),
    business_country: yup
      .string()
      .required(
        t(
          'noumena.register.onboarding_questions.error.message.answer_required',
        ),
      ),
    business_industry: yup
      .string()
      .required(
        t(
          'noumena.register.onboarding_questions.error.message.answer_required',
        ),
      ),
    revenue: yup
      .string()
      .required(
        t(
          'noumena.register.onboarding_questions.error.message.answer_required',
        ),
      ),
    business_entity: yup
      .string()
      .required(
        t(
          'noumena.register.onboarding_questions.error.message.answer_required',
        ),
      ),
    age_range: yup
      .string()
      .required(
        t(
          `noumena.register.onboarding_questions.error.message.answer_required`,
        ),
      ),
    business_stage: yup
      .string()
      .required(
        t(
          `noumena.register.onboarding_questions.error.message.answer_required`,
        ),
      ),
  };
  return yup.object().shape(schemaObj).required();
};

export const questionsMock = {
  data: [
    {
      _id: '632be1607003c70096be762d',
      question: 'How long have you been self-employed?',
      options: [
        'Interested in making the jump',
        'Full-time job but working on a side hustle',
        '1-2 years',
        '3-5 years',
        '6-9 years',
        '10+ years',
      ],
      __typename: 'QuestionAndAnswers',
    },
    {
      _id: '632be1607003c70096be762e',
      question: 'What country do you run your business in?',
      options: [],
      __typename: 'QuestionAndAnswers',
    },
    {
      _id: '632be1607003c70096be762f',
      question: 'What kind of business & services do you provide?',
      options: [],
      __typename: 'QuestionAndAnswers',
    },
    {
      _id: '632be1607003c70096be7630',
      question: 'What is your expected revenue from your business this year?',
      options: [
        'Less than $30,000',
        '$30,000 - $60,000',
        '$60,000 - $100,000',
        '$100,000 - $200,000',
        '$200,000 - $300,000',
        '$300,000+',
      ],
      __typename: 'QuestionAndAnswers',
    },
    {
      _id: '632be1607003c70096be7631',
      question:
        'What entity do you use for your primary self-employed business?',
      options: [
        'Sole Proprietor',
        'Single LLC',
        'PLLC',
        'S-Corp',
        'A non-US business entity',
        'No business entity',
        'Other',
      ],
      __typename: 'QuestionAndAnswers',
    },
  ],
  count: 5,
  __typename: 'QuestionAndAnswersOutput',
};
