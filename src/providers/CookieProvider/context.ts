import { createContext, useContext } from 'react';

export const CookieConsent = createContext<{
  accept: () => void;
  onMoreInfoClick: () => void;
  withdraw: () => void;
}>({
  accept: () => null,
  onMoreInfoClick: () => null,
  withdraw: () => null,
});

export function useCookieConsent() {
  return useContext(CookieConsent);
}
