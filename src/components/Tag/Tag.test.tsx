import { render } from '@/test-utils';
import { Icon } from '@/components/Icon';
import { Avatar } from '@/components/Avatar/Avatar';
import { Tag, TagStyledComponent } from '.';

describe('<Tags />', () => {
  test('renders Tags', () => {
    const { container } = render(<Tag secondary>content</Tag>);
    const tagClass = TagStyledComponent({ secondary: true })?.type
      .styledComponentId;
    const tagRoots = document.getElementsByClassName(tagClass);
    const style = window.getComputedStyle(tagRoots[0]);

    expect(style.borderRadius).toBe(`8px`);
    expect(style.height).toBe(`30px`);
    expect(style.paddingTop).toBe(`4px`);
    expect(style.paddingBottom).toBe(`4px`);
    expect(style.paddingLeft).toBe(`8px`);
    expect(style.paddingRight).toBe(`8px`);
    expect(container).toBeTruthy();
  });

  test('renders with secondary, background should be "#e7e6e9"', () => {
    const { container, getByTestId } = render(<Tag secondary>Content</Tag>);
    const StyledTagEle = getByTestId('tags');
    expect(StyledTagEle).toHaveStyle(`background-color: '#e7e6e9';`);

    expect(container).toBeTruthy();
  });

  test('renders with secondary, color should be "#554d66"', () => {
    const { container, getByTestId } = render(<Tag secondary>Content</Tag>);
    const StyledTagEle = getByTestId('tags');
    expect(StyledTagEle).toHaveStyle(`color: '#554d66';`);

    expect(container).toBeTruthy();
  });

  test('renders with primary, background should be "#f2eefe"', () => {
    const { container, getByTestId } = render(<Tag primary>Content</Tag>);
    const StyledTagEle = getByTestId('tags');
    expect(StyledTagEle).toHaveStyle(`background-color: '#f2eefe';`);

    expect(container).toBeTruthy();
  });

  test('renders with primary, color should be "#663fba"', () => {
    const { container, getByTestId } = render(<Tag primary>Content</Tag>);
    const StyledTagEle = getByTestId('tags');
    expect(StyledTagEle).toHaveStyle(`color: '#663fba';`);

    expect(container).toBeTruthy();
  });

  test('renders without primary, secondary, background should be "#f2eefe"', () => {
    const { container, getByTestId } = render(<Tag>Content</Tag>);
    const StyledTagEle = getByTestId('tags');
    expect(StyledTagEle).toHaveStyle(`background-color: '#f2eefe';`);

    expect(container).toBeTruthy();
  });

  test('renders with primary, secondary, color should be "#663fba"', () => {
    const { container, getByTestId } = render(<Tag>Content</Tag>);
    const StyledTagEle = getByTestId('tags');
    expect(StyledTagEle).toHaveStyle(`color: '#663fba';`);

    expect(container).toBeTruthy();
  });

  test('renders with left icon', () => {
    const { container } = render(
      <Tag
        icon={
          <Icon
            name="close_s"
            size={20}
            color="--icon-tag-neutral-alt-default"
          />
        }
      >
        Submit
      </Tag>,
    );
    expect(container).toBeTruthy();
  });

  test('renders with right icon', () => {
    const { container } = render(
      <Tag
        rightIcon={<Icon name="close_s" size={20} color="--icon-tag-neutral" />}
      >
        content
      </Tag>,
    );
    expect(container).toBeTruthy();
  });

  test('renders with avatar', () => {
    const { container } = render(
      <Tag
        avatar={
          <Avatar url="https://www.w3schools.com/howto/img_avatar2.png" />
        }
      >
        content
      </Tag>,
    );
    expect(container).toBeTruthy();
  });

  test('inner text will be "content"', () => {
    const { getByText } = render(<Tag>content</Tag>);
    expect(getByText('content')).toBeInTheDocument();
  });
});
