import { render } from '@/test-utils';
import { MediaSettingModal } from './MediaSettingModal';

vi.mock('@/facade/agora', () => ({
  getDevices: vi.fn().mockReturnValue([]),
}));

describe('<MediaSettingModal />', () => {
  beforeAll(() => {
    Object.defineProperty(global.navigator, 'mediaDevices', {
      value: {
        enumerateDevices: vi.fn().mockImplementation(() => Promise.resolve([])), // Choose your favourite mocking library
      },
    });
  });
  const onClose = vi.fn();
  const onAccept = vi.fn();
  test(`check MediaSettingModal renders`, async () => {
    const { container } = render(
      <MediaSettingModal isOpen handleClose={onClose} onAccept={onAccept} />,
    );
    expect(container).toBeTruthy();
  });
});
