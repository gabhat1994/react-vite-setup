/* eslint-disable class-methods-use-this */
import { BrowserRouter } from 'react-router-dom';
import { type queries } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { cleanup, render, type RenderResult } from '@/test-utils';
import { RichTextEditor } from './RichTextEditor';

class ResizeObserver {
  observe() {}

  unobserve() {}

  disconnect() {}
}

const rteId = 'rte-test';

describe('<RichTextEditor>', () => {
  let mocked: RenderResult<typeof queries, HTMLElement, HTMLElement>;

  beforeEach(() => {
    window.ResizeObserver = ResizeObserver;
    mocked = render(
      <MockedProvider>
        <BrowserRouter>
          <RichTextEditor
            id={rteId}
            testMode
            editEnabled={false}
            initialValue="some value"
          />
        </BrowserRouter>
      </MockedProvider>,
    );
  });
  afterEach(() => {
    cleanup();
  });

  test('render RichTextEditor', () => {
    const { getByTestId } = mocked;
    const container = getByTestId('RTE-Container');

    expect(container).toBeInTheDocument();
    expect(getByTestId('rte-element')).toBeInTheDocument();
    expect(getByTestId('rte-area')).toBeInTheDocument();
    const editor = container.querySelector(`#${rteId} .ql-editor`);

    expect(container).toBeInTheDocument();
    expect(editor).toBeInTheDocument();
  });
});

describe('RichTextEditor XSS test', () => {
  window.alert = vi.fn();
  global.alert = vi.fn();

  const mocked = (value: string) =>
    render(
      <MockedProvider>
        <BrowserRouter>
          <RichTextEditor
            id={rteId}
            testMode
            editEnabled={false}
            initialValue={value}
          />
        </BrowserRouter>
      </MockedProvider>,
    );
  beforeEach(() => {
    window.ResizeObserver = ResizeObserver;
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
  });

  test('XSS test for (<style onLoad style onLoad="javascript:javascript:alert(1)"></style onLoad>)', async () => {
    const { getByTestId } = mocked(
      `<style onLoad style onLoad="javascript:javascript:alert(1)"></style onLoad>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<iframe onReadyStateChange iframe onReadyStateChange="javascript:javascript:alert(1)"></iframe onReadyStateChange>)', async () => {
    const { getByTestId } = mocked(
      `<iframe onReadyStateChange iframe onReadyStateChange="javascript:javascript:alert(1)"></iframe onReadyStateChange>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<body onPageShow body onPageShow="javascript:javascript:alert(1)"></body onPageShow>)', async () => {
    const { getByTestId } = mocked(
      `<body onPageShow body onPageShow="javascript:javascript:alert(1)"></body onPageShow>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<style onReadyStateChange style onReadyStateChange="javascript:javascript:alert(1)"></style onReadyStateChange>)', async () => {
    const { getByTestId } = mocked(
      `<style onReadyStateChange style onReadyStateChange="javascript:javascript:alert(1)"></style onReadyStateChange>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<frameset onFocus frameset onFocus="javascript:javascript:alert(1)"></frameset onFocus>)', async () => {
    const { getByTestId } = mocked(
      `<frameset onFocus frameset onFocus="javascript:javascript:alert(1)"></frameset onFocus>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<applet onError applet onError="javascript:javascript:alert(1)"></applet onError>)', async () => {
    const { getByTestId } = mocked(
      `<applet onError applet onError="javascript:javascript:alert(1)"></applet onError>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<marquee onStart marquee onStart="javascript:javascript:alert(1)"></marquee onStart>)', async () => {
    const { getByTestId } = mocked(
      `<marquee onStart marquee onStart="javascript:javascript:alert(1)"></marquee onStart>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script onLoad script onLoad="javascript:javascript:alert(1)"></script onLoad>)', async () => {
    const { getByTestId } = mocked(
      `<script onLoad script onLoad="javascript:javascript:alert(1)"></script onLoad>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<html onMouseOver html onMouseOver="javascript:javascript:alert(1)"></html onMouseOver>)', async () => {
    const { getByTestId } = mocked(
      `<html onMouseOver html onMouseOver="javascript:javascript:alert(1)"></html onMouseOver>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<html onMouseEnter html onMouseEnter="javascript:parent.javascript:alert(1)"></html onMouseEnter>)', async () => {
    const { getByTestId } = mocked(
      `<html onMouseEnter html onMouseEnter="javascript:parent.javascript:alert(1)"></html onMouseEnter>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<body onBeforeUnload body onBeforeUnload="javascript:javascript:alert(1)"></body onBeforeUnload>)', async () => {
    const { getByTestId } = mocked(
      `<body onBeforeUnload body onBeforeUnload="javascript:javascript:alert(1)"></body onBeforeUnload>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<html onMouseDown html onMouseDown="javascript:javascript:alert(1)"></html onMouseDown>)', async () => {
    const { getByTestId } = mocked(
      `<html onMouseDown html onMouseDown="javascript:javascript:alert(1)"></html onMouseDown>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<marquee onScroll marquee onScroll="javascript:javascript:alert(1)"></marquee onScroll>)', async () => {
    const { getByTestId } = mocked(
      `<marquee onScroll marquee onScroll="javascript:javascript:alert(1)"></marquee onScroll>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<xml onPropertyChange xml onPropertyChange="javascript:javascript:alert(1)"></xml onPropertyChange>)', async () => {
    const { getByTestId } = mocked(
      `<xml onPropertyChange xml onPropertyChange="javascript:javascript:alert(1)"></xml onPropertyChange>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<frameset onBlur frameset onBlur="javascript:javascript:alert(1)"></frameset onBlur>)', async () => {
    const { getByTestId } = mocked(
      `<frameset onBlur frameset onBlur="javascript:javascript:alert(1)"></frameset onBlur>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<applet onReadyStateChange applet onReadyStateChange="javascript:javascript:alert(1)"></applet onReadyStateChange>)', async () => {
    const { getByTestId } = mocked(
      `<applet onReadyStateChange applet onReadyStateChange="javascript:javascript:alert(1)"></applet onReadyStateChange>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<svg onUnload svg onUnload="javascript:javascript:alert(1)"></svg onUnload>)', async () => {
    const { getByTestId } = mocked(
      `<svg onUnload svg onUnload="javascript:javascript:alert(1)"></svg onUnload>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<html onMouseOut html onMouseOut="javascript:javascript:alert(1)"></html onMouseOut>)', async () => {
    const { getByTestId } = mocked(
      `<html onMouseOut html onMouseOut="javascript:javascript:alert(1)"></html onMouseOut>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<body onMouseMove body onMouseMove="javascript:javascript:alert(1)"></body onMouseMove>)', async () => {
    const { getByTestId } = mocked(
      `<body onMouseMove body onMouseMove="javascript:javascript:alert(1)"></body onMouseMove>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<body onResize body onResize="javascript:javascript:alert(1)"></body onResize>)', async () => {
    const { getByTestId } = mocked(
      `<body onResize body onResize="javascript:javascript:alert(1)"></body onResize>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<object onError object onError="javascript:javascript:alert(1)"></object onError>)', async () => {
    const { getByTestId } = mocked(
      `<object onError object onError="javascript:javascript:alert(1)"></object onError>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<body onPopState body onPopState="javascript:javascript:alert(1)"></body onPopState>)', async () => {
    const { getByTestId } = mocked(
      `<body onPopState body onPopState="javascript:javascript:alert(1)"></body onPopState>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<html onMouseMove html onMouseMove="javascript:javascript:alert(1)"></html onMouseMove>)', async () => {
    const { getByTestId } = mocked(
      `<html onMouseMove html onMouseMove="javascript:javascript:alert(1)"></html onMouseMove>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<applet onreadystatechange applet onreadystatechange="javascript:javascript:alert(1)"></applet onreadystatechange>)', async () => {
    const { getByTestId } = mocked(
      `<applet onreadystatechange applet onreadystatechange="javascript:javascript:alert(1)"></applet onreadystatechange>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<body onpagehide body onpagehide="javascript:javascript:alert(1)"></body onpagehide>)', async () => {
    const { getByTestId } = mocked(
      `<body onpagehide body onpagehide="javascript:javascript:alert(1)"></body onpagehide>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<svg onunload svg onunload="javascript:javascript:alert(1)"></svg onunload>)', async () => {
    const { getByTestId } = mocked(
      `<svg onunload svg onunload="javascript:javascript:alert(1)"></svg onunload>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<applet onerror applet onerror="javascript:javascript:alert(1)"></applet onerror>)', async () => {
    const { getByTestId } = mocked(
      `<applet onerror applet onerror="javascript:javascript:alert(1)"></applet onerror>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<body onkeyup body onkeyup="javascript:javascript:alert(1)"></body onkeyup>)', async () => {
    const { getByTestId } = mocked(
      `<body onkeyup body onkeyup="javascript:javascript:alert(1)"></body onkeyup>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<body onunload body onunload="javascript:javascript:alert(1)"></body onunload>)', async () => {
    const { getByTestId } = mocked(
      `<body onunload body onunload="javascript:javascript:alert(1)"></body onunload>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<iframe onload iframe onload="javascript:javascript:alert(1)"></iframe onload>)', async () => {
    const { getByTestId } = mocked(
      `<iframe onload iframe onload="javascript:javascript:alert(1)"></iframe onload>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<body onload body onload="javascript:javascript:alert(1)"></body onload>)', async () => {
    const { getByTestId } = mocked(
      `<body onload body onload="javascript:javascript:alert(1)"></body onload>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<html onmouseover html onmouseover="javascript:javascript:alert(1)"></html onmouseover>)', async () => {
    const { getByTestId } = mocked(
      `<html onmouseover html onmouseover="javascript:javascript:alert(1)"></html onmouseover>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<object onbeforeload object onbeforeload="javascript:javascript:alert(1)"></object onbeforeload>)', async () => {
    const { getByTestId } = mocked(
      `<object onbeforeload object onbeforeload="javascript:javascript:alert(1)"></object onbeforeload>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<body onbeforeunload body onbeforeunload="javascript:javascript:alert(1)"></body onbeforeunload>)', async () => {
    const { getByTestId } = mocked(
      `<body onbeforeunload body onbeforeunload="javascript:javascript:alert(1)"></body onbeforeunload>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<body onfocus body onfocus="javascript:javascript:alert(1)"></body onfocus>)', async () => {
    const { getByTestId } = mocked(
      `<body onfocus body onfocus="javascript:javascript:alert(1)"></body onfocus>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<body onkeydown body onkeydown="javascript:javascript:alert(1)"></body onkeydown>)', async () => {
    const { getByTestId } = mocked(
      `<body onkeydown body onkeydown="javascript:javascript:alert(1)"></body onkeydown>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<iframe onbeforeload iframe onbeforeload="javascript:javascript:alert(1)"></iframe onbeforeload>)', async () => {
    const { getByTestId } = mocked(
      `<iframe onbeforeload iframe onbeforeload="javascript:javascript:alert(1)"></iframe onbeforeload>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<iframe src iframe src="javascript:javascript:alert(1)"></iframe src>)', async () => {
    const { getByTestId } = mocked(
      `<iframe src iframe src="javascript:javascript:alert(1)"></iframe src>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<svg onload svg onload="javascript:javascript:alert(1)"></svg onload>)', async () => {
    const { getByTestId } = mocked(
      `<svg onload svg onload="javascript:javascript:alert(1)"></svg onload>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<html onmousemove html onmousemove="javascript:javascript:alert(1)"></html onmousemove>)', async () => {
    const { getByTestId } = mocked(
      `<html onmousemove html onmousemove="javascript:javascript:alert(1)"></html onmousemove>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<body onblur body onblur="javascript:javascript:alert(1)"></body onblur>)', async () => {
    const { getByTestId } = mocked(
      `<body onblur body onblur="javascript:javascript:alert(1)"></body onblur>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (\x3Cscript>javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(`\x3Cscript>javascript:alert(1)</script>`);
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (\'"`><script>/* *\x2Fjavascript:alert(1)// */</script>)', async () => {
    const { getByTestId } = mocked(
      `'"\`><script>/* *\x2Fjavascript:alert(1)// */</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script>javascript:alert(1)</script\x0D)', async () => {
    const { getByTestId } = mocked(`<script>javascript:alert(1)</script\x0D`);
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script>javascript:alert(1)</script\x0A)', async () => {
    const { getByTestId } = mocked(`<script>javascript:alert(1)</script\x0A`);
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script>javascript:alert(1)</script\x0B)', async () => {
    const { getByTestId } = mocked(`<script>javascript:alert(1)</script\x0B`);
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script charset="\x22>javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `<script charset="\x22>javascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<!--\x3E<img src=xxx:x onerror=javascript:alert(1)> -->)', async () => {
    const { getByTestId } = mocked(
      `<!--\x3E<img src=xxx:x onerror=javascript:alert(1)> -->`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (--><!-- ---> <img src=xxx:x onerror=javascript:alert(1)> -->)', async () => {
    const { getByTestId } = mocked(
      `--><!-- ---> <img src=xxx:x onerror=javascript:alert(1)> -->`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (--><!-- --\x00> <img src=xxx:x onerror=javascript:alert(1)> -->)', async () => {
    const { getByTestId } = mocked(
      `--><!-- --\x00> <img src=xxx:x onerror=javascript:alert(1)> -->`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (--><!-- --\x21> <img src=xxx:x onerror=javascript:alert(1)> -->)', async () => {
    const { getByTestId } = mocked(
      `--><!-- --\x21> <img src=xxx:x onerror=javascript:alert(1)> -->`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (--><!-- --\x3E> <img src=xxx:x onerror=javascript:alert(1)> -->)', async () => {
    const { getByTestId } = mocked(
      `--><!-- --\x3E> <img src=xxx:x onerror=javascript:alert(1)> -->`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test("XSS test for (`\"'><img src='#\x27 onerror=javascript:alert(1)>)", async () => {
    const { getByTestId } = mocked(
      `\`"'><img src='#\x27 onerror=javascript:alert(1)>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="javascript\x3Ajavascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="javascript\x3Ajavascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test("XSS test for (\"'`><p><svg><script>a='hello\x27;javascript:alert(1)//';</script></p>)", async () => {
    const { getByTestId } = mocked(
      `"'\`><p><svg><script>a='hello\x27;javascript:alert(1)//';</script></p>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="javas\x00cript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="javas\x00cript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="javas\x07cript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="javas\x07cript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="javas\x0Dcript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="javas\x0Dcript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="javas\x0Acript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="javas\x0Acript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="javas\x08cript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="javas\x08cript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="javas\x02cript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="javas\x02cript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="javas\x03cript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="javas\x03cript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="javas\x04cript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="javas\x04cript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="javas\x01cript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="javas\x01cript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="javas\x05cript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="javas\x05cript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="javas\x0Bcript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="javas\x0Bcript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="javas\x09cript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="javas\x09cript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="javas\x06cript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="javas\x06cript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="javas\x0Ccript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="javas\x0Ccript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script>/* *\x2A/javascript:alert(1)// */</script>)', async () => {
    const { getByTestId } = mocked(
      `<script>/* *\x2A/javascript:alert(1)// */</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script>/* *\x00/javascript:alert(1)// */</script>)', async () => {
    const { getByTestId } = mocked(
      `<script>/* *\x00/javascript:alert(1)// */</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<style></style\x3E<img src="about:blank" onerror=javascript:alert(1)//></style>)', async () => {
    const { getByTestId } = mocked(
      `<style></style\x3E<img src="about:blank" onerror=javascript:alert(1)//></style>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<style></style\x0D<img src="about:blank" onerror=javascript:alert(1)//></style>)', async () => {
    const { getByTestId } = mocked(
      `<style></style\x0D<img src="about:blank" onerror=javascript:alert(1)//></style>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<style></style\x09<img src="about:blank" onerror=javascript:alert(1)//></style>)', async () => {
    const { getByTestId } = mocked(
      `<style></style\x09<img src="about:blank" onerror=javascript:alert(1)//></style>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<style></style\x20<img src="about:blank" onerror=javascript:alert(1)//></style>)', async () => {
    const { getByTestId } = mocked(
      `<style></style\x20<img src="about:blank" onerror=javascript:alert(1)//></style>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<style></style\x0A<img src="about:blank" onerror=javascript:alert(1)//></style>)', async () => {
    const { getByTestId } = mocked(
      `<style></style\x0A<img src="about:blank" onerror=javascript:alert(1)//></style>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test("XSS test for (\"'`>ABC<div style=\"font-family:'foo'\x7Dx:expression(javascript:alert(1);/*';\">DEF )", async () => {
    const { getByTestId } = mocked(
      `"'\`>ABC<div style="font-family:'foo'\x7Dx:expression(javascript:alert(1);/*';">DEF `,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test("XSS test for (\"'`>ABC<div style=\"font-family:'foo'\x3Bx:expression(javascript:alert(1);/*';\">DEF )", async () => {
    const { getByTestId } = mocked(
      `"'\`>ABC<div style="font-family:'foo'\x3Bx:expression(javascript:alert(1);/*';">DEF `,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script>if("x\\xE1\x96\x89".length==2) { javascript:alert(1);}</script>)', async () => {
    const { getByTestId } = mocked(
      `<script>if("x\\xE1\x96\x89".length==2) { javascript:alert(1);}</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script>if("x\\xE0\xB9\x92".length==2) { javascript:alert(1);}</script>)', async () => {
    const { getByTestId } = mocked(
      `<script>if("x\\xE0\xB9\x92".length==2) { javascript:alert(1);}</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script>if("x\\xEE\xA9\x93".length==2) { javascript:alert(1);}</script>)', async () => {
    const { getByTestId } = mocked(
      `<script>if("x\\xEE\xA9\x93".length==2) { javascript:alert(1);}</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (\'`"><\x3Cscript>javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `'\`"><\x3Cscript>javascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("\'`><\x3Cimg src=xxx:x onerror=javascript:alert(1)>)', async () => {
    const { getByTestId } = mocked(
      `"'\`><\x3Cimg src=xxx:x onerror=javascript:alert(1)>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script src="data:text/plain\x2Cjavascript:alert(1)"></script>)', async () => {
    const { getByTestId } = mocked(
      `<script src="data:text/plain\x2Cjavascript:alert(1)"></script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script src="data:\xD4\x8F,javascript:alert(1)"></script>)', async () => {
    const { getByTestId } = mocked(
      `<script src="data:\xD4\x8F,javascript:alert(1)"></script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script src="data:\xE0\xA4\x98,javascript:alert(1)"></script>)', async () => {
    const { getByTestId } = mocked(
      `<script src="data:\xE0\xA4\x98,javascript:alert(1)"></script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script src="data:\xCB\x8F,javascript:alert(1)"></script>)', async () => {
    const { getByTestId } = mocked(
      `<script src="data:\xCB\x8F,javascript:alert(1)"></script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script\x20type="text/javascript">javascript:alert(1);</script>)', async () => {
    const { getByTestId } = mocked(
      `<script\x20type="text/javascript">javascript:alert(1);</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script\x3Etype="text/javascript">javascript:alert(1);</script>)', async () => {
    const { getByTestId } = mocked(
      `<script\x3Etype="text/javascript">javascript:alert(1);</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script\x0Dtype="text/javascript">javascript:alert(1);</script>)', async () => {
    const { getByTestId } = mocked(
      `<script\x0Dtype="text/javascript">javascript:alert(1);</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script\x09type="text/javascript">javascript:alert(1);</script>)', async () => {
    const { getByTestId } = mocked(
      `<script\x09type="text/javascript">javascript:alert(1);</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script\x0Ctype="text/javascript">javascript:alert(1);</script>)', async () => {
    const { getByTestId } = mocked(
      `<script\x0Ctype="text/javascript">javascript:alert(1);</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script\x2Ftype="text/javascript">javascript:alert(1);</script>)', async () => {
    const { getByTestId } = mocked(
      `<script\x2Ftype="text/javascript">javascript:alert(1);</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script\x0Atype="text/javascript">javascript:alert(1);</script>)', async () => {
    const { getByTestId } = mocked(
      `<script\x0Atype="text/javascript">javascript:alert(1);</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x\x3Aexpression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x\x3Aexpression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:expression\x5C(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:expression\x5C(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:expression\x00(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:expression\x00(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:exp\x00ression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:exp\x00ression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:exp\x5Cression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:exp\x5Cression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:\x0Aexpression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:\x0Aexpression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:\x09expression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:\x09expression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:\xE3\x80\x80expression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:\xE3\x80\x80expression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:\xE2\x80\x84expression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:\xE2\x80\x84expression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:\xC2\xA0expression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:\xC2\xA0expression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:\xE2\x80\x80expression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:\xE2\x80\x80expression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:\xE2\x80\x8Aexpression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:\xE2\x80\x8Aexpression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:\x0Dexpression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:\x0Dexpression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:\x0Cexpression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:\x0Cexpression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:\xE2\x80\x87expression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:\xE2\x80\x87expression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:\xEF\xBB\xBFexpression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:\xEF\xBB\xBFexpression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:\x20expression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:\x20expression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:\xE2\x80\x88expression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:\xE2\x80\x88expression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:\x00expression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:\x00expression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:\xE2\x80\x8Bexpression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:\xE2\x80\x8Bexpression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:\xE2\x80\x86expression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:\xE2\x80\x86expression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:\xE2\x80\x85expression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:\xE2\x80\x85expression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:\xE2\x80\x82expression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:\xE2\x80\x82expression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:\x0Bexpression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:\x0Bexpression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:\xE2\x80\x81expression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:\xE2\x80\x81expression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:\xE2\x80\x83expression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:\xE2\x80\x83expression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (ABC<div style="x:\xE2\x80\x89expression(javascript:alert(1)">DEF)', async () => {
    const { getByTestId } = mocked(
      `ABC<div style="x:\xE2\x80\x89expression(javascript:alert(1)">DEF`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x0Bjavascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x0Bjavascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x0Fjavascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x0Fjavascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\xC2\xA0javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\xC2\xA0javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x05javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x05javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\xE1\xA0\x8Ejavascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\xE1\xA0\x8Ejavascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x18javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x18javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x11javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x11javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\xE2\x80\x88javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\xE2\x80\x88javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\xE2\x80\x89javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\xE2\x80\x89javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\xE2\x80\x80javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\xE2\x80\x80javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x17javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x17javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x03javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x03javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x0Ejavascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x0Ejavascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x1Ajavascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x1Ajavascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x00javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x00javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x10javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x10javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\xE2\x80\x82javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\xE2\x80\x82javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x20javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x20javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x13javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x13javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x09javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x09javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\xE2\x80\x8Ajavascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\xE2\x80\x8Ajavascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x14javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x14javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x19javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x19javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\xE2\x80\xAFjavascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\xE2\x80\xAFjavascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x1Fjavascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x1Fjavascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\xE2\x80\x81javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\xE2\x80\x81javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x1Djavascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x1Djavascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\xE2\x80\x87javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\xE2\x80\x87javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x07javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x07javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\xE1\x9A\x80javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\xE1\x9A\x80javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\xE2\x80\x83javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\xE2\x80\x83javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x04javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x04javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x01javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x01javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x08javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x08javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\xE2\x80\x84javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\xE2\x80\x84javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\xE2\x80\x86javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\xE2\x80\x86javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\xE3\x80\x80javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\xE3\x80\x80javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x12javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x12javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x0Djavascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x0Djavascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x0Ajavascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x0Ajavascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x0Cjavascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x0Cjavascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x15javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x15javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\xE2\x80\xA8javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\xE2\x80\xA8javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x16javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x16javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x02javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x02javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x1Bjavascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x1Bjavascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x06javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x06javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\xE2\x80\xA9javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\xE2\x80\xA9javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\xE2\x80\x85javascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\xE2\x80\x85javascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x1Ejavascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x1Ejavascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\xE2\x81\x9Fjavascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\xE2\x81\x9Fjavascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="\x1Cjavascript:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="\x1Cjavascript:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="javascript\x00:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="javascript\x00:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="javascript\x3A:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="javascript\x3A:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="javascript\x09:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="javascript\x09:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="javascript\x0D:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="javascript\x0D:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a href="javascript\x0A:javascript:alert(1)" id="fuzzelement1">test</a>)', async () => {
    const { getByTestId } = mocked(
      `<a href="javascript\x0A:javascript:alert(1)" id="fuzzelement1">test</a>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (`"\'><img src=xxx:x \x0Aonerror=javascript:alert(1)>)', async () => {
    const { getByTestId } = mocked(
      `\`"'><img src=xxx:x \x0Aonerror=javascript:alert(1)>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (`"\'><img src=xxx:x \x22onerror=javascript:alert(1)>)', async () => {
    const { getByTestId } = mocked(
      `\`"'><img src=xxx:x \x22onerror=javascript:alert(1)>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (`"\'><img src=xxx:x \x0Bonerror=javascript:alert(1)>)', async () => {
    const { getByTestId } = mocked(
      `\`"'><img src=xxx:x \x0Bonerror=javascript:alert(1)>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (`"\'><img src=xxx:x \x0Donerror=javascript:alert(1)>)', async () => {
    const { getByTestId } = mocked(
      `\`"'><img src=xxx:x \x0Donerror=javascript:alert(1)>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (`"\'><img src=xxx:x \x2Fonerror=javascript:alert(1)>)', async () => {
    const { getByTestId } = mocked(
      `\`"'><img src=xxx:x \x2Fonerror=javascript:alert(1)>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (`"\'><img src=xxx:x \x09onerror=javascript:alert(1)>)', async () => {
    const { getByTestId } = mocked(
      `\`"'><img src=xxx:x \x09onerror=javascript:alert(1)>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (`"\'><img src=xxx:x \x0Conerror=javascript:alert(1)>)', async () => {
    const { getByTestId } = mocked(
      `\`"'><img src=xxx:x \x0Conerror=javascript:alert(1)>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (`"\'><img src=xxx:x \x00onerror=javascript:alert(1)>)', async () => {
    const { getByTestId } = mocked(
      `\`"'><img src=xxx:x \x00onerror=javascript:alert(1)>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (`"\'><img src=xxx:x \x27onerror=javascript:alert(1)>)', async () => {
    const { getByTestId } = mocked(
      `\`"'><img src=xxx:x \x27onerror=javascript:alert(1)>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (`"\'><img src=xxx:x \x20onerror=javascript:alert(1)>)', async () => {
    const { getByTestId } = mocked(
      `\`"'><img src=xxx:x \x20onerror=javascript:alert(1)>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\x3Bjavascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\x3Bjavascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\x0Djavascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\x0Djavascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xEF\xBB\xBFjavascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xEF\xBB\xBFjavascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xE2\x80\x81javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xE2\x80\x81javascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xE2\x80\x84javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xE2\x80\x84javascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xE3\x80\x80javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xE3\x80\x80javascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\x09javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\x09javascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xE2\x80\x89javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xE2\x80\x89javascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xE2\x80\x85javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xE2\x80\x85javascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xE2\x80\x88javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xE2\x80\x88javascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\x00javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\x00javascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xE2\x80\xA8javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xE2\x80\xA8javascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xE2\x80\x8Ajavascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xE2\x80\x8Ajavascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xE1\x9A\x80javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xE1\x9A\x80javascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\x0Cjavascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\x0Cjavascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\x2Bjavascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\x2Bjavascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xF0\x90\x96\x9Ajavascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xF0\x90\x96\x9Ajavascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>-javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>-javascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\x0Ajavascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\x0Ajavascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xE2\x80\xAFjavascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xE2\x80\xAFjavascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\x7Ejavascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\x7Ejavascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xE2\x80\x87javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xE2\x80\x87javascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xE2\x81\x9Fjavascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xE2\x81\x9Fjavascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xE2\x80\xA9javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xE2\x80\xA9javascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xC2\x85javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xC2\x85javascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xEF\xBF\xAEjavascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xEF\xBF\xAEjavascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xE2\x80\x83javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xE2\x80\x83javascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xE2\x80\x8Bjavascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xE2\x80\x8Bjavascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xEF\xBF\xBEjavascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xEF\xBF\xBEjavascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xE2\x80\x80javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xE2\x80\x80javascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\x21javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\x21javascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xE2\x80\x82javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xE2\x80\x82javascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xE2\x80\x86javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xE2\x80\x86javascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xE1\xA0\x8Ejavascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xE1\xA0\x8Ejavascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\x0Bjavascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\x0Bjavascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\x20javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\x20javascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("`\'><script>\xC2\xA0javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(
      `"\`'><script>\xC2\xA0javascript:alert(1)</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("/><img/onerror=\x22javascript:alert(1)\x22src=xxx:x />)', async () => {
    const { getByTestId } = mocked(
      `"/><img/onerror=\x22javascript:alert(1)\x22src=xxx:x />`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("/><img/onerror=\x09javascript:alert(1)\x09src=xxx:x />)', async () => {
    const { getByTestId } = mocked(
      `"/><img/onerror=\x09javascript:alert(1)\x09src=xxx:x />`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("/><img/onerror=\x27javascript:alert(1)\x27src=xxx:x />)', async () => {
    const { getByTestId } = mocked(
      `"/><img/onerror=\x27javascript:alert(1)\x27src=xxx:x />`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("/><img/onerror=\x0Ajavascript:alert(1)\x0Asrc=xxx:x />)', async () => {
    const { getByTestId } = mocked(
      `"/><img/onerror=\x0Ajavascript:alert(1)\x0Asrc=xxx:x />`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("/><img/onerror=\x0Cjavascript:alert(1)\x0Csrc=xxx:x />)', async () => {
    const { getByTestId } = mocked(
      `"/><img/onerror=\x0Cjavascript:alert(1)\x0Csrc=xxx:x />`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("/><img/onerror=\x0Djavascript:alert(1)\x0Dsrc=xxx:x />)', async () => {
    const { getByTestId } = mocked(
      `"/><img/onerror=\x0Djavascript:alert(1)\x0Dsrc=xxx:x />`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("/><img/onerror=\x60javascript:alert(1)\x60src=xxx:x />)', async () => {
    const { getByTestId } = mocked(
      `"/><img/onerror=\x60javascript:alert(1)\x60src=xxx:x />`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for ("/><img/onerror=\x20javascript:alert(1)\x20src=xxx:x />)', async () => {
    const { getByTestId } = mocked(
      `"/><img/onerror=\x20javascript:alert(1)\x20src=xxx:x />`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script\x2F>javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(`<script\x2F>javascript:alert(1)</script>`);
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script\x20>javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(`<script\x20>javascript:alert(1)</script>`);
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script\x0D>javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(`<script\x0D>javascript:alert(1)</script>`);
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script\x0A>javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(`<script\x0A>javascript:alert(1)</script>`);
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script\x0C>javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(`<script\x0C>javascript:alert(1)</script>`);
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script\x00>javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(`<script\x00>javascript:alert(1)</script>`);
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script\x09>javascript:alert(1)</script>)', async () => {
    const { getByTestId } = mocked(`<script\x09>javascript:alert(1)</script>`);
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (`"\'><img src=xxx:x onerror\x0B=javascript:alert(1)>)', async () => {
    const { getByTestId } = mocked(
      `\`"'><img src=xxx:x onerror\x0B=javascript:alert(1)>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (`"\'><img src=xxx:x onerror\x00=javascript:alert(1)>)', async () => {
    const { getByTestId } = mocked(
      `\`"'><img src=xxx:x onerror\x00=javascript:alert(1)>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (`"\'><img src=xxx:x onerror\x0C=javascript:alert(1)>)', async () => {
    const { getByTestId } = mocked(
      `\`"'><img src=xxx:x onerror\x0C=javascript:alert(1)>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (`"\'><img src=xxx:x onerror\x0D=javascript:alert(1)>)', async () => {
    const { getByTestId } = mocked(
      `\`"'><img src=xxx:x onerror\x0D=javascript:alert(1)>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (`"\'><img src=xxx:x onerror\x20=javascript:alert(1)>)', async () => {
    const { getByTestId } = mocked(
      `\`"'><img src=xxx:x onerror\x20=javascript:alert(1)>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (`"\'><img src=xxx:x onerror\x0A=javascript:alert(1)>)', async () => {
    const { getByTestId } = mocked(
      `\`"'><img src=xxx:x onerror\x0A=javascript:alert(1)>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (`"\'><img src=xxx:x onerror\x09=javascript:alert(1)>)', async () => {
    const { getByTestId } = mocked(
      `\`"'><img src=xxx:x onerror\x09=javascript:alert(1)>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script>javascript:alert(1)<\x00/script>)', async () => {
    const { getByTestId } = mocked(`<script>javascript:alert(1)<\x00/script>`);
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<img src=# onerror\x3D"javascript:alert(1)" >)', async () => {
    const { getByTestId } = mocked(
      `<img src=# onerror\x3D"javascript:alert(1)" >`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<input onfocus=javascript:alert(1) autofocus>)', async () => {
    const { getByTestId } = mocked(
      `<input onfocus=javascript:alert(1) autofocus>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<input onblur=javascript:alert(1) autofocus><input autofocus>)', async () => {
    const { getByTestId } = mocked(
      `<input onblur=javascript:alert(1) autofocus><input autofocus>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<video poster=javascript:javascript:alert(1)//)', async () => {
    const { getByTestId } = mocked(
      `<video poster=javascript:javascript:alert(1)//`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<body onscroll=javascript:alert(1)><br><br><br><br><br><br>...<br><br><br><br><br><br><br><br><br><br>...<br><br><br><br><br><br><br><br><br><br>...<br><br><br><br><br><br><br><br><br><br>...<br><br><br><br><br><br><br><br><br><br>...<br><br><br><br><input autofocus>)', async () => {
    const { getByTestId } = mocked(
      `<body onscroll=javascript:alert(1)><br><br><br><br><br><br>...<br><br><br><br><br><br><br><br><br><br>...<br><br><br><br><br><br><br><br><br><br>...<br><br><br><br><br><br><br><br><br><br>...<br><br><br><br><br><br><br><br><br><br>...<br><br><br><br><input autofocus>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<form id=test onforminput=javascript:alert(1)><input></form><button form=test onformchange=javascript:alert(1)>X)', async () => {
    const { getByTestId } = mocked(
      `<form id=test onforminput=javascript:alert(1)><input></form><button form=test onformchange=javascript:alert(1)>X`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<video><source onerror="javascript:javascript:alert(1)">)', async () => {
    const { getByTestId } = mocked(
      `<video><source onerror="javascript:javascript:alert(1)">`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<video onerror="javascript:javascript:alert(1)"><source>)', async () => {
    const { getByTestId } = mocked(
      `<video onerror="javascript:javascript:alert(1)"><source>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<form><button formaction="javascript:javascript:alert(1)">X)', async () => {
    const { getByTestId } = mocked(
      `<form><button formaction="javascript:javascript:alert(1)">X`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<body oninput=javascript:alert(1)><input autofocus>)', async () => {
    const { getByTestId } = mocked(
      `<body oninput=javascript:alert(1)><input autofocus>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<math href="javascript:javascript:alert(1)">CLICKME</math>  <math> <maction actiontype="statusline#http://google.com" xlink:href="javascript:javascript:alert(1)">CLICKME</maction> </math>)', async () => {
    const { getByTestId } = mocked(
      `<math href="javascript:javascript:alert(1)">CLICKME</math>  <math> <maction actiontype="statusline#http://google.com" xlink:href="javascript:javascript:alert(1)">CLICKME</maction> </math>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<frameset onload=javascript:alert(1)>)', async () => {
    const { getByTestId } = mocked(`<frameset onload=javascript:alert(1)>`);
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<table background="javascript:javascript:alert(1)">)', async () => {
    const { getByTestId } = mocked(
      `<table background="javascript:javascript:alert(1)">`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<!--<img src="--><img src=x onerror=javascript:alert(1)//">)', async () => {
    const { getByTestId } = mocked(
      `<!--<img src="--><img src=x onerror=javascript:alert(1)//">`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<comment><img src="</comment><img src=x onerror=javascript:alert(1))//">)', async () => {
    const { getByTestId } = mocked(
      `<comment><img src="</comment><img src=x onerror=javascript:alert(1))//">`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<![><img src="]><img src=x onerror=javascript:alert(1)//">)', async () => {
    const { getByTestId } = mocked(
      `<![><img src="]><img src=x onerror=javascript:alert(1)//">`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<style><img src="</style><img src=x onerror=javascript:alert(1)//">)', async () => {
    const { getByTestId } = mocked(
      `<style><img src="</style><img src=x onerror=javascript:alert(1)//">`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<li style=list-style:url() onerror=javascript:alert(1)> <div style=content:url(data:image/svg+xml,%%3Csvg/%%3E);visibility:hidden onload=javascript:alert(1)></div>)', async () => {
    const { getByTestId } = mocked(
      `<li style=list-style:url() onerror=javascript:alert(1)> <div style=content:url(data:image/svg+xml,%%3Csvg/%%3E);visibility:hidden onload=javascript:alert(1)></div>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<head><base href="javascript://"></head><body><a href="/. /,javascript:alert(1)//#">XXX</a></body>)', async () => {
    const { getByTestId } = mocked(
      `<head><base href="javascript://"></head><body><a href="/. /,javascript:alert(1)//#">XXX</a></body>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<SCRIPT FOR=document EVENT=onreadystatechange>javascript:alert(1)</SCRIPT>)', async () => {
    const { getByTestId } = mocked(
      `<SCRIPT FOR=document EVENT=onreadystatechange>javascript:alert(1)</SCRIPT>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<OBJECT CLASSID="clsid:333C7BC4-460F-11D0-BC04-0080C7055A83"><PARAM NAME="DataURL" VALUE="javascript:alert(1)"></OBJECT>)', async () => {
    const { getByTestId } = mocked(
      `<OBJECT CLASSID="clsid:333C7BC4-460F-11D0-BC04-0080C7055A83"><PARAM NAME="DataURL" VALUE="javascript:alert(1)"></OBJECT>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<object data="data:text/html;base64,%(base64)s">)', async () => {
    const { getByTestId } = mocked(
      `<object data="data:text/html;base64,%(base64)s">`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<embed src="data:text/html;base64,%(base64)s">)', async () => {
    const { getByTestId } = mocked(
      `<embed src="data:text/html;base64,%(base64)s">`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test("XSS test for (<x '=\"foo\"><x foo='><img src=x onerror=javascript:alert(1)//'>)", async () => {
    const { getByTestId } = mocked(
      `<x '="foo"><x foo='><img src=x onerror=javascript:alert(1)//'>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<embed src="javascript:alert(1)">)', async () => {
    const { getByTestId } = mocked(`<embed src="javascript:alert(1)">`);
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<img src="javascript:alert(1)">)', async () => {
    const { getByTestId } = mocked(`<img src="javascript:alert(1)">`);
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<image src="javascript:alert(1)">)', async () => {
    const { getByTestId } = mocked(`<image src="javascript:alert(1)">`);
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<script src="javascript:alert(1)">)', async () => {
    const { getByTestId } = mocked(`<script src="javascript:alert(1)">`);
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<div style=width:1px;filter:glow onfilterchange=javascript:alert(1)>x)', async () => {
    const { getByTestId } = mocked(
      `<div style=width:1px;filter:glow onfilterchange=javascript:alert(1)>x`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<? foo="><script>javascript:alert(1)</script>">)', async () => {
    const { getByTestId } = mocked(
      `<? foo="><script>javascript:alert(1)</script>">`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<! foo="><script>javascript:alert(1)</script>">)', async () => {
    const { getByTestId } = mocked(
      `<! foo="><script>javascript:alert(1)</script>">`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (</ foo="><script>javascript:alert(1)</script>">)', async () => {
    const { getByTestId } = mocked(
      `</ foo="><script>javascript:alert(1)</script>">`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<? foo="><x foo=\'?><script>javascript:alert(1)</script>\'>">)', async () => {
    const { getByTestId } = mocked(
      `<? foo="><x foo='?><script>javascript:alert(1)</script>'>">`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<! foo="[[[Inception]]"><x foo="]foo><script>javascript:alert(1)</script>">)', async () => {
    const { getByTestId } = mocked(
      `<! foo="[[[Inception]]"><x foo="]foo><script>javascript:alert(1)</script>">`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<% foo><x foo="%><script>javascript:alert(1)</script>">)', async () => {
    const { getByTestId } = mocked(
      `<% foo><x foo="%><script>javascript:alert(1)</script>">`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<div id=d><x xmlns="><iframe onload=javascript:alert(1)"></div> <script>d.innerHTML=d.innerHTML</script>)', async () => {
    const { getByTestId } = mocked(
      `<div id=d><x xmlns="><iframe onload=javascript:alert(1)"></div> <script>d.innerHTML=d.innerHTML</script>`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<img \x00src=x onerror="alert(1)">)', async () => {
    const { getByTestId } = mocked(`<img \x00src=x onerror="alert(1)">`);
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<img \x47src=x onerror="javascript:alert(1)">)', async () => {
    const { getByTestId } = mocked(
      `<img \x47src=x onerror="javascript:alert(1)">`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<img \x11src=x onerror="javascript:alert(1)">)', async () => {
    const { getByTestId } = mocked(
      `<img \x11src=x onerror="javascript:alert(1)">`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<img \x12src=x onerror="javascript:alert(1)">)', async () => {
    const { getByTestId } = mocked(
      `<img \x12src=x onerror="javascript:alert(1)">`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<img\x47src=x onerror="javascript:alert(1)">)', async () => {
    const { getByTestId } = mocked(
      `<img\x47src=x onerror="javascript:alert(1)">`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<img\x10src=x onerror="javascript:alert(1)">)', async () => {
    const { getByTestId } = mocked(
      `<img\x10src=x onerror="javascript:alert(1)">`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<img\x13src=x onerror="javascript:alert(1)">)', async () => {
    const { getByTestId } = mocked(
      `<img\x13src=x onerror="javascript:alert(1)">`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<img\x32src=x onerror="javascript:alert(1)">)', async () => {
    const { getByTestId } = mocked(
      `<img\x32src=x onerror="javascript:alert(1)">`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<img\x47src=x onerror="javascript:alert(1)">)', async () => {
    const { getByTestId } = mocked(
      `<img\x47src=x onerror="javascript:alert(1)">`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<img\x11src=x onerror="javascript:alert(1)">)', async () => {
    const { getByTestId } = mocked(
      `<img\x11src=x onerror="javascript:alert(1)">`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<a aa aaa aaaa aaaaa aaaaaa aaaaaaa aaaaaaaa aaaaaaaaa aaaaaaaaaa href=j&#97v&#97script&#x3A;&#97lert(1)>ClickMe)', async () => {
    const { getByTestId } = mocked(
      `<a aa aaa aaaa aaaaa aaaaaa aaaaaaa aaaaaaaa aaaaaaaaa aaaaaaaaaa href=j&#97v&#97script&#x3A;&#97lert(1)>ClickMe`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<math><a xlink:href="//jsfiddle.net/t846h/">click)', async () => {
    const { getByTestId } = mocked(
      `<math><a xlink:href="//jsfiddle.net/t846h/">click`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
  test('XSS test for (<xml src="javascript:document.vulnerable=true;">)', async () => {
    const { getByTestId } = mocked(
      `<xml src="javascript:document.vulnerable=true;">`,
    );
    const container = getByTestId('RTE-Container');
    const sanitized = container.getAttribute('data-testhtml');
    expect(sanitized).not.toContain('script');
    expect(sanitized).not.toContain('javascript');
    expect(sanitized).not.toContain('alert');
    expect(global.alert).not.toBeCalled();
  });
});
