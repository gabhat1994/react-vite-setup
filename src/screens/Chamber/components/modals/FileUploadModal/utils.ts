import * as yup from 'yup';

export const bytesToMegabytes = (bytes: number) =>
  ((bytes / 1024 ** 2) * 1).toFixed(2);

export const schema = yup
  .object({
    visibilityRoles: yup.array(yup.string()).min(1).required(),
    fileName: yup.string().required(),
    description: yup.string(),
  })
  .required();
