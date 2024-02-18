import { useCallback, useState, useEffect } from 'react';
import { useReference } from '@/features/noums/hooks/references';
import { Icon } from '@/components/Icon';

import { Button } from '@/components/Button';
import { ElementWrapper } from '@/screens/Chamber/components/ElementWrapper/ElementWrapper';
import { TSpan } from '@/components/Typography';
import { ElementContainer } from '@/screens/Chamber/components/elements/ElementContainer';
import {
  type SingleArrayOptionProps,
  HomeChamberOptions,
} from '../HomeChamberOptions';
import { useHomeChambers } from './useHomeChambers';
import AddExperience from './modals/AddExperience';
import { ViewExperience } from './modals/ViewExperience';
import DiscardExperience from './modals/DiscardExperience';
import AddManualReference from './modals/AddManualReference';
import AskForReference from './modals/AskForReference';
import {
  HomeChambersWrapper,
  ImageWrapper,
  StyledText,
  ButtonWrapper,
  StackWrapper,
  IconWrapper,
  HomeNoumAddContianer,
} from './styles';
import { type HomeChamberProps } from './types';

const HomeChambers = ({
  image,
  text,
  buttonText,
  elementType,
  isEditing,
  isBorder,
  wrapperProps,
  spaceId,
  position,
  bodyContentJson,
  elementId,
  hideContent,
  isHighlight,
  columnWidth,
}: HomeChamberProps) => {
  const {
    showExperienceModal,
    handleOpenExperienceModal,
    handleCloseExperienceModal,
    isAddedOption,
    arrayOfOption,
    handleAddOption,
    title,
    handleDeleteOption,
    defaultData,
    setDefaultData,
    showReferenceModal,
    handleCloseAddReferenceModal,
    handleOpenAddReferenceModal,
    updateElementLoader,
  } = useHomeChambers({
    elementType,
    spaceId,
    elementPosition: position,
    bodyContentJson,
    elementId,
    isEditing,
  });
  const {
    loading: referenceLoading,
    fetching: referenceFetching,
    setExperienceId,
    approveReference,
    rejectReference,
    discardReference,
    updateReference,
    referenceData,
    fetchMoreReferences,
    infiniteState,
    capacityOptions,
    onSubmitAskForReference,
    onSubmitManualReference,
    experienceId,
  } = useReference();

  useEffect(() => {
    if (defaultData.id) {
      setExperienceId(defaultData.id);
    }
  }, [defaultData.id, setExperienceId]);

  const [showDiscardExperienceModal, setShowDiscardExperienceModal] =
    useState(false);
  const [selectedOption, setSelectedOption] = useState<
    SingleArrayOptionProps | undefined
  >(undefined);

  const [showAll, setShowAll] = useState(!hideContent);

  const handleSelectOption = useCallback(
    (option: SingleArrayOptionProps) => {
      setSelectedOption(option);
      handleOpenExperienceModal();
    },
    [setSelectedOption, handleOpenExperienceModal],
  );

  const toggleShowDiscardExperienceModal = () => {
    setShowDiscardExperienceModal(!showDiscardExperienceModal);
  };

  const createExperienceAndOpenModal = async () => {
    handleOpenExperienceModal();
  };

  return (
    <>
      {!isAddedOption ? (
        <ElementWrapper
          isHighlight={isHighlight}
          isBorder={isBorder}
          {...wrapperProps}
          currentTitle={title}
          handleOpenExperienceModal={handleOpenExperienceModal}
          hideContent={hideContent}
        >
          {isEditing ? (
            <HomeNoumAddContianer>
              <StackWrapper
                padding="12px"
                fullWidth
                align="center"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenExperienceModal();
                }}
              >
                <TSpan font="body-m-bold"> {buttonText}</TSpan>
                <IconWrapper>
                  <Icon
                    name="plus_m"
                    size={20}
                    color="--icon-card-neutral-highlighted"
                  />
                </IconWrapper>
              </StackWrapper>
            </HomeNoumAddContianer>
          ) : (
            <HomeChambersWrapper data-testid="homechambers-testid">
              <>
                <ImageWrapper>
                  <Icon
                    name={image}
                    size={96}
                    color="--icon-placeholder-neutral-default"
                  />
                </ImageWrapper>
                <StyledText>{text}</StyledText>
                {isEditing && (
                  <ButtonWrapper>
                    <Button
                      secondary
                      size="small"
                      type="button"
                      onClick={handleOpenExperienceModal}
                    >
                      {buttonText}
                    </Button>
                  </ButtonWrapper>
                )}
              </>
            </HomeChambersWrapper>
          )}
        </ElementWrapper>
      ) : (
        <ElementContainer isBorderContent={isEditing} elementType={elementType}>
          <ElementWrapper
            isHighlight={isHighlight}
            isBorder={isBorder}
            {...wrapperProps}
            currentTitle={title}
            setShowAll={setShowAll}
            handleOpenExperienceModal={createExperienceAndOpenModal}
            updateElementLoader={referenceLoading || updateElementLoader}
          >
            <HomeChamberOptions
              isEditMode={isEditing}
              arrayOfOptions={arrayOfOption}
              handleOpenAddExperienceModal={handleOpenExperienceModal}
              handleDeleteOption={handleDeleteOption}
              handleSelectOption={handleSelectOption}
              setDefaultData={setDefaultData}
              isOpen={!showAll}
              columnWidth={columnWidth}
            />
          </ElementWrapper>
        </ElementContainer>
      )}
      <AddManualReference
        isOpen={showReferenceModal === 'manually'}
        onClose={handleCloseAddReferenceModal}
        capacityOptions={capacityOptions}
        referenceLoading={referenceLoading}
        onSubmitManualReference={onSubmitManualReference}
      />
      <AskForReference
        isOpen={showReferenceModal === 'ask'}
        onClose={handleCloseAddReferenceModal}
        capacityOptions={capacityOptions}
        referenceLoading={referenceLoading}
        onSubmitAskForReference={onSubmitAskForReference}
      />
      <DiscardExperience
        experienceId={experienceId}
        isOpen={showDiscardExperienceModal}
        onClose={toggleShowDiscardExperienceModal}
        handleCloseExperienceModal={handleCloseExperienceModal}
        handleDeleteOption={handleDeleteOption}
      />
      {showExperienceModal &&
        (isEditing ? (
          <AddExperience
            elementType={elementType}
            loading={referenceLoading || updateElementLoader}
            onClose={handleCloseExperienceModal}
            isOpen={showExperienceModal}
            setShowDiscardExperienceModal={toggleShowDiscardExperienceModal}
            {...{
              handleOpenAddReferenceModal,
              fetchMoreReferences,
              approveReference,
              rejectReference,
              discardReference,
              updateReference,
              handleAddOption,
              handleDeleteOption,
              referenceFetching,
              referenceData,
              infiniteState,
              defaultData,
              isEditing,
              title,
              capacityOptions,
            }}
          />
        ) : (
          <ViewExperience
            id={selectedOption?.id || ''}
            title={selectedOption?.title || ''}
            body={selectedOption?.body || ''}
            onClose={handleCloseExperienceModal}
            isOpen={showExperienceModal}
          />
        ))}
    </>
  );
};

export default HomeChambers;
