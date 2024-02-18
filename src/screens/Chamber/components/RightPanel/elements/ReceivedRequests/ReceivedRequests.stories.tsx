import styled from 'styled-components';
import { type Meta } from '@storybook/react';
import { type ReceivedConnectionRequestQuery } from '@/apollo/graphql';
import ReceivedRequests from './ReceivedRequests';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 60px 0px;
  align-items: center;
  background-color: var(--bg-body-neutral-alt-highlighted);
  width: 100%;
`;

const mockData: ReceivedConnectionRequestQuery | undefined = {
  receivedConnectionRequest: {
    data: [
      {
        _id: '628b6332e9506b72f1c85444',
        requestFrom: {
          _id: '6281db5dfa7e8a4204698adf',
          name: 'Project Noum',
          title: null,
          type: 'PROJECT',
          institution: 'NOUMENA',
          profileImage:
            'https://images.unsplash.com/photo-1595981234058-a9302fb97229?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
          category: {
            _id: '6267afe198962748523afaf7',
            name: 'Social',
            __typename: 'ProjectChamberCategory',
          },
          uid: {
            _id: '627a8ec281116f5c88787bf9',
            firstName: 'mai',
            middleName: null,
            lastName: 'cruz',
            title: 'mai Dev',
            __typename: 'UserOutput',
          },
          __typename: 'SpaceOutput',
        },
        __typename: 'SpaceConnection',
      },
      {
        _id: '6294afd90460e4c520f2f657',
        requestFrom: {
          _id: '627bbb7d79a5764901315fa0',
          name: 'HOME Chamber',
          title: 'Developer',
          type: 'HOME',
          institution: 'NOUMENA',
          profileImage:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
          category: null,
          uid: {
            _id: '627a8ec281116f5c88787bf9',
            firstName: 'Master',
            middleName: 'User',
            lastName: null,
            title: 'Developer',
            __typename: 'UserOutput',
          },
          __typename: 'SpaceOutput',
        },
        __typename: 'SpaceConnection',
      },
      {
        _id: '6294c0860460e4a7aef7458b',
        requestFrom: {
          _id: '62862b84fd7b7c31e820103f',
          name: 'Project Noum 2',
          title: null,
          type: 'PROJECT',
          institution: 'NOUMENA',
          profileImage: '',
          category: {
            _id: '6267afe198962748523afaf7',
            name: 'Project',
            __typename: 'ProjectChamberCategory',
          },
          uid: {
            _id: '627a8ec281116f5c88787bf9',
            firstName: 'Tester Two',
            middleName: null,
            lastName: 'Web',
            title: null,
            __typename: 'UserOutput',
          },
          __typename: 'SpaceOutput',
        },
        __typename: 'SpaceConnection',
      },
    ],
    count: 3,
    __typename: 'ConnectionOutputResponse',
  },
};

export default {
  title: 'UI/Chambers/ReceivedRequests',
  component: ReceivedRequests,

  args: {
    loading: false,
    connectionsData: mockData,
    noumId: '',
  },
} as Meta<typeof ReceivedRequests>;

export const Example = ({ ...args }) => (
  <Wrapper>
    <ReceivedRequests noumId="noumId" {...args} />
  </Wrapper>
);
