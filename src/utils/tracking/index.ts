import clevertap from './clevertap';
import { analytics } from './gtm';

export const trackEvent = (eventName: string, eventData?: object) => {
  const evtData = { EVENT: new Date().getTime() };
  if (eventData && Object.keys(eventData).length) {
    clevertap.event.push(eventName, { ...eventData, ...evtData });
  } else {
    clevertap.event.push(eventName, evtData);
  }
  analytics.track(eventName);
};
