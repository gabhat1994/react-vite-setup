import { cloneDeep, flatten, isArray } from 'lodash';
import { visibilityLevel } from './data';
import { type OptionType } from './types';

const updateSubNoums = (
  foundOptionIdx: number,
  inputOptions: OptionType[],
  incomingChecked?: boolean,
  linkedNoums?: OptionType[],
) => {
  const newOptionState = [...inputOptions];
  let spliceItems = 1;
  const subNoumIds: { [key: string]: string } = {};
  const foundOption = newOptionState[foundOptionIdx];
  const checked =
    incomingChecked !== undefined ? incomingChecked : !foundOption.checked;
  const parentNoum = {
    ...foundOption,
    checked,
  };
  let toBeAppended = [parentNoum];
  spliceItems += linkedNoums?.length ?? 0;
  if (linkedNoums && linkedNoums.length > 0) {
    const newlyUpdated = linkedNoums.map((noum: OptionType) => {
      subNoumIds[noum.spaceId] = noum.spaceId;
      return {
        ...noum,
        checked,
        disabled: checked,
        isSubNoum: checked,
      };
    });
    toBeAppended = [...toBeAppended, ...newlyUpdated];
  }
  const clonedOptionState = cloneDeep(newOptionState);
  if (checked) {
    clonedOptionState.splice(foundOptionIdx, 1, ...toBeAppended);
  } else {
    clonedOptionState.splice(foundOptionIdx, spliceItems, ...toBeAppended);
  }

  const newOptions = checked
    ? clonedOptionState.filter(({ spaceId, isSubNoum }) => {
        if (subNoumIds[spaceId] && !isSubNoum) {
          return false;
        }
        return true;
      })
    : clonedOptionState;

  return {
    newState: newOptions,
    toBeAppended,
    subNoumIds,
  };
};

export const getUniqueItems = (input: OptionType[]) => [
  ...new Map([...input].map((item) => [item.spaceId, item])).values(),
];

export const getSubNoums = (globalChecked: { [key: string]: OptionType[] }) => {
  const obj: { [key: string]: string } = {};
  flatten(Object.values(globalChecked))
    .filter(({ isSubNoum }) => isSubNoum)
    .forEach(({ spaceId }) => {
      obj[spaceId] = spaceId;
    });
  return obj;
};

export const findParentNoum = (optionState: OptionType[], spaceId: string) => {
  const foundOptionIdx = optionState.findIndex(
    (item) => item.spaceId === spaceId && !item.isSubNoum,
  );
  const foundOption = optionState[foundOptionIdx];
  return {
    foundOption,
    foundOptionIdx,
  };
};

export const getLinkedNoumsOfNoum = (response: OptionType[], spaceId: string) =>
  response.filter(({ spaceId: subSpaceId }) => subSpaceId !== spaceId);

export const filterOutSubNoums = (
  inputOptions: OptionType[],
  subNoums: { [key: string]: string },
) =>
  inputOptions.filter(({ spaceId, isSubNoum }) => {
    if (subNoums[spaceId] && !isSubNoum) {
      return false;
    }
    return true;
  });

export const reGroupNoums = (
  inputOptions: OptionType[],
  defaultOptionState: OptionType[],
  verifyAndReturnInGlobalChecked: (spaceId: string) => {},
) => {
  const linkIdHash: { [key: string]: string } = {};
  const reGrouped = inputOptions.map((noum) => {
    const value = verifyAndReturnInGlobalChecked(noum.spaceId);
    if (value) {
      if (isArray(value)) {
        const [firstNoum] = value;
        const { linkId = '' } = firstNoum as OptionType;
        linkIdHash[linkId] = linkId;
        return value;
      }
      return value;
    }
    const foundOption = defaultOptionState.find(
      (item) => item.spaceId === (value as OptionType).spaceId,
    );
    return foundOption || noum;
  });
  const filtered = reGrouped.filter((noum) => {
    if (isArray(noum)) {
      return true;
    }
    const { checked, linkId, isSubNoum } = noum as OptionType;
    if (checked && linkId && isSubNoum) {
      return !linkIdHash[linkId];
    }
    return true;
  });
  return getUniqueItems(flatten(filtered) as OptionType[]);
};

export const calculateVisibilityLevel = (checkedOptions: OptionType[]) =>
  Math.max(...checkedOptions.map((item) => visibilityLevel[item.visibility]));

export const visibilityDialogFlag = (
  visibilityLevelSettings: {
    Public: number;
    Private: number;
    Secret: number;
  },
  acceptedWarning: boolean,
) => {
  const distinctLevels = Object.values(visibilityLevelSettings).filter(
    (count: number) => count >= 1,
  ).length;
  return distinctLevels > 1 && !acceptedWarning;
};

export default updateSubNoums;
