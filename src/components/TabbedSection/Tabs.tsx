import generate from 'uniqid';
import { StyledTabBar, TabWrapper } from './styles';
import { type TabbedSectionProps } from './types';

function TabbedSectionTabs<TabId = string>({
  tabs,
  activeTab,
  onTabChange,
  children,
  tabsWrapperStyles,
  rightElement,
  tabType = 'tab',
  className,
  font = 'heading-m',
}: TabbedSectionProps<TabId>) {
  return (
    <>
      <StyledTabBar
        style={tabsWrapperStyles}
        tabStyle={tabType}
        justify="space-around"
        className={className}
        data-testid="tabBar"
      >
        {tabs.map((tab) => (
          <TabWrapper
            key={generate()}
            disabled={tab.disabled}
            active={tab.id === activeTab}
            onClick={() => {
              onTabChange(tab);
            }}
            tabStyle={tabType}
            font={font}
            data-testid="tabWrapper"
          >
            {tab.title}
          </TabWrapper>
        ))}
        {rightElement}
      </StyledTabBar>
      {children}
    </>
  );
}

export default TabbedSectionTabs;
