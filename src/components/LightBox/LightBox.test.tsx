import { render, fireEvent, waitFor, act } from '@/test-utils';
import { LightBox } from './LightBox';
import { ViewType } from './types';

const imageUrl =
  'https://noumena-img.s3-accelerate.amazonaws.com/Group 1.TZW5HgkP.png';

const pdfUrl =
  'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

const videoUrl =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm';

describe('<LightBox />', () => {
  test('renders ImageViewer when type is Image and url is passed', async () => {
    const closeCallback = vi.fn();
    const { getByTestId } = render(
      <LightBox
        url={imageUrl || ''}
        isOpen={true}
        handleClose={closeCallback}
        type={ViewType.IMAGE}
      />,
    );

    const headerAddonButtons = getByTestId('modalHeaderAddonButtons');
    const zoomIn = getByTestId('zoomin-button');
    const zoomOut = getByTestId('zoomout-button');
    const reset = getByTestId('reset-button');
    const lightBoxModalContainer = getByTestId('light-box');
    const contentContainer = getByTestId('modal-content-lightbox');
    expect(headerAddonButtons).toBeInTheDocument();
    expect(lightBoxModalContainer).toBeInTheDocument();
    expect(contentContainer).toBeInTheDocument();
    await waitFor(() => {
      expect(getByTestId('light-box-image-testid')).toBeInTheDocument();
    });
    act(() => {
      fireEvent.doubleClick(getByTestId('light-box-image-testid'));
    });
    act(() => {
      fireEvent.click(zoomIn);
    });
    act(() => {
      fireEvent.click(zoomOut);
    });
    act(() => {
      fireEvent.click(reset);
    });
    await waitFor(() => {
      expect(getByTestId('modal-content')).toHaveStyle(`cursor: grab;`);
    });
  }, 10000);
  test('renders DocViewer when type is PDF and url is passed', async () => {
    act(() => {
      const closeCallback = vi.fn();
      const { getByTestId } = render(
        <LightBox
          url={pdfUrl}
          isOpen={true}
          handleClose={closeCallback}
          type={ViewType.PDF}
        />,
      );
      const headerAddonButtons = getByTestId(
        'doc-navigation-buttons-container',
      );
      expect(headerAddonButtons).toBeInTheDocument();
    });
  });
  test('renders VideoViewer when type is VIDEO and url is passed', async () => {
    act(() => {
      const closeCallback = vi.fn();
      const { getByTestId } = render(
        <LightBox
          url={videoUrl}
          isOpen={true}
          handleClose={closeCallback}
          type={ViewType.VIDEO}
        />,
      );
      const videoElement = getByTestId('light-box-video-testid');
      expect(videoElement).toBeInTheDocument();
    });
  });
});
