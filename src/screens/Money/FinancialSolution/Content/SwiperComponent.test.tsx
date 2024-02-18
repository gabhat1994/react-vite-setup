import { BrowserRouter } from 'react-router-dom';
import { cleanup, render } from '@/test-utils';
import SwiperComponent from './SwiperComponent';

describe('Money Page- Swiper component', () => {
  afterEach(() => {
    cleanup();
  });
  it('should Render swiper component in Money Page', async () => {
    const { container } = render(
      <BrowserRouter>
        <SwiperComponent
          handleHidePadding={() => null}
          SwiperSlidesOptions={undefined}
          slidesPerView={2}
        />
      </BrowserRouter>,
    );
    expect(container).toBeTruthy();
  });
});
