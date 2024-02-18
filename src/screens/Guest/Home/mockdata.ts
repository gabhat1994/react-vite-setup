import { type SpaceOutputResponse } from '@/apollo/generated/types';

export const getConnectedSpaces: SpaceOutputResponse = {
  data: [
    {
      _id: '62de566016d36d000d9394e9',
      name: 'bct campaign my noumsnhhhj',
      title: null,
      description: '',
      profileImage: null,
      status: 'PUBLISHED',
      permission: 'ALL',
      followersCount: 0,
      isFollowing: false,
      isConnected: true,
      connectionsCount: 2,
      connectionId: '63077f15ce5314000edbea96',
      type: 'PROJECT',
      category: {
        _id: '6267afe1989627330b3afaf8',
        name: 'Special',
      },
      elements: [],
      networks: [],
      uid: {
        _id: '62ac4ca744433c000cdd5c47',
        firstName: 'Radhey Phone',
        middleName: null,
        lastName: 'red',
        location: null,
        profile: {
          profilePicture:
            'https://noumena-img.s3-accelerate.amazonaws.com/av1.ZGCmkPWg.jpeg',
        },
      },
    },
  ],
};
