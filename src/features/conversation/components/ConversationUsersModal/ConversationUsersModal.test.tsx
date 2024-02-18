import { fireEvent, render } from '@/test-utils';
import { type UserData } from '../../types';
import ConversationUsersModal from './ConversationUsersModal';

const users: UserData[] = [
  {
    firstName: 'vitthal',
    homeNoumId: '62862524fd7b7c6cea1ff8e0',
    lastName: 'Chandane',
    placeholder: false,
    source:
      'https://noumena-img.s3-accelerate.amazonaws.com/627e10857c90d0603c1c2a3c/profile/627e10857c90d0603c1c2a3c-1657135508219-thumbnail.png',
    title: 'title',
    _id: '627e10857c90d0603c1c2a3c',
  },
  {
    firstName: 'Peng',
    homeNoumId: '62a7fec3f57355000d88f299',
    lastName: 'Jin',
    placeholder: false,
    source: undefined,
    title: undefined,
    _id: '62a6f1ceb3bed7000e6abfbf',
  },
];

let selectedUser: UserData;

describe('<ChamberPermissionModal />', () => {
  it('renders', () => {
    const handleGoHomeNoum = vi.fn((user: UserData) => {
      selectedUser = user;
    });
    const handleClose = vi.fn();
    const { getByTestId, container } = render(
      <ConversationUsersModal
        users={users}
        isOpen={true}
        onClose={handleClose}
        onGoHomeNoum={handleGoHomeNoum}
      />,
    );
    expect(getByTestId('conversation-user-modal')).toBeInTheDocument();
    expect(getByTestId('conversation-user-item-0')).toBeInTheDocument();
    expect(getByTestId('conversation-user-item-1')).toBeInTheDocument();

    fireEvent.click(getByTestId('conversation-user-item-0'));
    expect(handleGoHomeNoum).toHaveBeenCalled();
    expect(handleClose).toHaveBeenCalled();

    expect(selectedUser).toEqual(users[0]);

    expect(container).toBeTruthy();
  });
});
