import { useTranslation } from 'react-i18next';
import { type CommunityTabsProps } from '@/screens/Community/types';
import { TabButton, TabContainer } from '@/screens/Community/styles';
import { COMMUNITY_TABS } from '@/screens/Community/consts';

const CommunityTabs = ({ handleClick, tabName }: CommunityTabsProps) => {
  const { t } = useTranslation();
  return (
    <TabContainer>
      {COMMUNITY_TABS.map((item) => (
        <TabButton
          isActive={item === tabName}
          key={item}
          onClick={() => handleClick(item)}
        >
          {t(`${item}`)}
        </TabButton>
      ))}
    </TabContainer>
  );
};
export default CommunityTabs;
