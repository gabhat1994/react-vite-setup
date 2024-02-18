import { createRef } from 'react';
import { render } from '@/test-utils';
import { Badge } from './Badge';

describe('<Badge>', () => {
  test('Badge without size and Text', () => {
    const ref = createRef<HTMLDivElement>();

    const { getByTestId } = render(<Badge ref={ref} />);
    const StyledBadgeEle = getByTestId('StyledBadge');
    const StyledBadgeTextEle = getByTestId('StyledBadgeText');

    expect(StyledBadgeEle).toHaveStyle(`
        align-items: center;
        background: '#FC395C';
        border: 2px solid '#FFFFFF';
        border-radius: 1000px;
        display: inline-flex;
        min-width: 8px;
        height: 8px;
        justify-content: center;
        text-align: center;
        `);
    expect(StyledBadgeEle).toContainElement(StyledBadgeTextEle);
    expect(StyledBadgeTextEle).toHaveStyle(`
        display: flex;
        color: '#ffffff';
        `);
  });

  test('Badge with Text empty', () => {
    const ref = createRef<HTMLDivElement>();

    const { getByTestId } = render(<Badge ref={ref} text="" />);
    const StyledBadgeEle = getByTestId('StyledBadge');
    const StyledBadgeTextEle = getByTestId('StyledBadgeText');

    expect(StyledBadgeEle).toHaveStyle(`
        align-items: center;
        background: '#FC395C';
        border-radius: 1000px;
        display: inline-flex;
        min-width: 8px;
        height: 8px;
        justify-content: center;
        text-align: center;
        `);
    expect(StyledBadgeEle).toContainElement(StyledBadgeTextEle);
    expect(StyledBadgeTextEle).toHaveStyle(`
        display: flex;
        color: '#ffffff';
        `);
    expect(StyledBadgeTextEle.textContent).toBe('');
  });

  test('Medium Badge with Text 123', () => {
    const ref = createRef<HTMLDivElement>();

    const { getByTestId } = render(
      <Badge size="medium" text="123abc" ref={ref} />,
    );
    const StyledBadgeEle = getByTestId('StyledBadge');
    const StyledBadgeTextEle = getByTestId('StyledBadgeText');

    expect(StyledBadgeEle).toHaveStyle(`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: '#FC395C';
    border: 2px solid '#ffffff';
    border-radius: 1000px;
    min-width: 14px;
    height: 14px;
    text-align: center;
    `);
    expect(StyledBadgeEle).toContainElement(StyledBadgeTextEle);
    expect(StyledBadgeTextEle).toHaveStyle(`
    display: flex;
    color: '#ffffff';
    `);
    expect(StyledBadgeTextEle.textContent).toBe('123abc');
  });

  test('Medium Badge with Text A', () => {
    const ref = createRef<HTMLDivElement>();

    const { getByTestId } = render(<Badge size="medium" text="A" ref={ref} />);
    const StyledBadgeEle = getByTestId('StyledBadge');
    const StyledBadgeTextEle = getByTestId('StyledBadgeText');

    expect(StyledBadgeEle).toHaveStyle(`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: '#FC395C';
    border: 2px solid '#ffffff';
    border-radius: 1000px;
    min-width: 14px;
    height: 14px;
    text-align: center;
    `);
    expect(StyledBadgeEle).toContainElement(StyledBadgeTextEle);
    expect(StyledBadgeTextEle).toHaveStyle(`
    display: flex;
    color: '#ffffff';
    `);
    expect(StyledBadgeTextEle.textContent).toBe('A');
  });

  test('Medium Badge with no Text', () => {
    const ref = createRef<HTMLDivElement>();

    const { getByTestId } = render(<Badge size="medium" ref={ref} />);
    const StyledBadgeEle = getByTestId('StyledBadge');
    const StyledBadgeTextEle = getByTestId('StyledBadgeText');

    expect(StyledBadgeEle).toHaveStyle(`
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background: '#FC395C';
      border: 2px solid '#ffffff';
      border-radius: 1000px;
      min-width: 8px;
      height: 8px;
      text-align: center;
    `);
    expect(StyledBadgeEle).toContainElement(StyledBadgeTextEle);
    expect(StyledBadgeTextEle).toHaveStyle(`
    display: flex;
    color: '#ffffff';
    `);
    expect(StyledBadgeTextEle.textContent).toBe('');
  });

  test('Large Badge with Text 123abc', () => {
    const ref = createRef<HTMLDivElement>();
    const { getByTestId } = render(
      <Badge size="large" text="123abc" ref={ref} />,
    );
    const StyledBadgeEle = getByTestId('StyledBadge');
    const StyledBadgeTextEle = getByTestId('StyledBadgeText');

    expect(StyledBadgeEle).toHaveStyle(`
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background: '#FC395C';
      border: 2px solid '#ffffff';
      border-radius: 1000px;
      min-width: 24px;
      height: 24px;
      text-align: center;
    `);
    expect(StyledBadgeEle).toContainElement(StyledBadgeTextEle);
    expect(StyledBadgeTextEle).toHaveStyle(`
      display: flex;
      color: '#ffffff';
    `);
    expect(StyledBadgeTextEle.textContent).toBe('123abc');
  });

  test('Large Badge with Text A', () => {
    const ref = createRef<HTMLDivElement>();
    const { getByTestId } = render(<Badge size="large" text="A" ref={ref} />);
    const StyledBadgeEle = getByTestId('StyledBadge');
    const StyledBadgeTextEle = getByTestId('StyledBadgeText');

    expect(StyledBadgeEle).toHaveStyle(`
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background: '#FC395C';
      border: 2px solid '#ffffff';
      border-radius: 1000px;
      min-width: 24px;
      height: 24px;
      text-align: center;
    `);
    expect(StyledBadgeEle).toContainElement(StyledBadgeTextEle);
    expect(StyledBadgeTextEle).toHaveStyle(`
    display: flex;
    color: '#ffffff';
    `);
    expect(StyledBadgeTextEle.textContent).toBe('A');
  });

  test('Large Badge with no Text ', () => {
    const ref = createRef<HTMLDivElement>();
    const { getByTestId } = render(<Badge size="large" ref={ref} />);
    const StyledBadgeEle = getByTestId('StyledBadge');
    const StyledBadgeTextEle = getByTestId('StyledBadgeText');

    expect(StyledBadgeEle).toHaveStyle(`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: '#FC395C';
    border: 2px solid '#ffffff';
    border-radius: 1000px;
    min-width: 8px;
    height: 8px;
    text-align: center;
    `);
    expect(StyledBadgeEle).toContainElement(StyledBadgeTextEle);
    expect(StyledBadgeTextEle).toHaveStyle(`
    display: flex;
    color: '#ffffff';
    `);
    expect(StyledBadgeTextEle.textContent).toBe('');
  });
});
