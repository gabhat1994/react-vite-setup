import { t } from 'i18next';
import { type SpaceConnection, SpaceTypeEnum } from '@/apollo/generated/types';
import { type ChamberBoxNameEnum } from '@/components/ChamberBox/types';
import { UserUtil } from '@/utils/user';

const isMyHomeNoum = (
  item: SpaceConnection,
  chamberId: string | null | undefined,
) => item?.requestTo?._id === chamberId;

const getFullName = (item: SpaceConnection) =>
  `${item?.requestFrom?.uid?.firstName ?? ''} ${
    item?.requestFrom?.uid?.middleName || ''
  } ${item?.requestFrom?.uid?.lastName ?? ''}`;

const getRequestFromTitle = (item: SpaceConnection) => {
  if (item?.requestFrom) {
    const title =
      item.requestFrom.type !== SpaceTypeEnum.Home
        ? item.requestFrom.name ?? ''
        : getFullName(item);

    return title;
  }
  return '';
};

const getRequestFromName = (item: SpaceConnection) => {
  if (item?.requestFrom) {
    const name =
      item.requestFrom.type !== SpaceTypeEnum.Home
        ? getFullName(item)
        : item.requestFrom.uid?.title ?? '';

    return name;
  }
  return '';
};

const getRequestFromProfileImage = (item: SpaceConnection) => {
  if (item?.requestFrom) {
    const image =
      item.requestFrom.type === SpaceTypeEnum.Home
        ? UserUtil.getProfilePicture(item.requestFrom.uid)
        : item.requestFrom.profileImage ?? '';
    return image;
  }
  return '';
};

const getRequestFromCategory = (item: SpaceConnection) => {
  if (item?.requestFrom) {
    const category =
      item.requestFrom.type === 'HOME'
        ? ('Member' as ChamberBoxNameEnum)
        : (item.requestFrom.category?.name as ChamberBoxNameEnum);
    return category;
  }
  return '';
};

export const getTitle = (
  item: SpaceConnection,
  chamberId: string | null | undefined,
) => {
  if (item?.requestTo) {
    return isMyHomeNoum(item, chamberId)
      ? getRequestFromTitle(item)
      : item.requestTo.name ?? '';
  }
  return '';
};

export const getName = (
  item: SpaceConnection,
  chamberId: string | null | undefined,
) => {
  if (item?.requestTo) {
    return isMyHomeNoum(item, chamberId)
      ? getRequestFromName(item)
      : `${t('noumena.chamber.member_request.requested_by')} ${getFullName(
          item,
        )}`;
  }
  return '';
};

export const getProfileImage = (
  item: SpaceConnection,
  chamberId: string | null | undefined,
) => {
  if (item?.requestTo) {
    return isMyHomeNoum(item, chamberId)
      ? getRequestFromProfileImage(item)
      : item.requestTo.profileImage ?? '';
  }
  return '';
};

export const getCategoryForModal = (
  item: SpaceConnection,
  chamberId: string | null | undefined,
) => {
  if (item?.requestTo) {
    return isMyHomeNoum(item, chamberId)
      ? getRequestFromCategory(item)
      : item.requestTo.category?.name;
  }
  return '';
};
