const getS3Bucket = () => {
  const s3Bucket = import.meta.env.VITE_S3_URL;

  if (!s3Bucket) {
    // eslint-disable-next-line no-console
    console.error('[VITE_S3_URL]: No S3 bucket. Falling back to dev');
    return 'noumena-img';
  }

  return s3Bucket;
};

export default getS3Bucket;
