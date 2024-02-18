export type TquestionKey =
  | 'age_range'
  | 'year_of_self_employed'
  | 'business_stage'
  | 'business_country'
  | 'business_industry'
  | 'revenue'
  | 'business_entity';

export const EnumQuestionKey = {
  age_range: '636340a1d1b4cfc58759939c',
  year_of_self_employed: '632be1607003c70096be762d',
  business_stage: '6359035b844d4764725c2912',
  business_country: '632be1607003c70096be762e',
  business_industry: '632be1607003c70096be762f',
  revenue: '632be1607003c70096be7630',
  business_entity: '632be1607003c70096be7631',
};

export type TOnboardingQuestionForm = {
  age_range: string;
  year_of_self_employed: string;
  business_stage: string;
  business_country: string;
  business_industry: string;
  revenue: string;
  business_entity: string;
};
