import { type UserProfileInput } from '@/apollo/generated/types';
import { type SpaceOutputFragment } from '@/apollo/graphql';
import OwnerDefaultImage from '@/assets/images/profile_default.png';
import { EditableAvatar } from '@/features/upload/components';
import { Button } from '@/components/Button';
import { type DropdownValueType } from '@/components/Dropdown';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { SearchSelectAPI } from '@/features/location/components';
import { TextArea } from '@/components/TextArea';
import { TextField } from '@/components/TextField';
import { TSpan } from '@/components/Typography';
import { breakpoints } from '@/constants/devices';
import { NAME_REGEX, TWO_LETTERED_NAME_REGEX } from '@/constants/regex';
import { useWindowDimensions } from '@/hooks';
import { useHomeNoumAboutMeHelper } from '@/features/noums/hooks/noums';
import { Spacer } from '@/layout';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { memo, useCallback, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { ImageWrapper, ProfileImage, StyledForm } from './styles';
import { type HomeNoumAboutMeProps, type HomeNoumAboutMetype } from './types';

const initialDetails = (space: SpaceOutputFragment | undefined) => ({
  profile: {
    profilePicture: space?.uid?.profile?.profilePicture,
  },
  firstName: space?.uid?.firstName || undefined,
  lastName: space?.uid?.lastName || undefined,
  title: space?.uid?.title || '',
  bio: space?.uid?.bio || '',
  location: space?.uid?.location || '',
});

export const HomeNoumAboutMe = memo((props: HomeNoumAboutMeProps) => {
  const { t } = useTranslation();
  const { space } = useNoumContext();
  const [profileImage, setProfileImage] = useState<string | undefined>(
    space?.uid?.profile?.profilePicture || undefined,
  );
  const [profileImgDeleted, setProfileImgDeleted] = useState<boolean>(false);
  const [userProfileDetails, setUserProfileDetails] =
    useState<UserProfileInput>(() => initialDetails(space));
  const {
    homeNoumAboutMeHelper,
    homeNoumAboutMeProfilePicHelper,
    loading: updating,
  } = useHomeNoumAboutMeHelper();

  const homeNoumAboutMeSchema = yup
    .object({
      firstName: yup
        .string()
        .required(t('noumena.home_noum.about_me.error.name_required'))
        .min(2, t('noumena.signup.first_name.too_short'))
        .max(20, t('noumena.signup.first_name.too_long'))
        .test(
          'Two letter name validation',
          t('noumena.signup.two_digit_first_name.incorrect'),
          (value) => {
            if (value && value.length <= 2) {
              return TWO_LETTERED_NAME_REGEX.test(value);
            }
            return true;
          },
        )
        .matches(
          NAME_REGEX,
          t('noumena.home_noum.about_me.error.first_name_alpha_only'),
        ),
      lastName: yup
        .string()
        .required(t('noumena.home_noum.about_me.error.name_required'))
        .min(2, t('noumena.signup.last_name.too_short'))
        .max(20, t('noumena.signup.last_name.too_long'))
        .test(
          'Two letter name validation',
          t('noumena.signup.two_digit_last_name.incorrect'),
          (value) => {
            if (value && value.length <= 2) {
              return TWO_LETTERED_NAME_REGEX.test(value);
            }
            return true;
          },
        )
        .matches(
          NAME_REGEX,
          t('noumena.home_noum.about_me.error.last_name_alpha_only'),
        ),
      title: yup
        .string()
        .notRequired()
        .max(64, t(`noumena.home_noum.about_me.error.title_maximum_length`)),
      bio: yup
        .string()
        .notRequired()
        .max(750, t(`noumena.home_noum.about_me.error.bio_maximum_length`)),
    })
    .required();

  const {
    register,
    reset,
    trigger,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<HomeNoumAboutMetype>({
    resolver: yupResolver(homeNoumAboutMeSchema),
    mode: 'all',
    reValidateMode: 'onBlur',
  });

  const onSubmit: SubmitHandler<HomeNoumAboutMetype> = useCallback(
    async (data: HomeNoumAboutMetype) => {
      let profilePicSuccess = { profilePicSuccess: false };
      if (profileImgDeleted) {
        profilePicSuccess = await homeNoumAboutMeProfilePicHelper('');
      }

      const { success } = await homeNoumAboutMeHelper({
        ...userProfileDetails,
        firstName: data.firstName,
        lastName: data.lastName,
        profile: profileImage ? { profilePicture: profileImage } : undefined,
      });

      if (
        success &&
        ((profileImgDeleted === true &&
          profilePicSuccess?.profilePicSuccess === true) ||
          (profileImgDeleted === false &&
            profilePicSuccess?.profilePicSuccess === false))
      ) {
        props.handleSuccess();
      }
    },
    [
      profileImgDeleted,
      homeNoumAboutMeHelper,
      userProfileDetails,
      profileImage,
      homeNoumAboutMeProfilePicHelper,
      props,
    ],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserProfileDetails({
        ...userProfileDetails,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    },
    [userProfileDetails, setUserProfileDetails],
  );

  const handleChangeProfileImage = useCallback(
    (imageURL: string | undefined) => {
      setProfileImgDeleted(false);
      setProfileImage(imageURL);
      setValue('profileImage', imageURL);
      trigger('profileImage');
    },
    [setProfileImage, setValue, trigger, setProfileImgDeleted],
  );

  const handleClose = useCallback(() => {
    setUserProfileDetails(initialDetails(space));
    setProfileImage(space?.uid?.profile?.profilePicture || undefined);
    reset();
    props.handleClose(true);
  }, [setUserProfileDetails, reset, props, space, setProfileImage]);

  const { width } = useWindowDimensions();
  const isDesktop = width >= breakpoints.TABLET_L;

  const handleLocationSelect = useCallback(
    (option: DropdownValueType<string>) => {
      setUserProfileDetails({ ...userProfileDetails, location: option.value });
    },
    [setUserProfileDetails, userProfileDetails],
  );

  const handleLocationClear = useCallback(() => {
    setUserProfileDetails({ ...userProfileDetails, location: '' });
  }, [setUserProfileDetails, userProfileDetails]);

  return (
    <Modal
      testId="testHomeNoumAboutMe"
      open={props.isOpen}
      onClose={handleClose}
      enableCloseButton
      closeButtonStyles={{ tertiary: true }}
      size={ModalSize.XL}
      disableBackdropClick
    >
      <ModalHeader isFullScreen={!isDesktop}>
        {t(`noumena.home_noum.about_me.section_title`)}
      </ModalHeader>
      <ModalBody mobileFlex align="center">
        <ImageWrapper>
          <ProfileImage>
            <EditableAvatar
              size="XXL"
              url={profileImage}
              onContentChange={handleChangeProfileImage}
              onClear={() => {
                handleChangeProfileImage('');
                setProfileImgDeleted(true);
              }}
              maximumFileSize={5}
              defaultImagePlaceHolder={OwnerDefaultImage}
            />
          </ProfileImage>
        </ImageWrapper>
        <Spacer height={24} />
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('firstName', {
              required: {
                value: true,
                message: t(`noumena.home_noum.about_me.error.name_required`),
              },
              onChange: handleChange,
            })}
            value={userProfileDetails.firstName || undefined}
            label={t(`noumena.home_noum.about_me.first_name_label`)}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <Spacer height={16} />
          <TextField
            {...register('lastName', {
              required: {
                value: true,
                message: t(`noumena.home_noum.about_me.error.name_required`),
              },
              onChange: handleChange,
            })}
            value={userProfileDetails.lastName || undefined}
            label={t(`noumena.home_noum.about_me.last_name_label`)}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />
          <Spacer height={16} />
          <TextField
            {...register('title', {
              onChange: handleChange,
              maxLength: {
                value: 64,
                message: t(
                  'noumena.home_noum.about_me.error.title_maximum_length',
                ),
              },
            })}
            value={userProfileDetails.title || ''}
            label={t(`noumena.home_noum.about_me.title_label`)}
            error={!!errors.title}
            helperText={errors.title?.message}
            multiple
            maxLength={64}
          />
          <Spacer height={16} />
          <TextArea
            {...register('bio', {
              onChange: handleChange,
              maxLength: {
                value: 750,
                message: t(
                  'noumena.home_noum.about_me.error.bio_maximum_length',
                ),
              },
            })}
            resize={false}
            autoResize={true}
            value={userProfileDetails.bio || ''}
            label={t(`noumena.home_noum.about_me.description_label`)}
            error={!!errors.bio}
            helperText={errors.bio?.message}
            multiple
            maxLength={750}
          />
          <Spacer height={24} />
          <div>
            <TSpan
              data-testid="labelLocation"
              font="body-l-bold"
              colorToken="--text-body-header-neutral-default"
            >
              {t(`noumena.home_noum.about_me.location.heading`)}
            </TSpan>
            <Spacer height={16} />
            <SearchSelectAPI
              showValue={userProfileDetails.location || ''}
              onSelect={handleLocationSelect}
              onClear={handleLocationClear}
            />
          </div>
        </StyledForm>
      </ModalBody>
      <ModalFooter>
        <Button
          type="submit"
          primary
          size="full"
          loading={updating}
          secondary={!isValid}
          tertiary={!isValid}
          disabled={!isValid || updating}
          onClick={handleSubmit(onSubmit)}
        >
          {t('noumena.home_noum.about_me.save_changes')}
        </Button>
      </ModalFooter>
    </Modal>
  );
});
