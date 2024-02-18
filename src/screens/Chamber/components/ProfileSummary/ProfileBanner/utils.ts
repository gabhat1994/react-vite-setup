import { t } from 'i18next';

export const getGenerateImageWithGeniusLabel = (isCoverPhoto?: boolean) =>
  isCoverPhoto
    ? t('noumena.genius.generate_cover_photo')
    : t('noumena.genius.generate_noum_image');

export const getGenerateImageLoadingMessage = (isCoverPhoto?: boolean) =>
  t('noumena.genius.generating.image', {
    imageType: isCoverPhoto
      ? t('noumena.genius.generating.image.photos')
      : t('noumena.genius.generating.image.images'),
  });
