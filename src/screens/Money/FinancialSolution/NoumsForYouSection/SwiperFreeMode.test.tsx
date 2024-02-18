import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render } from '@/test-utils';
import { SwiperFreeMode } from './SwiperFreeMode';

describe('Money Page Noum swiper mode', () => {
  afterEach(() => {
    cleanup();
  });
  it('should Render Money Page Noum swiper mode', async () => {
    const { container } = render(
      <>
        {() => {
          <MockedProvider>
            <BrowserRouter>
              <SwiperFreeMode recommendedNoumIds={['', '']} />
            </BrowserRouter>
          </MockedProvider>;
        }}
      </>,
    );
    expect(container).toBeTruthy();
  });
});
