const fileSizeUnits = {
  Bytes: 'Bytes',
  KB: 'KB',
  MB: 'MB',
  GB: 'GB',
  TB: 'TB',
  PB: 'PB',
  EB: 'EB',
  ZB: 'ZB',
  YB: 'YB',
  null: 'null',
} as const;

type FileSizeUnits = keyof typeof fileSizeUnits;

const fileSizeConverter = (
  bytes: number,
  decimals: number = 0,
  unit: FileSizeUnits = fileSizeUnits.null,
) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i =
    unit === fileSizeUnits.null
      ? Math.floor(Math.log(bytes) / Math.log(k))
      : sizes.indexOf(unit);

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};

export default fileSizeConverter;
