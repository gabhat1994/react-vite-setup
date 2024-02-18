import { useState, useEffect, useRef } from 'react';
import { t } from 'i18next';
import { Icon } from '@/components/Icon';
import { ElementDelete } from '@/screens/Chamber/components/modals/ElementDelete';
import {
  SingleOptionHeader,
  SingleOptionWrapper,
  TextHeader,
  ChamberEditButton,
  ChamberDeleteButton,
  ShowMoreWrapper,
  ShowMoreButton,
} from './styles';
import { type SingleArrayOptionProps, type SingleOptionsProps } from './types';

const SingleOption = ({
  id,
  title,
  body,
  isEditMode = false,
  status,
  position,
  isOpen: isOpenByDefault,
  handleOpenAddExperienceModal,
  handleDeleteOption,
  handleSelectOption,
  setDefaultData,
  isContianerWidth,
}: SingleOptionsProps) => {
  const singleOptionWrapperRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [openedAlways, setOpenedAlways] = useState(isOpenByDefault);
  const [previousBody, setPreviousBody] = useState(body);

  useEffect(() => {
    if (previousBody !== body) {
      setPreviousBody(body);
    }
  }, [previousBody, body]);

  useEffect(() => {
    setOpenedAlways(isOpenByDefault);
  }, [isOpenByDefault]);
  const [isOverFlow, setIsOverFlow] = useState<boolean>(false);

  const isOpenModal = isOpen || openedAlways;

  const handleSetValues = () => {
    setDefaultData({ id, title, body, position: position || 0, status });
    handleOpenAddExperienceModal();
  };

  useEffect(() => {
    if (isEditMode) {
      setOpenedAlways(true);
    }
  }, [isEditMode]);

  useEffect(() => {
    if (!isEditMode && singleOptionWrapperRef.current) {
      if (singleOptionWrapperRef.current.clientHeight > 250) {
        setIsOverFlow(true);
      } else {
        setIsOverFlow(false);
      }
    }
  }, [singleOptionWrapperRef, isEditMode, isOpenModal]);

  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const handleDeleteItem = () => {
    setIsDeleteModal(false);
    handleDeleteOption(id);
  };

  const headerHandler = () => {
    if (!isEditMode) {
      handleSelectOption({
        id,
        body,
        title,
      } as SingleArrayOptionProps);
    } else {
      setIsOverFlow((prev) => {
        if (isEditMode) return prev;
        setIsOpen(prev);
        return !prev;
      });
    }
  };

  return (
    <>
      <SingleOptionWrapper
        data-testid="SingleOptionWrapper"
        ref={singleOptionWrapperRef}
        isOverLap={isOverFlow}
        isContianerWidth={isContianerWidth}
      >
        <SingleOptionHeader
          data-testid="SingleOptionHeader"
          isEditMode={isEditMode}
          onClick={headerHandler}
        >
          <TextHeader
            font="body-m-bold"
            colorToken="--text-card-header-neutral-highlighted"
          >
            {title}
          </TextHeader>
          {!isEditMode && (
            <Icon
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                headerHandler();
              }}
              name={isOpen ? 'chevron_small_down_m' : 'chevron_small_right_m'}
              size={24}
              color="--icon-button-neutral-default"
            />
          )}
          {isEditMode && (
            <ChamberEditButton
              tertiary
              size="small"
              onClick={(event) => {
                event.stopPropagation();
                handleSetValues();
              }}
            >
              <Icon
                name="edit_m"
                size={24}
                color="--icon-card-neutral-default"
              />
            </ChamberEditButton>
          )}
          {isEditMode && (
            <ChamberDeleteButton
              secondary
              size="small"
              intent="negative"
              onClick={(event) => {
                event.stopPropagation();
                setIsDeleteModal(true);
              }}
            >
              <Icon
                name="delete_m"
                size={24}
                color="--icon-button-danger-secondary-default"
              />
            </ChamberDeleteButton>
          )}
        </SingleOptionHeader>

        {!isEditMode &&
          !isOpen &&
          (isOverFlow ? (
            <ShowMoreWrapper data-testid="ShowMoreWrapper">
              <ShowMoreButton
                onClick={() => {
                  handleSelectOption({
                    id,
                    body,
                    title,
                  } as SingleArrayOptionProps);
                  setIsOverFlow((prev) => !prev);
                }}
              >
                {t('noumena.chambers.toolbox.button.seemore')}
              </ShowMoreButton>
            </ShowMoreWrapper>
          ) : (
            <></>
          ))}
      </SingleOptionWrapper>
      <ElementDelete
        spaceId=""
        elementId=""
        elementTitle={title}
        isOpen={isDeleteModal}
        handleClose={() => setIsDeleteModal(false)}
        handleDeleteProps={handleDeleteItem}
      />
    </>
  );
};

export default SingleOption;
