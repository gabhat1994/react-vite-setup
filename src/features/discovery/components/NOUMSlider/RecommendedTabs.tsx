import { t } from 'i18next';
import { useDiscoveryTabContext } from '@/screens/Discovery/DiscoveryTabContext';
import BasicChipsTabsForm from '@/components/Tabs/TabsForm';
import { type InputListTypes } from '@/components/Tabs/types';
import { TabContainer } from './styles';

const listOfTabs: InputListTypes[] = [
  {
    name: 'all',
    image: 'activity_m',
    text: t('noumena.homeChambers.event.filter_all'),
    labelSize: 'auto',
  },
  {
    name: 'noum_spaces',
    image: 'terms_m',
    text: t('noumena.discovery.recommended.tab.noum_spaces'),
    labelSize: 'auto',
  },
  {
    name: 'members',
    image: 'terms_m',
    text: t('noumena.search.filter_members'),
    labelSize: 'auto',
  },
];
export const RecommendedNoumsTabs = () => {
  const { activeTab, setActiveTab } = useDiscoveryTabContext();

  const handleChange = (value: string) => {
    if (!value) return;
    const parsedValue = Number(value);
    setActiveTab(parsedValue);
  };
  return (
    <TabContainer>
      <BasicChipsTabsForm
        onChange={handleChange}
        inputList={listOfTabs}
        selectedId={activeTab.toString()}
        mode="isBackground"
        isWithoutImage
        fontSize="--font-input-small-size"
      />
    </TabContainer>
  );
};
