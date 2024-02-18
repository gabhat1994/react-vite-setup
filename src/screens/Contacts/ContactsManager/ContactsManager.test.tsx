import { MemoryRouter } from 'react-router';
import { screen } from '@testing-library/dom';
import { MockedProvider } from '@apollo/client/testing';
import { intersectionObserver } from '@/test-utils/stubs';
import { render } from '@/test-utils';
import { ResizeObserverMock } from '@/test-utils/stubs/ResizeObserver';
import { ContactsManager } from './ContactsManager';

function setup() {
  return render(
    <MockedProvider>
      <MemoryRouter>
        <ContactsManager />
      </MemoryRouter>
    </MockedProvider>,
  );
}

beforeEach(() => {
  ResizeObserverMock.mock();
  intersectionObserver.mock();
});
afterEach(() => {
  ResizeObserverMock.restore();
  intersectionObserver.restore();
});

describe('Layout', () => {
  test('Displays correct title', async () => {
    setup();

    expect(screen.findByText('Contacts')).resolves.toBeTruthy();
  });
});
