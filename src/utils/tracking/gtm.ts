import Analytics from 'analytics';
import googleTagManager from '@analytics/google-tag-manager';
import googleAnalytics from '@analytics/google-analytics';

export const analytics = Analytics({
  app: 'noumena-web',
  plugins: [
    googleTagManager({
      containerId: process.env.VITE_GTM_TOKEN,
    }),
    googleAnalytics({
      measurementIds: [process.env.VITE_GA_TRACKING_ID],
    }),
  ],
});
