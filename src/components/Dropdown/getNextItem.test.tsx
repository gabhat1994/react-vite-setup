import getNextItem from './getNextItem';
import { type DropdownValueType } from './types';

describe('getNextItem', () => {
  test('should return first object when up', () => {
    const options: DropdownValueType<string>[] = [
      {
        key: 'test',
        label: 'label',
        type: 'value',
        value: 'string',
      },
    ];

    expect(getNextItem(options, null, 'up')).toEqual({
      key: 'test',
      label: 'label',
      type: 'value',
      value: 'string',
    });
  });

  test('should return first object when down', () => {
    const options: DropdownValueType<string>[] = [
      {
        key: 'test',
        label: 'label',
        type: 'value',
        value: 'string',
      },
    ];

    expect(getNextItem(options, null, 'down')).toEqual({
      key: 'test',
      label: 'label',
      type: 'value',
      value: 'string',
    });
  });

  test('should return next', () => {
    const options: DropdownValueType<string>[] = [
      {
        key: 'test',
        label: 'label',
        type: 'value',
        value: 'string',
      },
      {
        key: 'xsdt',
        label: 'label',
        type: 'value',
        value: 'string 2',
      },
    ];

    const currOptions: DropdownValueType<string> = {
      key: 'xsdt',
      label: 'label',
      type: 'value',
      value: 'string 2',
    };

    expect(getNextItem(options, currOptions, 'up')).toEqual({
      key: 'test',
      label: 'label',
      type: 'value',
      value: 'string',
    });
  });

  test('should return previous', () => {
    const options: DropdownValueType<string>[] = [
      {
        key: 'sdfsdcx',
        label: 'label',
        type: 'value',
        value: 'string 2',
      },
      {
        key: 'test',
        label: 'label',
        type: 'value',
        value: 'string',
      },
      {
        key: 'xsdt',
        label: 'label',
        type: 'value',
        value: 'string 2',
      },
    ];

    const currOptions: DropdownValueType<string> = {
      key: 'test',
      label: 'label',
      type: 'value',
      value: 'string 2',
    };

    expect(getNextItem(options, currOptions, 'up')).toEqual({
      key: 'sdfsdcx',
      label: 'label',
      type: 'value',
      value: 'string 2',
    });
  });
});
