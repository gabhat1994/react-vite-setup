import React from 'react';
import NewRelease from './NewRelease';

class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown) {
    // Update state so the next render will show the fallback UI.
    const routeErrors = [
      'Failed to fetch dynamically imported module', // Route error for Chrome browser
      'Importing a module script failed', // Route error for Safari browser
      "Expected a JavaScript module script but the server responded with a MIME type of 'text/html'",
      "'text/html' is not a valid JavaScript MIME type",
      'the server responded with a status of 413',
    ];
    return {
      hasError: routeErrors.some((routeError) =>
        (error as Error)?.message?.includes(routeError),
      ),
    };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    // eslint-disable-next-line
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return <NewRelease />;
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
