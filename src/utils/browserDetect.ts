export const isFireFox = () => {
  const { userAgent } = window.navigator;
  return userAgent.includes('Firefox');
};
export const isChromeOrFirefox = (): boolean => {
  const { userAgent } = window.navigator;
  if (
    (userAgent.includes('Chrome') && !userAgent.includes('Edg')) ||
    isFireFox()
  ) {
    return true;
  }
  return false;
};

export const isMobileDevice = (): boolean =>
  /Mobile|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
