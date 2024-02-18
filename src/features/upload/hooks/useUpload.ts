import { useState, useEffect } from 'react';
import { generateVideoThumbnails } from '@rajesh896/video-thumbnails-generator';
import { useGenerateUserS3SignedUrlMutation } from '@/apollo/graphql';
import { b64toFile } from '@/utils/base64ToBlob';
import { useAuth } from '@/features/auth/contexts';
import {
  FileServices,
  type FileUploadProcessEventType,
} from '../services/file';
import {
  generateFileName,
  generateFileThumbnailName,
  removeSpecialCharacters,
} from '../utils/generateFileName';

import { UploadError } from '../utils/UploadError';
import { type UploadMediaType, type UploadMeta } from '../types';
import { type UseUploadReturnTypes } from './types';

export const useUpload = ({
  maxSize,
  setUploadPercentage,
  generateThumbnail,
  keepOriginalName,
  type,
}: {
  maxSize: number | undefined;
  setUploadPercentage: (percent: number) => void;
  generateThumbnail?: boolean;
  keepOriginalName?: boolean;
  type: UploadMediaType;
}): UseUploadReturnTypes => {
  const [generateS3SignedUrl] = useGenerateUserS3SignedUrlMutation({
    fetchPolicy: 'no-cache',
  });
  const { user } = useAuth();

  const [fileServices] = useState(new FileServices());

  useEffect(
    () => () => {
      fileServices.cancelUpload();
    },
    [fileServices],
  );

  const upload = async (mFile: File) => {
    const mbSize = mFile.size / 1024 / 1024;
    const max =
      maxSize || parseInt(process.env.VITE_MAX_UPLOAD_SIZE || '5', 10);

    if (mbSize > max) {
      throw new UploadError('file size is too large', { isLargeFile: true });
    }

    const fileName = keepOriginalName
      ? removeSpecialCharacters(mFile.name)
      : generateFileName(
          removeSpecialCharacters(mFile.name),
          type,
          user?._id ?? '',
        );

    const { data } = await generateS3SignedUrl({
      variables: { file: { fileName, mime: mFile.type } },
    });
    const signedUrl = data?.generateUserS3SignedUrl?.url;

    if (!signedUrl) throw new UploadError('no signed url');

    const resp = await fileServices.uploadFileWithSignedUrl(
      signedUrl,
      mFile,
      (progressEvent: FileUploadProcessEventType) => {
        const alpha = generateThumbnail ? 95 : 100;
        setUploadPercentage(
          Math.round((progressEvent.loaded * alpha) / progressEvent.total),
        );
      },
    );

    if (resp?.errorMessage) {
      if (resp?.errorMessage === 'Canceled') {
        throw new UploadError(resp?.errorMessage ?? '', { canceled: true });
      } else {
        throw new UploadError('no signed url');
      }
    }

    const downloadableLink = `https://${process.env.VITE_S3_URL}.s3-accelerate.amazonaws.com/${fileName}`;

    let meta: UploadMeta | undefined;

    if (mFile.type.indexOf('image/') > -1) {
      meta = { type: 'image', fileSize: mFile.size, fileName: mFile.name };
    } else if (mFile.type.indexOf('video/') > -1) {
      meta = {
        type: 'video',
        fileSize: mFile.size,
        fileName: mFile.name,
        thumbnail: '',
        videoURL: '',
      };
    }

    if (generateThumbnail && mFile.type.indexOf('video/') > -1) {
      const thumbnails = await generateVideoThumbnails(mFile, 0, 'file');

      const thumbnailName = removeSpecialCharacters(
        generateFileThumbnailName(mFile.name, type, user?._id ?? ''),
      );

      const thumbnailFile = await b64toFile(
        thumbnails[0],
        thumbnailName,
        'image/jpeg',
      );

      const { data: thumbnailData } = await generateS3SignedUrl({
        variables: { file: { fileName: thumbnailName, mime: 'image/jpeg' } },
      });

      const thumbnailSignedUrl = thumbnailData?.generateUserS3SignedUrl?.url;

      if (!thumbnailSignedUrl) {
        throw new UploadError('no signed url');
      }

      const thumbnailResp = await fileServices.uploadFileWithSignedUrl(
        thumbnailSignedUrl,
        thumbnailFile,
        () => {},
      );

      if (thumbnailResp?.errorMessage) {
        if (thumbnailResp?.errorMessage === 'Canceled') {
          throw new UploadError(resp?.errorMessage ?? '', { canceled: true });
        } else {
          throw new UploadError('no signed url');
        }
      }
      setUploadPercentage(100);

      meta = {
        ...meta,
        type: 'video',
        videoURL: downloadableLink,
        thumbnail: `https://${process.env.VITE_S3_URL}.s3-accelerate.amazonaws.com/${thumbnailName}`,
      };
    }

    return {
      downloadableLink,
      signedUrlDomain: signedUrl.split('?')[0],
      meta,
    };
  };

  return [upload, fileServices];
};
