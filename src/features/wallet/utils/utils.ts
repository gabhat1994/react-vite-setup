import { type UploadDcoumentInput, type Exact } from '@/apollo/generated/types';
import { type UploadDocumentQuery } from '@/apollo/graphql';
import { type QueryResult } from '@apollo/client';

const mergeImages = (files: File[]): Promise<File> => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // Load all files as images asynchronously
  const images = files.map(
    (file) =>
      new Promise<HTMLImageElement>((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.src = event?.target?.result as string;
        };
        reader.readAsDataURL(file);
      }),
  );

  // Wait for all images to load
  return Promise.all(images).then((loadedImages) => {
    // Calculate the total height required for all images
    let totalHeight = 0;
    loadedImages.forEach((image) => {
      totalHeight += image.height;
    });

    // Set the canvas dimensions to accommodate all images
    canvas.width = loadedImages[0].width;
    canvas.height = totalHeight;

    // Position each image below the previous one
    let currentY = 0;
    loadedImages.forEach((image) => {
      context?.drawImage(image, 0, currentY);
      currentY += image.height;
    });

    // Return the merged image as a data URL
    // return canvas.toDataURL();
    return new Promise<File>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob !== null) {
          const mergedFile = new File([blob], 'merged.png', {
            type: 'image/png',
          });
          resolve(mergedFile);
        } else {
          throw new Error('Error converting canvas to blob.');
        }
      }, 'image/png');
    });
  });
};
const generateURL = (file: File) => URL.createObjectURL(file);

const getFileDetails = (
  file: QueryResult<
    UploadDocumentQuery,
    Exact<{
      input: UploadDcoumentInput;
    }>
  >,
) => {
  const { documentName, url } = file?.data?.uploadCustomerDocuments || {};
  return { name: documentName, url };
};

export const Utils = { mergeImages, generateURL, getFileDetails };
