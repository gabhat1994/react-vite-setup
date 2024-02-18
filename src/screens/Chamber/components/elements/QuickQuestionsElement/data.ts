import {
  type QuestionAnswerUserFragment,
  type GetQuestionsForSpaceQuery,
} from '@/apollo/graphql';

const questionsAnswerUserMockData: QuestionAnswerUserFragment = {
  _id: '62b1523ae60231000d355ecb',
  firstName: 'John',
  middleName: null,
  lastName: 'Doe',
  profile: {
    profilePictureThumbnail:
      'https://noumena-img.s3-accelerate.amazonaws.com/62b1523ae60231000d355ecb/profile/62b1523ae60231000d355ecb-1668767787669-thumbnail.png',
    profilePicture:
      'https://noumena-img.s3-accelerate.amazonaws.com/download (1).JbWIkvWB.png',
    __typename: 'ProfileOutput',
  },
  chamber: {
    _id: '62b15325d66879000f7b358d',
    userId: '62b1523ae60231000d355ecb',
    __typename: 'ChamberByUserIdRef',
  },
  userStatus: 'ACTIVE',
  __typename: 'UserOutput',
};

export const questionsMockData: GetQuestionsForSpaceQuery = {
  getQuestionsForSpace: {
    count: 3,
    data: [
      {
        _id: '64806ec884a29e0010739339',
        body: 'This is an example content just to show you what questions will look like in your Noum. Don’t worry, it will not be visible when you publish your Noum',
        questionImage: '',
        expiryDate: '2023-06-30T00:00:00.000Z',
        user: questionsAnswerUserMockData,
        spaceId: {
          _id: '644bd3aa74e740000d90856d',
          __typename: 'SpaceOutput',
        },
        createdAt: '2023-06-07T11:49:28.814Z',
        updatedAt: '2023-06-07T11:49:28.814Z',
        answers: [],
        __typename: 'NoumQuestionOutput',
      },
      {
        _id: '64806c6f84a29e00107373b8',
        body: 'You can control who can ask questions in your Noum. Note - if a user can see the Quick Questions tool, they can see all questions and answers inside it.',
        questionImage: '',
        expiryDate: '2023-06-17T00:00:00.000Z',
        user: questionsAnswerUserMockData,
        spaceId: {
          _id: '644bd3aa74e740000d90856d',
          __typename: 'SpaceOutput',
        },
        createdAt: '2023-06-07T11:39:27.427Z',
        updatedAt: '2023-06-07T11:39:27.427Z',
        answers: [
          {
            _id: '64806d0184a29e00107379bc',
            user: questionsAnswerUserMockData,
            body: 'I play once a week.',
            spaceId: null,
            tipDetails: [],
            createdAt: '2023-06-07T11:41:53.498Z',
            updatedAt: '2023-06-07T11:41:53.498Z',
            __typename: 'AnswerOutput',
          },
          {
            _id: '64806d0184a29e00107379bc',
            user: questionsAnswerUserMockData,
            body: 'I play once a week.',
            spaceId: null,
            tipDetails: [],
            createdAt: '2023-06-07T11:41:53.498Z',
            updatedAt: '2023-06-07T11:41:53.498Z',
            __typename: 'AnswerOutput',
          },
        ],
        __typename: 'NoumQuestionOutput',
      },
      {
        _id: '64806c4984a29e001073733e',
        body: 'Users can be tipped for valuable answers too.',
        questionImage: '',
        expiryDate: '2023-06-10T00:00:00.000Z',
        user: questionsAnswerUserMockData,
        spaceId: {
          _id: '644bd3aa74e740000d90856d',
          __typename: 'SpaceOutput',
        },
        createdAt: '2023-06-07T11:38:49.948Z',
        updatedAt: '2023-06-07T11:38:49.948Z',
        answers: [],
        __typename: 'NoumQuestionOutput',
      },
    ],
    __typename: 'QuestionOutputResponse',
  },
  tipped: {
    count: 1,
    __typename: 'QuestionOutputResponse',
  },
  answered: {
    count: 1,
    __typename: 'QuestionOutputResponse',
  },
  close: {
    count: 1,
    __typename: 'QuestionOutputResponse',
  },
  open: {
    count: 3,
    __typename: 'QuestionOutputResponse',
  },
};
