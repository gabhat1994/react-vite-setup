const noTippedAnswer = {
  _id: '63638c963ef6b8000c5d4a6a',
  user: {
    _id: '6232f2aefd028201aff18b43',
    firstName: 'Mark',
    lastName: 'Florence',
    profile: {
      profilePictureThumbnail:
        'https://noumena-img.s3-accelerate.amazonaws.com/6232f2aefd028201aff18b43/profile/6232f2aefd028201aff18b43-1655496721661-thumbnail.png',
    },
    userStatus: 'ACTIVE',
  },
  body: 'The general rules of React Hooks also apply to custom Hooks; these include:\n- Only call Hooks at the top level. Don’t call Hooks inside loops, conditions, or nested functions\n- Only call Hooks from React function components\n- Don’t call Hooks from regular JavaScript functions',
  spaceId: null,
  tipDetails: [],
  createdAt: '2022-11-03T09:40:38.388Z',
  updatedAt: '2022-11-03T09:40:38.388Z',
};

const tippedByOtherAnswer = {
  ...noTippedAnswer,
  _id: '63638c963ef6b8000c5d4a6b',
  body: 'The general rules of React Hooks also apply to custom Hooks; these include',
  tipDetails: [
    {
      amount: 15,
      tipBy: {
        _id: '1',
        firstName: 'Test',
        lastName: 'User1',
        userStatus: 'ACTIVE',
      },
    },
  ],
};

const tippedByOthersAnswer = {
  ...noTippedAnswer,
  _id: '63638c963ef6b8000c5d4a6c',
  body: '- Only call Hooks at the top level. Don’t call Hooks inside loops, conditions, or nested functions',
  user: {
    _id: '6298287ddd7689000eb5b33d',
    firstName: 'Rimin',
    lastName: 'Li',
    profile: {
      profilePictureThumbnail:
        'https://noumena-img.s3-accelerate.amazonaws.com/6298287ddd7689000eb5b33d/profile/6298287ddd7689000eb5b33d-1661916136337-thumbnail.png',
    },
    userStatus: 'ACTIVE',
  },
  tipDetails: [
    {
      amount: 15,
      tipBy: {
        _id: '1',
        firstName: 'Test',
        lastName: 'User1',
        userStatus: 'ACTIVE',
      },
    },
    {
      amount: 4,
      tipBy: {
        _id: '2',
        firstName: 'Test',
        lastName: 'User2',
        userStatus: 'ACTIVE',
      },
    },
  ],
};

const tippedByMeAnswer = {
  ...noTippedAnswer,
  _id: '63638c963ef6b8000c5d4a6d',
  body: '- Only call Hooks from React function components',
  user: {
    _id: '6298287ddd7689000eb5b33d',
    firstName: 'Rimin',
    lastName: 'Li',
    profile: {
      profilePictureThumbnail:
        'https://noumena-img.s3-accelerate.amazonaws.com/6298287ddd7689000eb5b33d/profile/6298287ddd7689000eb5b33d-1661916136337-thumbnail.png',
    },
    userStatus: 'ACTIVE',
  },
  tipDetails: [
    {
      amount: 11,
      tipBy: {
        _id: '6232f2aefd028201aff18b43',
        firstName: 'Mark',
        lastName: 'Florence',
        userStatus: 'ACTIVE',
      },
    },
  ],
};

const tippedByMeAndOthersAnswer = {
  ...noTippedAnswer,
  _id: '63638c963ef6b8000c5d4a6e',
  body: '- Don’t call Hooks from regular JavaScript functions',
  user: {
    _id: '6298287ddd7689000eb5b33d',
    firstName: 'Rimin',
    lastName: 'Li',
    profile: {
      profilePictureThumbnail:
        'https://noumena-img.s3-accelerate.amazonaws.com/6298287ddd7689000eb5b33d/profile/6298287ddd7689000eb5b33d-1661916136337-thumbnail.png',
    },
    userStatus: 'ACTIVE',
  },
  tipDetails: [
    {
      amount: 11,
      tipBy: {
        _id: '6232f2aefd028201aff18b43',
        firstName: 'Mark',
        lastName: 'Florence',
        userStatus: 'ACTIVE',
      },
    },
    {
      amount: 15,
      tipBy: {
        _id: '1',
        firstName: 'Test',
        lastName: 'User1',
        userStatus: 'ACTIVE',
      },
    },
    {
      amount: 4,
      tipBy: {
        _id: '2',
        firstName: 'Test',
        lastName: 'User2',
      },
    },
  ],
};

export const variousAnswers = [
  noTippedAnswer,
  tippedByMeAnswer,
  tippedByMeAndOthersAnswer,
  tippedByOtherAnswer,
  tippedByOthersAnswer,
];
