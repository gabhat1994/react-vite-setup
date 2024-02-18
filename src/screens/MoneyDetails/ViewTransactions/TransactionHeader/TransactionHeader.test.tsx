import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render } from '@/test-utils';
import { type DropdownValueType } from '@/components/Dropdown';
import { TransactionHeader } from './index';

describe('Money Page Payment Transaction component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should Render Money Page  Transaction component', async () => {
    const handleDropdoenUpdate = vi.fn();
    const handleMonthUpdate = vi.fn();

    const acc = {
      key: '1',
      label: <div>Hi</div>,
      type: 'value',
      value: 'string',
    } as DropdownValueType<string>;
    const { container } = render(
      <>
        {() => {
          <MockedProvider>
            <BrowserRouter>
              <TransactionHeader
                accounts={[acc]}
                selctedDropdownValue={acc}
                handleDropdoenUpdate={handleDropdoenUpdate}
                handleMonthUpdate={handleMonthUpdate}
                selectedMonth=""
              />
            </BrowserRouter>
          </MockedProvider>;
        }}
      </>,
    );
    expect(container).toBeTruthy();
  });
});
