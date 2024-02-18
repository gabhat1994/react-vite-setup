import React from 'react';
import { cleanup, render } from '@/test-utils';
import BasicChipsTabsInput from './TabsInput';

describe('<BasicChipsTabsInput />', () => {
  afterEach(() => {
    cleanup();
  });

  test('render inactive Tab component', () => {
    const tmpData = {
      name: 'test3',
      image: 'activity_m',
      text: 'Label',
      id: 'xss1',
      mode: 'isBackground',
      selectedId: 'xss1',
    };

    const func = vi.fn();
    render(
      <BasicChipsTabsInput
        key={1}
        handleSetUnderlineWidth={func}
        id={tmpData.id}
        name={tmpData.name}
        text={tmpData.text}
        isActive={tmpData.id === tmpData.selectedId}
        isBackground={tmpData.mode === 'isBackground'}
        labelSize="medium"
        image="activity_m"
        fontSize="18px"
      />,
    );

    const el = document.getElementById('xss1');
    expect(el).toHaveStyle(`
        color: currentColor;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        transform: translateY(-0.075em);
        display: grid;
        place-content: center;
        margin: 0px -16px 0px 0px;
    `);
  });
});
