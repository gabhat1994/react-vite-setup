import { render } from '@/test-utils';
import { TSpan } from './index';

describe('<Typography />', () => {
  it('renders without crashing', () => {
    const { getByTestId } = render(<TSpan data-testid="typographyID" />);
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      max-width: max-content;
    `);
  });

  it('Checks Overflow', () => {
    const { getByTestId } = render(
      // clip|ellipsis|string|initial|inherit;
      <TSpan data-testid="typographyID" overflow="clip" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: clip
    `);
  });

  it('Checks Flex', () => {
    const { getByTestId } = render(
      // flex-grow flex-shrink flex-basis|auto|initial|inherit;
      <TSpan data-testid="typographyID" flex="flex-grow" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      flex: flex-grow;
    `);
  });

  it('Checks Fill', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" $fill={true} />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      flex-grow: 1;
    `);
  });

  it('Checks headingXLarge Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="heading-xl" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-header-xlarge-regular-font);
      font-weight: var(--font-header-xlarge-regular-weight);
      line-height: var(--font-header-xlarge-lineheight);
    `);
  });

  it('Checks headingXLargeBold Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="heading-xl-bold" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-header-xlarge-bold-font);
      font-weight: var(--font-header-xlarge-bold-weight);
      line-height: var(--font-header-xlarge-lineheight);
    `);
  });

  it('Checks headingLarge Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="heading-l" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-header-large-regular-font);
      font-size: var(--font-header-large-size);
      line-height: var(--font-header-large-lineheight);
      font-weight: var(--font-header-large-regular-weight);
    `);
  });

  it('Checks headingLargeBold Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="heading-l-bold" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-header-large-bold-font);
      font-size: var(--font-header-large-size);
      line-height: var(--font-header-large-lineheight);
      font-weight: var(--font-header-large-bold-weight);
    `);
  });

  it('Checks headingMedium Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="heading-m" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-header-medium-regular-font);
      font-size: var(--font-header-medium-size);
      line-height: var(--font-header-medium-lineheight);
      font-weight: var(--font-header-medium-regular-weight);
    `);
  });

  it('Checks headingMediumBold Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="heading-m-bold" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-header-medium-bold-font);
      font-size: var(--font-header-medium-size);
      line-height: var(--font-header-medium-lineheight);
      font-weight: var(--font-header-medium-bold-weight);
    `);
  });

  it('Checks headingSmall Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="heading-s" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-header-small-regular-font);
      font-size: var(--font-header-small-size);
      line-height: var(--font-header-small-lineheight);
      font-weight: var(--font-header-small-regular-weight);
    `);
  });

  it('Checks headingSmallBold Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="heading-s-bold" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-header-small-bold-font);
      font-size: var(--font-header-small-size);
      line-height: var(--font-header-small-lineheight);
      font-weight: var(--font-header-small-bold-weight);
    `);
  });

  it('Checks headingXSmall Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="heading-xs" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-header-xsmall-regular-font);
      font-size: var(--font-header-xsmall-size);
      line-height: var(--font-header-xsmall-lineheight);
      font-weight: var(--font-header-xsmall-regular-weight);
    `);
  });

  it('Checks headingXSmallBold Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="heading-xs-bold" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-header-xsmall-bold-font);
      font-size: var(--font-header-xsmall-size);
      line-height: var(--font-header-xsmall-lineheight);
      font-weight: var(--font-header-xsmall-bold-weight);
    `);
  });

  it('Checks bodyMedium Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="body-m" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-body-medium-regular-font);
      font-size: var(--font-body-medium-size);
      font-weight: var(--font-body-medium-regular-weight);
      line-height: var(--font-body-medium-lineheight);
    `);
  });

  it('Checks bodyMediumBold Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="body-m-bold" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-body-medium-bold-font);
      font-size: var(--font-body-medium-size);
      line-height: var(--font-body-medium-lineheight);
      font-weight: var(--font-body-medium-bold-weight);
    `);
  });

  it('Checks bodyXLarge Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="body-xl" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-body-xlarge-regular-font);
      font-size: var(--font-body-xlarge-size);
      font-weight: var(--font-body-xlarge-regular-weight);
      line-height: var(--font-body-xlarge-lineheight);
    `);
  });

  it('Checks bodyXLargeBold Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="body-xl-bold" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-body-xlarge-bold-font);
      font-size: var(--font-body-xlarge-size);
      line-height: var(--font-body-xlarge-lineheight);
      font-weight: var(--font-body-xlarge-bold-weight);
    `);
  });

  it('Checks bodyLarge Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="body-l" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-body-large-regular-font);
      font-size: var(--font-body-large-size);
      font-weight: var(--font-body-large-regular-weight);
      line-height: var(--font-body-large-lineheight);
    `);
  });

  it('Checks bodyLargeBold Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="body-l-bold" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-body-large-bold-font);
      font-size: var(--font-body-large-size);
      font-weight: var(--font-body-large-bold-weight);
      line-height: var(--font-body-large-lineheight);
    `);
  });

  it('Checks buttonMedium Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="button-m" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-button-medium-font);
      font-size: var(--font-button-medium-size);
      font-weight: var(--font-button-medium-weight);
      line-height: var(--font-button-medium-lineheight);
    `);
  });

  it('Checks buttonSmall Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="button-s" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-button-medium-font);
      font-size: var(--font-button-small-size);
      font-weight: var(--font-button-small-weight);
      line-height: var(--font-button-small-lineheight);
    `);
  });

  it('Checks linkXLarge Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="link-xl" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-link-xlarge-font);
      font-size: var(--font-link-xlarge-size);
      line-height: var(--font-link-xlarge-lineheight);
      font-weight: var(--font-link-xlarge-weight);
    `);
  });

  it('Checks linkLarge Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="link-l" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-link-large-font);
      font-size: var(--font-link-large-size);
      line-height: var(--font-link-large-lineheight);
      font-weight: var(--font-link-large-weight);
    `);
  });

  it('Checks linkMedium Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="link-m" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-link-medium-font);
      font-size: var(--font-link-medium-size);
      line-height: var(--font-link-medium-lineheight);
      font-weight: var(--font-link-medium-weight);
    `);
  });

  it('Checks linkSmall Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="link-s" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-link-small-font);
      font-size: var(--font-link-small-size);
      line-height: var(--font-link-small-lineheight);
      font-weight: var(--font-link-small-weight);
    `);
  });

  it('Checks footnote Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="footnote" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-footnote-regular-font);
      font-size: var(--font-footnote-regular-size);
      line-height: var(--font-footnote-regular-lineheight);
    `);
  });

  it('Checks footnoteBold Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="footnote-bold" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-footnote-bold-font);
      font-size: var(--font-footnote-regular-size);
      line-height: var(--font-footnote-regular-lineheight);
      font-weight: var(--font-footnote-bold-weight);
    `);
  });

  it('Checks inputMedium Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="input-m" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-input-medium-regular-font);
      font-size: var(--font-input-medium-size);
      line-height: var(--font-input-medium-lineheight);
      font-weight: var(--font-input-medium-regular-weight);
    `);
  });

  it('Checks inputSmall Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="input-s" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-input-small-regular-font);
      font-size: var(--font-input-small-size);
      line-height: var(--font-input-small-lineheight);
      font-weight: var(--font-input-small-regular-weight);
    `);
  });

  it('Checks otpXLarge Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="otp-xl" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-otp-xlarge-font);
      font-size: var(--font-otp-xlarge-size);
      font-weight: var(--font-otp-xlarge-weight);
      line-height: var(--font-otp-xlarge-lineheight);
    `);
  });

  it('Checks systemInfoSmall Font', () => {
    const { getByTestId } = render(
      <TSpan data-testid="typographyID" font="systemInfo-s" />,
    );
    const typographyID = getByTestId('typographyID');
    expect(typographyID).toBeInTheDocument();
    expect(typographyID).toHaveStyle(`
      font-family: var(--font-systeminfo-small-font);
      font-size: var(--font-systeminfo-small-size);
      font-weight: var(--font-systeminfo-small-weight);
      line-height: var(--font-systeminfo-small-lineheight);
    `);
  });
});
