import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { cleanup, render } from '@/test-utils';
import { useClient } from '@/hooks';
import { type DropdownValueType } from '@/components/Dropdown';
import Modal from './index';

describe('Statement Filter', () => {
  afterEach(() => {
    cleanup();
  });

  it('should Render statement Filter', async () => {
    const handleClose = vi.fn();
    const handleStartDate = vi.fn();
    const handleDropdoenUpdate = vi.fn();
    const handleEndDate = vi.fn();
    const setFilters = vi.fn();

    const acc = {
      key: '1',
      label: <div>Hi</div>,
      type: 'value',
      value: 'string',
    } as DropdownValueType<string>;

    const { container } = render(
      <>
        {() => {
          const { client } = useClient();
          return (
            <ApolloProvider client={client}>
              <BrowserRouter>
                <Modal
                  setFilters={setFilters}
                  isOpen={true}
                  handleClose={handleClose}
                  accounts={[acc]}
                  selctedDropdownValue={acc}
                  handleDropdoenUpdate={handleDropdoenUpdate}
                  startDate={undefined}
                  endDate={undefined}
                  handleStartDate={handleStartDate}
                  handleEndDate={handleEndDate}
                />
              </BrowserRouter>
            </ApolloProvider>
          );
        }}
      </>,
    );
    expect(container).toBeTruthy();
  });
});
