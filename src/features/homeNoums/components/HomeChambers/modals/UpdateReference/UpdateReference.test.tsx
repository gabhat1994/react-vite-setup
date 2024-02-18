import { MockedProvider } from '@apollo/client/testing';
import { cleanup, fireEvent, render } from '@/test-utils';
import {
  type NoumReference,
  NoumReferenceCapacity,
  NoumReferenceStatus,
} from '@/apollo/generated/types';
import UpdateReference from './UpdateReference';

const mockedReference: NoumReference = {
  _id: '634e5d340ba483000c65d1a3',
  experienceId: '634e5cc20ba483000c65b9fe',
  capacity: NoumReferenceCapacity.Client,
  providerName: 'Unknown Provider',
  referenceText: 'To test to add a reference manually',
  imageUrl:
    'https://noumena-img.s3-accelerate.amazonaws.com/download.hpuSfOHP.jpeg',
  status: NoumReferenceStatus.Accepted,
};

describe('<UpdateReference />', () => {
  afterEach(() => {
    cleanup();
  });

  const handleCloseReferenceModal = vi.fn();
  test('Should render modal', () => {
    const { container } = render(
      <MockedProvider>
        <UpdateReference
          reference={mockedReference}
          onClose={handleCloseReferenceModal}
          isOpen
          capacityOptions={[]}
          referenceLoading={false}
          onSubmitReference={vi.fn()}
        />
      </MockedProvider>,
    );

    expect(container).toBeTruthy();
  });

  test('Open Experience Modal', async () => {
    const { getByTestId } = render(
      <MockedProvider>
        <UpdateReference
          reference={mockedReference}
          onClose={handleCloseReferenceModal}
          isOpen
          capacityOptions={[]}
          referenceLoading={false}
          onSubmitReference={vi.fn()}
        />
      </MockedProvider>,
    );
    const cancelAction = getByTestId('add-reference-cancel-action');
    expect(cancelAction).toBeTruthy();
    await fireEvent.click(cancelAction);
  });
});
