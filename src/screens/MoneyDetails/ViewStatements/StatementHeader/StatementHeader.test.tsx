import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import { cleanup, render } from '@/test-utils';
import { type DropdownValueType } from '@/components/Dropdown';
import { StatementHeader } from './index';

describe('Money Page Payment Transaction component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should Render Money Page  Transaction component', async () => {
    const handleStartDate = vi.fn();
    const handleDropdoenUpdate = vi.fn();
    const handleEndDate = vi.fn();

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
              <StatementHeader
                accounts={[acc]}
                selctedDropdownValue={acc}
                handleDropdoenUpdate={handleDropdoenUpdate}
                startDate={undefined}
                endDate={undefined}
                handleStartDate={handleStartDate}
                handleEndDate={handleEndDate}
              />
            </BrowserRouter>
          </MockedProvider>;
        }}
      </>,
    );
    expect(container).toBeTruthy();
  });
});
