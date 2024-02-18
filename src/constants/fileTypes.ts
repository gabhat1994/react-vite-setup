import { join } from 'lodash';
import { ExtensionsMap } from './extensions';

export const imageTypesArr = ['image/png', 'image/jpg', 'image/jpeg'];

export const imageTypes = join(imageTypesArr, ',');

export const videoTypesArr = ['video/mp4', 'video/quicktime'];

export const videoTypes = join(videoTypesArr, ',');

export const chromeSupportedVideoTypes = [...imageTypesArr, 'video/mp4'].join(
  ',',
);

const mediaTypesArr = [imageTypesArr, videoTypesArr];

export const mediaTypes = join(mediaTypesArr, ',');

const allTypesArr = Object.keys(ExtensionsMap);

export const allTypes = join(allTypesArr, ',');

const applicationreviewArr = [imageTypesArr];

export const applicationreviewTypes = join(applicationreviewArr, ',');
