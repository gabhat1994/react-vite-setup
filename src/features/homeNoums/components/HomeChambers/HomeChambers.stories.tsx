import { ElementTypeEnum } from '@/apollo/generated/types';
import HomeChambers from './HomeChambers';
import { StoriesCnt } from './styles';

const wrapperProps = {
  currentTitle: 'PERSONAL_INTEREST',
  isBorder: true,
  spaceId: '6269b49b2314503140794492',
  totalIndex: 26,
  currentIndex: 20,
  element: {},
};

export const HomeChambersStories = () => (
  <StoriesCnt>
    <HomeChambers
      image="bulb_m"
      text="No Publications, Designs, or Patents Added Yet"
      buttonText="Add New"
      elementType={ElementTypeEnum.AchievementAward}
      isEditing
      wrapperProps={wrapperProps}
      spaceId=""
      position={1}
      bodyContentJson="[]"
    />
  </StoriesCnt>
);

export default {
  title: 'UI/Chambers/Home Chambers',
  component: HomeChambersStories,
};
