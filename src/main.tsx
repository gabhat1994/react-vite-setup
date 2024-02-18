import './i18n';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { version } from '../package.json';
import App from './App';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  // eslint-disable-next-line no-console
  console.log(`app is running in ${process.env.NODE_ENV} mode`);
} else {
  Sentry.init({
    dsn: 'https://c32f4d7a554d42b7b6873eef5f47ba4c@o454565.ingest.sentry.io/6197489',
    integrations: [new Sentry.BrowserTracing()],
    release: version,

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
