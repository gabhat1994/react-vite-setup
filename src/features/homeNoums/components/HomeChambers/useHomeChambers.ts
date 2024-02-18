import { useState, useEffect, useContext, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BodyContentEnum,
  ElementStatusEnum,
  ElementTypeEnum,
  NoumLayoutStatusFilter,
} from '@/apollo/generated/types';
import { DisablePublishOrDraftContext } from '@/providers';
import { useUpdateElementHelper } from '@/features/noums/hooks/spaceQuery';
import { isArray, last } from 'lodash';
import { getToolElement } from '@/screens/Chamber/components/SectionElementRearrange/rearrangeHelper';
import { useNoumDetails } from '@/features/noums/hooks/noums';
import { type UseHomeChambersProps } from './types';
import { type SingleArrayOptionProps } from '../HomeChamberOptions';

const parseArrayOption = (data: unknown): SingleArrayOptionProps[] => {
  const jsonData = typeof data === 'string' ? JSON.parse(data) : data;
  return isArray(jsonData)
    ? jsonData.map((item) => ({
        ...item,
        id: item?._id || '',
        status: ElementStatusEnum.Published,
      }))
    : [];
};

export const useHomeChambers = ({
  spaceId,
  elementId,
  elementType,
  elementPosition,
  bodyContentJson = '[]',
  isEditing,
}: UseHomeChambersProps) => {
  const { space } = useNoumDetails(
    spaceId,
    isEditing
      ? NoumLayoutStatusFilter.Unpublished
      : NoumLayoutStatusFilter.Published,
  );
  const { setDisableUpdate } = useContext(DisablePublishOrDraftContext);

  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [showReferenceModal, setShowReferenceModal] = useState<
    'manually' | 'ask' | ''
  >('');
  const { t } = useTranslation();
  const [defaultData, setDefaultData] = useState<
    Omit<SingleArrayOptionProps, 'position'> & {
      position?: number;
    }
  >({
    id: '',
    title: '',
    body: '',
    status: ElementStatusEnum.Unsaved,
  });

  const [arrayOfOption, setArrayOfOptions] = useState<SingleArrayOptionProps[]>(
    [],
  );
  useEffect(() => {
    setArrayOfOptions(parseArrayOption(bodyContentJson));
  }, [bodyContentJson]);
  const handleCloseExperienceModal = () => {
    setDefaultData({
      id: '',
      title: '',
      body: '',
      status: ElementStatusEnum.Unsaved,
    });
    setShowExperienceModal(false);
  };
  const handleCloseAddReferenceModal = () => {
    setShowReferenceModal('');
  };
  const handleOpenAddReferenceModal = (arg: 'manually' | 'ask') => {
    setShowReferenceModal(arg);
  };

  const { updateElementHelper, loading: updateElementLoader } =
    useUpdateElementHelper();

  useEffect(() => {
    setDisableUpdate(updateElementLoader);
  }, [setDisableUpdate, updateElementLoader]);

  const addReferenceData = {
    [ElementTypeEnum.ProjectWorkExperience]: {
      title: t('noumena.homeChambers.addExperience'),
    },
    [ElementTypeEnum.EducationTraining]: {
      title: t('noumena.homeChambers.addEducation'),
    },
    [ElementTypeEnum.AchievementAward]: {
      title: t('noumena.homeChambers.addAchievement'),
    },
    [ElementTypeEnum.PublicationDesignPatterns]: {
      title: t('noumena.homeChambers.addNew'),
    },
    [ElementTypeEnum.PersonalInterest]: {
      title: t('noumena.homeChambers.addNew'),
    },
    [ElementTypeEnum.SocialInterest]: {
      title: t('noumena.homeChambers.addNew'),
    },
  };
  const dataForAddReference = addReferenceData[elementType];

  const handleOpenExperienceModal = () => {
    setIsAddedOption(true);
    setShowExperienceModal(true);
  };
  const handleAddOption = useCallback(
    async (title: string, body: string, _id: string, position?: number) => {
      if (typeof position === 'number') {
        const newArray = arrayOfOption.map((el, loopPosition) => {
          if (position === loopPosition) {
            return {
              ...el,
              title,
              body,
            };
          }
          return el;
        });
        setArrayOfOptions(newArray);
      } else {
        if (!elementId) return;
        const response = await updateElementHelper(spaceId, {
          elementId,
          bodyContentJson: [
            ...arrayOfOption,
            { _id, body, title, position: arrayOfOption.length },
          ],
          position: elementPosition,
          status: ElementStatusEnum.Unsaved,
          bodyContentType: BodyContentEnum.Json,
        });
        if (response) {
          const { element: foundElement } = getToolElement(
            elementId,
            space?.layout?.sections,
          );
          if (!foundElement?.unSaved?.bodyContentJson) return;
          const newOption = foundElement.unSaved.bodyContentJson.map(
            (item: SingleArrayOptionProps) => ({
              ...item,
              id: item._id,
            }),
          );

          const newestElement = last(newOption) as SingleArrayOptionProps;
          if (!newestElement) return;
          setDefaultData({
            ...newestElement,
            status: ElementStatusEnum.Unsaved,
          });
        }
      }
    },
    [
      arrayOfOption,
      elementId,
      updateElementHelper,
      spaceId,
      elementPosition,
      space?.layout?.sections,
    ],
  );

  const handleDeleteOption = async (id: string) => {
    await updateElementHelper(spaceId, {
      elementId,
      bodyContentJson: arrayOfOption.filter((el) => el.id !== id),
      position: elementPosition,
      status: ElementStatusEnum.Unsaved,
      bodyContentType: BodyContentEnum.Json,
    });
  };

  const [isAddedOption, setIsAddedOption] = useState(false);

  useEffect(() => {
    if (arrayOfOption?.length && !isAddedOption) {
      setIsAddedOption(true);
    }
    if (!arrayOfOption?.length && isAddedOption) {
      setIsAddedOption(false);
    }
  }, [arrayOfOption, isAddedOption]);

  const sectionTitle = {
    [ElementTypeEnum.ProjectWorkExperience]: t(
      'noumena.homeChambers.addExperience.currentTitle',
    ),
    [ElementTypeEnum.EducationTraining]: t(
      'noumena.homeChambers.addEducation.currentTitle',
    ),
    [ElementTypeEnum.AchievementAward]: t(
      'noumena.homeChambers.addAchievement.currentTitle',
    ),
    [ElementTypeEnum.PublicationDesignPatterns]: t(
      'noumena.homeChambers.publicationAndDesign.currentTitle',
    ),
    [ElementTypeEnum.PersonalInterest]: t(
      'noumena.homeChambers.personalInterest.currentTitle',
    ),
    [ElementTypeEnum.SocialInterest]: t(
      'noumena.homeChambers.socialInterest.currentTitle',
    ),
    [ElementTypeEnum.Calendar]: t('noumena.homeChambers.calendar.currentTitle'),
  };

  return {
    dataForAddReference,
    showExperienceModal,
    handleOpenExperienceModal,
    handleCloseExperienceModal,
    showReferenceModal,
    handleCloseAddReferenceModal,
    handleOpenAddReferenceModal,
    handleAddOption,
    arrayOfOption,
    handleDeleteOption,
    isAddedOption,
    title: sectionTitle[elementType],
    setDefaultData,
    defaultData,
    updateElementLoader,
    setArrayOfOptions,
    loading: updateElementLoader,
  };
};
