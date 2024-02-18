import { MockedProvider } from '@apollo/client/testing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@/test-utils';
import SideBar from './SideBar';

describe('<SideBar />', () => {
  test('rendering test', () => {
    const { container } = render(
      <MockedProvider>
        <BrowserRouter>
          <QueryClientProvider client={new QueryClient()}>
            <SideBar />
          </QueryClientProvider>
        </BrowserRouter>
      </MockedProvider>,
    );

    expect(container).toBeTruthy();
  });
});
