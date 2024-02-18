import { cleanContentFromXSS } from './utils';

describe('cleanContentFromXSS', () => {
  test('return value', () => {
    expect(cleanContentFromXSS('some value')).toBe('some value');
  });

  test('clean `<image/src/onerror=alert(1)>`', () => {
    const cleaned = cleanContentFromXSS('<image/src/onerror=alert(1)>');
    expect(cleaned).not.toMatch(/(<image)/i);
  });

  test('clean `<img/src/onerror=alert(1)>`', () => {
    const cleaned = cleanContentFromXSS('<img/src/onerror=alert(1)>');
    expect(cleaned).not.toMatch(/(alert)/i);
  });

  test('clean `<image src =q onerror=alert(1)>`', () => {
    const cleaned = cleanContentFromXSS('<image src =q onerror=alert(1)>');
    expect(cleaned).not.toMatch(/(<image)/i);
  });

  test('clean `</scrip</script>t><img src =q onerror=alert(1)>`', () => {
    const cleaned = cleanContentFromXSS(
      '</scrip</script>t><img src =q onerror=alert(1)>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });

  test('clean `<script\x3Etype="text/javascript">javascript:alert(1);</script>`', () => {
    const cleaned = cleanContentFromXSS(
      '<script\x3Etype="text/javascript">javascript:alert(1);</script>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });

  test('clean `<script\x0Dtype="text/javascript">javascript:alert(1);</script>`', () => {
    const cleaned = cleanContentFromXSS(
      '<script\x0Dtype="text/javascript">javascript:alert(1);</script>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });

  test('clean `<script\x09type="text/javascript">javascript:alert(1);</script>`', () => {
    const cleaned = cleanContentFromXSS(
      '<script\x09type="text/javascript">javascript:alert(1);</script>',
    );
    expect(cleaned).toBe('');
  });

  test('clean `<img src=1 href=1 onerror="javascript:alert(1)"></img>`', () => {
    const cleaned = cleanContentFromXSS(
      '<img src=1 href=1 onerror="javascript:alert(1)"></img>',
    );
    expect(cleaned).not.toMatch(/(onerror)/i);
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });

  test('clean `<audio src=1 href=1 onerror="javascript:alert(1)"></audio>`', () => {
    const cleaned = cleanContentFromXSS(
      '<audio src=1 href=1 onerror="javascript:alert(1)"></audio>',
    );
    expect(cleaned).not.toMatch(/(<onerror)/i);
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });

  test('clean `<video src=1 href=1 onerror="javascript:alert(1)"></video>`', () => {
    const cleaned = cleanContentFromXSS(
      '<video src=1 href=1 onerror="javascript:alert(1)"></video>',
    );
    expect(cleaned).not.toMatch(/(<onerror)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });

  test('clean `<body src=1 href=1 onerror="javascript:alert(1)"></body>`', () => {
    const cleaned = cleanContentFromXSS(
      '<body src=1 href=1 onerror="javascript:alert(1)"></body>',
    );
    expect(cleaned).toBe('');
  });

  test('clean `<object src=1 href=1 onerror="javascript:alert(1)"></object>`', () => {
    const cleaned = cleanContentFromXSS(
      '<object src=1 href=1 onerror="javascript:alert(1)"></object>',
    );
    expect(cleaned).toBe('');
  });

  test('clean `<script src=1 href=1 onerror="javascript:alert(1)"></script>`', () => {
    const cleaned = cleanContentFromXSS(
      '<script src=1 href=1 onerror="javascript:alert(1)"></script>',
    );
    expect(cleaned).toBe('');
  });

  test('clean `<svg onResize svg onResize="javascript:javascript:alert(1)"></svg onResize>`', () => {
    const cleaned = cleanContentFromXSS(
      '<svg onResize svg onResize="javascript:javascript:alert(1)"></svg onResize>',
    );
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });

  test('clean `<title onPropertyChange title onPropertyChange="javascript:javascript:alert(1)"></title onPropertyChange>`', () => {
    const cleaned = cleanContentFromXSS(
      '<title onPropertyChange title onPropertyChange="javascript:javascript:alert(1)"></title onPropertyChange>',
    );
    expect(cleaned).toBe('');
  });

  test('clean `<iframe onLoad iframe onLoad="javascript:javascript:alert(1)"></iframe onLoad>`', () => {
    const cleaned = cleanContentFromXSS(
      '<iframe onLoad iframe onLoad="javascript:javascript:alert(1)"></iframe onLoad>',
    );
    expect(cleaned).not.toMatch(/(<iframe)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });

  test('clean `<body onMouseEnter body onMouseEnter="javascript:javascript:alert(1)"></body onMouseEnter>`', () => {
    const cleaned = cleanContentFromXSS(
      '<body onMouseEnter body onMouseEnter="javascript:javascript:alert(1)"></body onMouseEnter>',
    );
    expect(cleaned).toBe('');
  });

  test('clean `<body onFocus body onFocus="javascript:javascript:alert(1)"></body onFocus>`', () => {
    const cleaned = cleanContentFromXSS(
      '<body onFocus body onFocus="javascript:javascript:alert(1)"></body onFocus>',
    );
    expect(cleaned).toBe('');
  });

  test('clean `<frameset onScroll frameset onScroll="javascript:javascript:alert(1)"></frameset onScroll>`', () => {
    const cleaned = cleanContentFromXSS(
      '<frameset onScroll frameset onScroll="javascript:javascript:alert(1)"></frameset onScroll>',
    );
    expect(cleaned).toBe('');
  });

  test('clean `<script onReadyStateChange script onReadyStateChange="javascript:javascript:alert(1)"></script onReadyStateChange>`', () => {
    const cleaned = cleanContentFromXSS(
      '<script onReadyStateChange script onReadyStateChange="javascript:javascript:alert(1)"></script onReadyStateChange>',
    );
    expect(cleaned).toBe('');
  });

  test('clean `<html onMouseUp html onMouseUp="javascript:javascript:alert(1)"></html onMouseUp>`', () => {
    const cleaned = cleanContentFromXSS(
      '<html onMouseUp html onMouseUp="javascript:javascript:alert(1)"></html onMouseUp>',
    );
    expect(cleaned).toBe('');
  });

  test('clean `<html onMouseLeave html onMouseLeave="javascript:javascript:alert(1)"></html onMouseLeave>`', () => {
    const cleaned = cleanContentFromXSS(
      '<html onMouseLeave html onMouseLeave="javascript:javascript:alert(1)"></html onMouseLeave>',
    );
    expect(cleaned).toBe('');
  });

  test('clean `<html onMouseWheel html onMouseWheel="javascript:javascript:alert(1)"></html onMouseWheel>`', () => {
    const cleaned = cleanContentFromXSS(
      '<html onMouseWheel html onMouseWheel="javascript:javascript:alert(1)"></html onMouseWheel>',
    );
    expect(cleaned).toBe('');
  });

  test('clean `<body onPropertyChange body onPropertyChange="javascript:javascript:alert(1)"></body onPropertyChange>`', () => {
    const cleaned = cleanContentFromXSS(
      '<body onPropertyChange body onPropertyChange="javascript:javascript:alert(1)"></body onPropertyChange>',
    );
    expect(cleaned).toBe('');
  });

  test('clean `<body onPageHide body onPageHide="javascript:javascript:alert(1)"></body onPageHide>`', () => {
    const cleaned = cleanContentFromXSS(
      '<body onPageHide body onPageHide="javascript:javascript:alert(1)"></body onPageHide>',
    );
    expect(cleaned).toBe('');
  });

  test('clean `<body onMouseOver body onMouseOver="javascript:javascript:alert(1)"></body onMouseOver>`', () => {
    const cleaned = cleanContentFromXSS(
      '<body onMouseOver body onMouseOver="javascript:javascript:alert(1)"></body onMouseOver>',
    );
    expect(cleaned).toBe('');
  });

  test('clean `<body onUnload body onUnload="javascript:javascript:alert(1)"></body onUnload>`', () => {
    const cleaned = cleanContentFromXSS(
      '<body onUnload body onUnload="javascript:javascript:alert(1)"></body onUnload>',
    );
    expect(cleaned).toBe('');
  });

  test('clean `<body onLoad body onLoad="javascript:javascript:alert(1)"></body onLoad>`', () => {
    const cleaned = cleanContentFromXSS(
      '<body onLoad body onLoad="javascript:javascript:alert(1)"></body onLoad>',
    );
    expect(cleaned).toBe('');
  });

  test('clean `<svg onLoad svg onLoad="javascript:javascript:alert(1)"></svg onLoad>`', () => {
    const cleaned = cleanContentFromXSS(
      '<svg onLoad svg onLoad="javascript:javascript:alert(1)"></svg onLoad>',
    );
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });

  test('clean `<bgsound onPropertyChange bgsound onPropertyChange="javascript:javascript:alert(1)"></bgsound onPropertyChange>`', () => {
    const cleaned = cleanContentFromXSS(
      '<bgsound onPropertyChange bgsound onPropertyChange="javascript:javascript:alert(1)"></bgsound onPropertyChange>',
    );
    expect(cleaned).toBe('');
  });

  test('clean `<style onLoad style onLoad="javascript:javascript:alert(1)"></style onLoad>`', () => {
    const cleaned = cleanContentFromXSS(
      '<style onLoad style onLoad="javascript:javascript:alert(1)"></style onLoad>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<iframe onReadyStateChange iframe onReadyStateChange="javascript:javascript:alert(1)"></iframe onReadyStateChange>`', () => {
    const cleaned = cleanContentFromXSS(
      '<iframe onReadyStateChange iframe onReadyStateChange="javascript:javascript:alert(1)"></iframe onReadyStateChange>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<body onPageShow body onPageShow="javascript:javascript:alert(1)"></body onPageShow>`', () => {
    const cleaned = cleanContentFromXSS(
      '<body onPageShow body onPageShow="javascript:javascript:alert(1)"></body onPageShow>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<style onReadyStateChange style onReadyStateChange="javascript:javascript:alert(1)"></style onReadyStateChange>`', () => {
    const cleaned = cleanContentFromXSS(
      '<style onReadyStateChange style onReadyStateChange="javascript:javascript:alert(1)"></style onReadyStateChange>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<frameset onFocus frameset onFocus="javascript:javascript:alert(1)"></frameset onFocus>`', () => {
    const cleaned = cleanContentFromXSS(
      '<frameset onFocus frameset onFocus="javascript:javascript:alert(1)"></frameset onFocus>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<applet onError applet onError="javascript:javascript:alert(1)"></applet onError>`', () => {
    const cleaned = cleanContentFromXSS(
      '<applet onError applet onError="javascript:javascript:alert(1)"></applet onError>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<marquee onStart marquee onStart="javascript:javascript:alert(1)"></marquee onStart>`', () => {
    const cleaned = cleanContentFromXSS(
      '<marquee onStart marquee onStart="javascript:javascript:alert(1)"></marquee onStart>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<script onLoad script onLoad="javascript:javascript:alert(1)"></script onLoad>`', () => {
    const cleaned = cleanContentFromXSS(
      '<script onLoad script onLoad="javascript:javascript:alert(1)"></script onLoad>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<html onMouseOver html onMouseOver="javascript:javascript:alert(1)"></html onMouseOver>`', () => {
    const cleaned = cleanContentFromXSS(
      '<html onMouseOver html onMouseOver="javascript:javascript:alert(1)"></html onMouseOver>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<html onMouseEnter html onMouseEnter="javascript:parent.javascript:alert(1)"></html onMouseEnter>`', () => {
    const cleaned = cleanContentFromXSS(
      '<html onMouseEnter html onMouseEnter="javascript:parent.javascript:alert(1)"></html onMouseEnter>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<body onBeforeUnload body onBeforeUnload="javascript:javascript:alert(1)"></body onBeforeUnload>`', () => {
    const cleaned = cleanContentFromXSS(
      '<body onBeforeUnload body onBeforeUnload="javascript:javascript:alert(1)"></body onBeforeUnload>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<html onMouseDown html onMouseDown="javascript:javascript:alert(1)"></html onMouseDown>`', () => {
    const cleaned = cleanContentFromXSS(
      '<html onMouseDown html onMouseDown="javascript:javascript:alert(1)"></html onMouseDown>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<marquee onScroll marquee onScroll="javascript:javascript:alert(1)"></marquee onScroll>`', () => {
    const cleaned = cleanContentFromXSS(
      '<marquee onScroll marquee onScroll="javascript:javascript:alert(1)"></marquee onScroll>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<xml onPropertyChange xml onPropertyChange="javascript:javascript:alert(1)"></xml onPropertyChange>`', () => {
    const cleaned = cleanContentFromXSS(
      '<xml onPropertyChange xml onPropertyChange="javascript:javascript:alert(1)"></xml onPropertyChange>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<frameset onBlur frameset onBlur="javascript:javascript:alert(1)"></frameset onBlur>`', () => {
    const cleaned = cleanContentFromXSS(
      '<frameset onBlur frameset onBlur="javascript:javascript:alert(1)"></frameset onBlur>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<applet onReadyStateChange applet onReadyStateChange="javascript:javascript:alert(1)"></applet onReadyStateChange>`', () => {
    const cleaned = cleanContentFromXSS(
      '<applet onReadyStateChange applet onReadyStateChange="javascript:javascript:alert(1)"></applet onReadyStateChange>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<svg onUnload svg onUnload="javascript:javascript:alert(1)"></svg onUnload>`', () => {
    const cleaned = cleanContentFromXSS(
      '<svg onUnload svg onUnload="javascript:javascript:alert(1)"></svg onUnload>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<html onMouseOut html onMouseOut="javascript:javascript:alert(1)"></html onMouseOut>`', () => {
    const cleaned = cleanContentFromXSS(
      '<html onMouseOut html onMouseOut="javascript:javascript:alert(1)"></html onMouseOut>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<body onMouseMove body onMouseMove="javascript:javascript:alert(1)"></body onMouseMove>`', () => {
    const cleaned = cleanContentFromXSS(
      '<body onMouseMove body onMouseMove="javascript:javascript:alert(1)"></body onMouseMove>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<body onResize body onResize="javascript:javascript:alert(1)"></body onResize>`', () => {
    const cleaned = cleanContentFromXSS(
      '<body onResize body onResize="javascript:javascript:alert(1)"></body onResize>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<object onError object onError="javascript:javascript:alert(1)"></object onError>`', () => {
    const cleaned = cleanContentFromXSS(
      '<object onError object onError="javascript:javascript:alert(1)"></object onError>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<body onPopState body onPopState="javascript:javascript:alert(1)"></body onPopState>`', () => {
    const cleaned = cleanContentFromXSS(
      '<body onPopState body onPopState="javascript:javascript:alert(1)"></body onPopState>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<html onMouseMove html onMouseMove="javascript:javascript:alert(1)"></html onMouseMove>`', () => {
    const cleaned = cleanContentFromXSS(
      '<html onMouseMove html onMouseMove="javascript:javascript:alert(1)"></html onMouseMove>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<applet onreadystatechange applet onreadystatechange="javascript:javascript:alert(1)"></applet onreadystatechange>`', () => {
    const cleaned = cleanContentFromXSS(
      '<applet onreadystatechange applet onreadystatechange="javascript:javascript:alert(1)"></applet onreadystatechange>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<body onpagehide body onpagehide="javascript:javascript:alert(1)"></body onpagehide>`', () => {
    const cleaned = cleanContentFromXSS(
      '<body onpagehide body onpagehide="javascript:javascript:alert(1)"></body onpagehide>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<svg onunload svg onunload="javascript:javascript:alert(1)"></svg onunload>`', () => {
    const cleaned = cleanContentFromXSS(
      '<svg onunload svg onunload="javascript:javascript:alert(1)"></svg onunload>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<applet onerror applet onerror="javascript:javascript:alert(1)"></applet onerror>`', () => {
    const cleaned = cleanContentFromXSS(
      '<applet onerror applet onerror="javascript:javascript:alert(1)"></applet onerror>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<body onkeyup body onkeyup="javascript:javascript:alert(1)"></body onkeyup>`', () => {
    const cleaned = cleanContentFromXSS(
      '<body onkeyup body onkeyup="javascript:javascript:alert(1)"></body onkeyup>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<body onunload body onunload="javascript:javascript:alert(1)"></body onunload>`', () => {
    const cleaned = cleanContentFromXSS(
      '<body onunload body onunload="javascript:javascript:alert(1)"></body onunload>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<iframe onload iframe onload="javascript:javascript:alert(1)"></iframe onload>`', () => {
    const cleaned = cleanContentFromXSS(
      '<iframe onload iframe onload="javascript:javascript:alert(1)"></iframe onload>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<body onload body onload="javascript:javascript:alert(1)"></body onload>`', () => {
    const cleaned = cleanContentFromXSS(
      '<body onload body onload="javascript:javascript:alert(1)"></body onload>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<html onmouseover html onmouseover="javascript:javascript:alert(1)"></html onmouseover>`', () => {
    const cleaned = cleanContentFromXSS(
      '<html onmouseover html onmouseover="javascript:javascript:alert(1)"></html onmouseover>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<object onbeforeload object onbeforeload="javascript:javascript:alert(1)"></object onbeforeload>`', () => {
    const cleaned = cleanContentFromXSS(
      '<object onbeforeload object onbeforeload="javascript:javascript:alert(1)"></object onbeforeload>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<body onbeforeunload body onbeforeunload="javascript:javascript:alert(1)"></body onbeforeunload>`', () => {
    const cleaned = cleanContentFromXSS(
      '<body onbeforeunload body onbeforeunload="javascript:javascript:alert(1)"></body onbeforeunload>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<body onfocus body onfocus="javascript:javascript:alert(1)"></body onfocus>`', () => {
    const cleaned = cleanContentFromXSS(
      '<body onfocus body onfocus="javascript:javascript:alert(1)"></body onfocus>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<body onkeydown body onkeydown="javascript:javascript:alert(1)"></body onkeydown>`', () => {
    const cleaned = cleanContentFromXSS(
      '<body onkeydown body onkeydown="javascript:javascript:alert(1)"></body onkeydown>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<iframe onbeforeload iframe onbeforeload="javascript:javascript:alert(1)"></iframe onbeforeload>`', () => {
    const cleaned = cleanContentFromXSS(
      '<iframe onbeforeload iframe onbeforeload="javascript:javascript:alert(1)"></iframe onbeforeload>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<iframe src iframe src="javascript:javascript:alert(1)"></iframe src>`', () => {
    const cleaned = cleanContentFromXSS(
      '<iframe src iframe src="javascript:javascript:alert(1)"></iframe src>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<svg onload svg onload="javascript:javascript:alert(1)"></svg onload>`', () => {
    const cleaned = cleanContentFromXSS(
      '<svg onload svg onload="javascript:javascript:alert(1)"></svg onload>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<html onmousemove html onmousemove="javascript:javascript:alert(1)"></html onmousemove>`', () => {
    const cleaned = cleanContentFromXSS(
      '<html onmousemove html onmousemove="javascript:javascript:alert(1)"></html onmousemove>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `<body onblur body onblur="javascript:javascript:alert(1)"></body onblur>`', () => {
    const cleaned = cleanContentFromXSS(
      '<body onblur body onblur="javascript:javascript:alert(1)"></body onblur>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `\x3Cscript>javascript:alert(1)</script>`', () => {
    const cleaned = cleanContentFromXSS(
      '\x3Cscript>javascript:alert(1)</script>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test('clean `\'"`><script>/* *\x2Fjavascript:alert(1)// */</script>`', () => {
    const cleaned = cleanContentFromXSS(
      '\'"`><script>/* *\x2Fjavascript:alert(1)// */</script>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });

  test(`<style onLoad style onLoad="javascript:javascript:alert(1)"></style onLoad>`, () => {
    const cleaned = cleanContentFromXSS(
      '<style onLoad style onLoad="javascript:javascript:alert(1)"></style onLoad>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<iframe onReadyStateChange iframe onReadyStateChange="javascript:javascript:alert(1)"></iframe onReadyStateChange>`, () => {
    const cleaned = cleanContentFromXSS(
      '<iframe onReadyStateChange iframe onReadyStateChange="javascript:javascript:alert(1)"></iframe onReadyStateChange>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<body onPageShow body onPageShow="javascript:javascript:alert(1)"></body onPageShow>`, () => {
    const cleaned = cleanContentFromXSS(
      '<body onPageShow body onPageShow="javascript:javascript:alert(1)"></body onPageShow>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<style onReadyStateChange style onReadyStateChange="javascript:javascript:alert(1)"></style onReadyStateChange>`, () => {
    const cleaned = cleanContentFromXSS(
      '<style onReadyStateChange style onReadyStateChange="javascript:javascript:alert(1)"></style onReadyStateChange>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<frameset onFocus frameset onFocus="javascript:javascript:alert(1)"></frameset onFocus>`, () => {
    const cleaned = cleanContentFromXSS(
      '<frameset onFocus frameset onFocus="javascript:javascript:alert(1)"></frameset onFocus>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<applet onError applet onError="javascript:javascript:alert(1)"></applet onError>`, () => {
    const cleaned = cleanContentFromXSS(
      '<applet onError applet onError="javascript:javascript:alert(1)"></applet onError>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<marquee onStart marquee onStart="javascript:javascript:alert(1)"></marquee onStart>`, () => {
    const cleaned = cleanContentFromXSS(
      '<marquee onStart marquee onStart="javascript:javascript:alert(1)"></marquee onStart>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<script onLoad script onLoad="javascript:javascript:alert(1)"></script onLoad>`, () => {
    const cleaned = cleanContentFromXSS(
      '<script onLoad script onLoad="javascript:javascript:alert(1)"></script onLoad>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<html onMouseOver html onMouseOver="javascript:javascript:alert(1)"></html onMouseOver>`, () => {
    const cleaned = cleanContentFromXSS(
      '<html onMouseOver html onMouseOver="javascript:javascript:alert(1)"></html onMouseOver>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<html onMouseEnter html onMouseEnter="javascript:parent.javascript:alert(1)"></html onMouseEnter>`, () => {
    const cleaned = cleanContentFromXSS(
      '<html onMouseEnter html onMouseEnter="javascript:parent.javascript:alert(1)"></html onMouseEnter>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<body onBeforeUnload body onBeforeUnload="javascript:javascript:alert(1)"></body onBeforeUnload>`, () => {
    const cleaned = cleanContentFromXSS(
      '<body onBeforeUnload body onBeforeUnload="javascript:javascript:alert(1)"></body onBeforeUnload>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<html onMouseDown html onMouseDown="javascript:javascript:alert(1)"></html onMouseDown>`, () => {
    const cleaned = cleanContentFromXSS(
      '<html onMouseDown html onMouseDown="javascript:javascript:alert(1)"></html onMouseDown>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<marquee onScroll marquee onScroll="javascript:javascript:alert(1)"></marquee onScroll>`, () => {
    const cleaned = cleanContentFromXSS(
      '<marquee onScroll marquee onScroll="javascript:javascript:alert(1)"></marquee onScroll>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<xml onPropertyChange xml onPropertyChange="javascript:javascript:alert(1)"></xml onPropertyChange>`, () => {
    const cleaned = cleanContentFromXSS(
      '<xml onPropertyChange xml onPropertyChange="javascript:javascript:alert(1)"></xml onPropertyChange>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<frameset onBlur frameset onBlur="javascript:javascript:alert(1)"></frameset onBlur>`, () => {
    const cleaned = cleanContentFromXSS(
      '<frameset onBlur frameset onBlur="javascript:javascript:alert(1)"></frameset onBlur>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<applet onReadyStateChange applet onReadyStateChange="javascript:javascript:alert(1)"></applet onReadyStateChange>`, () => {
    const cleaned = cleanContentFromXSS(
      '<applet onReadyStateChange applet onReadyStateChange="javascript:javascript:alert(1)"></applet onReadyStateChange>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<svg onUnload svg onUnload="javascript:javascript:alert(1)"></svg onUnload>`, () => {
    const cleaned = cleanContentFromXSS(
      '<svg onUnload svg onUnload="javascript:javascript:alert(1)"></svg onUnload>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<html onMouseOut html onMouseOut="javascript:javascript:alert(1)"></html onMouseOut>`, () => {
    const cleaned = cleanContentFromXSS(
      '<html onMouseOut html onMouseOut="javascript:javascript:alert(1)"></html onMouseOut>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<body onMouseMove body onMouseMove="javascript:javascript:alert(1)"></body onMouseMove>`, () => {
    const cleaned = cleanContentFromXSS(
      '<body onMouseMove body onMouseMove="javascript:javascript:alert(1)"></body onMouseMove>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<body onResize body onResize="javascript:javascript:alert(1)"></body onResize>`, () => {
    const cleaned = cleanContentFromXSS(
      '<body onResize body onResize="javascript:javascript:alert(1)"></body onResize>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<object onError object onError="javascript:javascript:alert(1)"></object onError>`, () => {
    const cleaned = cleanContentFromXSS(
      '<object onError object onError="javascript:javascript:alert(1)"></object onError>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<body onPopState body onPopState="javascript:javascript:alert(1)"></body onPopState>`, () => {
    const cleaned = cleanContentFromXSS(
      '<body onPopState body onPopState="javascript:javascript:alert(1)"></body onPopState>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<html onMouseMove html onMouseMove="javascript:javascript:alert(1)"></html onMouseMove>`, () => {
    const cleaned = cleanContentFromXSS(
      '<html onMouseMove html onMouseMove="javascript:javascript:alert(1)"></html onMouseMove>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<applet onreadystatechange applet onreadystatechange="javascript:javascript:alert(1)"></applet onreadystatechange>`, () => {
    const cleaned = cleanContentFromXSS(
      '<applet onreadystatechange applet onreadystatechange="javascript:javascript:alert(1)"></applet onreadystatechange>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<body onpagehide body onpagehide="javascript:javascript:alert(1)"></body onpagehide>`, () => {
    const cleaned = cleanContentFromXSS(
      '<body onpagehide body onpagehide="javascript:javascript:alert(1)"></body onpagehide>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<svg onunload svg onunload="javascript:javascript:alert(1)"></svg onunload>`, () => {
    const cleaned = cleanContentFromXSS(
      '<svg onunload svg onunload="javascript:javascript:alert(1)"></svg onunload>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<applet onerror applet onerror="javascript:javascript:alert(1)"></applet onerror>`, () => {
    const cleaned = cleanContentFromXSS(
      '<applet onerror applet onerror="javascript:javascript:alert(1)"></applet onerror>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<body onkeyup body onkeyup="javascript:javascript:alert(1)"></body onkeyup>`, () => {
    const cleaned = cleanContentFromXSS(
      '<body onkeyup body onkeyup="javascript:javascript:alert(1)"></body onkeyup>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<body onunload body onunload="javascript:javascript:alert(1)"></body onunload>`, () => {
    const cleaned = cleanContentFromXSS(
      '<body onunload body onunload="javascript:javascript:alert(1)"></body onunload>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<iframe onload iframe onload="javascript:javascript:alert(1)"></iframe onload>`, () => {
    const cleaned = cleanContentFromXSS(
      '<iframe onload iframe onload="javascript:javascript:alert(1)"></iframe onload>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<body onload body onload="javascript:javascript:alert(1)"></body onload>`, () => {
    const cleaned = cleanContentFromXSS(
      '<body onload body onload="javascript:javascript:alert(1)"></body onload>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<html onmouseover html onmouseover="javascript:javascript:alert(1)"></html onmouseover>`, () => {
    const cleaned = cleanContentFromXSS(
      '<html onmouseover html onmouseover="javascript:javascript:alert(1)"></html onmouseover>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<object onbeforeload object onbeforeload="javascript:javascript:alert(1)"></object onbeforeload>`, () => {
    const cleaned = cleanContentFromXSS(
      '<object onbeforeload object onbeforeload="javascript:javascript:alert(1)"></object onbeforeload>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<body onbeforeunload body onbeforeunload="javascript:javascript:alert(1)"></body onbeforeunload>`, () => {
    const cleaned = cleanContentFromXSS(
      '<body onbeforeunload body onbeforeunload="javascript:javascript:alert(1)"></body onbeforeunload>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<body onfocus body onfocus="javascript:javascript:alert(1)"></body onfocus>`, () => {
    const cleaned = cleanContentFromXSS(
      '<body onfocus body onfocus="javascript:javascript:alert(1)"></body onfocus>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<body onkeydown body onkeydown="javascript:javascript:alert(1)"></body onkeydown>`, () => {
    const cleaned = cleanContentFromXSS(
      '<body onkeydown body onkeydown="javascript:javascript:alert(1)"></body onkeydown>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<iframe onbeforeload iframe onbeforeload="javascript:javascript:alert(1)"></iframe onbeforeload>`, () => {
    const cleaned = cleanContentFromXSS(
      '<iframe onbeforeload iframe onbeforeload="javascript:javascript:alert(1)"></iframe onbeforeload>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<iframe src iframe src="javascript:javascript:alert(1)"></iframe src>`, () => {
    const cleaned = cleanContentFromXSS(
      '<iframe src iframe src="javascript:javascript:alert(1)"></iframe src>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<svg onload svg onload="javascript:javascript:alert(1)"></svg onload>`, () => {
    const cleaned = cleanContentFromXSS(
      '<svg onload svg onload="javascript:javascript:alert(1)"></svg onload>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<html onmousemove html onmousemove="javascript:javascript:alert(1)"></html onmousemove>`, () => {
    const cleaned = cleanContentFromXSS(
      '<html onmousemove html onmousemove="javascript:javascript:alert(1)"></html onmousemove>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<body onblur body onblur="javascript:javascript:alert(1)"></body onblur>`, () => {
    const cleaned = cleanContentFromXSS(
      '<body onblur body onblur="javascript:javascript:alert(1)"></body onblur>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`\x3Cscript>javascript:alert(1)</script>`, () => {
    const cleaned = cleanContentFromXSS(
      '\x3Cscript>javascript:alert(1)</script>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`'"\`><script>/* *\x2Fjavascript:alert(1)// */</script>`, () => {
    const cleaned = cleanContentFromXSS(
      '\'"`><script>/* *\x2Fjavascript:alert(1)// */</script>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<script>javascript:alert(1)</script\x0D`, () => {
    const cleaned = cleanContentFromXSS(
      '<script>javascript:alert(1)</script\x0D',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<script>javascript:alert(1)</script\x0A`, () => {
    const cleaned = cleanContentFromXSS(
      '<script>javascript:alert(1)</script\x0A',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<script>javascript:alert(1)</script\x0B`, () => {
    const cleaned = cleanContentFromXSS(
      '<script>javascript:alert(1)</script\x0B',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<script charset="\x22>javascript:alert(1)</script>`, () => {
    const cleaned = cleanContentFromXSS(
      '<script charset="\x22>javascript:alert(1)</script>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`\`"'><img src='#\x27 onerror=javascript:alert(1)>`, () => {
    const cleaned = cleanContentFromXSS(
      "`\"'><img src='#\x27 onerror=javascript:alert(1)>",
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<a href="javascript\x3Ajavascript:alert(1)" id="fuzzelement1">test</a>`, () => {
    const cleaned = cleanContentFromXSS(
      '<a href="javascript\x3Ajavascript:alert(1)" id="fuzzelement1">test</a>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`"'\`><p><svg><script>a='hello\x27;javascript:alert(1)//';</script></p>`, () => {
    const cleaned = cleanContentFromXSS(
      "\"'`><p><svg><script>a='hello\x27;javascript:alert(1)//';</script></p>",
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<a href="javas\x00cript:javascript:alert(1)" id="fuzzelement1">test</a>`, () => {
    const cleaned = cleanContentFromXSS(
      '<a href="javas\x00cript:javascript:alert(1)" id="fuzzelement1">test</a>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<a href="javas\x07cript:javascript:alert(1)" id="fuzzelement1">test</a>`, () => {
    const cleaned = cleanContentFromXSS(
      '<a href="javas\x07cript:javascript:alert(1)" id="fuzzelement1">test</a>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<a href="javas\x0Dcript:javascript:alert(1)" id="fuzzelement1">test</a>`, () => {
    const cleaned = cleanContentFromXSS(
      '<a href="javas\x0Dcript:javascript:alert(1)" id="fuzzelement1">test</a>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<a href="javas\x0Acript:javascript:alert(1)" id="fuzzelement1">test</a>`, () => {
    const cleaned = cleanContentFromXSS(
      '<a href="javas\x0Acript:javascript:alert(1)" id="fuzzelement1">test</a>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<a href="javas\x08cript:javascript:alert(1)" id="fuzzelement1">test</a>`, () => {
    const cleaned = cleanContentFromXSS(
      '<a href="javas\x08cript:javascript:alert(1)" id="fuzzelement1">test</a>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<a href="javas\x02cript:javascript:alert(1)" id="fuzzelement1">test</a>`, () => {
    const cleaned = cleanContentFromXSS(
      '<a href="javas\x02cript:javascript:alert(1)" id="fuzzelement1">test</a>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<a href="javas\x03cript:javascript:alert(1)" id="fuzzelement1">test</a>`, () => {
    const cleaned = cleanContentFromXSS(
      '<a href="javas\x03cript:javascript:alert(1)" id="fuzzelement1">test</a>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<a href="javas\x04cript:javascript:alert(1)" id="fuzzelement1">test</a>`, () => {
    const cleaned = cleanContentFromXSS(
      '<a href="javas\x04cript:javascript:alert(1)" id="fuzzelement1">test</a>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<a href="javas\x01cript:javascript:alert(1)" id="fuzzelement1">test</a>`, () => {
    const cleaned = cleanContentFromXSS(
      '<a href="javas\x01cript:javascript:alert(1)" id="fuzzelement1">test</a>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<a href="javas\x05cript:javascript:alert(1)" id="fuzzelement1">test</a>`, () => {
    const cleaned = cleanContentFromXSS(
      '<a href="javas\x05cript:javascript:alert(1)" id="fuzzelement1">test</a>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<a href="javas\x0Bcript:javascript:alert(1)" id="fuzzelement1">test</a>`, () => {
    const cleaned = cleanContentFromXSS(
      '<a href="javas\x0Bcript:javascript:alert(1)" id="fuzzelement1">test</a>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<a href="javas\x09cript:javascript:alert(1)" id="fuzzelement1">test</a>`, () => {
    const cleaned = cleanContentFromXSS(
      '<a href="javas\x09cript:javascript:alert(1)" id="fuzzelement1">test</a>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<a href="javas\x06cript:javascript:alert(1)" id="fuzzelement1">test</a>`, () => {
    const cleaned = cleanContentFromXSS(
      '<a href="javas\x06cript:javascript:alert(1)" id="fuzzelement1">test</a>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<a href="javas\x0Ccript:javascript:alert(1)" id="fuzzelement1">test</a>`, () => {
    const cleaned = cleanContentFromXSS(
      '<a href="javas\x0Ccript:javascript:alert(1)" id="fuzzelement1">test</a>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<script>/* *\x2A/javascript:alert(1)// */</script>`, () => {
    const cleaned = cleanContentFromXSS(
      '<script>/* *\x2A/javascript:alert(1)// */</script>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<script>/* *\x00/javascript:alert(1)// */</script>`, () => {
    const cleaned = cleanContentFromXSS(
      '<script>/* *\x00/javascript:alert(1)// */</script>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<style></style\x3E<img src="about:blank" onerror=javascript:alert(1)//></style>`, () => {
    const cleaned = cleanContentFromXSS(
      '<style></style\x3E<img src="about:blank" onerror=javascript:alert(1)//></style>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<style></style\x0D<img src="about:blank" onerror=javascript:alert(1)//></style>`, () => {
    const cleaned = cleanContentFromXSS(
      '<style></style\x0D<img src="about:blank" onerror=javascript:alert(1)//></style>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<style></style\x09<img src="about:blank" onerror=javascript:alert(1)//></style>`, () => {
    const cleaned = cleanContentFromXSS(
      '<style></style\x09<img src="about:blank" onerror=javascript:alert(1)//></style>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<style></style\x20<img src="about:blank" onerror=javascript:alert(1)//></style>`, () => {
    const cleaned = cleanContentFromXSS(
      '<style></style\x20<img src="about:blank" onerror=javascript:alert(1)//></style>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<style></style\x0A<img src="about:blank" onerror=javascript:alert(1)//></style>`, () => {
    const cleaned = cleanContentFromXSS(
      '<style></style\x0A<img src="about:blank" onerror=javascript:alert(1)//></style>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`"'\`>ABC<div style="font-family:'foo'\x7Dx:expression(javascript:alert(1);/*';">DEF `, () => {
    const cleaned = cleanContentFromXSS(
      "\"'`>ABC<div style=\"font-family:'foo'\x7Dx:expression(javascript:alert(1);/*';\">DEF ",
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`"'\`>ABC<div style="font-family:'foo'\x3Bx:expression(javascript:alert(1);/*';">DEF `, () => {
    const cleaned = cleanContentFromXSS(
      "\"'`>ABC<div style=\"font-family:'foo'\x3Bx:expression(javascript:alert(1);/*';\">DEF ",
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<script>if("x\\xE1\x96\x89".length==2) { javascript:alert(1);}</script>`, () => {
    const cleaned = cleanContentFromXSS(
      '<script>if("x\\xE1\x96\x89".length==2) { javascript:alert(1);}</script>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<script>if("x\\xE0\xB9\x92".length==2) { javascript:alert(1);}</script>`, () => {
    const cleaned = cleanContentFromXSS(
      '<script>if("x\\xE0\xB9\x92".length==2) { javascript:alert(1);}</script>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<script>if("x\\xEE\xA9\x93".length==2) { javascript:alert(1);}</script>`, () => {
    const cleaned = cleanContentFromXSS(
      '<script>if("x\\xEE\xA9\x93".length==2) { javascript:alert(1);}</script>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`'\`"><\x3Cscript>javascript:alert(1)</script>`, () => {
    const cleaned = cleanContentFromXSS(
      '\'`"><\x3Cscript>javascript:alert(1)</script>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<script src="data:text/plain\x2Cjavascript:alert(1)"></script>`, () => {
    const cleaned = cleanContentFromXSS(
      '<script src="data:text/plain\x2Cjavascript:alert(1)"></script>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<script src="data:\xD4\x8F,javascript:alert(1)"></script>`, () => {
    const cleaned = cleanContentFromXSS(
      '<script src="data:\xD4\x8F,javascript:alert(1)"></script>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<script src="data:\xE0\xA4\x98,javascript:alert(1)"></script>`, () => {
    const cleaned = cleanContentFromXSS(
      '<script src="data:\xE0\xA4\x98,javascript:alert(1)"></script>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<script src="data:\xCB\x8F,javascript:alert(1)"></script>`, () => {
    const cleaned = cleanContentFromXSS(
      '<script src="data:\xCB\x8F,javascript:alert(1)"></script>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<script\x20type="text/javascript">javascript:alert(1);</script>`, () => {
    const cleaned = cleanContentFromXSS(
      '<script\x20type="text/javascript">javascript:alert(1);</script>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<script\x3Etype="text/javascript">javascript:alert(1);</script>`, () => {
    const cleaned = cleanContentFromXSS(
      '<script\x3Etype="text/javascript">javascript:alert(1);</script>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<script\x0Dtype="text/javascript">javascript:alert(1);</script>`, () => {
    const cleaned = cleanContentFromXSS(
      '<script\x0Dtype="text/javascript">javascript:alert(1);</script>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<script\x09type="text/javascript">javascript:alert(1);</script>`, () => {
    const cleaned = cleanContentFromXSS(
      '<script\x09type="text/javascript">javascript:alert(1);</script>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<script\x0Ctype="text/javascript">javascript:alert(1);</script>`, () => {
    const cleaned = cleanContentFromXSS(
      '<script\x0Ctype="text/javascript">javascript:alert(1);</script>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<script\x2Ftype="text/javascript">javascript:alert(1);</script>`, () => {
    const cleaned = cleanContentFromXSS(
      '<script\x2Ftype="text/javascript">javascript:alert(1);</script>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<script\x0Atype="text/javascript">javascript:alert(1);</script>`, () => {
    const cleaned = cleanContentFromXSS(
      '<script\x0Atype="text/javascript">javascript:alert(1);</script>',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`ABC<div style="x\x3Aexpression(javascript:alert(1)">DEF`, () => {
    const cleaned = cleanContentFromXSS(
      'ABC<div style="x\x3Aexpression(javascript:alert(1)">DEF',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`ABC<div style="x:expression\x5C(javascript:alert(1)">DEF`, () => {
    const cleaned = cleanContentFromXSS(
      'ABC<div style="x:expression\x5C(javascript:alert(1)">DEF',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`ABC<div style="x:expression\x00(javascript:alert(1)">DEF`, () => {
    const cleaned = cleanContentFromXSS(
      'ABC<div style="x:expression\x00(javascript:alert(1)">DEF',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<comment><img src="</comment><img src=x onerror=javascript:alert(1))//">`, () => {
    const cleaned = cleanContentFromXSS(
      '<comment><img src="</comment><img src=x onerror=javascript:alert(1))//">',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<a aa aaa aaaa aaaaa aaaaaa aaaaaaa aaaaaaaa aaaaaaaaa aaaaaaaaaa href=j&#97v&#97script&#x3A;&#97lert(1)>ClickMe`, () => {
    const cleaned = cleanContentFromXSS(
      '<a aa aaa aaaa aaaaa aaaaaa aaaaaaa aaaaaaaa aaaaaaaaa aaaaaaaaaa href=j&#97v&#97script&#x3A;&#97lert(1)>ClickMe',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<math><a xlink:href="//jsfiddle.net/t846h/">click`, () => {
    const cleaned = cleanContentFromXSS(
      '<math><a xlink:href="//jsfiddle.net/t846h/">click',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
  test(`<xml src="javascript:document.vulnerable=true;">`, () => {
    const cleaned = cleanContentFromXSS(
      '<xml src="javascript:document.vulnerable=true;">',
    );
    expect(cleaned).not.toMatch(/(script)/i);
    expect(cleaned).not.toMatch(/(javascript)/i);
    expect(cleaned).not.toMatch(/(alert)/i);
  });
});
