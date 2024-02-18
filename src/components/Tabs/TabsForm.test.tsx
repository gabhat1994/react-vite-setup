import React from 'react';
import { cleanup, render } from '@/test-utils';
import BasicChipsTabsForm from './TabsForm';
import { type Icons } from '../Icon/Icon';

describe('<BasicChipsTabsForm />', () => {
  afterEach(() => {
    cleanup();
  });

  test('render inactive Tab component', () => {
    type InputListTypes = {
      name: string;
      image: keyof typeof Icons;
      text: string;
      id: string;
      labelSize: 'small' | 'medium' | 'large' | 'auto';
    };
    const inputList: InputListTypes[] = [
      {
        name: 'test1',
        image: 'placeholder_m',
        text: 'Label',
        id: 'xss1',
        labelSize: 'large',
      },
      {
        name: 'test1',
        image: 'placeholder_m',
        text: 'Label',
        id: 'xsds1',
        labelSize: 'large',
      },
    ];
    const onChange = vi.fn();
    render(
      <BasicChipsTabsForm
        inputList={inputList}
        onChange={onChange}
        selectedId="xxs"
        mode="isUnderline"
      />,
    );

    const el = document.getElementById('styledFormTabs');
    expect(el).toHaveStyle(`
        display: flex;
    `);
  });
});
