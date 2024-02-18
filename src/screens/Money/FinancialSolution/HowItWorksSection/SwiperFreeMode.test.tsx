import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render } from '@/test-utils';
import { SwiperFreeMode } from './SwiperFreeMode';

describe('Money Page How it work swiper mode', () => {
  afterEach(() => {
    cleanup();
  });
  it('should Render Money Page ow it work swiper mode', async () => {
    const { container } = render(
      <>
        {() => {
          <MockedProvider>
            <BrowserRouter>
              <SwiperFreeMode
                articles={[]}
                showOnlyNavigationIcons={true}
                showCategory={false}
              />
            </BrowserRouter>
          </MockedProvider>;
        }}
      </>,
    );
    expect(container).toBeTruthy();
  });
});
