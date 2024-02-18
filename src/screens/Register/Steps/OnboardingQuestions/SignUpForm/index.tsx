import { useCallback, useEffect, useMemo, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import generate from 'uniqid';
import { useNavigate } from 'react-router';
import { TSpan } from '@/components/Typography';
import { Spacer, Stack } from '@/layout';
import { Button } from '@/components/Button';
import { type DropdownValueType } from '@/components/Dropdown';
import { type Country } from '@/components/PhoneInput/types';
import countries from '@/assets/json/countries.json';
import { Flag } from '@/components/Flag';
import {
  type SubmitOnboardingQuestionnaire,
  UserStatus,
} from '@/apollo/generated/types';
import ROUTES from '@/constants/routes';
import { useAuth } from '@/features/auth/contexts';
import EVENTS from '@/constants/trackingEvents';
import { trackEvent } from '@/utils/tracking';
import { useSkills } from '@/features/skills/components/SkillSelection';
import { useOnboardingQuestions } from '@/features/onboarding/hooks/questions';
import { useBreakpoints, useLaunchDarkly } from '@/hooks';
import {
  EnumQuestionKey,
  type TOnboardingQuestionForm,
  type TquestionKey,
} from '../types';
import { initialAnswers, questionsFormSchema } from '../data';
import {
  FootnoteStack,
  Form,
  FormStyled,
  FormStyledV2,
  QuestionWrapper,
} from './styles';
import QuestionAnswers from './QuestionAnswers';

const QuestionEvents = [
  EVENTS.ONBOARDING.QUESTIONNAIRE.QUESTION_1,
  EVENTS.ONBOARDING.QUESTIONNAIRE.QUESTION_2,
  EVENTS.ONBOARDING.QUESTIONNAIRE.QUESTION_3,
  EVENTS.ONBOARDING.QUESTIONNAIRE.QUESTION_4,
  EVENTS.ONBOARDING.QUESTIONNAIRE.QUESTION_5,
  EVENTS.ONBOARDING.QUESTIONNAIRE.QUESTION_6,
  EVENTS.ONBOARDING.QUESTIONNAIRE.QUESTION_7,
];
const SignUpForm = () => {
  const { refetchUserData, user, updateUserStatus } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { questions, handleSubmitOnboardingAnswer, loading, submitting } =
    useOnboardingQuestions();
  const { allSkills: industries } = useSkills();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [questionAndAnswers, setQuestionAndAnswers] = useState<{
    [key: string]: DropdownValueType<string | Country>[];
  }>({
    age_range: [],
    year_of_self_employed: [],
    business_stage: [],
    business_country: [],
    business_industry: [],
    revenue: [],
    business_entity: [],
  });

  const {
    flags: { newSignUp },
  } = useLaunchDarkly();
  const { isMobile } = useBreakpoints();
  const dropdownCountries: DropdownValueType<Country>[] = useMemo(
    () =>
      countries.map((country) => ({
        key: generate(),
        label: (
          <Stack>
            <TSpan
              font="input-s"
              colorToken="--text-tablecell-header-neutral-highlighted"
              data-testid="country-options"
            >
              <div style={{ padding: '0 4px' }}>{country.name}</div>
            </TSpan>
          </Stack>
        ),
        type: 'value',
        value: country,
        icon: (
          <Flag flag={`flag_${country.iso2}` as keyof typeof Flag} size={24} />
        ),
      })),
    [],
  );

  const dropDownIndustries: DropdownValueType<string>[] = useMemo(
    () =>
      industries
        .sort((a, b) => a?.name?.localeCompare(b?.name || '') ?? 0)
        .map((x) => ({
          key: generate(),
          type: 'value',
          value: x?.name ?? '',
          label: x?.name ?? '',
        })),
    [industries],
  );

  const userEventData = useMemo(() => ({ UUID: user?._id }), [user]);

  useEffect(() => {
    const questionAndAnswersT: {
      [key: string]: DropdownValueType<string | Country>[];
    } = {};
    if (questions.length > 0) {
      questions?.forEach((question) => {
        const enumKey = Object.keys(EnumQuestionKey).find(
          (key) =>
            EnumQuestionKey[key as keyof typeof EnumQuestionKey] ===
            question?._id,
        );
        if (enumKey) {
          const answerOptionsT: DropdownValueType<string | Country>[] = [];
          question?.options?.forEach((option) => {
            if (option?.answer) {
              answerOptionsT.push({
                key: generate(),
                type: 'value',
                value: option.answer,
                label: option.answer,
                description: option.description || '',
              });
            }
          });
          questionAndAnswersT[enumKey] = answerOptionsT;
        }
      });
      setQuestionAndAnswers(questionAndAnswersT);
    }
  }, [questions]);

  const {
    setValue,
    trigger,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TOnboardingQuestionForm>({
    resolver: yupResolver(questionsFormSchema()),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: initialAnswers,
  });

  const onSubmit: SubmitHandler<TOnboardingQuestionForm> = useCallback(
    async (data) => {
      setIsSubmitting(true);
      let eventData: object = {
        UUID: user?._id,
      };
      const answers: SubmitOnboardingQuestionnaire[] = [];
      let skillId;
      Object.keys(data).forEach((key) => {
        const questionId = EnumQuestionKey[key as keyof typeof EnumQuestionKey];
        const answerText: string = data[key as keyof TOnboardingQuestionForm];
        eventData = { ...eventData, [questionId]: answerText };
        const answerItem: SubmitOnboardingQuestionnaire = {
          questionId,
          answer: answerText,
        };
        if (key === 'business_country') {
          answerItem.countryCode = answerText;
          const selectedCountry = countries.find(
            (country) => country.iso2 === answerText,
          );
          answerItem.answer = selectedCountry?.name || answerItem.answer;
        }
        if (key === 'business_industry') {
          skillId = industries.find(
            (skill) => skill?.name === answerItem.answer,
          )?._id;
        }
        answers.push(answerItem);
      });

      trackEvent(EVENTS.ONBOARDING.QUESTIONNAIRE.SUBMIT, eventData);

      const res = await handleSubmitOnboardingAnswer(answers, skillId);
      if (res) {
        updateUserStatus(res);
        await refetchUserData();
        if (res === UserStatus.Active) {
          navigate(ROUTES.ACTIVE);
        } else if (res === UserStatus.Pending) {
          if (
            data?.year_of_self_employed
              ?.toLowerCase()
              ?.includes('interested') ||
            data?.year_of_self_employed?.toLowerCase()?.includes('hustle') ||
            data?.revenue.toLowerCase()?.includes('less than') ||
            data?.business_entity
              .toLowerCase()
              ?.includes('no business entity') ||
            data?.business_entity.toLowerCase()?.includes('other')
          ) {
            navigate(ROUTES.MORE_INFO);
          } else {
            navigate(ROUTES.SIGNUP_PENDING);
          }
        } else if (res === UserStatus.Rejected) {
          navigate(ROUTES.INACTIVE);
        }
      }
      setIsSubmitting(false);
    },
    [
      updateUserStatus,
      user?._id,
      handleSubmitOnboardingAnswer,
      navigate,
      industries,
      refetchUserData,
    ],
  );

  const setAnswer = useCallback(
    (questionKey: TquestionKey, answer?: string) => {
      setValue(questionKey, answer ?? '');
      trigger(questionKey);
    },
    [setValue, trigger],
  );

  const FormStyledWrapper = newSignUp ? FormStyledV2 : FormStyled;

  const questionAndAnswersArray = useMemo(
    () => Object.keys(questionAndAnswers),
    [questionAndAnswers],
  );

  return (
    <FormStyledWrapper data-testid="onboardingQuestionsFormContainer">
      <Spacer height={20} />
      <Stack vertical gap={12} align={newSignUp ? 'center' : 'start'}>
        <Stack vertical gap={0} align={newSignUp ? 'center' : 'start'}>
          <TSpan
            font={isMobile ? 'heading-xs-bold' : 'heading-m-bold'}
            $fill
            textAlign="center"
            colorToken="--text-body-header-neutral-default"
          >
            {newSignUp
              ? t(`noumena.register.onboarding_questions.sub_title.v2.line1`)
              : t(`noumena.register.onboarding_questions.sub_title`)}
          </TSpan>
          {newSignUp && (
            <TSpan
              font={isMobile ? 'heading-xs-bold' : 'heading-m-bold'}
              $fill
              textAlign="center"
              colorToken="--text-body-header-neutral-default"
            >
              {t(`noumena.register.onboarding_questions.sub_title.v2.line2`)}
            </TSpan>
          )}
        </Stack>
        <TSpan
          textAlign="center"
          font="body-l"
          $fill
          colorToken="--text-body-neutral-default"
        >
          {t(`noumena.register.onboarding_questions.description`)}
        </TSpan>
      </Stack>
      <Spacer height={isMobile ? 24 : 32} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <QuestionWrapper applyNewSignUpStyles={newSignUp}>
          {questionAndAnswersArray.map((questionKey, index) => (
            <QuestionAnswers
              bottomGutter={
                !newSignUp || index !== questionAndAnswersArray.length - 1
              }
              key={questionKey}
              questionKey={questionKey}
              answerOptions={
                questionKey === 'business_country'
                  ? dropdownCountries
                  : questionKey === 'business_industry'
                  ? dropDownIndustries
                  : questionAndAnswers[questionKey as TquestionKey] || []
              }
              error={errors[questionKey as TquestionKey]?.message}
              loading={loading}
              onChooseAnswer={(answer) =>
                setAnswer(questionKey as TquestionKey, answer)
              }
              onFocus={() => trackEvent(QuestionEvents[index], userEventData)}
            />
          ))}
          <Spacer height={32} />
          <Stack fullWidth>
            <Button
              data-testid="onboardingQuestionsSubmitButton"
              type="submit"
              primary
              size="full"
              loading={isSubmitting}
              disabled={!isValid || loading || submitting || isSubmitting}
            >
              {t(`noumena.submit`)}
            </Button>
          </Stack>
        </QuestionWrapper>
        <Spacer height={32} />
        <FootnoteStack>
          <TSpan
            font="body-s"
            colorToken="--text-body-neutral-disabled"
            textAlign="center"
          >
            <Trans
              i18nKey="noumena.register.onboarding_questions.description.our_solutions_best"
              components={{
                newline: <br />,
              }}
            />
          </TSpan>
        </FootnoteStack>
        <Spacer height={16} />
      </Form>
    </FormStyledWrapper>
  );
};

export default SignUpForm;
