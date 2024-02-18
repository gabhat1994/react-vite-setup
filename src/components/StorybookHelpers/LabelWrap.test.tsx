import { render } from '@/test-utils';
import { LabelWrap, LabelGroup } from './LabelWrap';

describe('LabelWrap', () => {
  test('renders correctly', () => {
    const { getByText } = render(
      <LabelWrap label="This is a label">Content</LabelWrap>,
    );
    expect(getByText('Content')).toBeInTheDocument();
    expect(getByText('This is a label')).toBeInTheDocument();
  });
});

describe('LabelGroup', () => {
  test('renders correctly', () => {
    render(
      <LabelGroup columns={3}>
        <LabelWrap label="This is a label">Content</LabelWrap>
      </LabelGroup>,
    );

    const labelGroupClassName = LabelGroup({ columns: 3 })?.type
      .styledComponentId;
    const labelGroupRoots =
      document.getElementsByClassName(labelGroupClassName);
    const style = window.getComputedStyle(labelGroupRoots[0]);
    expect(style.gridColumn).toBe(`1 / 3`);
  });
});
