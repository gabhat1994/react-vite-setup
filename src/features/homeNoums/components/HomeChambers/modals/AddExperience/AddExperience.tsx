import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { t } from 'i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { ElementStatusEnum, ElementTypeEnum } from '@/apollo/generated/types';
import { breakpoints } from '@/constants/devices';
import { useLaunchDarkly, useToast, useWindowDimensions } from '@/hooks';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalSize,
} from '@/components/ExtendedModal';
import { Icon } from '@/components/Icon';
import { Infinite } from '@/components/Infinite';
import {
  Dropdown,
  type DropdownTargetProps,
  type DropdownValueType,
} from '@/components/Dropdown';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { Spinner } from '@/components/Spinner';
import { EditElement } from '../EditElement';
import { ReferenceViewItem } from '../ReferenceViewItem';
import {
  ReferenceInnerContainer,
  StyledAddReferenceButton,
  StyledRichEditor,
  StyledSaveButton,
  StyledSaveButtonTableMobile,
  TabContainer,
} from '../styles';
import { listOfTabs } from '../data';
import { type AddExperienceProps, type EditElementSchema } from '../types';

const elementSchema = yup
  .object({
    title: yup.string().required(),
    content: yup.string().required(),
  })
  .required();

const AddExperience = ({
  elementType,
  title: propTitle,
  isEditing,
  onClose,
  isOpen,
  handleAddOption,
  handleDeleteOption,
  defaultData,
  handleOpenAddReferenceModal: openReferenceModal,
  approveReference,
  rejectReference,
  discardReference,
  updateReference,
  capacityOptions,
  loading,
  referenceFetching,
  referenceData,
  fetchMoreReferences,
  infiniteState,
  setShowDiscardExperienceModal,
}: AddExperienceProps) => {
  const { addToast } = useToast();
  const {
    flags: { references },
  } = useLaunchDarkly();
  const { width } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState(0);
  const [internalTitle, setTitle] = useState<string>(defaultData.title);
  const [content, setContentMain] = useState<string>(defaultData.body);
  const [loader, setLoader] = useState(false);
  const isDesktop = useMemo(() => width >= breakpoints.LAPTOP, [width]);
  const isMobile = useMemo(() => width <= breakpoints.MOBILE_MAX, [width]);
  const enableReference = elementType === ElementTypeEnum.ProjectWorkExperience;

  const addReferenceOptions: DropdownValueType<string>[] = useMemo(
    () => [
      {
        value: 'ask_for_reference',
        key: 'ask_for_reference',
        type: 'value',
        label: t('noumena.chamber_edit.add_reference.ask_for_a_reference'),
        description: t('noumena.chamber_edit.publish_project'),
        disabled:
          !defaultData.body.length ||
          !defaultData.id?.length ||
          !(defaultData.status === ElementStatusEnum.Published),
      },
      {
        value: 'add_reference_manually',
        key: 'add_reference_manually',
        type: 'value',
        label: t('noumena.chamber_edit.add_manually'),
        disabled: !defaultData.id?.length,
      },
    ],
    [defaultData],
  );

  const setContent = useCallback(
    (value: string) => {
      setContentMain(value);
    },
    [setContentMain],
  );

  const {
    reset,
    trigger,
    setValue,
    formState: { isValid },
  } = useForm<EditElementSchema>({
    resolver: yupResolver(elementSchema),
    mode: 'all',
    reValidateMode: 'onBlur',
  });

  const handleChange = useCallback(
    (value: string) => {
      if (!Number.isNaN(value)) {
        const parsedValue = Number(value);
        setActiveTab(parsedValue);
      }
    },
    [setActiveTab],
  );

  const handleSaveChanges = useCallback(async () => {
    if (defaultData.title && !internalTitle) {
      addToast(
        'error',
        'none',
        t('noumena.chamber_edit.add_reference.empty_title'),
      );
      return;
    }
    if (content === `<p><br></p>` || !content) {
      addToast(
        'error',
        'none',
        t('noumena.chamber_edit.add_reference.empty_content'),
      );
      setContent('');
      return;
    }

    await handleAddOption(
      internalTitle,
      content,
      defaultData.id,
      defaultData.position,
    );
    setTimeout(() => {
      setLoader(false);
      onClose();
      reset();
    }, 1000);
  }, [
    defaultData.title,
    defaultData.id,
    defaultData.position,
    internalTitle,
    content,
    handleAddOption,
    onClose,
    reset,
    addToast,
    setContent,
  ]);

  const handleOpenReferenceModal = useCallback(
    (e: DropdownValueType<unknown>) => {
      if (e.key === 'add_reference_manually') {
        openReferenceModal('manually');
      } else {
        openReferenceModal('ask');
      }
    },
    [openReferenceModal],
  );

  const handleSaveNewExperience = useCallback(() => {
    setLoader(true);
    if (internalTitle !== defaultData.title || content !== defaultData.body) {
      handleSaveChanges();
    } else {
      onClose();
    }
  }, [
    internalTitle,
    defaultData.title,
    defaultData.body,
    content,
    handleSaveChanges,
    onClose,
  ]);

  const handleCloseModal = useCallback(() => {
    if (
      !internalTitle &&
      !content &&
      !defaultData.body &&
      !defaultData.title &&
      defaultData._id
    ) {
      handleDeleteOption(defaultData._id);
      onClose();
    } else if (
      internalTitle !== defaultData.title ||
      content !== defaultData.body
    ) {
      setShowDiscardExperienceModal();
    } else {
      onClose();
    }
  }, [
    content,
    defaultData,
    internalTitle,
    handleDeleteOption,
    onClose,
    setShowDiscardExperienceModal,
  ]);

  useEffect(() => {
    setValue('title', internalTitle);
    setValue('content', content);
    trigger('content');
    trigger('title');
  }, [internalTitle, content, setValue, trigger]);

  useEffect(() => {
    if (referenceData.length === 0) setActiveTab(0);
  }, [referenceData]);

  return (
    <Modal
      open={!!isOpen}
      size={ModalSize.XL}
      testId="add_experience_modal"
      isFullScreen={!isDesktop}
      onClose={handleCloseModal}
      enableCloseButton
      disableBackdropClick
      disableEscapeKeyDown
    >
      <ModalHeader
        maxTitleWidth={310}
        isFullScreen={!isDesktop}
        rightMobileContainer={
          <StyledSaveButtonTableMobile
            secondary={isValid}
            disabled={!isValid || loading}
            loading={loader}
            size="small"
            onClick={handleSaveNewExperience}
          >
            {t('noumena.chamber_edit.visibility.save')}
          </StyledSaveButtonTableMobile>
        }
        action={
          enableReference && (
            <Dropdown
              isPopperStyle
              isAnimation={false}
              containerStyle={{
                padding: '0',
              }}
              observerMinHeight="0px"
              hideIcons
              placement="bottom-start"
              options={addReferenceOptions}
              onSelectOption={handleOpenReferenceModal}
              usePortal={false}
            >
              {({
                targetProps,
                targetRef,
                toggle,
              }: DropdownTargetProps<HTMLButtonElement>) => (
                <StyledAddReferenceButton
                  ref={targetRef}
                  {...targetProps}
                  data-testid="add_reference_btn"
                  neutral={isDesktop}
                  primary={!isDesktop}
                  textOnly
                  leftIcon={
                    <Icon
                      name="add_m"
                      size={24}
                      color="--icon-button-brand-primary-default"
                    />
                  }
                  onClick={toggle}
                >
                  {t('noumena.chamber_edit.add_reference')}
                </StyledAddReferenceButton>
              )}
            </Dropdown>
          )
        }
      >
        {defaultData.title.length ? defaultData.title : propTitle}
      </ModalHeader>
      <ModalBody minHeight="55vh" isFullScreen={!isDesktop} noFooter>
        {referenceFetching && referenceData.length === 0 ? (
          <Spinner />
        ) : (
          <>
            {enableReference && references && referenceData.length ? (
              <TabContainer>
                <BasicChipsTabsForm
                  onChange={handleChange}
                  inputList={listOfTabs}
                  selectedId={activeTab.toString()}
                  mode="isBackground"
                  isWithoutImage
                  fontSize="--font-body-medium-regular-size"
                  textFont="--font-body-medium-regular-font"
                />
              </TabContainer>
            ) : (
              <></>
            )}
            {activeTab === 0 && (
              <StyledRichEditor>
                <EditElement
                  title={internalTitle}
                  content={content}
                  handleChangeTitle={setTitle}
                  handleChangeContent={setContent}
                  basicToolbar={false}
                />
              </StyledRichEditor>
            )}
            {activeTab === 1 && (
              <Infinite
                onFetchMore={fetchMoreReferences}
                status={infiniteState}
                scrollbarWidth={0}
                paddingBottom="15px"
                width="100%"
              >
                <ReferenceInnerContainer>
                  {referenceData.map((reference) => (
                    <ReferenceViewItem
                      key={reference._id}
                      {...{
                        reference,
                        loading,
                        isEditing,
                        approveReference,
                        rejectReference,
                        discardReference,
                        updateReference,
                        capacityOptions,
                      }}
                    />
                  ))}
                </ReferenceInnerContainer>
              </Infinite>
            )}
          </>
        )}
      </ModalBody>
      <ModalFooter isFullScreen={!isDesktop}>
        {!isMobile && (
          <StyledSaveButton
            primary={isValid || loading}
            disabled={!isValid}
            loading={loader}
            onClick={handleSaveNewExperience}
          >
            {t('noumena.chamber_edit.visibility.save')}
          </StyledSaveButton>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default memo(AddExperience);
