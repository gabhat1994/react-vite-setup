import { PostStatus, PostVisibility } from '@/apollo/generated/types';
import { type PostItemFragment } from '@/apollo/graphql';
import { EXAMPLE_POST_ID } from '../../helpers';

export const noPostData: PostItemFragment[] = [
  {
    chamber: {
      _id: '6358f4534eeb64000d8d30d6',
    },
    createdAt: '2023-06-01T08:55:33.773Z',
    postStatus: PostStatus.Accepted,
    rawJSON: {
      blocks: [
        {
          data: {},
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: '8v90q',
          text: 'This is an example post just to show you what posts will look like in your Noum. Don’t worry, it will not be visible when you publish your Noum',
          type: 'unstyled',
        },
      ],
      entityMap: {},
    },
    text: '<p>This is an example post just to show you what posts will look like in your Noum. Don’t worry, it will not be visible when you publish your Noum</p>',
    uid: {
      __typename: 'UserOutput',
      _id: '62fcdb69c2b876000fb22f71',
      firstName: 'John',
      lastName: 'Doe',
      userStatus: 'ACTIVE',
    },
    updatedAt: '2023-06-01T08:55:33.773Z',
    visibility: PostVisibility.Connection,
    __typename: 'PostOutput',
    _id: `${EXAMPLE_POST_ID}_1`,
  },
  {
    chamber: {
      _id: '6358f4534eeb64000d8d30d9',
    },
    createdAt: '2023-06-01T08:55:33.773Z',
    postStatus: PostStatus.Accepted,
    rawJSON: {
      blocks: [
        {
          data: {},
          depth: 0,
          entityRanges: [],
          inlineStyleRanges: [],
          key: '8v90u',
          text: 'This is an example post just to show you what posts will look like in your Noum. Don’t worry, it will not be visible when you publish your Noum',
          type: 'unstyled',
        },
      ],
      entityMap: {},
    },
    text: '<p>This is an example post just to show you what posts will look like in your Noum. Don’t worry, it will not be visible when you publish your Noum</p>',
    uid: {
      __typename: 'UserOutput',
      _id: '62fcdb69c2b876000fb22f70',
      firstName: 'John',
      lastName: 'Doe',
      userStatus: 'ACTIVE',
    },
    updatedAt: '2023-06-01T08:55:33.773Z',
    visibility: PostVisibility.Connection,
    __typename: 'PostOutput',
    _id: `${EXAMPLE_POST_ID}_2`,
  },
];
