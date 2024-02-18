import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useHomeChambers,
  HomeChambersWrapper,
  AddReferenceNonModal,
} from '@/features/homeNoums/components/HomeChambers';
import {
  type SingleArrayOptionProps,
  HomeChamberOptions,
} from '@/features/homeNoums/components/HomeChamberOptions';
import {
  useAddElementsHelper,
  usePublishElementStateHelper,
  usePublishNoumLayoutHelper,
  useUpdateElementHelper,
} from '@/features/noums/hooks/spaceQuery';

import { Button } from '@/components/Button';
import { Spacer } from '@/layout';
import { Icon } from '@/components/Icon';
import {
  BodyContentEnum,
  type CreateElementInput,
  type ElementInput,
  ElementStatusEnum,
  ElementTypeEnum,
} from '@/apollo/generated/types';
import { SpaceUtils } from '@/utils/space';
import { ElementUtils } from '@/utils/element';
import { homeChamberUtils } from '@/utils/homeChambersElements';
import { TSpan } from '@/components/Typography/Typography';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@/components/ExtendedModal';
import { ModalSize } from '@/components/ExtendedModal/types';
import { useAuth } from '@/features/auth/contexts';
import { useProfileCompletenessHelper } from '@/features/noums/hooks/noums';
import { isArray } from 'lodash';
import { type HomeChambersEnum } from '../../Element/types';
import { InitialMode } from './InitialMode';
import {
  AddExpButtonWrapper,
  AddNewListItemButton,
  FormElements,
  ImageWrapper,
} from './styles';
import { type HomeNoumProjectWorkExperienceProps } from './types';

export const HomeNoumProjectWorkExperience = memo(
  (props: HomeNoumProjectWorkExperienceProps) => {
    const { t } = useTranslation();
    const { masterId: spaceId } = useAuth();
    const { space } = useProfileCompletenessHelper();
    const { addElementsHelper, loading: addElementsLoading } =
      useAddElementsHelper();

    const element = SpaceUtils.getElementInSpaceByType(
      space,
      props.elementType,
    );
    const bodyContentJson = ElementUtils.getBodyContentJson(element);
    const [showAll] = useState(true);

    const {
      dataForAddReference,
      handleOpenExperienceModal,
      handleCloseExperienceModal,
      isAddedOption,
      arrayOfOption,
      title,
      handleDeleteOption,
      defaultData,
      setDefaultData,
      showExperienceModal,
      loading: loadingHomeChamberAction,
    } = useHomeChambers({
      elementType:
        (element.elementType as HomeChambersEnum) ?? props.elementType,
      spaceId,
      elementPosition: element.position ?? props.position,
      bodyContentJson,
      elementId: element?._id || undefined,
    });

    const homeChambersObject = homeChamberUtils.getHomeChamberElementByType(
      (element.elementType as HomeChambersEnum) || props.elementType,
    );

    const [, setSelectedOption] = useState<SingleArrayOptionProps | undefined>(
      undefined,
    );
    const { publishNoumLayoutHelper, loading: publishNoumLayoutLoading } =
      usePublishNoumLayoutHelper();
    const { updateElementHelper, loading: updateElementLoader } =
      useUpdateElementHelper();

    const { publishElementStateHelper, loading: publishElementLoader } =
      usePublishElementStateHelper();

    const elementInputData: CreateElementInput = useMemo(
      () => ({
        status: ElementStatusEnum.Published,
        bodyContentType: BodyContentEnum.Json,
        bodyContentJson: arrayOfOption,
        position: element.position ?? props.position,
        percentCompleted: 100,
        elementType:
          (element.elementType as HomeChambersEnum) ?? props.elementType,
      }),
      [
        arrayOfOption,
        element.elementType,
        element.position,
        props.elementType,
        props.position,
      ],
    );

    const loading =
      addElementsLoading ||
      updateElementLoader ||
      publishNoumLayoutLoading ||
      publishElementLoader ||
      loadingHomeChamberAction;

    const handleSelectOption = useCallback(
      (option: SingleArrayOptionProps) => {
        setSelectedOption(option);
        handleOpenExperienceModal();
      },
      [setSelectedOption, handleOpenExperienceModal],
    );

    const handleAddNewElement = useCallback(
      async (data: Partial<SingleArrayOptionProps>) => {
        let isSuccess;
        let elementIds = null;
        if (element?._id) {
          elementIds = [element._id];
          const updateElementInput: ElementInput = {
            ...elementInputData,
            elementId: element._id,
          };
          if (data._id) {
            if (isArray(bodyContentJson) && bodyContentJson.length > 0) {
              updateElementInput.bodyContentJson = bodyContentJson.map(
                (bodyContentJsonItem: Partial<SingleArrayOptionProps>) =>
                  bodyContentJsonItem._id === data._id
                    ? { ...bodyContentJsonItem, ...data }
                    : bodyContentJsonItem,
              );
            }
          } else {
            updateElementInput.bodyContentJson = [...arrayOfOption, data];
          }
          isSuccess = await updateElementHelper(spaceId, updateElementInput);
        } else {
          const newElementinput: CreateElementInput = {
            ...elementInputData,
            bodyContentJson: [data],
            position: 0,
          };
          const responseAddElements = await addElementsHelper(
            spaceId,
            newElementinput,
          );
          if (responseAddElements?.data?.addElements) {
            elementIds = ElementUtils.getElementIds(
              responseAddElements?.data?.addElements,
            );
            isSuccess = true;
          }
        }
        if (isSuccess) {
          if (elementIds && elementIds?.length > 0) {
            await publishElementStateHelper(
              spaceId,
              [ElementStatusEnum.Unsaved, ElementStatusEnum.Draft],
              ElementStatusEnum.Published,
              elementIds,
            );
          }
          if (!element._id) props.handleSuccess();
          handleCloseExperienceModal();
        }
      },
      [
        element._id,
        elementInputData,
        updateElementHelper,
        spaceId,
        bodyContentJson,
        arrayOfOption,
        addElementsHelper,
        props,
        handleCloseExperienceModal,
        publishElementStateHelper,
      ],
    );
    const handleSaveAndPublish = useCallback(async () => {
      let elementIds;

      if (!element._id) {
        const responseAddElements = await addElementsHelper(
          spaceId,
          elementInputData,
        );
        elementIds = ElementUtils.getElementIds(
          responseAddElements?.data?.addElements,
        );
      } else {
        const updateElementInput: ElementInput = {
          ...elementInputData,
          elementId: element._id,
        };
        await updateElementHelper(spaceId, updateElementInput);
        elementIds = [element._id];
      }
      await publishNoumLayoutHelper(spaceId);

      const isPublishSuccess = await publishElementStateHelper(
        spaceId,
        [ElementStatusEnum.Unsaved, ElementStatusEnum.Draft],
        ElementStatusEnum.Published,
        elementIds,
      );

      if (isPublishSuccess) {
        props.handleSuccess();
      }
    }, [
      addElementsHelper,
      element._id,
      elementInputData,
      props,
      publishNoumLayoutHelper,
      publishElementStateHelper,
      spaceId,
      updateElementHelper,
    ]);

    const handleClose = useCallback(() => {
      props.handleClose(true);
    }, [props]);

    if (showExperienceModal) {
      return (
        <AddReferenceNonModal
          loading={loading}
          onClose={handleCloseExperienceModal}
          handleAddOption={handleAddNewElement}
          defaultData={defaultData as SingleArrayOptionProps}
          basicToolbar={
            props.elementType === ElementTypeEnum.ProjectWorkExperience
          }
          {...dataForAddReference}
        />
      );
    }

    return (
      <Modal
        testId="testHomeNoumProjectWorkExperience"
        open={props.isOpen}
        onClose={handleClose}
        enableCloseButton={!showExperienceModal}
        size={ModalSize.XL}
        disableBackdropClick
      >
        <ModalHeader>
          {arrayOfOption.length > 0 && homeChambersObject.AddNewbuttonText && (
            <AddNewListItemButton
              secondary
              size="small"
              type="button"
              onClick={handleOpenExperienceModal}
            >
              {homeChambersObject.AddNewbuttonText}
            </AddNewListItemButton>
          )}
          <InitialMode
            title={title}
            loading={loading || updateElementLoader || publishElementLoader}
            arrayOfOption={arrayOfOption}
            handleOpenExperienceModal={handleOpenExperienceModal}
            onSubmit={handleSaveAndPublish}
            buttonText={homeChambersObject.AddNewbuttonText || ''}
          />
        </ModalHeader>
        <ModalBody>
          <FormElements isAddedOption={isAddedOption}>
            {!isAddedOption ? (
              <>
                <HomeChambersWrapper data-testid="homechambers-testid">
                  <ImageWrapper>
                    <Icon
                      color="--icon-card-placeholder-neutral-default"
                      name={homeChambersObject.image}
                      size={96}
                    />
                  </ImageWrapper>
                  <Spacer height={18} />
                  <TSpan
                    font="body-xl"
                    colorToken="--text-placeholder-neutral-default"
                  >
                    {homeChambersObject.text}
                  </TSpan>
                  <Spacer height={16} />
                  <AddExpButtonWrapper>
                    <Button
                      secondary
                      size="small"
                      type="button"
                      onClick={handleOpenExperienceModal}
                    >
                      {homeChambersObject.buttonText}
                    </Button>
                  </AddExpButtonWrapper>
                </HomeChambersWrapper>
              </>
            ) : (
              <HomeChamberOptions
                isEditMode={true}
                arrayOfOptions={arrayOfOption}
                handleOpenAddExperienceModal={handleOpenExperienceModal}
                handleDeleteOption={handleDeleteOption}
                handleSelectOption={handleSelectOption}
                setDefaultData={setDefaultData}
                isOpen={!showAll}
              />
            )}
          </FormElements>
        </ModalBody>
        {arrayOfOption?.length > 0 && (
          <ModalFooter>
            <Button
              onClick={handleSaveAndPublish}
              primary
              size="large"
              loading={loading}
              secondary={arrayOfOption?.length <= 0}
              tertiary={arrayOfOption?.length <= 0}
              disabled={arrayOfOption?.length <= 0 || loading}
            >
              {t('noumena.homenoum.save_and_publish')}
            </Button>
          </ModalFooter>
        )}
      </Modal>
    );
  },
);
