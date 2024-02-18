import { render } from '@/test-utils';
import { Icon } from '@/components/Icon';
import { Button, ButtonStyledComponent } from './Button';

describe('<Button />', () => {
  test('renders', () => {
    const { getByText } = render(<Button>Submit</Button>);
    expect(getByText('Submit')).toBeInTheDocument();
  });

  test('renders with icon', () => {
    const { getByTestId } = render(
      <Button
        icon={
          <Icon
            name="placeholder_m"
            size={24}
            color="--icon-button-neutral-default"
          />
        }
      />,
    );
    expect(getByTestId('button')).toBeInTheDocument();
  });

  test('renders with loading', () => {
    const { getByTestId } = render(
      <Button type="submit" loading>
        Submit
      </Button>,
    );
    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  test('renders with disabled', () => {
    const { getByTestId } = render(
      <Button type="submit" disabled>
        Submit
      </Button>,
    );
    expect(getByTestId('button')).toBeDisabled();
  });

  test('renders full width', () => {
    render(<Button size="full">Submit</Button>);
    const separatorClass = ButtonStyledComponent({ size: 'full' })?.type
      .styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.width).toBe(`100%`);
  });

  test('renders large width', () => {
    render(<Button size="large">Submit</Button>);
    const separatorClass = ButtonStyledComponent({ size: 'large' })?.type
      .styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.minHeight).toBe(`56px`);
    expect(style.padding).toBe(`16px`);
  });

  test('renders small width', () => {
    render(<Button size="small">Submit</Button>);
    const separatorClass = ButtonStyledComponent({ size: 'small' })?.type
      .styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.minHeight).toBe(`40px`);
    expect(style.padding).toBe(`8px 12px`);
  });

  test('renders text only', () => {
    render(<Button textOnly>Submit</Button>);
    const separatorClass = ButtonStyledComponent({ textOnly: true })?.type
      .styledComponentId;
    const separatorRoots = document.getElementsByClassName(separatorClass);
    const style = window.getComputedStyle(separatorRoots[0]);
    expect(style.padding).toBe(`0px`);
  });

  test('renders Primary Button', () => {
    const { getByTestId, container } = render(<Button primary>Primary</Button>);
    const ButtonEle = getByTestId('button');
    const ButtonTextEle = getByTestId('button_text');

    expect(ButtonEle).toBeInTheDocument();
    expect(ButtonEle).toContainElement(ButtonTextEle);
    expect(ButtonTextEle.textContent).toBe('Primary');

    expect(container).toBeTruthy();
  });

  test('renders Secondary Button', () => {
    const { getByTestId, container } = render(
      <Button secondary>Secondary</Button>,
    );
    const ButtonEle = getByTestId('button');
    const ButtonTextEle = getByTestId('button_text');

    expect(ButtonEle).toBeInTheDocument();
    expect(ButtonEle).toContainElement(ButtonTextEle);
    expect(ButtonTextEle.textContent).toBe('Secondary');
    expect(container).toBeTruthy();
  });

  test('renders Tertiary Button', () => {
    const { getByTestId, container } = render(
      <Button tertiary>Tertiary</Button>,
    );
    const ButtonEle = getByTestId('button');
    const ButtonTextEle = getByTestId('button_text');

    expect(ButtonEle).toBeInTheDocument();
    expect(ButtonEle).toContainElement(ButtonTextEle);
    expect(ButtonTextEle.textContent).toBe('Tertiary');
    expect(container).toBeTruthy();
  });

  test('renders positive Primary Button', () => {
    const { getByTestId, container } = render(
      <Button primary intent="positive">
        Primary
      </Button>,
    );
    const ButtonEle = getByTestId('button');
    const ButtonTextEle = getByTestId('button_text');

    expect(ButtonEle).toBeInTheDocument();
    expect(ButtonEle).toContainElement(ButtonTextEle);
    expect(ButtonTextEle.textContent).toBe('Primary');

    expect(container).toBeTruthy();
  });

  test('renders positive Secondary Button', () => {
    const { getByTestId, container } = render(
      <Button secondary intent="positive">
        Secondary
      </Button>,
    );
    const ButtonEle = getByTestId('button');
    const ButtonTextEle = getByTestId('button_text');

    expect(ButtonEle).toBeInTheDocument();
    expect(ButtonEle).toContainElement(ButtonTextEle);
    expect(ButtonTextEle.textContent).toBe('Secondary');

    expect(container).toBeTruthy();
  });

  test('renders positive Tertiary Button', () => {
    const { getByTestId, container } = render(
      <Button tertiary intent="positive">
        Tertiary
      </Button>,
    );
    const ButtonEle = getByTestId('button');
    const ButtonTextEle = getByTestId('button_text');

    expect(ButtonEle).toBeInTheDocument();
    expect(ButtonEle).toContainElement(ButtonTextEle);
    expect(ButtonTextEle.textContent).toBe('Tertiary');

    expect(container).toBeTruthy();
  });

  test('renders negative Primary Button', () => {
    const { getByTestId, container } = render(
      <Button primary intent="negative">
        Primary
      </Button>,
    );
    const ButtonEle = getByTestId('button');
    const ButtonTextEle = getByTestId('button_text');

    expect(ButtonEle).toBeInTheDocument();
    expect(ButtonEle).toContainElement(ButtonTextEle);
    expect(ButtonTextEle.textContent).toBe('Primary');

    expect(container).toBeTruthy();
  });

  test('renders negative Secondary Button', () => {
    const { getByTestId, container } = render(
      <Button secondary intent="negative">
        Secondary
      </Button>,
    );
    const ButtonEle = getByTestId('button');
    const ButtonTextEle = getByTestId('button_text');

    expect(ButtonEle).toBeInTheDocument();
    expect(ButtonEle).toContainElement(ButtonTextEle);
    expect(ButtonTextEle.textContent).toBe('Secondary');

    expect(container).toBeTruthy();
  });

  test('renders negative Tertiary Button', () => {
    const { getByTestId, container } = render(
      <Button tertiary intent="negative">
        Tertiary
      </Button>,
    );
    const ButtonEle = getByTestId('button');
    const ButtonTextEle = getByTestId('button_text');

    expect(ButtonEle).toBeInTheDocument();
    expect(ButtonEle).toContainElement(ButtonTextEle);
    expect(ButtonTextEle.textContent).toBe('Tertiary');

    expect(container).toBeTruthy();
  });

  test('renders with primary loading', () => {
    const { getByTestId } = render(
      <Button primary loading>
        Loading
      </Button>,
    );
    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  test('renders with positive primary loading', () => {
    const { getByTestId } = render(
      <Button primary intent="positive" loading>
        Loading
      </Button>,
    );
    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  test('renders with negative primary loading', () => {
    const { getByTestId } = render(
      <Button primary intent="negative" loading>
        Loading
      </Button>,
    );
    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  test('renders with secondary loading', () => {
    const { getByTestId } = render(
      <Button secondary loading>
        Loading
      </Button>,
    );
    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  test('renders with positive secondary loading', () => {
    const { getByTestId } = render(
      <Button secondary intent="positive" loading>
        Loading
      </Button>,
    );
    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  test('renders with negative secondary loading', () => {
    const { getByTestId } = render(
      <Button secondary intent="negative" loading>
        Loading
      </Button>,
    );
    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  test('renders with tertiary loading', () => {
    const { getByTestId } = render(
      <Button tertiary loading>
        Loading
      </Button>,
    );
    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  test('renders with positive tertiary loading', () => {
    const { getByTestId } = render(
      <Button tertiary intent="positive" loading>
        Loading
      </Button>,
    );
    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  test('renders with negative tertiary loading', () => {
    const { getByTestId } = render(
      <Button tertiary intent="negative" loading>
        Loading
      </Button>,
    );
    expect(getByTestId('spinner')).toBeInTheDocument();
  });

  test('renders the primary button with left icon', () => {
    const { getByTestId, container } = render(
      <Button
        primary
        leftIcon={
          <Icon
            name="placeholder_m"
            size={24}
            color="--icon-button-neutral-alt-default"
          />
        }
      >
        Submit
      </Button>,
    );
    const ButtonTextEle = getByTestId('button_text');
    const ButtonEle = getByTestId('button');
    const IconEle = getByTestId('svgIcon');

    expect(ButtonEle).toBeInTheDocument();
    expect(ButtonEle).toContainElement(ButtonTextEle);
    expect(ButtonEle).toContainElement(IconEle);
    expect(IconEle.parentElement?.nextSibling).toBe(ButtonTextEle);

    expect(container).toBeTruthy();
  });

  test('renders the primary button with right icon', () => {
    const { getByTestId, container } = render(
      <Button
        primary
        rightIcon={
          <Icon
            name="placeholder_m"
            size={24}
            color="--icon-button-neutral-alt-default"
          />
        }
      >
        Submit
      </Button>,
    );
    const ButtonTextEle = getByTestId('button_text');
    const ButtonEle = getByTestId('button');
    const IconEle = getByTestId('svgIcon');

    expect(ButtonEle).toBeInTheDocument();
    expect(ButtonEle).toContainElement(ButtonTextEle);
    expect(ButtonEle).toContainElement(IconEle);
    expect(IconEle.parentElement?.previousSibling).toBe(ButtonTextEle);

    expect(container).toBeTruthy();
  });

  test('renders the primary button with only icon', () => {
    const { getByTestId, container } = render(
      <Button
        primary
        rightIcon={
          <Icon
            name="placeholder_m"
            size={24}
            color="--icon-button-neutral-alt-default"
          />
        }
      />,
    );
    const ButtonEle = getByTestId('button');
    const IconEle = getByTestId('svgIcon');

    expect(ButtonEle).toBeInTheDocument();
    expect(ButtonEle).toContainElement(IconEle);
    expect(IconEle.parentElement?.nextSibling).toBeNull();

    expect(container).toBeTruthy();
  });

  test('renders the secondary button with left icon', () => {
    const { getByTestId, container } = render(
      <Button
        secondary
        leftIcon={
          <Icon
            name="placeholder_m"
            size={24}
            color="--icon-button-brand-secondary-default"
          />
        }
      >
        Submit
      </Button>,
    );
    const ButtonTextEle = getByTestId('button_text');
    const ButtonEle = getByTestId('button');
    const IconEle = getByTestId('svgIcon');

    expect(ButtonEle).toBeInTheDocument();
    expect(ButtonEle).toContainElement(ButtonTextEle);
    expect(ButtonEle).toContainElement(IconEle);
    expect(IconEle.parentElement?.nextSibling).toBe(ButtonTextEle);

    expect(container).toBeTruthy();
  });

  test('renders the secondary button with right icon', () => {
    const { getByTestId, container } = render(
      <Button
        secondary
        rightIcon={
          <Icon
            name="placeholder_m"
            size={24}
            color="--icon-button-brand-secondary-default"
          />
        }
      >
        Submit
      </Button>,
    );
    const ButtonTextEle = getByTestId('button_text');
    const ButtonEle = getByTestId('button');
    const IconEle = getByTestId('svgIcon');

    expect(ButtonEle).toBeInTheDocument();
    expect(ButtonEle).toContainElement(ButtonTextEle);
    expect(ButtonEle).toContainElement(IconEle);
    expect(IconEle.parentElement?.previousSibling).toBe(ButtonTextEle);

    expect(container).toBeTruthy();
  });

  test('renders the secondary button with only icon', () => {
    const { getByTestId, container } = render(
      <Button
        secondary
        rightIcon={
          <Icon
            name="placeholder_m"
            size={24}
            color="--icon-button-brand-secondary-default"
          />
        }
      />,
    );
    const ButtonEle = getByTestId('button');
    const IconEle = getByTestId('svgIcon');

    expect(ButtonEle).toBeInTheDocument();
    expect(ButtonEle).toContainElement(IconEle);
    expect(IconEle.parentElement?.nextSibling).toBeNull();

    expect(container).toBeTruthy();
  });

  test('renders the tertiary button with left icon', () => {
    const { getByTestId, container } = render(
      <Button
        tertiary
        leftIcon={
          <Icon
            name="placeholder_m"
            size={24}
            color="--icon-button-neutral-default"
          />
        }
      >
        Submit
      </Button>,
    );
    const ButtonTextEle = getByTestId('button_text');
    const ButtonEle = getByTestId('button');
    const IconEle = getByTestId('svgIcon');

    expect(ButtonEle).toBeInTheDocument();
    expect(ButtonEle).toContainElement(ButtonTextEle);
    expect(ButtonEle).toContainElement(IconEle);
    expect(IconEle.parentElement?.nextSibling).toBe(ButtonTextEle);

    expect(container).toBeTruthy();
  });

  test('renders the tertiary button with right icon', () => {
    const { getByTestId, container } = render(
      <Button
        tertiary
        rightIcon={
          <Icon
            name="placeholder_m"
            size={24}
            color="--icon-button-neutral-default"
          />
        }
      >
        Submit
      </Button>,
    );
    const ButtonTextEle = getByTestId('button_text');
    const ButtonEle = getByTestId('button');
    const IconEle = getByTestId('svgIcon');

    expect(ButtonEle).toBeInTheDocument();
    expect(ButtonEle).toContainElement(ButtonTextEle);
    expect(ButtonEle).toContainElement(IconEle);
    expect(IconEle.parentElement?.previousSibling).toBe(ButtonTextEle);

    expect(container).toBeTruthy();
  });

  test('renders the tertiary button with only icon', () => {
    const { getByTestId, container } = render(
      <Button
        tertiary
        rightIcon={
          <Icon
            name="placeholder_m"
            size={24}
            color="--icon-button-neutral-default"
          />
        }
      />,
    );
    const ButtonEle = getByTestId('button');
    const IconEle = getByTestId('svgIcon');

    expect(ButtonEle).toBeInTheDocument();
    expect(ButtonEle).toContainElement(IconEle);
    expect(IconEle.parentElement?.nextSibling).toBeNull();

    expect(container).toBeTruthy();
  });
});
