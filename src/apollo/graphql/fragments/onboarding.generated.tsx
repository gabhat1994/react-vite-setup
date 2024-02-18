/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type OnboardingQuestionAndAnswersFragment = { __typename?: 'QuestionAndAnswers', _id?: string | null, question?: string | null, options?: Array<{ __typename?: 'AnswerOptions', answer?: string | null, description?: string | null } | null> | null };

export type OnboardingAnswerOptionsFragment = { __typename?: 'AnswerOptions', answer?: string | null, description?: string | null };

export const OnboardingAnswerOptionsFragmentDoc = gql`
    fragment OnboardingAnswerOptions on AnswerOptions {
  answer
  description
}
    `;
export const OnboardingQuestionAndAnswersFragmentDoc = gql`
    fragment OnboardingQuestionAndAnswers on QuestionAndAnswers {
  _id
  question
  options {
    ...OnboardingAnswerOptions
  }
}
    ${OnboardingAnswerOptionsFragmentDoc}`;