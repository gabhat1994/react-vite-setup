import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { client } from '@/apollo/client';
import { render, fireEvent, act, cleanup, resizeWindow } from '@/test-utils';
import { AuthProvider } from '@/features/auth/contexts';
import { DiscoveryCategoryEnum } from '@/components/ChamberBox/types';
import { NOUMSlider } from './NOUMSlider';
import { CardItems } from './constants';

const renderSlider = () =>
  render(
    <BrowserRouter>
      <ApolloProvider client={new ApolloClient({ cache: new InMemoryCache() })}>
        <AuthProvider client={client}>
          <NOUMSlider
            title="Noumena Slider"
            category={DiscoveryCategoryEnum.Featured}
            route="discovery"
            loading={false}
            cardItems={CardItems}
          />
        </AuthProvider>
      </ApolloProvider>
    </BrowserRouter>,
  );

describe('<NOUMSlider />', () => {
  beforeEach(() => {
    cleanup();
  });
  test(`testing NOUMSlider`, () => {
    const { container, getByTestId } = renderSlider();
    const slider = getByTestId('slider');
    expect(slider).toHaveStyle(`
      width : 100%;
      display: flex;
      flex-direction: column;
      font-family: var(--font-family);
      font-style: normal;
      overflow: hidden;
      position: relative;
    `);

    expect(container).toBeTruthy();
  });

  test('check whether Slider has sliderBody', () => {
    const { container, getByTestId } = renderSlider();
    expect(getByTestId('sliderBody')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });

  test('Checks onClick event on Next arrow', async () => {
    const { container, getByTestId } = renderSlider();
    expect(container).toBeTruthy();
    const next = getByTestId('next');
    fireEvent.click(next);
    fireEvent.click(next);
    fireEvent.click(next);
    fireEvent.click(next);
  });

  test('Checks onClick event on Prev arrow', () => {
    const { container, getByTestId } = renderSlider();
    expect(container).toBeTruthy();
    const previous = getByTestId('previous');
    const next = getByTestId('next');
    fireEvent.click(next);
    fireEvent.click(previous);
  });

  test('check whether Slider has Controls or not', () => {
    const { container, getByTestId } = renderSlider();
    expect(getByTestId('slidercontrols')).toBeInTheDocument();
    expect(container).toBeTruthy();
    const noum = getByTestId('carouselItem-1');
    fireEvent.click(noum);
  });

  test('Checks onClick event on Show All', () => {
    const { container, getByTestId } = renderSlider();
    expect(container).toBeTruthy();
    const showAll = getByTestId('button_text');
    fireEvent.click(showAll);
  });

  test('check whether Slider has show all Mobile button', () => {
    act(() => {
      resizeWindow(320, 561);
    });
    const { container, getByTestId } = renderSlider();
    expect(getByTestId('button_text')).toBeInTheDocument();
    const noum = getByTestId('noum-1');
    fireEvent.click(noum);
    expect(container).toBeTruthy();
  });
});
