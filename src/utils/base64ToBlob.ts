export const b64toFile = async (
  base64: string,
  fileName: string,
  fileType: string,
): Promise<File> => {
  const blob = await fetch(`${base64}`).then((res) => res.blob());

  const file = new File([blob], fileName, {
    lastModified: Date.now(),
    type: fileType,
  });

  return file;
};

export const base64ToDataString = (base64: string, mimeType: string) =>
  `data:${mimeType};base64,${base64}`;
