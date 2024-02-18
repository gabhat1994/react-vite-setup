import { type FC, Fragment, useCallback, useState } from 'react';
import { type SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TSpan } from '@/components/Typography';
import { Spacer, Stack } from '@/layout';
import { TextField } from '@/components/TextField';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { IdentityServices } from '@/services/rest/identity';
import { type SignUpValues } from '@/screens/Register/types';
import { TextArea } from '@/components/TextArea';
import { isValidURL } from '@/utils/url';
import { handleBackendError } from '@/screens/Register/helpers';
import { useToast } from '@/hooks';
import accessLocalStorage from '@/constants/accessLocalStorage';
import Errors from '@/constants/errors';
import { setLocalStorage } from '@/utils/localStorage';
import {
  AddButtonStyle,
  Form,
  FormStyled,
  FullWidthStack,
  IconWrapper,
  Point,
} from './styles';
import { type SignUpFormProps } from './types';

const SignUpForm: FC<SignUpFormProps> = ({
  setStep,
  userInfo,
  setUserInfo,
  setUserOutput,
}) => {
  const { addToast } = useToast();
  const { t } = useTranslation();

  const [isURL, setIsURL] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    register,
    setError,
    clearErrors,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    defaultValues: {
      additionalInfo: userInfo?.additionalInfo,
      profile: userInfo?.profile,
    },
  });

  const validateURL = (url: string, index: number) => {
    const valid = isValidURL(url);
    if (!valid) {
      setError(`profile.socialLinks.${index}.link`, {
        type: 'focus',
        message: t(`noumena.input.incorrect`),
      });
    } else {
      if (index === 0) setIsURL(true);
      clearErrors(`profile.socialLinks.${index}.link`);
    }
  };

  const onSubmit: SubmitHandler<SignUpValues> = useCallback(
    async (data) => {
      setLoading(true);
      const currentData = { ...data };
      currentData.profile.socialLinks = currentData?.profile?.socialLinks
        ?.filter(({ link }) => !!link)
        .map(({ link }, index) => ({
          name: `url${index + 1}`,
          link: link?.toLowerCase(),
        }));
      const payload = {
        ...userInfo,
        ...currentData,
      };
      if (setUserInfo) {
        setUserInfo(payload);
      }
      const resp = await IdentityServices.serviceSignup(payload);
      if (resp && !resp.errorMessage) {
        setLocalStorage(
          accessLocalStorage.ACCESS_TOKEN,
          resp.token.accessToken,
        );
        setLocalStorage(
          accessLocalStorage.REFRESH_TOKEN,
          resp.token.refreshToken,
        );
        if (setUserOutput) setUserOutput(resp.user);

        setStep(4);
        setLoading(false);
      } else {
        addToast(
          'error',
          'none',
          resp.errorStatus === 102
            ? Errors.BLOCKED_IP
            : `${t('noumena.toast_error.text')}: ${handleBackendError(resp)}`,
        );
        setLoading(false);
      }
    },
    [addToast, setStep, setUserInfo, setUserOutput, t, userInfo],
  );

  const {
    fields: profileLinksFields,
    append: profileLinksAppend,
    remove: profileLinksRemove,
  } = useFieldArray({ control, name: 'profile.socialLinks' });

  return (
    <FormStyled data-testid="stepThreeFormContainer">
      <Spacer height={78} />
      <TSpan
        font="heading-xs-bold"
        $fill
        colorToken="--text-body-neutral-default"
      >
        {t(`noumena.sign_up.title`)}
      </TSpan>
      <Spacer height={10} />
      <TSpan
        font="heading-xl-bold"
        $fill
        colorToken="--text-body-header-neutral-default"
      >
        {t(`noumena.register.step3.sub_title`)}
      </TSpan>
      <Spacer height={11} />
      <TSpan font="body-l" $fill colorToken="--text-body-neutral-default">
        {t(`noumena.register.step3.description`)}
      </TSpan>
      <Stack vertical padding="16px 40px">
        <TSpan colorToken="--text-body-neutral-highlighted" font="body-l-bold">
          {t(`noumena.register.step3.sub_title1`)}
        </TSpan>
      </Stack>
      <IconWrapper>
        <Point />
        <TSpan font="body-m" colorToken="--text-body-neutral-default">
          {t(`noumena.register.step3.info_item1`)}
        </TSpan>
      </IconWrapper>
      <IconWrapper>
        <Point />
        <TSpan font="body-m" colorToken="--text-body-neutral-default">
          {t(`noumena.register.step3.info_item2`)}
        </TSpan>
      </IconWrapper>
      <IconWrapper>
        <Point />
        <TSpan font="body-m" colorToken="--text-body-neutral-default">
          {t(`noumena.register.step3.info_item3`)}
        </TSpan>
      </IconWrapper>
      <Spacer height={15} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Stack vertical padding="16px 0">
          {profileLinksFields.map((field, index) => (
            <Fragment key={field.id}>
              <TextField
                data-testid={`urlfield${index}`}
                label={t(`noumena.professional_profile_link`)}
                {...register(`profile.socialLinks.${index}.link`, {
                  required: {
                    value: true,
                    message: t(`noumena.input.not_empty`),
                  },
                  pattern: {
                    value:
                      /[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/i,
                    message: t(`noumena.input.incorrect`),
                  },
                })}
                onBlur={(e) => validateURL(e.target.value, index)}
                rightIcon={
                  index !== 0 ? (
                    <Icon
                      color="--icon-tablecell-neutral-highlighted"
                      name="delete_m"
                      size={24}
                      onClick={() => profileLinksRemove(index)}
                    />
                  ) : undefined
                }
                value={getValues(`profile.socialLinks.${index}.link`)}
                error={!!errors?.profile?.socialLinks?.[index]?.link}
                helperText={
                  errors?.profile?.socialLinks?.[index]?.link?.message ||
                  t(`noumena.signup.socialLinks.example`)
                }
              />
              <Spacer height={20} />
            </Fragment>
          ))}
          {profileLinksFields.length < 3 && isURL && (
            <>
              {' '}
              <AddButtonStyle
                onClick={() =>
                  profileLinksAppend({
                    link: '',
                  })
                }
              >
                <Icon
                  color="--icon-button-neutral-default"
                  name="add_m"
                  size={24}
                />
                <TSpan
                  colorToken="--text-button-brand-primary-default"
                  font="button-m"
                  $fill
                >
                  {t(`noumena.add_another_link`)}
                </TSpan>
              </AddButtonStyle>
              <Spacer height={16} />{' '}
            </>
          )}
          <TextArea
            label={t(`noumena.sign_up.step3.textarea.label`)}
            resize={false}
            {...register('additionalInfo', {
              maxLength: {
                value: 2000,
                message: t(`noumena.input.not_exceed-2000`),
              },
            })}
            value={getValues('additionalInfo')}
            error={!!errors?.additionalInfo}
            helperText={errors?.additionalInfo?.message}
          />

          <Spacer height={32} />

          <FullWidthStack>
            <Button
              data-testid="stepThreeBackButton"
              tertiary
              leftIcon={
                <Icon
                  color="--icon-button-neutral-default"
                  name="arrow_left_m"
                  size={16}
                />
              }
              style={{ minWidth: '100px' }}
              onClick={() => setStep(2)}
            >
              {t(`noumena.back.text`)}
            </Button>
            <Spacer width={16} />
            <Button
              data-testid="stepThreeSubmitButton"
              type="submit"
              primary
              size="full"
              disabled={!isURL}
              loading={loading}
            >
              {!isURL
                ? t(`noumena.sign_up.step3.button.text`)
                : t(`noumena.submit`)}
            </Button>
          </FullWidthStack>
        </Stack>
      </Form>
    </FormStyled>
  );
};

export default SignUpForm;
