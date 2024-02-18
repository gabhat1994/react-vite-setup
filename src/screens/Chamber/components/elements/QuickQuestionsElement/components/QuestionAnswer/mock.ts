import { type NoumQuestionOutput } from '@/apollo/generated/types';

export const question1: NoumQuestionOutput = {
  __typename: 'NoumQuestionOutput',
  _id: '63638dbc3ef6b8000c5d7e71',
  body: 'What is your favorite active football player?\nDo you think he will win 2022 World cup?',
  questionImage:
    'https://noumena-img.s3-accelerate.amazonaws.com/photo-1637203725134-1bbdcc17bb91.hB00Rkjz.jpeg',
  expiryDate: '2022-11-04T00:00:00.000Z',
  user: {
    __typename: 'UserOutput',
    _id: '6298287ddd7689000eb5b33d',
    firstName: 'Rimin',
    middleName: null,
    lastName: 'Li',
    profile: {
      __typename: 'ProfileOutput',
      profilePictureThumbnail:
        'https://noumena-img.s3-accelerate.amazonaws.com/6298287ddd7689000eb5b33d/profile/6298287ddd7689000eb5b33d-1661916136337-thumbnail.png',
    },
    chamber: {
      __typename: 'ChamberByUserIdRef',
      _id: '629f61d3aee347000dc9661d',
      userId: '6298287ddd7689000eb5b33d',
    },
    userStatus: 'ACTIVE',
  },
  createdAt: '2022-11-03T09:45:32.991Z',
  updatedAt: '2022-11-03T09:45:32.991Z',
  answers: [
    {
      __typename: 'AnswerOutput',
      _id: '63638df53ef6b8000c5d90aa',
      user: {
        __typename: 'UserOutput',
        _id: '6232f2aefd028201aff18b43',
        firstName: 'Mark',
        middleName: null,
        lastName: 'F',
        profile: {
          __typename: 'ProfileOutput',
          profilePictureThumbnail:
            'https://noumena-img.s3-accelerate.amazonaws.com/6232f2aefd028201aff18b43/profile/6232f2aefd028201aff18b43-1655496721661-thumbnail.png',
        },
        chamber: {
          __typename: 'ChamberByUserIdRef',
          _id: '62544d995e16006d6143b8d7',
          userId: '6232f2aefd028201aff18b43',
        },
        userStatus: 'ACTIVE',
      },
      body: 'CR7 vs MS10',
      spaceId: null,
      tipDetails: [],
      createdAt: '2022-11-03T09:46:29.021Z',
      updatedAt: '2022-11-03T09:46:29.021Z',
    },
    {
      __typename: 'AnswerOutput',
      _id: '63638e4a3ef6b8000c5da0aa',
      user: {
        __typename: 'UserOutput',
        _id: '627a8ec281116f5c88787bf9',
        firstName: 'Yunlai',
        middleName: null,
        lastName: 'Che',
        profile: {
          __typename: 'ProfileOutput',
          profilePictureThumbnail:
            'https://noumena-img.s3-accelerate.amazonaws.com/627a8ec281116f5c88787bf9/profile/627a8ec281116f5c88787bf9-1655923819380-thumbnail.png',
        },
        chamber: {
          __typename: 'ChamberByUserIdRef',
          _id: '6288938897ffc4addf44c384',
          userId: '627a8ec281116f5c88787bf9',
        },
        userStatus: 'ACTIVE',
      },
      body: 'What do you think about DeGea and MC Tomy?',
      spaceId: null,
      tipDetails: [],
      createdAt: '2022-11-03T09:47:54.189Z',
      updatedAt: '2022-11-03T09:47:54.189Z',
    },
  ],
};

export const question2: NoumQuestionOutput = {
  __typename: 'NoumQuestionOutput',
  _id: '6363886f3ef6b8000c5cb584',
  body: 'What is the name of your ex-girlfriend?',
  questionImage: '',
  expiryDate: '2022-11-05T00:00:00.000Z',
  user: {
    __typename: 'UserOutput',
    _id: '6232f2aefd028201aff18b43',
    firstName: 'Mark',
    middleName: null,
    lastName: 'F',
    profile: {
      __typename: 'ProfileOutput',
      profilePictureThumbnail:
        'https://noumena-img.s3-accelerate.amazonaws.com/6232f2aefd028201aff18b43/profile/6232f2aefd028201aff18b43-1655496721661-thumbnail.png',
    },
    chamber: {
      __typename: 'ChamberByUserIdRef',
      _id: '62544d995e16006d6143b8d7',
      userId: '6232f2aefd028201aff18b43',
    },
    userStatus: 'ACTIVE',
  },
  createdAt: '2022-11-03T09:22:55.098Z',
  updatedAt: '2022-11-03T09:22:55.098Z',
  answers: [
    {
      __typename: 'AnswerOutput',
      _id: '636388f43ef6b8000c5ccbd2',
      user: {
        __typename: 'UserOutput',
        _id: '62a244e77d2faa000ec98918',
        firstName: 'Tian',
        middleName: null,
        lastName: 'YongJin',
        profile: {
          __typename: 'ProfileOutput',
          profilePictureThumbnail:
            'https://noumena-img.s3-accelerate.amazonaws.com/62a244e77d2faa000ec98918/profile/62a244e77d2faa000ec98918-1657945670977-thumbnail.png',
        },
        chamber: {
          __typename: 'ChamberByUserIdRef',
          _id: '62a244ee0d962c000f606f99',
          userId: '62a244e77d2faa000ec98918',
        },
        userStatus: 'ACTIVE',
      },
      body: "I don't have.",
      spaceId: null,
      tipDetails: [],
      createdAt: '2022-11-03T09:25:08.595Z',
      updatedAt: '2022-11-03T09:25:08.595Z',
    },
    {
      __typename: 'AnswerOutput',
      _id: '636389183ef6b8000c5cd05f',
      user: {
        __typename: 'UserOutput',
        _id: '626105fc30ea608ab6e5f66d',
        firstName: 'Hong',
        middleName: null,
        lastName: 'Deshuai',
        profile: {
          __typename: 'ProfileOutput',
          profilePictureThumbnail:
            'https://noumena-img.s3-accelerate.amazonaws.com/626105fc30ea608ab6e5f66d/profile/626105fc30ea608ab6e5f66d-1655821405204-thumbnail.png',
        },
        chamber: {
          __typename: 'ChamberByUserIdRef',
          _id: '6261061693839035ce767f9f',
          userId: '626105fc30ea608ab6e5f66d',
        },
        userStatus: 'ACTIVE',
      },
      body: 'Hmm\nNot sure\nHow should this work?\nCan you have very long answer here?\n\nHmm\nNot sure\nHow should this work?\nCan you have very long answer here?\n\n\nHmm\nNot sure\nHow should this work?\nCan you have very long answer here?\n\n\nHmm\nNot sure\nHow should this work?\nCan you have very long answer here?\n\nHmm\nNot sure\nHow should this work?\nCan you have very long answer here?\n\nHmm\nNot sure\nHow should this work?\nCan you have very long answer here?\n\nHmm\nNot sure\nHow should this work?\nCan you have very long answer here?',
      spaceId: null,
      tipDetails: [],
      createdAt: '2022-11-03T09:25:44.693Z',
      updatedAt: '2022-11-03T09:25:44.693Z',
    },
  ],
};
