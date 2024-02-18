import { forwardRef, type Ref, useCallback } from 'react';
import { ElementTypeEnum } from '@/apollo/generated/types';
import { Icon } from '@/components/Icon';
import { ElementUtils } from '@/utils/element';
import { TSpan } from '@/components/Typography';
import {
  ChamberAddButton,
  HeadContent,
  WrapperHead,
  WrapperHeadActionButtons,
  WrapperTitleNoEdit,
} from './styles';
import { type ElementWrapperProps } from './types';

export const EditMode = forwardRef(
  (
    {
      element,
      currentTitle = '',
      handleOpenExperienceModal,
      updateElementLoader,
    }: ElementWrapperProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const elementType = element.elementType as ElementTypeEnum;
    const isHomeNoumType = ElementUtils.isHomeNoumType(elementType);

    const isVisibleAddBtn =
      elementType === ElementTypeEnum.PublicationDesignPatterns ||
      elementType === ElementTypeEnum.EducationTraining ||
      elementType === ElementTypeEnum.AchievementAward ||
      elementType === ElementTypeEnum.PersonalInterest ||
      elementType === ElementTypeEnum.SocialInterest ||
      elementType === ElementTypeEnum.ProjectWorkExperience;

    const handlePlusClick = useCallback(
      (e) => {
        e.stopPropagation();
        if (handleOpenExperienceModal) {
          handleOpenExperienceModal(elementType);
        }
      },
      [elementType, handleOpenExperienceModal],
    );

    return (
      <WrapperHead isEditing data-testid="wrapperEditing" ref={ref}>
        <HeadContent data-testid="headContent">
          {(isHomeNoumType ||
            elementType === ElementTypeEnum.Message ||
            elementType === ElementTypeEnum.Wallet ||
            elementType === ElementTypeEnum.QuickQuestions ||
            elementType === ElementTypeEnum.Skills ||
            elementType === ElementTypeEnum.Calendar ||
            elementType === ElementTypeEnum.FilesManager ||
            elementType === ElementTypeEnum.ContractManager ||
            elementType === ElementTypeEnum.Userposts) && (
            <WrapperTitleNoEdit>
              <TSpan
                font="heading-xs-bold"
                colorToken="--text-body-header-neutral-default"
              >
                {currentTitle}
              </TSpan>
            </WrapperTitleNoEdit>
          )}
        </HeadContent>

        <WrapperHeadActionButtons>
          {isVisibleAddBtn && (
            <ChamberAddButton
              secondary
              type="button"
              data-testid="addBtn"
              size="small"
              onClick={(e) => handlePlusClick(e)}
              loading={updateElementLoader}
            >
              <Icon
                color="--icon-button-brand-secondary-default"
                name="plus_m"
                size={24}
              />
            </ChamberAddButton>
          )}
        </WrapperHeadActionButtons>
      </WrapperHead>
    );
  },
);
