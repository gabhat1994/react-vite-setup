import { client } from '@/apollo/client';
import { ActionType, type UserOutput } from '@/apollo/generated/types';
import { CurrentUserDocument } from '@/apollo/graphql';
import { Button } from '@/components/Button';
import accessLocalStorage from '@/constants/accessLocalStorage';
import { useAuth } from '@/features/auth/contexts';
import AppRoutes from '@/routes';
import { cleanup, fireEvent, render } from '@/test-utils';
import { setLocalStorage } from '@/utils/localStorage';
import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { renderHook } from '@testing-library/react-hooks';
import { useCallback } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { type UserFragment } from '@/apollo/graphql/fragments';
import { AuthProvider } from './AuthProvider';

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHBpcmVkQXQiOjE2NTYxMDk0MDUsImNyZWF0ZWRBdCI6MTY1NTkzNjYwNSwicm9sZXMiOltdLCJfaWQiOiI2MjMyZjJhZWZkMDI4MjAxYWZmMThiNDMifQ.tGsUjiNmi_5JHQWGCJ7NYBnah1ZGfd9RFAsnxhwtK8s';

const currentUser: UserFragment = {
  __typename: 'User',
  _id: '6232f2aefd028201aff18b43',
  firstName: 'Mark',
  lastName: 'F',
  middleName: null,
  email: 'mark@noumena.global',
  phone: null,
  username: 'mf',
  title: 'Software Engineer',
  location: null,
  bio: null,
  profile: {
    _id: '6232f2aefd0282bedff18b44',
    profilePicture:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjK1YVkBuzFUY7XZxcxOM7B7M_8qf_Zbxleg&usqp=CAU',
    profilePictureThumbnail:
      'https://noumena-img.s3-accelerate.amazonaws.com/6232f2aefd028201aff18b43/profile/6232f2aefd028201aff18b43-1655496721661-thumbnail.png',
    socialLinks: [
      {
        name: 'url1',
        link: 'linked.com',
      },
    ],
  },
  userStatus: 'ACTIVE',
  ageGroup: null,
  freelancingExperience: null,
  metadata: [
    {
      additionalInfo: null,
      reason: '',
      moreInfo: '',
      statusTo: 'ACTIVE',
      statusFrom: 'PENDING',
      changeOn: '2022-03-17T08:37:37.083Z',
      changedBy: '619f5f21433523318c243250',
      changedByDetails: null,
    },
  ],
  chamber: {
    userId: '6232f2aefd028201aff18b43',
    _id: '623951b6175c6d45f85d8e27',
  },
  skills: [
    {
      name: 'IT Consulting',
      _id: '61c182a5e617a7178a228dc8',
      icon: 'IT Consulting',
    },
    {
      name: 'Electrical Engineer',
      _id: '61c182a5e617a72daa228dd1',
      icon: 'Electrical Engineer',
    },
    {
      name: 'Electrical Design',
      _id: '61c182a5e617a769b1228dd0',
      icon: 'Electrical Design',
    },
  ],
};

const currentUserMock = {
  request: {
    query: CurrentUserDocument,
  },
  result: () => ({ data: { currentUser } }),
};

const mocks = (): MockedResponse[] => [currentUserMock];

const initialEntries = ['/'];

const AuthUpdateButton: React.FC<{
  value?: UserOutput;
  funcType?: string;
  testId?: string;
}> = ({ funcType, testId = 'fireAuth' }) => {
  const { signIn, signOut, signUp } = useAuth();
  const handleSignIn = useCallback(() => {
    signIn({
      accessToken: '',
      refreshToken: '',
    });
  }, [signIn]);
  const handleSignUp = useCallback(() => {
    signUp();
  }, [signUp]);
  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Button
      onClick={() => {
        switch (funcType) {
          case 'signin':
            handleSignIn();
            break;
          case 'signout':
            handleSignOut();
            break;
          case 'signup':
            handleSignUp();
            break;
          default:
            handleSignOut();
        }
      }}
      data-testid={testId}
    />
  );
};
describe('auth hooks', () => {
  afterEach(() => {
    cleanup();
  });
  const {
    result: {
      current: { user, signIn, signOut, signUp, updateUserStatus },
    },
  } = renderHook(() => useAuth());

  it('initial user to be null', () => {
    render(
      <MockedProvider addTypename={false} mocks={mocks()}>
        <AuthProvider client={client}>
          <MemoryRouter initialEntries={initialEntries}>
            <AppRoutes />
          </MemoryRouter>
        </AuthProvider>
      </MockedProvider>,
    );
    expect(user).toBe(null);
  });

  it('should successfully signin', async () => {
    const { getByTestId } = render(
      <MockedProvider addTypename={false} mocks={mocks()}>
        <AuthProvider client={client} initialUser={currentUser}>
          <AuthUpdateButton funcType="signin" testId="signin" />
        </AuthProvider>
      </MockedProvider>,
    );
    setLocalStorage(accessLocalStorage.ACCESS_TOKEN, token);
    signIn({
      accessToken: '',
      refreshToken: '',
    });
    fireEvent.click(getByTestId('signin'));
  });
  it('should successfully signout', async () => {
    const { getByTestId } = render(
      <MockedProvider addTypename={false} mocks={mocks()}>
        <AuthProvider client={client} initialUser={currentUser}>
          <AuthUpdateButton funcType="signout" testId="signout" />
        </AuthProvider>
      </MockedProvider>,
    );
    signOut();
    fireEvent.click(getByTestId('signout'));
  });
  it('should successfully sign up', async () => {
    const active = ActionType.Active;
    const { getByTestId } = render(
      <MockedProvider addTypename={false} mocks={mocks()}>
        <AuthProvider client={client} initialUser={currentUser}>
          <AuthUpdateButton funcType="signup" testId="signup" />
        </AuthProvider>
      </MockedProvider>,
    );
    setLocalStorage(accessLocalStorage.ACCESS_TOKEN, token);
    signUp();
    updateUserStatus(active);
    fireEvent.click(getByTestId('signup'));
  });
});
