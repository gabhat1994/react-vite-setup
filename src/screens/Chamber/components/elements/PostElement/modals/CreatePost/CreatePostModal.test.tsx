import { MemoryRouter } from 'react-router-dom';
import { MockedProvider, type MockedResponse } from '@apollo/client/testing';
import { act } from 'react-dom/test-utils';
import { render, cleanup, waitFor, fireEvent, screen } from '@/test-utils';
import { AuthProvider } from '@/features/auth/contexts';
import AppRoutes from '@/routes';
import { client } from '@/apollo/client';
import { PostVisibility, type PostInput } from '@/apollo/generated/types';
import {
  CreatePostDocument,
  CreatePostForChamberDocument,
  CurrentUserDocument,
  GenerateUserS3SignedUrlDocument,
  UpdatePostDocument,
} from '@/apollo/graphql';
import { type CreatePostProps } from './types';
import { CreatePostModal } from './CreatePostModal';
import existingPost from './mock';

vi.mock('@/hooks/launchDarkly', () => {
  const mock = vi.fn().mockReturnValue({
    identifyUser: vi.fn(),
    flags: {
      postRte: false,
    },
  });
  return {
    default: mock,
    useLaunchDarkly: mock,
  };
});

// const editorTestId = "post-rich-text-editor"
const editorTestId = 'mentionsInput';

const postInput: PostInput = {
  visibility: PostVisibility.All,
  text: 'this is new post',
  tags: [],
};

const chamberPostUpdate: PostInput = {
  visibility: PostVisibility.Connection,
  text: 'this is new post updated hi new post',
  tags: [],
  chamberId: '628e70b4beea5a017a6e362e',
  post: { category: null, content: null },
};

const chamberPostInput: PostInput = {
  visibility: PostVisibility.Connection,
  text: 'this is new post',
  tags: [],
  chamberId: '628e70b4beea5a017a6e362e',
};

const props: CreatePostProps = {
  spaceId: '628e70b4beea5a017a6e362e',
  onClose: vi.fn(),
  onSuccess: vi.fn(),
  isChamber: true,
};

const currentUser = {
  _id: '624fbb408eaeb3c5fbe40eb2',
  access: true,
  userStatus: 'ACTIVE',
};

const inactiveUser = {
  _id: '624fbb408eaeb3c5fbe40eb2',
  access: true,
};

const uploadMock = {
  request: {
    query: GenerateUserS3SignedUrlDocument,
    variables: {
      file: {
        fileName: 'example.png',
        mime: 'image/png',
      },
    },
  },
  result: {
    data: {
      url: 'https://noumena-img.s3-accelerate.amazonaws.com/Group 1.TZW5HgkP.png',
    },
  },
};

const createPostMock = {
  request: {
    query: CreatePostDocument,
    variables: {
      input: postInput,
    },
  },
  result: () => ({
    data: {
      createPost: {
        _id: '62f535be5ad7390011a03dab',
        comments: [],
        commentsCount: 0,
        createdAt: '2022-08-11T17:00:46.701Z',
        groupId: null,
        isPinned: false,
        pinnedTimestamp: null,
        post: {
          category: null,
          content: null,
          resolutions: [],
          thumbnail: null,
          __typename: 'Post',
        },
        postStatus: 'ACCEPTED',
        reactions: [],
        reactionsCount: 0,
        reports: [],
        text: 'this is new post',
        uid: {
          SocialHallTCAccepted: false,
          _id: '62e119564729fa000dddea47',
          bio: 'My information on this is true',
          citizenship: null,
          connection: 'none',
          createdAt: '2022-07-27T10:54:14.471Z',
          creditCheckResult: null,
          email: 'testnoumena15@ravikiran.com',
          firstName: 'Ravi',
          kycResult: null,
          lastLoginAt: '2022-08-11T05:42:51.506Z',
          lastName: 'kiran',
          location: 'Hyderabad, Telangana, India',
          middleName: null,
          phone: null,
          profileUrl: null,
          referralCode: null,
          status: 'REGISTERED',
          title:
            'Architect adslknfadfasdfasmdlfanlsdfaadsfalmsdfaklsdnfasdfasdnfanmsd,fbjkasdjkfasdjkfjkasdfasd,mfa,msdf,masd,mfa,ds,fnasdn,fdfasd,mfam,sdfa,mnsdln,sdfnasdnfm,asdmn,fam,nsdfam,nsdfm,nasd',
          unreadConnectionCount: 0,
          updatedAt: '2022-08-11T05:55:37.696Z',
          userOwnReferralCode: '3909',
          userStatus: 'ACTIVE',
          username: 'rkiran',
          __typename: 'UserOutput',
        },
        updatedAt: '2022-08-11T17:00:46.701Z',
        userReaction: null,
        visibility: 'ALL',
        __typename: 'PostOutput',
      },
    },
  }),
};

const createChamberPostMock = {
  request: {
    query: CreatePostForChamberDocument,
    variables: {
      input: chamberPostInput,
    },
  },
  result: () => ({
    data: { createPostForChamber: { _id: '62f543a05ad7390011a03dde' } },
  }),
};

const updatePostMock = {
  request: {
    query: UpdatePostDocument,
    variables: {
      _id: '62fb43f8b5900e000d29e8a2',
      input: chamberPostUpdate,
    },
  },
  result: () => ({ data: { updatePost: { _id: '628e70b4beea5a017a6e362e' } } }),
};

const currentUserMock = {
  request: {
    query: CurrentUserDocument,
  },
  result: () => ({ data: { currentUser } }),
};

const inactiveUserMock = {
  request: {
    query: CurrentUserDocument,
  },
  result: () => ({ data: { currentUser } }),
};
const mocks = (): MockedResponse[] => [
  createPostMock,
  createChamberPostMock,
  currentUserMock,
  updatePostMock,
  inactiveUserMock,
  uploadMock,
];

describe('<CreatePost />', () => {
  afterEach(() => {
    cleanup();
  });

  test('Testing for rendering', () => {
    const initialEntries = ['/noum/628e70b4beea5a017a6e362e/edit'];

    const { container } = render(
      <MockedProvider mocks={mocks()}>
        <AuthProvider client={client} initialUser={currentUser}>
          <MemoryRouter initialEntries={initialEntries}>
            <AppRoutes />
          </MemoryRouter>
        </AuthProvider>
      </MockedProvider>,
    );
    expect(container).toBeTruthy();
  });

  test('Tests HandlePosting User Inactive', async () => {
    const handleClose = vi.fn();
    const initialEntries = ['/noum/628e70b4beea5a017a6e362e'];

    const { container, getByTestId } = render(
      <MockedProvider mocks={mocks()}>
        <AuthProvider client={client} initialUser={inactiveUser}>
          <MemoryRouter initialEntries={initialEntries}>
            <CreatePostModal {...props} onClose={handleClose} />
          </MemoryRouter>
        </AuthProvider>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(container).toBeTruthy();
    });

    const modalEle = getByTestId('create_post');
    const modalCloseBtn = getByTestId('modal_close_btn');
    const editorEle = getByTestId('post_editor_container');
    const userInfoEle = getByTestId('user_info');
    const mediaPickerEle = getByTestId('multi_media_picker');
    const postCreateBtn = getByTestId('post_create_btn');

    expect(modalEle).toBeTruthy();
    expect(editorEle).toBeTruthy();
    expect(modalCloseBtn).toBeTruthy();
    expect(userInfoEle).toBeTruthy();
    expect(mediaPickerEle).toBeTruthy();
    expect(postCreateBtn).toBeTruthy();

    postCreateBtn.focus();
    expect(postCreateBtn).toHaveTextContent('Post');
    const textField = getByTestId(editorTestId);
    expect(textField).toBeTruthy();

    textField.focus();
    fireEvent.change(textField, { target: { value: 'this is post' } });
    expect(textField).toHaveTextContent('this is post');
    expect(postCreateBtn).not.toBeDisabled();
    fireEvent.click(postCreateBtn);

    await waitFor(() => {
      expect(postCreateBtn).toBeTruthy();
      expect(postCreateBtn).not.toBeDisabled();
    });
  });

  test('Test Update Chamber Post Error', async () => {
    const handleClose = vi.fn();
    const { container, getByTestId } = render(
      <MockedProvider addTypename={false} mocks={mocks()}>
        <AuthProvider client={client} initialUser={currentUser}>
          <CreatePostModal
            {...props}
            onClose={handleClose}
            post={existingPost}
          />
        </AuthProvider>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(container).toBeTruthy();
    });

    const modalEle = getByTestId('create_post');
    const modalCloseBtn = getByTestId('modal_close_btn');
    const editorEle = getByTestId('post_editor_container');
    const userInfoEle = getByTestId('user_info');
    const visibilitySelectEle = getByTestId('post_visibility_selector');
    const mediaPickerEle = getByTestId('multi_media_picker');
    const postSaveBtn = getByTestId('post_create_btn');

    expect(modalEle).toBeTruthy();
    expect(editorEle).toBeTruthy();
    expect(modalCloseBtn).toBeTruthy();
    expect(userInfoEle).toBeTruthy();
    expect(visibilitySelectEle).toBeTruthy();
    expect(mediaPickerEle).toBeTruthy();
    expect(postSaveBtn).toBeTruthy();

    postSaveBtn.focus();
    expect(postSaveBtn).toHaveTextContent('Save');
    const textField = getByTestId(editorTestId);
    expect(textField).toBeTruthy();

    textField.focus();
    fireEvent.change(textField, { target: { value: 'this is post' } });
    expect(textField).toHaveTextContent('this is post');
    expect(postSaveBtn).not.toBeDisabled();
    fireEvent.click(postSaveBtn);

    await waitFor(() => {
      expect(props.onSuccess).not.toHaveBeenCalled();
    });
  });

  test('Creates Home Noum Post mutation error', async () => {
    const handleClose = vi.fn();
    const initialEntries = ['/noum/628e70b4beea5a017a6e362e'];

    const { container, getByTestId } = render(
      <MockedProvider addTypename={false} mocks={mocks()}>
        <AuthProvider client={client} initialUser={currentUser}>
          <MemoryRouter initialEntries={initialEntries}>
            <CreatePostModal
              {...props}
              onClose={handleClose}
              isChamber={false}
              isMasterNoum={true}
            />
          </MemoryRouter>
        </AuthProvider>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(container).toBeTruthy();
    });

    const modalEle = getByTestId('create_post');
    const modalCloseBtn = getByTestId('modal_close_btn');
    const editorEle = getByTestId('post_editor_container');
    const userInfoEle = getByTestId('user_info');
    const mediaPickerEle = getByTestId('multi_media_picker');
    const postCreateBtn = getByTestId('post_create_btn');

    expect(modalEle).toBeTruthy();
    expect(editorEle).toBeTruthy();
    expect(modalCloseBtn).toBeTruthy();
    expect(userInfoEle).toBeTruthy();
    expect(mediaPickerEle).toBeTruthy();
    expect(postCreateBtn).toBeTruthy();

    postCreateBtn.focus();
    expect(postCreateBtn).toHaveTextContent('Post');
    const textField = getByTestId(editorTestId);
    expect(textField).toBeTruthy();

    textField.focus();
    fireEvent.change(textField, { target: { value: 'this is post' } });
    expect(textField).toHaveTextContent('this is post');
    expect(postCreateBtn).not.toBeDisabled();
    fireEvent.click(postCreateBtn);

    await waitFor(() => {
      expect(props.onSuccess).not.toHaveBeenCalled();
    });
  });

  test('Creates Home Noum Post', async () => {
    const handleClose = vi.fn();
    const initialEntries = ['/noum/628e70b4beea5a017a6e362e'];

    const { container, getByTestId } = render(
      <MockedProvider addTypename={false} mocks={mocks()}>
        <AuthProvider client={client} initialUser={currentUser}>
          <MemoryRouter initialEntries={initialEntries}>
            <CreatePostModal
              {...props}
              onClose={handleClose}
              isChamber={false}
              isMasterNoum={true}
            />
          </MemoryRouter>
        </AuthProvider>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(container).toBeTruthy();
    });

    const modalEle = getByTestId('create_post');
    const modalCloseBtn = getByTestId('modal_close_btn');
    const editorEle = getByTestId('post_editor_container');
    const userInfoEle = getByTestId('user_info');
    const mediaPickerEle = getByTestId('multi_media_picker');
    const postCreateBtn = getByTestId('post_create_btn');

    expect(modalEle).toBeTruthy();
    expect(editorEle).toBeTruthy();
    expect(modalCloseBtn).toBeTruthy();
    expect(userInfoEle).toBeTruthy();
    expect(mediaPickerEle).toBeTruthy();
    expect(postCreateBtn).toBeTruthy();

    postCreateBtn.focus();
    expect(postCreateBtn).toHaveTextContent('Post');
    const textField = getByTestId(editorTestId);
    expect(textField).toBeTruthy();

    textField.focus();
    fireEvent.change(textField, { target: { value: 'this is new post' } });
    expect(textField).toHaveTextContent('this is new post');
    expect(postCreateBtn).not.toBeDisabled();
    fireEvent.click(postCreateBtn);

    await waitFor(() => {
      expect(props.onSuccess).toHaveBeenCalled();
    });
  });

  test('Test Creates Home Noum Post of morethan 1000 characters', async () => {
    const handleClose = vi.fn();
    const initialEntries = ['/noum/628e70b4beea5a017a6e362e'];

    const { container, getByTestId } = render(
      <MockedProvider addTypename={false} mocks={mocks()}>
        <AuthProvider client={client} initialUser={currentUser}>
          <MemoryRouter initialEntries={initialEntries}>
            <CreatePostModal
              {...props}
              onClose={handleClose}
              isMasterNoum={true}
            />
          </MemoryRouter>
        </AuthProvider>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(container).toBeTruthy();
    });

    const modalEle = getByTestId('create_post');
    const modalCloseBtn = getByTestId('modal_close_btn');
    const editorEle = getByTestId('post_editor_container');
    const userInfoEle = getByTestId('user_info');
    const mediaPickerEle = getByTestId('multi_media_picker');
    const postCreateBtn = getByTestId('post_create_btn');

    expect(modalEle).toBeTruthy();
    expect(editorEle).toBeTruthy();
    expect(modalCloseBtn).toBeTruthy();
    expect(userInfoEle).toBeTruthy();
    expect(mediaPickerEle).toBeTruthy();
    expect(postCreateBtn).toBeTruthy();

    postCreateBtn.focus();
    expect(postCreateBtn).toHaveTextContent('Post');
    const textField = getByTestId(editorTestId);
    expect(textField).toBeTruthy();

    textField.focus();
    fireEvent.change(textField, {
      target: {
        value: `this is new post more than 1000 characters 
    this is new post more than 1000 characters this is new post more than 1000 characters 
    this is new post more than 1000 characters this is new post more than 1000 characters 
    this is new post more than 1000 characters this is new post more than 1000 characters 
    this is new post more than 1000 characters this is new post more than 1000 characters 
    this is new post more than 1000 characters this is new post more than 1000 characters 
    this is new post more than 1000 characters this is new post more than 1000 characters 
    this is new post more than 1000 characters this is new post more than 1000 characters 
    this is new post more than 1000 characters this is new post more than 1000 characters 
    this is new post more than 1000 characters this is new post more than 1000 characters 
    this is new post more than 1000 characters this is new post more than 1000 characters 
    this is new post more than 1000 characters this is new post more than 1000 characters`,
      },
    });
    expect(textField).toHaveTextContent('this is new post');
  });

  test('Creates Chamber Post', async () => {
    const handleClose = vi.fn();
    const { container, getByTestId } = render(
      <MockedProvider addTypename={false} mocks={mocks()}>
        <AuthProvider client={client} initialUser={currentUser}>
          <CreatePostModal {...props} onClose={handleClose} isChamber={true} />
        </AuthProvider>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(container).toBeTruthy();
    });

    const modalEle = getByTestId('create_post');
    const modalCloseBtn = getByTestId('modal_close_btn');
    const editorEle = getByTestId('post_editor_container');
    const userInfoEle = getByTestId('user_info');
    const visibilitySelectEle = getByTestId('post_visibility_selector');
    const mediaPickerEle = getByTestId('multi_media_picker');
    const postCreateBtn = getByTestId('post_create_btn');

    expect(modalEle).toBeTruthy();
    expect(editorEle).toBeTruthy();
    expect(modalCloseBtn).toBeTruthy();
    expect(userInfoEle).toBeTruthy();
    expect(visibilitySelectEle).toBeTruthy();
    expect(mediaPickerEle).toBeTruthy();
    expect(postCreateBtn).toBeTruthy();

    postCreateBtn.focus();
    expect(postCreateBtn).toHaveTextContent('Post');
    const textField = getByTestId(editorTestId);
    expect(textField).toBeTruthy();

    textField.focus();
    fireEvent.change(textField, { target: { value: 'this is new post' } });
    expect(textField).toHaveTextContent('this is new post');
    expect(postCreateBtn).not.toBeDisabled();
    fireEvent.click(postCreateBtn);

    await waitFor(() => {
      expect(props.onSuccess).toHaveBeenCalled();
    });
  });

  test('Test Update Chamber Post', async () => {
    const handleClose = vi.fn();
    const { container, getByTestId } = render(
      <MockedProvider addTypename={false} mocks={mocks()}>
        <AuthProvider client={client} initialUser={currentUser}>
          <CreatePostModal
            {...props}
            onClose={handleClose}
            post={existingPost}
          />
        </AuthProvider>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(container).toBeTruthy();
    });

    const modalEle = getByTestId('create_post');
    const modalCloseBtn = getByTestId('modal_close_btn');
    const editorEle = getByTestId('post_editor_container');
    const userInfoEle = getByTestId('user_info');
    const visibilitySelectEle = getByTestId('post_visibility_selector');
    const mediaPickerEle = getByTestId('multi_media_picker');
    const postSaveBtn = getByTestId('post_create_btn');

    expect(modalEle).toBeTruthy();
    expect(editorEle).toBeTruthy();
    expect(modalCloseBtn).toBeTruthy();
    expect(userInfoEle).toBeTruthy();
    expect(visibilitySelectEle).toBeTruthy();
    expect(mediaPickerEle).toBeTruthy();
    expect(postSaveBtn).toBeTruthy();

    postSaveBtn.focus();
    expect(postSaveBtn).toHaveTextContent('Save');
    const textField = getByTestId(editorTestId);
    expect(textField).toBeTruthy();

    textField.focus();
    fireEvent.change(textField, {
      target: { value: 'this is new post updated ' },
    });
    expect(textField).toHaveTextContent('this is new post updated ');
    expect(postSaveBtn).not.toBeDisabled();
    fireEvent.click(postSaveBtn);

    await waitFor(() => {
      expect(props.onSuccess).toHaveBeenCalled();
    });
  });

  test('Throws Chamber post Mutation Error', async () => {
    const handleClose = vi.fn();
    const { container, getByTestId } = render(
      <MockedProvider addTypename={false} mocks={mocks()}>
        <AuthProvider client={client} initialUser={currentUser}>
          <CreatePostModal {...props} onClose={handleClose} />
        </AuthProvider>
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(container).toBeTruthy();
    });

    const modalEle = getByTestId('create_post');
    const modalCloseBtn = getByTestId('modal_close_btn');
    const editorEle = getByTestId('post_editor_container');
    const userInfoEle = getByTestId('user_info');
    const visibilitySelectEle = getByTestId('post_visibility_selector');
    const mediaPickerEle = getByTestId('multi_media_picker');
    const postCreateBtn = getByTestId('post_create_btn');

    expect(modalEle).toBeTruthy();
    expect(editorEle).toBeTruthy();
    expect(modalCloseBtn).toBeTruthy();
    expect(userInfoEle).toBeTruthy();
    expect(visibilitySelectEle).toBeTruthy();
    expect(mediaPickerEle).toBeTruthy();
    expect(postCreateBtn).toBeTruthy();

    postCreateBtn.focus();
    expect(postCreateBtn).toHaveTextContent('Post');
    const textField = getByTestId(editorTestId);
    expect(textField).toBeTruthy();
    textField.focus();

    act(() => {
      fireEvent.change(textField, { target: { value: 'this is post' } });
    });

    expect(textField).toHaveTextContent('this is post');
    expect(postCreateBtn).not.toBeDisabled();
    act(() => {
      fireEvent.click(postCreateBtn);
    });
  });

  test('Closes the modal', async () => {
    const handleClose = vi.fn();
    const { container, getByTestId } = render(
      <MockedProvider addTypename={false} mocks={mocks()}>
        <CreatePostModal {...props} onClose={handleClose} />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(container).toBeTruthy();
    });

    const modalClose = getByTestId('modal_close_btn');

    modalClose.focus();
    fireEvent.click(modalClose);
    expect(handleClose).toHaveBeenCalled();
  });

  test('Home  Noum Visibility for check', async () => {
    const { container, getByTestId } = render(
      <MockedProvider addTypename={false} mocks={mocks()}>
        <CreatePostModal {...props} isChamber={false} isMasterNoum={true} />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(container).toBeTruthy();
    });

    const modalEle = getByTestId('create_post');
    const modalCloseBtn = getByTestId('modal_close_btn');
    const editorEle = getByTestId('post_editor_container');
    const userInfoEle = getByTestId('user_info');
    const mediaPickerEle = getByTestId('multi_media_picker');
    const postCreateBtn = getByTestId('post_create_btn');

    expect(modalEle).toBeTruthy();
    expect(editorEle).toBeTruthy();
    expect(modalCloseBtn).toBeTruthy();
    expect(userInfoEle).toBeTruthy();
    expect(mediaPickerEle).toBeTruthy();
    expect(postCreateBtn).toBeTruthy();

    const visibilitySelectEle = screen.queryByText('Visible for');
    expect(visibilitySelectEle).not.toBeInTheDocument();
  });
});
