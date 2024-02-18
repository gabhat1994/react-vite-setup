import { MockedProvider } from '@apollo/client/testing';
import { cleanup, fireEvent, render } from '@/test-utils';
import AddManualReference from './AddManualReference';

describe('<AddManualReference />', () => {
  afterEach(() => {
    cleanup();
  });

  const handleCloseReferenceModal = vi.fn();
  test('Should render modal', () => {
    const { container } = render(
      <MockedProvider>
        <AddManualReference
          onClose={handleCloseReferenceModal}
          isOpen
          capacityOptions={[]}
          referenceLoading={false}
          onSubmitManualReference={vi.fn()}
        />
      </MockedProvider>,
    );

    expect(container).toBeTruthy();
  });

  test('Open Experience Modal', async () => {
    const { getByTestId } = render(
      <MockedProvider>
        <AddManualReference
          onClose={handleCloseReferenceModal}
          isOpen
          capacityOptions={[]}
          referenceLoading={false}
          onSubmitManualReference={vi.fn()}
        />
      </MockedProvider>,
    );
    const cancelAction = getByTestId('add-reference-cancel-action');
    expect(cancelAction).toBeTruthy();
    await fireEvent.click(cancelAction);
  });
});
