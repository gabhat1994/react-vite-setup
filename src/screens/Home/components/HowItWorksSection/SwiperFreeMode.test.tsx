import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { cleanup, render } from '@/test-utils';
import { useClient } from '@/hooks';
import { SwiperFreeMode } from './SwiperFreeMode';

describe('Home How it work swiper mode', () => {
  afterEach(() => {
    cleanup();
  });
  it('should Render Home how it work swiper mode', async () => {
    const { container } = render(
      <>
        {() => {
          const { client } = useClient();
          return (
            <ApolloProvider client={client}>
              <BrowserRouter>
                <SwiperFreeMode articles={[]} />
              </BrowserRouter>
            </ApolloProvider>
          );
        }}
      </>,
    );
    expect(container).toBeTruthy();
  });
});
