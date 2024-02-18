import { useCallback, useEffect, useState } from 'react';
import { t } from 'i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { Modal, ModalBody, ModalFooter } from '@/components/ExtendedModal';
import { ModalSize } from '@/components/ExtendedModal/types';
import { Button } from '@/components/Button';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { Spacer } from '@/layout';
import { breakpoints } from '@/constants/devices';
import { useLaunchDarkly, useToast, useWindowDimensions } from '@/hooks';
import {
  HeaderContainerNonModal,
  ModalHeader,
  StyledRichEditor,
  StyledSaveButton,
  StyledSaveButtonTableMobile,
  TabContainer,
} from './styles';
import {
  type AddReferenceNonModalProps,
  type EditElementSchema,
} from './types';
import { listOfTabs } from './data';
import EditReference from './EditReference';
import { EditElement } from './EditElement';

const AddReferenceNonModal = ({
  title: propsTitle,
  isEmpty = true,
  onClose,
  handleAddOption,
  defaultData,
  basicToolbar = true,
  loading,
}: AddReferenceNonModalProps) => {
  const { addToast } = useToast();
  const {
    flags: { references },
  } = useLaunchDarkly();
  const { width, height } = useWindowDimensions();
  const isDesktop = width > breakpoints.TABLET_L;
  const isTablet = width > breakpoints.MOBILE_MAX;

  const [addReferences, setAddReferences] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState(0);
  const [internalTitle, setTitle] = useState<string>(defaultData.title);
  const [content, setContent] = useState<string>(defaultData.body);

  const elementSchema = yup
    .object({
      title: yup.string().required(),
      content: yup.string().required(),
    })
    .required();

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

  const handleChange = (value: string) => {
    const parsedValue = Number(value);
    setActiveTab(parsedValue);
  };

  const handleSaveChanges = useCallback(async () => {
    if (!internalTitle) {
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

    await handleAddOption({
      title: internalTitle,
      body: content,
      _id: defaultData.id,
      position: defaultData.position,
    });
    reset();
  }, [
    internalTitle,
    content,
    handleAddOption,
    reset,
    addToast,
    defaultData.id,
    defaultData.position,
  ]);

  useEffect(() => {
    setValue('title', internalTitle);
    setValue('content', content);
    trigger('content');
    trigger('title');
  }, [internalTitle, content, setValue, trigger]);

  return (
    <Modal
      testId="testAddReferenceNonModal"
      open={true}
      onClose={onClose}
      hasBackButton={!isDesktop}
      enableCloseButton={isDesktop}
      size={ModalSize.XL}
      disableBackdropClick
    >
      {activeTab === 0 && (
        <>
          <ModalHeader
            rightMobileContainer={
              <StyledSaveButtonTableMobile
                primary={isValid}
                disabled={!isValid}
                size="small"
                onClick={handleSaveChanges}
              >
                {t('noumena.chamber_edit.visibility.save')}
              </StyledSaveButtonTableMobile>
            }
            action={
              references &&
              basicToolbar && (
                <Button
                  data-testid="add_reference_btn"
                  textOnly
                  leftIcon={
                    <Icon
                      name="add_m"
                      size={24}
                      color="--icon-button-brand-primary-default"
                    />
                  }
                  onClick={() => setAddReferences(false)}
                >
                  {t('noumena.chamber_edit.add_reference')}
                </Button>
              )
            }
          >
            <TSpan
              font="heading-xs-bold"
              colorToken="--text-modal-header-neutral-default"
            >
              {propsTitle}
            </TSpan>
          </ModalHeader>

          <ModalBody
            minHeight={
              isDesktop && height < 720 ? 'calc(100vh - 296px)' : '55vh'
            }
          >
            <StyledRichEditor>
              <EditElement
                title={internalTitle}
                content={content}
                handleChangeTitle={setTitle}
                handleChangeContent={setContent}
              />
            </StyledRichEditor>
          </ModalBody>

          {isDesktop && (
            <ModalFooter marginTop={isDesktop && height < 720 ? 16 : 24}>
              <StyledSaveButton
                primary={!isEmpty || isValid}
                disabled={!isValid}
                loading={loading}
                onClick={handleSaveChanges}
              >
                {t('noumena.chamber_edit.visibility.save')}
              </StyledSaveButton>
            </ModalFooter>
          )}
        </>
      )}

      {activeTab === 1 && (
        <HeaderContainerNonModal
          isEditReference={!isDesktop && !isTablet}
          gridTemplateColumns={
            !isDesktop && isTablet ? '50px 1fr 50px' : undefined
          }
        >
          <Icon
            name="arrow_left_m"
            size={24}
            color="--icon-button-brand-primary-default"
            onClick={() => setActiveTab(0)}
          />
          {!isDesktop && !isTablet && <Spacer height={20} />}
          <TSpan
            colorToken="--text-modal-header-neutral-default"
            style={{
              alignSelf: 'center',
            }}
            font="heading-xs-bold"
          >
            {t('noumena.chamber_edit.add_reference.title')}
          </TSpan>
        </HeaderContainerNonModal>
      )}
      {addReferences && activeTab === 0 && (
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
      )}
      {addReferences && activeTab === 1 && (
        <EditReference onClose={() => setActiveTab(0)} />
      )}
    </Modal>
  );
};

export default AddReferenceNonModal;
