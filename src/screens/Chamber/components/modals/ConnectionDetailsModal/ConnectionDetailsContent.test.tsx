import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ConnectionDetailsContent } from './ConnectionDetailsContent';

describe('<ConnectionDetailsContent />', () => {
  test('render and show content', () => {
    const item = { name: 'John Doe', title: 'Developer' };

    const { container, getByTestId } = render(
      <BrowserRouter>
        <ConnectionDetailsContent
          item={item}
          selectedTab="Connections"
          isOwner={true}
          isArchived={false}
          closeModal={() => {}}
          setInvitedInfo={() => {}}
          showInviteModal={() => {}}
        />
      </BrowserRouter>,
    );
    expect(container).toBeTruthy();
    expect(getByTestId('avatarIcon')).toBeTruthy();
  });
});
