import { NoumLinkStatus, ProjectChamberType } from '@/apollo/generated/types';
import { type SpaceOutputFragment } from '@/apollo/graphql';

export const mockInputOwnNoumToLink: SpaceOutputFragment = {
  _id: '62cbedad717432000ea8f5b8',
  name: 'bct campaign',
  title: null,
  description: '',
  profileImage: null,
  status: 'PUBLISHED',
  type: 'PROJECT',
  permission: 'ALL',
  followersCount: 0,
  isFollowing: false,
  connectionsCount: 4,
  projectType: 'PUBLIC',
  link: {
    _id: '63201701aa8700000d1c4037',
    status: NoumLinkStatus.Linked,
    projectType: ProjectChamberType.Public,
    connectionsCount: 3,
    followersCount: 0,
    linkedAt: '2021-09-14T09:20:01.000Z',
    linkedNoumsCount: 1,
    linkedNoums: [
      {
        _id: '62cc01b6936a36000d576fca',
        name: 'bct campaign my noums',
        type: 'PROJECT',
        permission: 'ALL',
        followersCount: 0,
        connectionsCount: 4,
        connectionId: null,
        projectType: 'PUBLIC',
        profileImage: null,
        link: {
          _id: '63201701aa8700000d1c4037',
          status: NoumLinkStatus.Linked,
          linkedNoumsCount: 0,
        },
      },
    ],
  },
  category: {
    _id: '6267afe19896273a233afaf6',
    name: 'Project',
  },
  uid: {
    _id: '62ac4ca744433c000cdd5c47',
    firstName: 'Radhey Phone',
    middleName: null,
    lastName: 'red',
    location: 'asdfasda, Tiljala Road, Kustia, Kolkata, West Bengal, India',
  },
};

export const expected = {
  name: 'bct campaign',
  connections: 4,
  followers: 0,
  visibility: 'Public',
  checked: false,
  type: 'Project',
  linked: 0,
  linkId: '63201701aa8700000d1c4037',
  linkedNoums: [
    {
      name: 'bct campaign my noums',
      connections: 4,
      followers: 0,
      visibility: 'Public',
      checked: false,
      type: 'Project',
      linked: 0,
      linkId: '63201701aa8700000d1c4037',
      spaceId: '62cc01b6936a36000d576fca',
      profileImage: '/src/assets/images/chamber_default.png',
      disabled: false,
      isSubNoum: true,
      linkedNoums: [],
      key: '62cbedad717432000ea8f5b8-62cc01b6936a36000d576fca',
    },
  ],
  spaceId: '62cbedad717432000ea8f5b8',
  profileImage: '/src/assets/images/chamber_default.png',
  disabled: false,
  isSubNoum: false,
  key: '62cbedad717432000ea8f5b8',
};
