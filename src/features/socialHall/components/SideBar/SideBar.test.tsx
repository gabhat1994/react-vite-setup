import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { render } from '@/test-utils';
import { SideBar } from './SideBar';

describe('<SideBar />', () => {
  test(`check sidebar rendered enough or not`, () => {
    const { container, getByTestId } = render(
      <BrowserRouter>
        <ApolloProvider
          client={new ApolloClient({ cache: new InMemoryCache() })}
        >
          <SideBar />,
        </ApolloProvider>
      </BrowserRouter>,
    );
    const SideBarWrapper = getByTestId('side_bar_wrapper');
    expect(SideBarWrapper).toHaveStyle(`
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 368px;
    `);

    expect(getByTestId('list_wrapper')).toBeInTheDocument();
    expect(getByTestId('tabs_wrapper')).toBeInTheDocument();
    expect(getByTestId('tabs')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });
});
