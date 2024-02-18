import {
  UpdateChamberProjectTypeDocument,
  ChangeProjectChamberStatusDocument,
} from '@/apollo/graphql';

export const mockdata = [
  {
    request: {
      query: UpdateChamberProjectTypeDocument,
      variables: {
        id: '6297245dc35418000ea0ab05',
        projectType: 'PUBLIC',
      },
    },
    result: () => ({
      data: {
        updateProjectChamber: {
          _id: '6297245dc35418000ea0ab05',
          projectType: 'PUBLIC',
          unSaved: {
            projectType: 'PUBLIC',
            __typename: 'SpaceDraftData',
          },
          draft: {
            projectType: 'PUBLIC',
            __typename: 'SpaceDraftData',
          },
          __typename: 'SpaceOutput',
        },
      },
    }),
  },
  {
    request: {
      query: ChangeProjectChamberStatusDocument,
      variables: {
        spaceId: '6297245dc35418000ea0ab05',
        status: 'DRAFT',
      },
    },
    result: () => ({
      data: {
        changeProjectChamberStatus: {
          _id: '6297245dc35418000ea0ab05',
          status: 'DRAFT',
          tempStatus: 'DRAFT',
          name: 'Investment Group',
          title: null,
          description: '',
          profileImage: null,
          institution: 'NOUMENA',
          type: 'PROJECT',
          permission: 'ALL',
          projectType: 'PUBLIC',
          unSaved: null,
          draft: {
            name: null,
            description: null,
            title: null,
            projectType: 'PRIVATE',
            profileImage: null,
            __typename: 'SpaceDraftData',
          },
          updatedAt: '2022-06-15T06:22:26.453Z',
          publishedAt: '2022-06-14T10:40:50.151Z',
          __typename: 'SpaceOutput',
        },
      },
    }),
  },
];
