import { render } from '@/test-utils';
import { PreviewFile } from './PreviewFile';

global.URL.createObjectURL = vi.fn();

describe('<PreviewFile />', () => {
  test('preivew image render test', () => {
    const file = new File([new ArrayBuffer(1)], 'file.jpg', {
      type: 'image/jpg',
    });
    const { container, getByTestId } = render(
      <PreviewFile file={file} index={0} />,
    );
    expect(container).toBeTruthy();
    expect(getByTestId('preivew-image')).toBeInTheDocument();
  });

  test('preivew video render test', () => {
    const file = new File([new ArrayBuffer(1)], 'file.mp4', {
      type: 'video/mp4',
    });
    const { container, getByTestId } = render(
      <PreviewFile file={file} index={0} />,
    );
    expect(container).toBeTruthy();
    expect(getByTestId('preivew-video')).toBeInTheDocument();
  });
});
