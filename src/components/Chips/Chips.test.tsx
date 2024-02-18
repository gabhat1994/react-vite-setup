import { render } from '@/test-utils';
import { Icon } from '@/components/Icon';
import { Chips, ChipsStyledComponent } from './Chips';

describe('<Chips />', () => {
  test('renders', () => {
    const { getByText, container } = render(<Chips>Submit</Chips>);
    expect(getByText('Submit')).toBeInTheDocument();
    expect(container).toBeTruthy();
  });

  test('renders large width', () => {
    const { container } = render(<Chips size="large">Submit</Chips>);
    const chipsClass = ChipsStyledComponent({ size: 'large' })?.type
      .styledComponentId;
    const chipsRoots = document.getElementsByClassName(chipsClass);
    const style = window.getComputedStyle(chipsRoots[0]);

    expect(style.minWidth).toBe(`40px`);
    expect(style.borderRadius).toBe(`24px`);
    expect(style.height).toBe(`23px`);
    expect(style.paddingTop).toBe(`8px`);
    expect(style.paddingBottom).toBe(`8px`);
    expect(container).toBeTruthy();
  });

  test('renders medium width', () => {
    const { container } = render(<Chips size="medium">Submit</Chips>);
    const chipsClass = ChipsStyledComponent({ size: 'medium' })?.type
      .styledComponentId;
    const chipsRoots = document.getElementsByClassName(chipsClass);
    const style = window.getComputedStyle(chipsRoots[0]);

    expect(style.minWidth).toBe(`20px`);
    expect(style.borderRadius).toBe(`24px`);
    expect(style.height).toBe(`22px`);
    expect(style.paddingTop).toBe(`4px`);
    expect(style.paddingBottom).toBe(`4px`);
    expect(container).toBeTruthy();
  });

  test('renders with secondary', () => {
    const { container, getByTestId } = render(
      <Chips secondary size="large">
        Submit
      </Chips>,
    );
    const StyledBadgeEle = getByTestId('chipsSpan');
    expect(StyledBadgeEle).toHaveStyle(`background-color: '#663FBA';`);

    expect(container).toBeTruthy();
  });

  test('renders text only', () => {
    const { container } = render(<Chips textOnly>Submit</Chips>);
    const chipsClass = ChipsStyledComponent({ textOnly: true })?.type
      .styledComponentId;
    const chipsRoots = document.getElementsByClassName(chipsClass);
    const style = window.getComputedStyle(chipsRoots[0]);

    expect(style.padding).toBe(``);
    expect(container).toBeTruthy();
  });

  test('renders with left image', () => {
    const { container } = render(
      <Chips
        primary
        icon={
          <Icon
            name="close_s"
            size={20}
            color="--icon-skillbadge-brand-primary-selected"
          />
        }
      >
        Submit
      </Chips>,
    );
    expect(container).toBeTruthy();
  });
  test('renders with right image', () => {
    const { container } = render(
      <Chips
        primary
        rightIcon={
          <Icon
            name="close_s"
            size={20}
            color="--icon-skillbadge-brand-primary-selected"
          />
        }
      >
        Submit
      </Chips>,
    );
    expect(container).toBeTruthy();
  });
});
