import { type NoumReferenceCapacity } from '@/apollo/generated/types';
import { type DropdownValueType } from '@/components/Dropdown';
import { imageTypesArr, videoTypesArr } from '@/constants/fileTypes';
import { getFileExtension, getFileNameFromUrl } from '@/utils/file';

export const getCapacityLabelFromValue = (
  value: NoumReferenceCapacity | undefined,
  capacityOptions: DropdownValueType<string>[],
) => {
  const item = capacityOptions.find((options) => options.value === value);
  return item?.label as string;
};

export const getFileDetails = (fileUrl: string) => ({
  fileType: getFileType(getFileExtension(fileUrl) ?? ''),
  fileName: getFileNameFromUrl(fileUrl),
});

export const getFileType = (fileExt: string) => {
  if (
    imageTypesArr.find(
      (item) => item === fileExt || item.split('/')[1] === fileExt,
    )
  )
    return 'image';
  if (
    videoTypesArr.find(
      (item) => item === fileExt || item.split('/')[1] === fileExt,
    )
  )
    return 'video';
  return '';
};
