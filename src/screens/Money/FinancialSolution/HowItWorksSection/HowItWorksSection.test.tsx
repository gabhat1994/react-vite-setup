import { BrowserRouter } from 'react-router-dom';
import { cleanup, render } from '@/test-utils';
import HowItWorksSection, { type HowItWorksSectionProps } from './HowItWorksSection';

describe('Money Page Howitworks', () => {
  afterEach(() => {
    cleanup();
  });
  it('should Render Money Page', async () => {
    const props: HowItWorksSectionProps = {
      data: {
        _editable: 'yes',
        _uid: 'sdfdfd',
        Title: 'test',
        Thumbnail: {
          id: 123,
          name: 'dsf',
          fieldtype: 'article',
          filename: 'test',
        },
        Description: 'test',
        component: 'comp',
        Asset: {
          id: 123,
          name: 'dsf',
          fieldtype: 'article',
          filename: 'test',
        },
        Asset_Title: 'test',
        Button_Label: 'label',
        Articles: [],
      },
      showOnlyNavigationIcons: true,
      showCategory: false,
    };
    const { container } = render(
      <BrowserRouter>
        <HowItWorksSection
          data={props.data}
          showOnlyNavigationIcons={props.showOnlyNavigationIcons}
          showCategory={props.showCategory}
        />
      </BrowserRouter>,
    );
    expect(container).toBeTruthy();
  });
});
