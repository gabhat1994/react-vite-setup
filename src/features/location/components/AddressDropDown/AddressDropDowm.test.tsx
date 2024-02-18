import { useState } from 'react';
import { render } from '@/test-utils';
import AddressDropDown from '.';

describe('Address Drop Down', () => {
  it('Should render the Address Drop Dowm component', () => {
    const Warpper = () => {
      const [showForm, setShowForm] = useState(false);
      const [selectdAddress, setSelectedAddress] = useState<string | null>(
        'address',
      );
      return (
        <div>
          {!showForm && selectdAddress && (
            <AddressDropDown
              setSelectedAddress={setSelectedAddress}
              setShowForm={setShowForm}
            />
          )}
        </div>
      );
    };
    const { container } = render(<Warpper />);
    expect(container).toBeTruthy();
  });
});
