import { intersectionObserver } from '@/test-utils/stubs';
import { fireEvent, render, waitFor } from '@/test-utils';
import CountryPicker from './CountryPicker';

describe('Country Picker', () => {
  beforeEach(() => intersectionObserver.mock());
  afterEach(() => {
    intersectionObserver.restore();
  });

  it('Should render the Country Picker Component', () => {
    const onCountryCodeChange = vi.fn();
    const value = 'United States';
    const { container } = render(
      <CountryPicker onCountryCodeChange={onCountryCodeChange} value={value} />,
    );
    expect(container).toBeTruthy();
  });

  it('Should select the value passed as a prop', () => {
    const onCountryCodeChange = vi.fn();
    const value = 'us';
    const { getByTestId } = render(
      <CountryPicker onCountryCodeChange={onCountryCodeChange} value={value} />,
    );
    const textFiled = getByTestId(
      'country-picker-textfield',
    ) as HTMLInputElement;
    expect(textFiled.value).toBe('United States');
  });

  it('Should toggle drop down container when clicked on Arrow Icon Button', async () => {
    const onCountryCodeChange = vi.fn();
    const value = 'United States';
    const { getByTestId } = render(
      <CountryPicker onCountryCodeChange={onCountryCodeChange} value={value} />,
    );
    const button = getByTestId('styledCountryDownArrow');
    await waitFor(() => fireEvent.click(button));
    const dropDownContainer = getByTestId('dropdown-container');
    expect(dropDownContainer).toBeInTheDocument();
    await waitFor(() => fireEvent.click(button));
    expect(dropDownContainer).not.toBeInTheDocument();
  }, 10000);
  it('Should be able to click on one of the options', async () => {
    const onCountryCodeChange = vi.fn();
    const value = 'United States';
    const { getByTestId, getAllByTestId } = render(
      <CountryPicker onCountryCodeChange={onCountryCodeChange} value={value} />,
    );
    const button = getByTestId('styledCountryDownArrow');
    await waitFor(() => fireEvent.click(button));
    const dropDownContainer = getByTestId('dropdown-container');
    expect(dropDownContainer).toBeInTheDocument();
    const options = getAllByTestId('dropdown-value');
    await waitFor(() => fireEvent.click(options[4]));
  });
});
