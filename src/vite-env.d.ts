/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITEKEY_PUBLIC: string;
  readonly VITE_S3_KEY: string;
  readonly VITE_API_URL: string;
  readonly VITE_LD_KEY: string;
  readonly VITE_SMARTY_URL: string;
  readonly VITE_SMARTY_KEY: string;
  readonly REFERRAL_CODE: string;
  readonly VITE_AGORA_APP_ID: string;
  readonly VITE_WEBSOCKET_URL: string;
  readonly VITE_STORYBLOK_TOKEN: string;
  readonly VITE_STORYBLOK_ENV: string;
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTHDOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;
  readonly VITE_FIREBASE_VAPID_KEY: string;
  readonly VITE_CQ_URL: string;
}
