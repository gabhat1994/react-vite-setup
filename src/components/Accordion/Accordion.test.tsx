/* eslint-disable class-methods-use-this */
import { cleanup, render, fireEvent } from '@/test-utils';

import { Icon } from '@/components/Icon';
import { Badge } from '@/components/Badge/Badge';
import { Accordion } from './Accordion';

const accordionTitle = 'Accordion title';
const accordionSubtitle = 'Test accordion';
const accordionTestId = 'accordion';

class ResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}

describe('Accordion', () => {
  beforeEach(() => {
    window.ResizeObserver = ResizeObserver;
  });
  afterEach(() => {
    cleanup();
  });

  test('Should render and should have title', () => {
    const { getByTestId, getByText } = render(
      <Accordion
        testId={accordionTestId}
        title={accordionTitle}
        subtitle={accordionSubtitle}
      />,
    );
    expect(getByTestId(accordionTestId)).toBeInTheDocument();
    expect(getByText(accordionTitle)).toBeInTheDocument();
    expect(getByText(accordionSubtitle)).toBeInTheDocument();
  });

  test('Should be expanded initially', () => {
    const { getByTestId } = render(
      <Accordion
        testId={accordionTestId}
        title={accordionTitle}
        preExpanded={true}
      />,
    );

    expect(getByTestId('accordion-heading')).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  test('Should be expanded by props', () => {
    const { getByTestId } = render(
      <Accordion
        testId={accordionTestId}
        title={accordionTitle}
        expanded={true}
      />,
    );

    expect(getByTestId('accordion-heading')).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  });

  test('Should be disabled', () => {
    const { getByTestId } = render(
      <Accordion
        testId={accordionTestId}
        title={accordionTitle}
        disabled={true}
      />,
    );

    expect(getByTestId('accordion-heading')).toHaveStyle(
      `cursor: not-allowed;`,
    );
  });

  test('Should not have right icon', () => {
    const { queryByTestId } = render(
      <Accordion testId={accordionTestId} title={accordionTitle} />,
    );

    expect(queryByTestId('accordion-right-icon')).not.toBeInTheDocument();
  });

  test('Should have right icon', () => {
    const { queryByTestId } = render(
      <Accordion
        testId={accordionTestId}
        title={accordionTitle}
        right={<Badge size="large" text="10" />}
      />,
    );

    expect(queryByTestId('accordion-right-icon')).toBeInTheDocument();
  });

  test('Should have left icon', () => {
    const { getByTestId } = render(
      <Accordion
        testId={accordionTestId}
        title={accordionTitle}
        left={
          <Icon
            data-testid="accordion-left-icon"
            name="chevron_small_down_m"
            size={24}
            color="--icon-tablecell-neutral-highlighted"
          />
        }
      />,
    );

    expect(getByTestId('accordion-left-icon')).toBeInTheDocument();
  });

  test('Should have border-bottom', () => {
    const { getByTestId } = render(
      <Accordion
        testId={accordionTestId}
        title={accordionTitle}
        borders={['bottom']}
      />,
    );

    expect(getByTestId(accordionTestId)).toHaveStyle(`
      border-bottom-color: var(--bg-separator-neutral-default);
      border-bottom-width: 1px;
      border-bottom-style: solid;
    `);
  });

  test('Should have top-offset and bottom-offset on expanded', () => {
    const { getByTestId } = render(
      <Accordion
        testId={accordionTestId}
        title={accordionTitle}
        expanded={true}
        expandedOffsetTop={20}
        expandedOffsetBottom={20}
      />,
    );

    expect(getByTestId(accordionTestId)).toHaveStyle(`
      margin-bottom: 20px;
      margin-top: 20px;
    `);
  });

  test('Should have top-offset and bottom-offset', () => {
    const { getByTestId } = render(
      <Accordion
        testId={accordionTestId}
        title={accordionTitle}
        offsetTop={20}
        offsetBottom={20}
      />,
    );

    expect(getByTestId(accordionTestId)).toHaveStyle(`
      margin-bottom: 20px;
      margin-top: 20px;
    `);
  });

  test('Should render with width', () => {
    const { getByTestId } = render(
      <Accordion testId={accordionTestId} title={accordionTitle} width={500} />,
    );

    expect(getByTestId(accordionTestId)).toHaveStyle(`width: 500px;`);
  });

  test('Should render content', () => {
    const { getByText, getByRole } = render(
      <Accordion testId={accordionTestId} title={accordionTitle} width={500}>
        <h1>lorem</h1>
      </Accordion>,
    );

    expect(getByRole('region')).toBeInTheDocument();
    expect(getByText('lorem')).toBeInTheDocument();
  });

  test('Click', () => {
    const onToggle = vi.fn();

    const { getByTestId } = render(
      <Accordion
        testId={accordionTestId}
        title={accordionTitle}
        width={500}
        onToggle={onToggle}
      >
        <h1>lorem</h1>
      </Accordion>,
    );

    fireEvent.click(getByTestId('accordion-heading'));
  });

  test('Click on controlled mode', () => {
    const { getByTestId } = render(
      <Accordion
        testId={accordionTestId}
        title={accordionTitle}
        width={500}
        expanded
      >
        <h1>lorem</h1>
      </Accordion>,
    );

    fireEvent.click(getByTestId('accordion-heading'));
  });

  test('Click on disabled', () => {
    const onToggle = vi.fn();

    const { getByTestId } = render(
      <Accordion
        testId={accordionTestId}
        title={accordionTitle}
        width={500}
        onToggle={onToggle}
        disabled
      >
        <h1>lorem</h1>
      </Accordion>,
    );

    fireEvent.click(getByTestId('accordion-heading'));
  });

  test('Keypress event with `Enter`,  `Space`, `Escape` or other key', () => {
    const { getByTestId } = render(
      <Accordion testId={accordionTestId} title={accordionTitle} width={500}>
        <h1>lorem</h1>
      </Accordion>,
    );

    fireEvent.keyDown(getByTestId('accordion-heading'), { code: 'Enter' });

    fireEvent.keyDown(getByTestId('accordion-heading'), { code: 'Space' });

    fireEvent.keyDown(getByTestId('accordion-heading'), { code: 'Escape' });

    fireEvent.keyDown(getByTestId('accordion-heading'), { code: 'KeyA' });
  });

  test('Keypress event in disabled mode', () => {
    const { getByTestId } = render(
      <Accordion testId={accordionTestId} title={accordionTitle} width={500}>
        <h1>lorem</h1>
      </Accordion>,
    );

    fireEvent.keyDown(getByTestId('accordion-heading'), { code: 'Enter' });
  });
});
