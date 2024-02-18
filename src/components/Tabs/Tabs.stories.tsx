import { useState } from 'react';
import BasicChipsTabsForm from './TabsForm';
import { StoriesWrapper } from './Tabs.styles';
import { type InputListTypes } from './types';

type Props = {
  inputList: InputListTypes[];
};

const BasicTabsWithHooks = ({ inputList }: Props) => {
  const [selectedId, setSelectedId] = useState<string>('0');

  const tmpList: InputListTypes[] = [
    {
      name: 'test1',
      image: 'terms_m',
      text: 'Label',
      labelSize: 'large',
    },
    {
      name: 'test1',
      image: 'terms_m',
      text: 'Label',
      labelSize: 'large',
    },
  ];

  const list = inputList || tmpList;

  const onChange = (value: string) => {
    setSelectedId(value);
  };

  return (
    <BasicChipsTabsForm
      onChange={onChange}
      inputList={list}
      selectedId={selectedId}
      mode="isUnderline"
    />
  );
};
export const BasicTabs = {
  render: BasicTabsWithHooks,
};

const ChipsTabsWithHooks = ({ inputList }: Props) => {
  const [selectedId, setSelectedId] = useState<string>('0');

  const tmpList: InputListTypes[] = [
    {
      name: 'test1',
      image: 'terms_m',
      text: 'Label',
      labelSize: 'large',
    },
    {
      name: 'test1',
      image: 'terms_m',
      text: 'Label',
      labelSize: 'large',
    },
  ];

  const list = inputList || tmpList;

  const onChange = (value: string) => {
    setSelectedId(value);
  };

  return (
    <BasicChipsTabsForm
      onChange={onChange}
      inputList={list}
      selectedId={selectedId}
      mode="isBackground"
    />
  );
};
export const ChipsTabs = {
  render: ChipsTabsWithHooks,
};

export const Tabs = () => {
  const inputList: InputListTypes[] = [
    {
      name: 'test1',
      image: 'terms_m',
      text: 'Label',
      labelSize: 'large',
    },
    {
      name: 'test1',
      image: 'terms_m',
      text: 'Label',
      labelSize: 'large',
    },
  ];
  const inputList2: InputListTypes[] = [
    {
      name: 'test3',
      image: 'terms_m',
      text: 'Label',
      labelSize: 'medium',
    },
    {
      name: 'test3',
      image: 'terms_m',
      text: 'Label',
      labelSize: 'medium',
    },
    {
      name: 'test3',
      image: 'terms_m',
      text: 'Label',
      labelSize: 'medium',
    },
  ];
  const inputList3: InputListTypes[] = [
    {
      name: 'test4',
      image: 'terms_m',
      text: 'Label',
      labelSize: 'small',
    },
    {
      name: 'test4',
      image: 'terms_m',
      text: 'Label',
      labelSize: 'small',
    },
    {
      name: 'test4',
      image: 'terms_m',
      text: 'Label',
      labelSize: 'small',
    },
    {
      name: 'test4',
      image: 'terms_m',
      text: 'Label',
      labelSize: 'small',
    },
  ];
  const inputList4: InputListTypes[] = [
    {
      name: 'test5',
      image: 'terms_m',
      text: 'Testlabel x x',
      labelSize: 'auto',
    },
    {
      name: 'test5',
      image: 'terms_m',
      text: 'Lorem ipsum lorem ipsum',
      labelSize: 'auto',
    },
  ];
  return (
    <>
      <StoriesWrapper>
        <h1>Tab / Basic</h1>
        <BasicTabsWithHooks inputList={inputList} />
        <BasicTabsWithHooks inputList={inputList2} />
        <BasicTabsWithHooks inputList={inputList3} />
      </StoriesWrapper>
      <StoriesWrapper>
        <h1>Tab / Chips</h1>
        <ChipsTabsWithHooks inputList={inputList} />
        <ChipsTabsWithHooks inputList={inputList2} />
        <ChipsTabsWithHooks inputList={inputList3} />
        <ChipsTabsWithHooks inputList={inputList4} />
      </StoriesWrapper>
    </>
  );
};

export default {
  title: 'Atoms/Tabs',
  component: Tabs,
  subcomponents: { BasicTabs, ChipsTabs },
};
