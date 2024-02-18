import { cleanup, fireEvent, render } from '@/test-utils';
import TabbedSectionTabs from './Tabs';

const mockedTabs = [
  { id: '100', title: 'item 1', disabled: true },
  { id: '101', title: 'item 2' },
];
describe('<TabbedSectionTabs />', () => {
  afterEach(() => {
    cleanup();
  });

  test('tabBar contianer styles', () => {
    const onchange = () => {};
    const { getByTestId } = render(
      <TabbedSectionTabs tabs={mockedTabs} onTabChange={onchange} />,
    );

    const tabBar = getByTestId('tabBar');
    expect(tabBar).toHaveStyle(`width: 100%;
    border-bottom: 0;
    padding: 6px 12px 0 12px;
    `);
  });
  test('active and disabled tab styles', () => {
    const onchange = () => {};
    const { getByTestId, getAllByTestId } = render(
      <TabbedSectionTabs
        tabs={mockedTabs}
        onTabChange={onchange}
        tabType="tab"
        activeTab="101"
      />,
    );

    const tabBar = getByTestId('tabBar');
    const [disabledTab, tab] = getAllByTestId('tabWrapper');
    expect(disabledTab).toHaveStyle(`
        font-weight: var(--font-header-medium-regular-weight);
        pointer-events: none;
    `);
    expect(tab).toHaveStyle(`
        pointer-events: initial;
        line-height: var(--font-header-medium-lineheight);
        font-weight: var(--font-header-medium-regular-weight);
        cursor: default;
        align-items: center;
        justify-content: center;
  `);
    expect(tabBar).toHaveStyle(`
        width: 100%;
        padding: 6px 12px 0px 12px;
    `);
  });
  test('active and disabled button styles', () => {
    const onchange = () => {};
    const { getAllByTestId } = render(
      <TabbedSectionTabs
        tabs={mockedTabs}
        onTabChange={onchange}
        tabType="button"
        activeTab="101"
      />,
    );

    const tabs = getAllByTestId('tabWrapper');
    const [disabledButton] = tabs;
    expect(disabledButton).toHaveStyle(`
        font-weight: var(--font-header-medium-regular-weight);
        pointer-events: none;
    `);
    expect(tabs.length).toBe(2);
  });
  test('onTabChange handler call', () => {
    const mockCallBack = vi.fn();
    const { getAllByTestId } = render(
      <TabbedSectionTabs
        tabs={mockedTabs}
        onTabChange={mockCallBack}
        tabType="tab"
      />,
    );

    const [disabledTab, activeTab] = getAllByTestId('tabWrapper');
    fireEvent.click(disabledTab);
    fireEvent.click(activeTab);
    expect(mockCallBack).toHaveBeenCalledTimes(2);
    expect(activeTab).toHaveStyle(`
        pointer-events: initial;
        line-height: var(--font-header-medium-lineheight);
        font-weight: var(--font-header-medium-regular-weight);
        cursor: default;
        align-items: center;
        justify-content: center;
  `);
  });
});
