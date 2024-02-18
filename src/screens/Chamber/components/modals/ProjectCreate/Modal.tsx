import {
  type ProjectChamberCategory,
  type ProjectChamberInput,
  type ProjectChamberType,
} from '@/apollo/generated/types';
import { useGetProjectChamberCategoriesLazyQuery } from '@/apollo/graphql';
import ChamberDefaultImag from '@/assets/images/chamber_default.png';
import { Dropdown, type DropdownValueType } from '@/components/Dropdown';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Icon } from '@/components/Icon';
import { TextArea } from '@/components/TextArea';
import { TextField } from '@/components/TextField';
import { TSpan } from '@/components/Typography';
import { breakpoints } from '@/constants/devices';
import projectTypeOptionsArr from '@/constants/projectTypeOptions';
import { useAuth } from '@/features/auth/contexts';
import { useGeniusCompletionModal } from '@/features/genius/hooks/useGeniusCompletionModal';
import { useCreateProjectChamberHelper } from '@/features/noums/hooks/noums';
import { useUpdateProjectChamberHelper } from '@/features/noums/hooks/spaceQuery';
import { EditableAvatar } from '@/features/upload/components';
import { useLaunchDarkly, useWindowDimensions } from '@/hooks';
import { Spacer, Stack } from '@/layout';
import { useEditChamberState } from '@/screens/Chamber/EditChamber/provider';
import ProjectTypeDropdown from '@/screens/Chamber/components/modals/ProjectCreate/ProjectTypeDropdown';
import { trackEvent } from '@/utils/tracking';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { SpaceUtils } from '@/utils/space';
import { initialDetails, newProjectSchema, newRiseProjectSchema } from './data';
import {
  FormContainer,
  ProfileImage,
  StyledButton,
  StyledDropDownWrapper,
} from './styles';
import {
  type NewProjectType,
  type NoumData,
  type ProjectCreateProps,
} from './types';

type ProjectCreateModalProps = ProjectCreateProps & {
  onCreateNoum: (noum: NoumData) => void;
};

export const ProjectCreate = memo((props: ProjectCreateModalProps) => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const { space } = useEditChamberState();
  const { flags } = useLaunchDarkly();

  const GeniusCompletion = useGeniusCompletionModal({
    onConfirm: (response) => {
      setValue('description', response.text, {
        shouldValidate: true,
        shouldDirty: true,
      });
      setProjectDetails({
        ...projectDetails,
        description: response.text,
      });
    },
    type: 'text',
    buttonType: 'generate-description',
    title: 'Generate Noum Description',
  });

  const [categoryOptions, setCategoryOptions] = useState<
    DropdownValueType<string>[]
  >([]);

  const [selectedProjectType, setSelectedProjectType] = useState<
    DropdownValueType<ProjectChamberType> | undefined
  >(undefined);

  const [selectedCategory, setSelectedCategory] = useState<
    DropdownValueType<string> | undefined
  >(undefined);
  const [profileImage, setProfileImage] = useState<string | undefined>(
    props.summaryData?.profileImage &&
      props.summaryData?.profileImage !== ChamberDefaultImag
      ? props.summaryData?.profileImage
      : undefined,
  );
  const [projectDetails, setProjectDetails] = useState<ProjectChamberInput>({
    ...initialDetails,
    ...props?.summaryData,
    category: props?.summaryData?.categoryId || '',
  });

  const [getCategoryList, { loading: categoriesLoading }] =
    useGetProjectChamberCategoriesLazyQuery({
      fetchPolicy: 'cache-and-network',
      onCompleted: (response) => {
        const categories = response.getProjectChamberCategories;
        if (categories) {
          setCategoryOptions(
            categories
              .filter(
                (category: ProjectChamberCategory) =>
                  !category.name.toLowerCase().match('member') &&
                  !category.name.toLowerCase().match('linked') &&
                  !category.name.toLowerCase().match('rise_application'),
              )
              .map((categoryItem: ProjectChamberCategory) => ({
                key: categoryItem._id,
                value: categoryItem._id,
                type: 'value',
                label: categoryItem.name,
              })),
          );
        }
      },
    });

  const { createProjectChamberHelper, loading: creating } =
    useCreateProjectChamberHelper();

  const { updateProjectChamberHelper, loading: updating } =
    useUpdateProjectChamberHelper();

  const isRiseNoum = SpaceUtils.isRiseNoum(space);

  const {
    register,
    reset,
    trigger,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<NewProjectType>({
    resolver: yupResolver(isRiseNoum ? newRiseProjectSchema : newProjectSchema),
    mode: 'all',
    reValidateMode: 'onBlur',
    defaultValues: {
      category: props.summaryData?.categoryId,
      description: props.summaryData?.description,
      name: props.summaryData?.name,
      profileImage: props.summaryData?.profileImage,
    },
  });

  const optionIcon = useCallback((option: string) => {
    switch (option) {
      case 'PUBLIC':
        return <Icon name="public_visibility_xl" size={40} />;
      case 'PRIVATE':
        return <Icon name="private_visibility_xl" size={40} />;
      case 'SECRET':
        return <Icon name="secret_visibility_xl" size={40} />;
      default:
        return null;
    }
  }, []);

  const projectTypeOptions = useMemo(
    () =>
      projectTypeOptionsArr.map((o: DropdownValueType<ProjectChamberType>) => ({
        ...o,
        icon: optionIcon(o.value),
      })),
    [optionIcon],
  );

  useEffect(() => {
    if (props.isOpen) setSelectedProjectType(projectTypeOptions[1]);
  }, [props.isOpen, projectTypeOptions]);

  useEffect(() => {
    if (props.isOpen && categoryOptions.length)
      setSelectedCategory(
        props?.summaryData?.categoryId
          ? categoryOptions.find(
              (x) => x.value === props?.summaryData?.categoryId,
            )
          : categoryOptions[0],
      );

    if (props?.summaryData) {
      setSelectedCategory(
        categoryOptions.find((x) => x.value === props?.summaryData?.categoryId),
      );
      setProjectDetails({
        ...initialDetails,
        ...props?.summaryData,
      });
    }
  }, [props.isOpen, props?.summaryData, categoryOptions]);

  useEffect(() => {
    setValue('category', selectedCategory?.value || '');
  }, [selectedCategory, setValue]);

  const onSubmit: SubmitHandler<NewProjectType> = useCallback(
    async (data: NewProjectType) => {
      const payload = {
        ...projectDetails,
        name: data.name,
        category: data.category,
        description: data.description,
        profileImage,
      };
      if (props.isUpdateMode && props?.summaryData?.spaceId) {
        const isSuccess = await updateProjectChamberHelper(
          props.summaryData.spaceId,
          {
            name: data.name,
            description: data.description,
            category: data.category || undefined,
            profileImage,
          },
        );
        if (isSuccess) props.handleSuccess(props.summaryData.spaceId);
      } else {
        if (flags.paymentSubscriptions) {
          props.onCreateNoum(payload);
          return;
        }
        // TODO: Remove below part when we clean up the paymentSubscriptions flag
        const { id } = await createProjectChamberHelper(payload);
        if (id) props.handleSuccess(id);
        trackEvent('createPN', {
          UUID: user?._id,
          ProjectNoumID: id,
        });
      }
    },
    [
      projectDetails,
      profileImage,
      props,
      updateProjectChamberHelper,
      flags.paymentSubscriptions,
      createProjectChamberHelper,
      user,
    ],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setProjectDetails({
        ...projectDetails,
        [e.currentTarget.name]: e.currentTarget.value,
      });
    },
    [projectDetails],
  );

  const handleSelectCategory = useCallback(
    (option: DropdownValueType<string>) => {
      setProjectDetails({ ...projectDetails, category: option.value });
      setSelectedCategory(option);
      setValue('category', option.value);
      trigger('category');
    },
    [projectDetails, setValue, trigger],
  );

  const handleSelectProjectType = useCallback(
    (option: DropdownValueType<ProjectChamberType>) => {
      setProjectDetails({ ...projectDetails, projectType: option.value });
      setSelectedProjectType(option);
      setValue('projectType', option.value);
      trigger('projectType');
    },
    [
      setProjectDetails,
      setSelectedProjectType,
      setValue,
      trigger,
      projectDetails,
    ],
  );

  const handleChangeProfileImage = useCallback(
    (imageURL: string | undefined) => {
      setProfileImage(imageURL);
      setValue('profileImage', imageURL);
      trigger('profileImage');
    },
    [setProfileImage, setValue, trigger],
  );

  const handleClose = useCallback(() => {
    setProjectDetails(initialDetails);
    setSelectedCategory(undefined);
    setSelectedProjectType(undefined);
    setProfileImage(
      props?.summaryData?.profileImage &&
        props.summaryData?.profileImage !== ChamberDefaultImag
        ? props?.summaryData?.profileImage
        : undefined,
    );
    reset();
    props.handleClose(true);
  }, [
    setProjectDetails,
    setSelectedCategory,
    setSelectedProjectType,
    reset,
    props,
  ]);

  useEffect(() => {
    if (user?._id) getCategoryList();
  }, [getCategoryList, user]);

  register('category', {
    required: {
      value: true,
      message: t('noumena.chamber_create.error.category_required'),
    },
    onChange: handleChange,
  });

  const windowSize = useWindowDimensions();
  const isMobile = windowSize.width <= breakpoints.TABLET;
  const isTablet = windowSize.width <= breakpoints.TABLET_L;

  if (categoriesLoading) return null;

  return (
    <>
      <Modal
        testId="testProjectCreate"
        open={props.isOpen}
        onClose={handleClose}
        enableCloseButton
        size={ModalSize.XL}
        disableBackdropClick
        spacingMode="gap-content"
      >
        <ModalHeader
          isFullScreen={isMobile}
          justifyContent={isMobile ? 'flex-start' : 'center'}
        >
          {props?.isUpdateMode
            ? t(`noumena.noum_edit.title`)
            : t(`noumena.chamber_create.title`)}
        </ModalHeader>

        <ModalBody
          mobileFlex
          flexDirection={
            props.isUpdateMode && !isTablet ? 'row-reverse' : 'column'
          }
          gap={props.isUpdateMode ? 56 : ''}
        >
          <ProfileImage isUpdateMode={props?.isUpdateMode}>
            {props?.isUpdateMode && (
              <TSpan
                font={!isTablet ? 'heading-s-bold' : 'body-l-bold'}
                colorToken="--text-card-header-neutral-highlighted"
              >
                {t('noumena.noum_edit.noum_pictures.text')}
              </TSpan>
            )}
            <Spacer height={!isMobile ? 24 : 32} />
            <EditableAvatar
              size="XXL"
              url={profileImage || ''}
              onContentChange={handleChangeProfileImage}
              onClear={() => handleChangeProfileImage('')}
              maximumFileSize={5}
              defaultImagePlaceHolder={ChamberDefaultImag}
              noMargin
            />
          </ProfileImage>
          <FormContainer isUpdateMode={props?.isUpdateMode}>
            <Stack vertical fullWidth>
              {props?.isUpdateMode && (
                <TSpan
                  font={!isTablet ? 'heading-s-bold' : 'body-l-bold'}
                  colorToken="--text-card-header-neutral-highlighted"
                >
                  {t('noumena.noum_edit.basic_settings.text')}
                </TSpan>
              )}
              <Spacer height={24} />
              <TextField
                {...register('name', {
                  required: {
                    value: true,
                    message: t(`noumena.chamber_create.error.name_required`),
                  },
                  maxLength: {
                    value: 75,
                    message: t(
                      'noumena.chamber_create.error.description_maximum_length',
                    ),
                  },
                  onChange: handleChange,
                })}
                value={projectDetails.name}
                label={t(`noumena.chamber_create.name_label`)}
                error={!!errors.name}
                helperText={errors.name?.message}
                data-testid="CreateProject-Modal-Name"
              />
              <Spacer height={16} />
              <TextArea
                {...register('description', {
                  onChange: handleChange,
                  maxLength: {
                    value: 1000,
                    message: t(
                      'noumena.chamber_create.error.description_maximum_length',
                    ),
                  },
                })}
                value={projectDetails.description || ''}
                label={t(`noumena.chamber_create.description_label`)}
                error={!!errors.description}
                helperText={errors.description?.message}
                multiple
                maxLength={1000}
                rightIcon={
                  projectDetails.description
                    ? null
                    : GeniusCompletion.buttonElement
                }
                data-testid="CreateProject-Modal-Description"
              />
              <Spacer height={16} />
              <StyledDropDownWrapper>
                <Dropdown
                  hideIcons
                  options={categoryOptions}
                  inputValue={selectedCategory?.value}
                  onSelectOption={handleSelectCategory}
                  isPopperStyle
                  disabled={isRiseNoum}
                >
                  {({ inputProps, inputRef, toggle }) => (
                    <TextField
                      readOnly
                      {...inputProps}
                      ref={inputRef}
                      value={
                        selectedCategory ? String(selectedCategory.label) : ''
                      }
                      label={t('noumena.chamber_create.category_label')}
                      spellCheck="false"
                      onChange={() => {
                        setValue('category', selectedCategory?.value || '');
                      }}
                      error={!!errors.category}
                      helperText={
                        errors.category?.message ||
                        t('noumena.chamber_create.category_helper_text')
                      }
                      rightIcon={
                        <Icon
                          name="chevron_down_m"
                          color="--icon-input-neutral-default"
                          size={16}
                          onClick={toggle}
                        />
                      }
                      data-testid="CreateProject-Modal-Category"
                    />
                  )}
                </Dropdown>
              </StyledDropDownWrapper>
              <Spacer height={32} />
              {!props?.isUpdateMode && (
                <>
                  <ProjectTypeDropdown
                    handleSelectProjectType={handleSelectProjectType}
                    selectedProjectType={selectedProjectType}
                    errors={errors}
                    projectTypeOptions={projectTypeOptions}
                    setValue={setValue}
                  />
                </>
              )}
            </Stack>
          </FormContainer>
        </ModalBody>

        <ModalFooter
          flexDirection="row-reverse"
          justifyContent="space-between"
          gap={16}
        >
          <StyledButton
            isUpdateMode={!isMobile && props.isUpdateMode}
            data-testid="Create-Noum-Button"
            onClick={handleSubmit(onSubmit)}
            primary
            loading={updating}
            secondary={!isValid}
            tertiary={!isValid}
            disabled={!isValid || !isDirty || creating || updating}
          >
            {props?.isUpdateMode
              ? t('noumena.button.save')
              : t('noumena.chamber_create.create_button')}
          </StyledButton>
          {!isMobile && !props?.isUpdateMode && (
            <StyledButton
              data-testid="Create-Noum-Cancel"
              onClick={() => handleClose()}
              secondary
              tertiary
            >
              {t('noumena.cancel')}
            </StyledButton>
          )}
        </ModalFooter>
      </Modal>

      {GeniusCompletion.modalElement}
    </>
  );
});
