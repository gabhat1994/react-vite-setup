const getApiUrl = () => {
  const url = import.meta.env.VITE_API_URL;

  if (!url) {
    // eslint-disable-next-line no-console
    console.error('[API_URL]: No Api URL. Falling back to dev');
    return 'https://noudev-api.noumenati.com';
  }

  return url;
};

export default getApiUrl;
