import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { cloneDeep, isEqual } from 'lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import { type UserProfileInput } from '@/apollo/generated/types';
import { TextField } from '@/components/TextField';
import { ProfileImage } from '@/screens/Chamber/components/modals/ProjectCreate/styles';
import { EditableAvatar } from '@/features/upload/components';
import { Button } from '@/components/Button';
import { useAuth } from '@/features/auth/contexts';
import { useWindowDimensions } from '@/hooks';
import { ModalFooter } from '@/components/ExtendedModal';
import { Icon } from '@/components/Icon';
import { Spacer } from '@/layout';
import { TSpan } from '@/components/Typography';
import { type DropdownValueType, Dropdown } from '@/components/Dropdown';

import { SearchSelectAPI } from '@/features/location/components';
import { TextArea } from '@/components/TextArea';
import { Spinner } from '@/components/Spinner';
import { breakpoints } from '@/constants/devices';
import {
  useGetCqDataLazyQuery,
  useSubmitCqFormMutation,
} from '@/apollo/graphql';
import { useHomeNoumAboutMeHelper } from '@/features/noums/hooks/noums';
import { MAX_BIO_LENGTH } from '@/screens/CoreSettings/PersonalDetails/consts';

import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import {
  AboutTextWrapper,
  Content,
  LeftContent,
  PersonalDetailsWrapper,
  ProfileWrapper,
  SaveButtonWrap,
  TextWrapper,
  UploadPhoto,
} from './styles';
import { useUpdateProfileHelper } from './useUpdateProfileHelper';
import {
  ageGroups,
  formValues,
  freelancingExperience,
  userProfileInputSchema,
} from './data';

function PersonalDetails({
  spaceId,
  handleSuccess,
}: {
  spaceId?: string;
  handleSuccess?: () => void;
}) {
  const { width } = useWindowDimensions();
  const [gqlCQData, { data: cqData }] = useGetCqDataLazyQuery();
  const [submitCqFormMutation] = useSubmitCqFormMutation();
  const { handleSave } = useUpdateProfileHelper();
  const { user, loading, masterId, refetchUserData } = useAuth();
  const [isIdentityFormSubmitted, setIsIdentityFormSubmitted] = useState(false);
  const [identityForm, setIdentityForm] = useState<{
    __typename?: 'CQForm' | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details?: any;
    formId?: string | null | undefined;
    status?: string | null | undefined;
  }>();
  const { refetchSpaceById } = useEditChamberState();
  const { t } = useTranslation();
  const [updateLoader, setUpdateLoader] = useState(false);
  const [initialValues, setInitialValues] = useState<UserProfileInput>();
  const [ageGroup, setAgeGroup] = useState<string | '-'>(' ');
  const [freelancingExp, setFreelancingExp] = useState<string | undefined>(
    undefined,
  );
  const [searchOptions, setOptions] = useState<DropdownValueType<string>[]>([]);
  const isLaptop = width > breakpoints.TABLET_L;

  useEffect(() => {
    gqlCQData();
  }, [gqlCQData]);

  useEffect(() => {
    const existingIdentityForm =
      cqData?.capitalquotient?.getCQDetails?.forms?.find(
        (form) => form?.formId === '1',
      );
    if (existingIdentityForm) {
      setIsIdentityFormSubmitted(Boolean(existingIdentityForm.status));
      setIdentityForm(existingIdentityForm);
    }
  }, [cqData]);

  useEffect(() => {
    const apiAgeGroup =
      user?.ageGroup?.min && user?.ageGroup?.max
        ? user?.ageGroup?.max >= 90
          ? '61+'
          : `${user.ageGroup.min}-${user?.ageGroup?.max}`
        : '-';
    const apiFreelancingExperience =
      user?.freelancingExperience?.min && user?.freelancingExperience?.max
        ? user?.freelancingExperience?.max >= 30
          ? '15+'
          : `${user.freelancingExperience.min}-${user.freelancingExperience.max}`
        : '-';
    setAgeGroup(apiAgeGroup);
    setFreelancingExp(apiFreelancingExperience);
  }, [setFreelancingExp, setAgeGroup, user]);

  const { homeNoumAboutMeProfilePicHelper } = useHomeNoumAboutMeHelper();

  const {
    reset,
    register,
    trigger,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserProfileInput>({
    resolver: yupResolver(userProfileInputSchema),
    context: { locationSuggestions: searchOptions },
    mode: 'all',
    reValidateMode: 'onBlur',
  });

  const handleChangeProfileImage = useCallback(
    (imageURL: string) => {
      setValue('profile.profilePicture', imageURL);
      trigger('profile.profilePicture');
    },
    [setValue, trigger],
  );

  const handleChange = useCallback(() => {
    trigger();
  }, [trigger]);

  const handleOptionChange = (ageGroupOptions: string) => {
    let ageGroupData = {};
    setAgeGroup(ageGroupOptions);

    if (ageGroupOptions !== '-') {
      if (ageGroupOptions === '61+') {
        ageGroupData = {
          min: 61,
          max: 90,
        };
      } else {
        const array = ageGroupOptions.split('-', 2);
        ageGroupData = {
          min: parseInt(array[0], 10),
          max: parseInt(array[1], 10),
        };
      }
    }

    reset({ ...getValues(), ageGroup: ageGroupData });
  };

  const handleOptionChangeForFreelancing = (
    freelancingExperienceOptions: string,
  ) => {
    setFreelancingExp(freelancingExperienceOptions);
    let freelancingExperienceData = {};

    if (freelancingExperienceOptions !== '-') {
      if (freelancingExperienceOptions === '15+') {
        freelancingExperienceData = {
          min: 15,
          max: 30,
        };
      } else {
        const array = freelancingExperienceOptions.split('-', 2);
        freelancingExperienceData = {
          min: parseInt(array[0], 10),
          max: parseInt(array[1], 10),
        };
      }
    }

    reset({ ...getValues(), freelancingExperience: freelancingExperienceData });
  };

  const handleDeleteImage = useCallback(() => {
    setValue('profile.profilePicture', '');
    trigger('profile.profilePicture');
  }, [setValue, trigger]);

  const onSubmit: SubmitHandler<UserProfileInput> = async (data) => {
    // we need below commented lines for the MyNetworks component. Maybe, we will use the MyNetworks component in the near future.
    // const socialurls = data.profile?.socialLinks?.filter(
    //   (value) => value?.link !== '',
    // );
    // if (!(socialurls && socialurls.length > 0)) {
    //   handleError(
    //     `${t(
    //       'noumena.myaccount.personal_details_my_networks.atleast_one_url',
    //     )}`,
    //   );
    //   return;
    // }
    // const socialLinks: InputMaybe<InputMaybe<SocialLinkInput>[]> = [];
    // data.profile?.socialLinks?.forEach((value) => {
    //   let link: string = '';
    //   let isNotCustomLink = false;
    //   const urlArray = value?.link?.toLowerCase().split('/') ?? [];
    //   myNetworkFileds.forEach((linkdata) => {
    //     if (value?.name === linkdata.name && !isNotCustomLink) {
    //       isNotCustomLink = true;
    //     }
    //   });
    //   const dataLink = value?.link ?? '';
    //   if (dataLink !== '') {
    //     if (urlArray.length > 0) {
    //       if (!isNotCustomLink) {
    //         link = dataLink;
    //       } else {
    //         let isAdded = false;
    //         myNetworkFileds.forEach((field) => {
    //           if (urlArray.includes(field.name) && !isAdded) {
    //             link = dataLink;
    //             isAdded = true;
    //           } else if (!link) {
    //             link = `https://${value?.name}/${dataLink}`;
    //           }
    //         });
    //       }
    //       socialLinks.push({
    //         name: value?.name ?? 'customLink',
    //         link,
    //       });
    //     }
    //   }
    // });
    // const dataToSubmit = {
    //   ...data,
    //   profile: { ...data.profile, socialLinks },
    // };
    setUpdateLoader(true);

    const dataToSubmit = cloneDeep(data);

    delete dataToSubmit.profile?.profilePicture;

    if (ageGroup === '-') dataToSubmit.ageGroup = {};

    if (freelancingExp === '-') dataToSubmit.freelancingExperience = {};

    if (getValues('profile.profilePicture') !== user?.profile?.profilePicture) {
      const { profilePicSuccess } = await homeNoumAboutMeProfilePicHelper(
        getValues('profile.profilePicture'),
      );
      if (
        profilePicSuccess &&
        isIdentityFormSubmitted &&
        identityForm &&
        masterId &&
        Boolean(getValues('profile.profilePicture'))
      ) {
        const indentifyDetails = Array.isArray(identityForm?.details)
          ? identityForm?.details
          : identityForm?.details.submitted;
        const formCopy = [...(indentifyDetails || [])];
        const indexOfProfilePicture = formCopy.findIndex(
          (ans) => ans.qid === '4',
        );
        if (indexOfProfilePicture !== -1) {
          formCopy[indexOfProfilePicture] = {
            ...formCopy[indexOfProfilePicture],
            value: getValues('profile.profilePicture'),
          };
        }
        submitCqFormMutation({
          variables: {
            input: {
              noumId: masterId,
              status: cqData?.capitalquotient?.getCQDetails?.status,
              form: {
                formId: identityForm?.formId,
                description: 'identity',
                status: identityForm?.status,
                details: formCopy,
              },
            },
          },
        });
      }
    }

    const isSuccess = await handleSave(dataToSubmit);

    setUpdateLoader(false);

    if (isSuccess) {
      // we need below commented line for the MyNetworks component. Maybe, we will use the MyNetworks component in the near future.
      // const newData = { ...data, _id: user?._id ?? '', profile: { ...data.profile socialLinks } };
      const newData = { ...data, _id: user?._id ?? '' };
      const values = formValues(newData);
      reset(values);
      setInitialValues(values);
      if (spaceId) {
        refetchSpaceById?.();
        refetchUserData();
        if (handleSuccess) handleSuccess();
      }
    }
  };

  const setTextFieldValue = useCallback(
    (value: string) => {
      setValue('location', value);
      trigger('location');
    },
    [setValue, trigger],
  );

  const handleLocationSelect = useCallback(
    (option: DropdownValueType<string>) => {
      if (option.value || option.value !== '') setTextFieldValue(option.value);
    },
    [setTextFieldValue],
  );

  const isFormChanged = useCallback(
    () => isEqual(initialValues, getValues()),
    [getValues, initialValues],
  );

  // we need useFieldArray for the MyNetworks component. Maybe, we will use the MyNetworks component in the near future.
  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: 'profile.socialLinks',
  // });

  useEffect(() => {
    if (user && !initialValues) {
      const values = formValues(user);
      reset(values);
      setInitialValues(values);
    }
  }, [initialValues, reset, user]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <PersonalDetailsWrapper>
            <ProfileWrapper>
              <UploadPhoto>
                <TSpan
                  font="heading-xs-bold"
                  colorToken="--text-card-header-neutral-highlighted"
                >
                  {t(`noumena.myaccount.personal_details_profile`)}
                </TSpan>
                <section className="uploadbar" />
                <Spacer height={isLaptop ? 32 : 16} />
                <ProfileImage>
                  <EditableAvatar
                    size="XXXL"
                    url={getValues('profile.profilePicture') ?? ''}
                    onContentChange={handleChangeProfileImage}
                    maximumFileSize={5}
                    onlyEditable={true}
                  />
                </ProfileImage>
                {getValues('profile.profilePicture') ? (
                  <Button
                    size="small"
                    secondary
                    intent="negative"
                    onClick={handleDeleteImage}
                  >
                    {t(`noumena.myaccount.personal_details_removebtn`)}
                  </Button>
                ) : null}
              </UploadPhoto>
            </ProfileWrapper>
            <LeftContent>
              <TextWrapper>
                <TextField
                  {...register('firstName', {
                    required: {
                      value: true,
                      message: t(
                        `noumena.home_noum.about_me.error.name_required`,
                      ),
                    },
                    onChange: handleChange,
                  })}
                  value={getValues('firstName') ?? ''}
                  label={t('noumena.home_noum.about_me.first_name_label')}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
                <TextField
                  {...register('lastName', {
                    required: {
                      value: true,
                      message: t(
                        `noumena.home_noum.about_me.error.name_required`,
                      ),
                    },
                    onChange: handleChange,
                  })}
                  value={getValues('lastName') ?? ''}
                  label={t('noumena.home_noum.about_me.last_name_label')}
                  name="lastName"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
                <TextField
                  {...register('username', {
                    required: {
                      value: true,
                      message: t(
                        `noumena.home_noum.about_me.error.name_required`,
                      ),
                    },
                    onChange: handleChange,
                  })}
                  value={getValues('username') ?? ''}
                  label={t('noumena.myaccount.personal_details_username')}
                  name="username"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
                <TextField
                  {...register('title', {
                    required: {
                      value: true,
                      message: t(
                        `noumena.home_noum.about_me.error.name_required`,
                      ),
                    },
                    onChange: handleChange,
                  })}
                  value={getValues('title') ?? ''}
                  label={t(
                    'noumena.myaccount.personal_details.professional_title',
                  )}
                  name="title"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  maxLength={64}
                />
                <AboutTextWrapper>
                  <TextArea
                    {...register('bio', {
                      required: {
                        value: true,
                        message: t(
                          `noumena.home_noum.about_me.error.name_required`,
                        ),
                      },
                      onChange: handleChange,
                    })}
                    error={!!errors.bio}
                    value={getValues('bio') ?? ''}
                    helperText={errors.bio?.message}
                    label={t('noumena.myaccount.personal_details_about')}
                    maxLength={MAX_BIO_LENGTH}
                    resize={false}
                  />
                </AboutTextWrapper>
              </TextWrapper>
              <Content vertical={!isLaptop}>
                <Dropdown
                  hideIcons
                  containerHeight="200px"
                  containerWidth="193px"
                  options={ageGroups}
                  usePopStyle
                  onSelectOption={(option) => {
                    handleOptionChange(option.value);
                  }}
                >
                  {({ inputProps, inputRef, toggle }) => (
                    <TextField
                      ref={inputRef}
                      {...inputProps}
                      label={t(`noumena.myaccount.personal_details.age_group`)}
                      value={ageGroup}
                      rightIcon={
                        <Icon
                          name="chevron_down_m"
                          size={16}
                          onClick={toggle}
                          color="--icon-input-neutral-default"
                        />
                      }
                    />
                  )}
                </Dropdown>
                <Dropdown
                  hideIcons
                  options={freelancingExperience}
                  containerHeight="300px"
                  containerWidth="193px"
                  usePopStyle
                  onSelectOption={(option) => {
                    handleOptionChangeForFreelancing(option.value);
                  }}
                >
                  {({ inputProps, inputRef, toggle }) => (
                    <TextField
                      ref={inputRef}
                      {...inputProps}
                      label={t(
                        `noumena.myaccount.personal_details.years_of_freelancing`,
                      )}
                      value={freelancingExp}
                      rightIcon={
                        <Icon
                          name="chevron_down_m"
                          size={16}
                          onClick={toggle}
                          color="--icon-input-neutral-default"
                        />
                      }
                    />
                  )}
                </Dropdown>
              </Content>
              <Spacer height={16} />
              <SearchSelectAPI
                {...register('location')}
                showValue={getValues('location') ?? ''}
                onSelect={handleLocationSelect}
                onClear={() => setTextFieldValue('')}
                label={t(`noumena.home_noum.about_me.location.label`)}
                error={!!errors.location}
                helperText={errors.location?.message}
                setTextFieldValue={setTextFieldValue}
                setSuggestedOptions={setOptions}
              />

              {/* Maybe, we will use the MyNetworks component in the near future. */}
              {/* <Spacer height={54} />
            <Content>
              <MyNetworks
                register={register}
                fields={fields}
                append={append}
                remove={remove}
                getValues={getValues}
                handleChange={handleChange}
              />
            </Content> */}

              {!isLaptop && (
                <>
                  <Spacer height={32} />
                  <TSpan
                    font="body-m"
                    colorToken="--text-card-header-neutral-highlighted"
                  >
                    {t(
                      `noumena.homenoum.edit_personal_details.change_will_applied.text`,
                    )}
                  </TSpan>
                  <Spacer height={16} />
                </>
              )}
            </LeftContent>
          </PersonalDetailsWrapper>
          <ModalFooter justifyContent="space-between">
            {isLaptop && (
              <TSpan
                font="body-m"
                colorToken="--text-card-header-neutral-highlighted"
              >
                {t(
                  `noumena.homenoum.edit_personal_details.change_will_applied.text`,
                )}
              </TSpan>
            )}
            <SaveButtonWrap>
              <Button
                onClick={handleSubmit(onSubmit)}
                size="full"
                type="submit"
                primary={!isFormChanged()}
                disabled={isFormChanged() || updateLoader || !isValid}
                loading={updateLoader}
              >
                {t(`noumena.button.save`)}
              </Button>
            </SaveButtonWrap>
          </ModalFooter>
        </>
      )}
    </>
  );
}

export default PersonalDetails;
