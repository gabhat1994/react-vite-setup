/// <reference types="vitest" />
import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { visualizer } from 'rollup-plugin-visualizer';
import { ViteEjsPlugin } from 'vite-plugin-ejs';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => {
      return {
        ...prev,
        ['process.env.' + key]: `"${val}"`,
      };
    },
    {},
  );
  return {
    server: {
      port: 3000,
    },
    define: {
      'process.env.NODE_ENV': `"${mode}"`,
      ...envWithProcessPrefix,
    },
    plugins: [
      splitVendorChunkPlugin(),
      visualizer(),
      tsconfigPaths(),
      react({
        exclude: ['**/node_modules/**', '**/vite.config.ts'],
        include: [
          './vite.config.ts',
          'src/**/*.tsx',
          'src/**/*.ts',
          'src/**/*.jsx',
          'src/**/*.js',
        ],
        babel: {
          plugins: [
            [
              '@welldone-software/babel-plugin-react-add-test-id',
              { attrName: 'data-test' },
            ],
          ],
        },
      }),
      svgrPlugin({
        exclude: './src/assets/glass-icons/**/*.svg',
        svgrOptions: {
          icon: true,
        },
      }),
      svgrPlugin({
        include: './src/assets/glass-icons/**/*.svg',
        svgrOptions: {
          icon: true,
        },
      }),
      ViteEjsPlugin((viteConfig) => {
        return {
          chargebeeSite: viteConfig.env.VITE_CB_SITE,
        };
      }),
    ],
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
    },
    build: {
      sourcemap: true,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./scripts/vitestGlobalSetup.ts'],
      // TODO: Refactor tests to avoid memory leaks and prevent running this long!
      testTimeout: 10000,
      hookTimeout: 10000,
      teardownTimeout: 20000,
      coverage: {
        provider: 'istanbul',
        reporter: ['text', 'json', 'html'],
      },
      alias: {
        // '.*\\.wav': '<rootDir>/scripts/fileTransformer.js',
        // '.*\\.css': '<rootDir>/scripts/stylesMock.js',
        // '.*\\.(svg|png)': '<rootDir>/scripts/svgrMock.js',
        // 'spin.js': '<rootDir>/scripts/spinMock.js',
        // getApiUrl: '<rootDir>/scripts/getApiUrl.js',
        // getS3Bucket: '<rootDir>/scripts/getS3Bucket.js',
        // storyblok: '<rootDir>/scripts/storyblok.js',
        // getStoryblokEnv: '<rootDir>/scripts/getStoryblokEnv.js',
        // getEventChamberId: '<rootDir>/scripts/getEventChamberId.js',
        // getSpaceIdForSpecialNoum:
        //   '<rootDir>/scripts/getSpaceIdForSpecialNoum.js',
        // 'nlcst-to-string': '<rootDir>/scripts/toString.js',
        // retext: '<rootDir>/scripts/retext.js',
        // '@/(.*)': '<rootDir>/src/$1',
      },
    },
  };
});
