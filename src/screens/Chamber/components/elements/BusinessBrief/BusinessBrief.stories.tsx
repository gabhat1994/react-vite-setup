import { MockedProvider } from '@apollo/client/testing';
import BusinessBrief from './BusinessBrief';
import { mockdata } from './mockdata';

export default {
  title: 'UI/Chambers/BusinessBrief',
  component: BusinessBrief,
};

const wrapperProps = {
  currentTitle: 'PERSONAL_INTEREST',
  isBorder: true,
  spaceId: '6269b49b2314503140794492',
  totalIndex: 26,
  currentIndex: 20,
  element: {},
};

export const Primary = () => (
  <MockedProvider mocks={mockdata}>
    <BusinessBrief
      wrapperProps={{ ...wrapperProps }}
      currentTitle="Business Brief"
      isBorder={false}
      spaceId="6269b49b2314503140794492"
      elementId="62694c80231450a11478ca33"
      elementPosition={1}
      isEditing
    />
  </MockedProvider>
);
