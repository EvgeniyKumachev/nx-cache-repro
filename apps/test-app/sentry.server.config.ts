import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://3bfb9cc4071cf3a38c9a6091cc432c2a@o4505868620070912.ingest.sentry.io/4505868620922880',

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
