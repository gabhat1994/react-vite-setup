import '../src/i18n';
import worker from './worker';

import matchers from '@testing-library/jest-dom';
import { expect } from 'vitest';

expect.extend(matchers);

import { lottieWebStub } from '@/test-utils/stubs';

vi.stubGlobal('URL.createObjectURL', vi.fn());
vi.stubGlobal('Worker', worker);
// vi.stubGlobal('HTMLCanvasElement', HTMLCanvasElementStub);

vi.mock('@stripe/stripe-js');
vi.mock('lottie-web', () => ({
  default: lottieWebStub,
}));
vi.mock('lottie-react', () => ({
  default: vi.fn(),
}));

vi.mock('@/facade/agora', () => ({
  default: () => ({
    RtcEngine: {
      createClient: vi.fn().mockReturnValue({
        on: vi.fn(),
      }),
    },
    RtmEngine: {
      createInstance: vi.fn().mockReturnValue({
        on: vi.fn(),
      }),
    },
  }),
}));

vi.mock('@/facade/agoraVirtualBackground', () => ({
  default: vi.fn(),
}));

vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(),
}));

vi.mock('firebase/messaging', () => ({
  getMessaging: vi.fn(),
  onMessage: vi.fn(),
  getToken: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('add-to-calendar-button', () => ({
  default: () => ({
    atcb_action: vi.fn(),
  }),
}));

vi.mock('uuid', async () => {
  // In Jest 28.x, the module resolver had an issue with uuid package
  // Therefore, we're replacing it with faker, which resolves correctly.
  const { faker } = await vi.importActual<any>('@faker-js/faker');

  return {
    v4: () => faker.datatype.uuid(),
  };
});

document.documentElement.style.setProperty(
  '--bg-overlay-neutral-light',
  'rgba(12, 0, 36, 0.2)',
);
document.documentElement.style.setProperty(
  '--bg-overlay-neutral-dark',
  'rgba(0, 0, 0, 0.9)',
);
document.documentElement.style.setProperty(
  '--bg-video-timestamp-brand-primary-default',
  'rgba(12, 0, 36, 0.5)',
);
document.documentElement.style.setProperty(
  '--shadow-neutral-default',
  'rgba(32, 17, 62, 0.08)',
);
document.documentElement.style.setProperty(
  '--shadow-neutral-dark',
  'rgba(12, 0, 36, 0.2)',
);
document.documentElement.style.setProperty(
  '--shadow-neutral-purple',
  'rgba(102, 63, 186, 0.05)',
);
document.documentElement.style.setProperty(
  '--shadow-neutral-light',
  'rgba(242, 238, 254, 0.5)',
);

document.documentElement.style.setProperty(
  '--bg-call-ui-neutral-default',
  'rgba(12, 0, 36, 0.35)',
);

document.documentElement.style.setProperty(
  '--bg-overlay-raisehand',
  'rgba(12, 0, 36, 0.5)',
);
