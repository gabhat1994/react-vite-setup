import { useForm, FormProvider } from 'react-hook-form';
import { type FC } from 'react';
import { fireEvent, render, waitFor } from '@/test-utils';
import AddressForm from './AddressForm';
import { type FormValues } from './types';

describe('Address Form', () => {
  const setSelectedAddress = '2-6 Bloomfield Ave,,Drexel Hill,PA,19026';
  const Wrapper: FC = ({ children }) => {
    const methods = useForm<FormValues>({
      mode: 'onChange',
      defaultValues: {
        street: '',
        apartment: '',
        city: '',
        state: '',
        postalCode: '',
      },
    });

    return <FormProvider {...methods}>{children}</FormProvider>;
  };
  it('Should render the form', async () => {
    const { container } = render(
      <Wrapper>
        <AddressForm selectdAddress={setSelectedAddress} />,
      </Wrapper>,
    );
    await waitFor(() => {
      expect(container).toBeTruthy();
    });
  });
  it('Should prefill the values in respective inputs', async () => {
    const { getByTestId } = render(
      <Wrapper>
        <AddressForm selectdAddress={setSelectedAddress} />,
      </Wrapper>,
    );
    const streetInput = getByTestId('step-two-street') as HTMLInputElement;
    const apartmentInput = getByTestId(
      'step-one-apartment',
    ) as HTMLInputElement;
    const cityInput = getByTestId('step-one-city') as HTMLInputElement;
    const stateInput = getByTestId('step-one-state') as HTMLInputElement;
    const zipCodeInput = getByTestId('step-one-zip-code') as HTMLInputElement;

    const addressArray = setSelectedAddress.split(',');

    await waitFor(() => {
      expect(streetInput.value).toBe(addressArray[0]);
      expect(apartmentInput.value).toBe(addressArray[1]);
      expect(cityInput.value).toBe(addressArray[2]);
      expect(stateInput.value).toBe(addressArray[3]);
      expect(zipCodeInput.value).toBe(addressArray[4]);
    });
  });

  it.skip('should throw an error if user tries to remove prepopulated values', async () => {
    const { getByTestId, getByText } = render(
      <Wrapper>
        <AddressForm selectdAddress={setSelectedAddress} />,
      </Wrapper>,
    );
    const streetInput = getByTestId('step-two-street') as HTMLInputElement;
    fireEvent.change(streetInput, { target: { value: '' } });

    await waitFor(() => {
      expect(streetInput.value).toBe('');
    });

    const errorMessage = getByText('This field cannot be empty');
    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
    });
  });
  it.skip('should disapper the error message when user fills the empty input', async () => {
    const { getByTestId, getByText, getAllByTestId } = render(
      <Wrapper>
        <AddressForm selectdAddress={setSelectedAddress} />,
      </Wrapper>,
    );
    const streetInput = getByTestId('step-two-street') as HTMLInputElement;

    fireEvent.change(streetInput, { target: { value: '' } });

    await waitFor(() => {
      expect(streetInput.value).toBe('');
    });

    const errorMessage = getByText('This field cannot be empty');

    await waitFor(() => {
      expect(errorMessage).toBeInTheDocument();
    });

    fireEvent.change(streetInput, { target: { value: 'Test Street' } });

    await waitFor(() => {
      expect(streetInput.value).toBe('Test Street');
    });

    const errorElements = getAllByTestId('pTestId');

    await waitFor(() => {
      expect(errorElements[0].nodeValue).toBe(null);
    });
  });
});
