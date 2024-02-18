import { useCallback, useEffect, useMemo, useState } from 'react';
import { flatten } from 'lodash';
import { useSearchParams } from 'react-router-dom';
import updateSubNoums, {
  calculateVisibilityLevel,
  findParentNoum,
  getLinkedNoumsOfNoum,
  getSubNoums,
  getUniqueItems,
} from '@/screens/LinkNoum/helper';
import { useToggle } from '@/hooks';
import {
  type NoumVisibility,
  type OptionType,
  VisibiltiyType,
} from '@/screens/LinkNoum/types';

const useSelectNoumsToLink = ({
  getDefaultNoumLink,
  getDefaultNoum,
}: {
  getDefaultNoumLink: (noumLinkId: string) => Promise<false | OptionType[]>;
  getDefaultNoum: (noumId: string) => Promise<false | OptionType>;
}) => {
  const [searchParams] = useSearchParams();
  const [selectedOption, setSelectedOption] = useState<OptionType>();
  const [existingLinkedNoum, setExistingLinkedNoum] = useState<OptionType[]>();
  const [optionState, setOptionState] = useState<OptionType[]>([]);
  const [defaultOptionState, setDefaultOptionState] = useState<OptionType[]>(
    [],
  );
  const [pageLoader, setPageLoader] = useState(false);
  const [globalChecked, setGlobalChecked] = useState<{
    [key: string]: OptionType[];
  }>({});

  const [visibilityLevelSettings, setVisibilityLevelSettings] = useState({
    [VisibiltiyType.Public]: 0,
    [VisibiltiyType.Private]: 0,
    [VisibiltiyType.Secret]: 0,
  });
  const [acceptedWarning, setWarning] = useState(false);
  const [showCompletedModal, toggleShowCompletedModal] = useToggle(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showVisibilityModal, toggleShowVisibilityModal] = useState(false);
  const [showLinkExistingNoumModal, toggleShowLinkExistingNoumModal] =
    useState(false);

  const previewOptions = useMemo(
    () => flatten(Object.values(globalChecked)),
    [globalChecked],
  );

  const checkedOptions = useMemo(
    () => optionState.filter((item) => item.checked),
    [optionState],
  );

  const parentNoumsLength = useMemo(() => {
    const filtered = previewOptions.filter((option) => !option.isSubNoum);
    return filtered.length;
  }, [previewOptions]);

  const subNoums = useMemo(() => getSubNoums(globalChecked), [globalChecked]);

  const currentVisibilityLevel = useMemo(
    () => calculateVisibilityLevel(previewOptions),
    [previewOptions],
  );

  useEffect(() => {
    setGlobalChecked({});
  }, []);

  useEffect(() => {
    setWarning(false);
  }, [checkedOptions]);

  const handleSetPreSelectedNoum = useCallback(
    async (paramId: string) => {
      const response = await getDefaultNoum(paramId);
      if (response) {
        setGlobalChecked((prevState) => ({
          ...prevState,
          [searchParams.get('preselect') as string]: [response],
        }));
        setDefaultOptionState((dOS) => [response, ...dOS]);
        const { visibility } = response;
        updateVisibilitySettings(visibility, true);
      }
    },
    [getDefaultNoum, searchParams],
  );

  const handleSetPreSelectedMultipleNoums = useCallback(
    async (noumID: string) => {
      const response = await getDefaultNoumLink(noumID);
      if (response) {
        setGlobalChecked((prevState) => ({
          ...prevState,
          [searchParams.get('linkID') as string]: response,
        }));
        setDefaultOptionState((dos) => [...response, ...dos]);
        const { visibility } = response[0];
        updateVisibilitySettings(visibility, true);
      }
    },
    [getDefaultNoumLink, searchParams],
  );

  useEffect(
    () => {
      const paramId = searchParams.get('preselect');
      if (paramId?.length) {
        handleSetPreSelectedNoum(paramId);
      }
      const noumLinkID = searchParams.get('linkID');
      if (noumLinkID) {
        handleSetPreSelectedMultipleNoums(noumLinkID);
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams],
  );

  const verifyAndReturnInGlobalChecked = useCallback(
    (spaceId: string) => {
      const value =
        globalChecked[spaceId] ||
        previewOptions.find(({ spaceId: optionsId }) => optionsId === spaceId);
      if (value) {
        return value;
      }
      return false;
    },
    [globalChecked, previewOptions],
  );

  const updateVisibilitySettings = (
    visibility: NoumVisibility,
    increment = false,
  ) => {
    setVisibilityLevelSettings((prev) => ({
      ...prev,
      [visibility]: increment ? prev[visibility] + 1 : prev[visibility] - 1,
    }));
  };

  const updateOption = useCallback(
    async (newOption?: OptionType) => {
      const { foundOption, foundOptionIdx } = findParentNoum(
        optionState,
        newOption?.spaceId || '',
      );
      if (foundOption) {
        const {
          checked,
          spaceId,
          linkId = '',
          linked,
          visibility,
        } = foundOption;
        let subNoumsLinked: OptionType[] = [];
        if (linked > 0) {
          setPageLoader(true);
          const response = await getDefaultNoumLink(linkId);
          if (response) {
            const linkedNoumsOfNoum = getLinkedNoumsOfNoum(response, spaceId);
            subNoumsLinked = linkedNoumsOfNoum;
            setExistingLinkedNoum(linkedNoumsOfNoum);
          }
          setPageLoader(false);
        }
        const { newState, toBeAppended } = updateSubNoums(
          foundOptionIdx,
          optionState,
          undefined,
          subNoumsLinked.filter(
            ({ spaceId: subSpaceId }) => subSpaceId !== spaceId,
          ),
        );
        if (!checked) {
          updateVisibilitySettings(visibility, true);
          setGlobalChecked((prev) => ({
            ...prev,
            [spaceId]: toBeAppended,
          }));
        } else {
          const currentGlobal = { ...globalChecked };
          delete currentGlobal[spaceId];
          setGlobalChecked(currentGlobal);
          updateVisibilitySettings(visibility, false);
        }
        if (!checked) {
          const newNoums = checked ? getUniqueItems(newState) : newState;
          setOptionState(newNoums);
        }
        setPageLoader(false);
      }
    },
    [getDefaultNoumLink, globalChecked, optionState],
  );

  const fetchAndToggleExistingLinkModal = useCallback(
    async (foundOption: OptionType) => {
      toggleShowLinkExistingNoumModal(true);
      const { linkId = '', spaceId } = foundOption;
      const response = await getDefaultNoumLink(linkId);
      if (response) {
        const linkedNoumsOfNoum = getLinkedNoumsOfNoum(response, spaceId);
        setExistingLinkedNoum(linkedNoumsOfNoum);
        setPageLoader(false);
      }
      setSelectedOption(foundOption);
    },
    [getDefaultNoumLink, setExistingLinkedNoum, setSelectedOption],
  );

  const updateOptionState = useCallback(
    (spaceId: string) => () => {
      const { foundOption } = findParentNoum(optionState, spaceId);
      if (foundOption) {
        const { checked } = foundOption;
        const optionsLength = previewOptions.length;
        if (foundOption.linked && !checked && optionsLength) {
          fetchAndToggleExistingLinkModal(foundOption);
          return;
        }
        updateOption(foundOption);
      }
    },
    [
      fetchAndToggleExistingLinkModal,
      optionState,
      previewOptions.length,
      updateOption,
    ],
  );

  return {
    globalChecked,
    setGlobalChecked,
    selectedOption,
    setSelectedOption,
    existingLinkedNoum,
    setExistingLinkedNoum,
    optionState,
    setOptionState,
    defaultOptionState,
    setDefaultOptionState,
    previewOptions,
    subNoums,
    parentNoumsLength,
    checkedOptions,
    currentVisibilityLevel,
    searchParams,
    updateOption,
    verifyAndReturnInGlobalChecked,
    updateOptionState,
    showCompletedModal,
    toggleShowCompletedModal,
    showConfirmationModal,
    setShowConfirmationModal,
    showLinkExistingNoumModal,
    toggleShowVisibilityModal,
    toggleShowLinkExistingNoumModal,
    showVisibilityModal,
    visibilityLevelSettings,
    setVisibilityLevelSettings,
    acceptedWarning,
    setWarning,
    pageLoader,
    setPageLoader,
  };
};

export default useSelectNoumsToLink;
