import { useState, useMemo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import generate from 'uniqid';
import * as fc from 'fast-check';
import styled from 'styled-components';
import { CountryCodePicker } from '@/components/PhoneInput/CountryCodePicker';
import { useWindowDimensions } from '@/hooks';

import { TextField } from '../TextField';
import { Icon } from '../Icon';
import { Flag } from '../Flag';
import { Dropdown, type DropdownTargetProps, type DropdownValueType } from '.';

export default {
  title: 'Atoms/Dropdown',
  component: Dropdown,
};

const Container = styled.div`
  width: 100%;
`;
const DropdownPicker = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const DropDownRightIcon = styled(Icon)<{ isOpen?: boolean }>`
  transition: transform 0.3s;
  ${({ isOpen }) => isOpen && 'transform: rotate(180deg)'};
`;

const optionsArbitary = fc
  .set(fc.lorem(), { minLength: 5, maxLength: 20 })
  .chain((strs) => {
    const label = fc.constantFrom(...strs);
    return fc.record({
      key: fc.constant(generate()),
      label,
      type: fc.constant('value' as const),
      value: label,
      description: fc.constant('Explanation' as const),
    });
  });

const options: DropdownValueType<string>[] = fc.sample(optionsArbitary, 30);
export const SimpleButton = () => (
  <Container>
    <Dropdown
      hideIcons
      options={options}
      usePortal={false}
      containerWidth="440px"
    >
      {({ targetProps, targetRef }: DropdownTargetProps<HTMLDivElement>) => (
        <>
          <DropdownPicker key="123" ref={targetRef} {...targetProps}>
            Click Me 1
          </DropdownPicker>
        </>
      )}
    </Dropdown>
  </Container>
);

export const MultiSelect = () => {
  const { t } = useTranslation();
  const dimensions = useWindowDimensions();
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectOptions, setSelectOptions] = useState(
    options.map((option) => ({
      ...option,
      selected: !!option.label && selected.includes(String(option.label)),
    })),
  );
  const [width, setWidth] = useState<number>(0);

  const clearSelection = () => {
    setSearch('');
    setSelected([]);
  };

  const handleChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    if (!value.trim()) setSelected([]);
    setSearch(value.trim());
  };

  const handleSelect = (option: DropdownValueType<string>) => {
    if (option.label) {
      if (selected.includes(String(option.label))) {
        setSelected(selected.filter((s) => s !== String(option.label)));
      } else {
        setSelected([...selected, String(option.label)]);
      }
    }
  };

  useEffect(() => {
    setSelectOptions(
      options
        .filter((option) => String(option.label).includes(search.trim()))
        .map((option) => ({
          ...option,
          selected: !!option.label && selected.includes(String(option.label)),
        })),
    );
  }, [search, selected]);

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.clientWidth);
    }
  }, [containerRef, dimensions]);

  return (
    <Container ref={containerRef}>
      <Dropdown
        multiselect
        inputValue={selected.join(', ')}
        options={selectOptions}
        onSelectOption={(option) => handleSelect(option)}
        closeOnSelect={false}
        usePortal={false}
        containerWidth={`${width}px`}
        hideIcons
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      >
        {({ inputProps, inputRef, toggle }) => (
          <TextField
            disabled={inputProps.disabled || selected.length > 0}
            ref={inputRef}
            {...inputProps}
            value={selected.length ? selected.join(', ') : search}
            onChange={handleChange}
            label={t('noumena.dropdown.select_value.text')}
            spellCheck="false"
            isAlwaysFocus={isOpen}
            rightIcon={
              !inputProps.disabled && (selected.length > 0 || search) ? (
                <Icon
                  name="clear_m"
                  size={24}
                  onClick={clearSelection}
                  color="--icon-input-brand-primary-default"
                />
              ) : (
                <DropDownRightIcon
                  name="chevron_down_m"
                  size={16}
                  isOpen={isOpen}
                  onClick={toggle}
                  color="--icon-button-neutral-default"
                />
              )
            }
            rightIconColor="var(--icon-input-brand-primary-default)"
          />
        )}
      </Dropdown>
    </Container>
  );
};

export const Select = () => {
  const { t } = useTranslation();
  const dimensions = useWindowDimensions();
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const selectedOption = useMemo(
    () => options.find((_option) => _option.value === selected),
    [selected],
  );

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.clientWidth);
    }
  }, [containerRef, dimensions]);

  return (
    <Container ref={containerRef}>
      <Dropdown
        hideIcons
        inputValue={(selectedOption?.label as string) ?? ''}
        options={options}
        usePortal={false}
        containerWidth={`${width}px`}
        onSelectOption={(option) => {
          setSelected(option.value);
        }}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      >
        {({ inputProps, inputRef, toggle }) => (
          <TextField
            ref={inputRef}
            {...inputProps}
            label={t('noumena.dropdown.select_value.text')}
            rightIcon={
              <DropDownRightIcon
                name="chevron_down_m"
                size={16}
                isOpen={isOpen}
                onClick={toggle}
                color="--icon-button-neutral-default"
              />
            }
          />
        )}
      </Dropdown>
    </Container>
  );
};

const optionsWithIcons: DropdownValueType<string>[] = fc
  .sample(optionsArbitary, 30)
  .map((option, index) => ({
    ...option,
    icon: (
      <Icon
        name="placeholder_m"
        size={24}
        color="--icon-tablecell-neutral-highlighted"
      />
    ),
    intent: index % 5 !== 0 ? 'default' : 'danger',
  }));

export const SelectWithIcon = () => {
  const { t } = useTranslation();
  const dimensions = useWindowDimensions();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string>('');

  const selectedOption = useMemo(
    () => optionsWithIcons.find((_option) => _option.value === selected),
    [selected],
  );

  const onInputChange = (val: string) => {
    setSearch(val);
    if (val.length === 0) setSelected(undefined);
  };

  const clearSelection = () => {
    setSearch('');
    setSelected(undefined);
  };

  useEffect(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.clientWidth);
    }
  }, [containerRef, dimensions]);

  return (
    <Container ref={containerRef}>
      <Dropdown
        inputValue={(selectedOption?.label as string) ?? ''}
        options={optionsWithIcons}
        usePortal={false}
        onInputChange={onInputChange}
        containerWidth={`${width}px`}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        onSelectOption={(option) => {
          setSelected(option.value);
          setSearch(String(option.label));
        }}
      >
        {({ inputProps, inputRef, toggle }) => (
          <TextField
            ref={inputRef}
            {...inputProps}
            onChange={(e) => onInputChange(e.target.value)}
            value={search}
            label={t('noumena.dropdown.select_value.text')}
            spellCheck="false"
            rightIcon={
              search ? (
                <Icon
                  name="clear_m"
                  size={24}
                  onClick={clearSelection}
                  color="--icon-input-brand-primary-default"
                />
              ) : (
                <DropDownRightIcon
                  name="chevron_down_m"
                  size={16}
                  isOpen={isOpen}
                  onClick={toggle}
                  color="--icon-button-neutral-default"
                />
              )
            }
            rightIconColor="var(--icon-input-brand-primary-default)"
          />
        )}
      </Dropdown>
    </Container>
  );
};

const optionsWithFlag: DropdownValueType<string>[] = fc
  .sample(optionsArbitary, 30)
  .map((option) => ({
    ...option,
    icon: <Flag flag="flag_us" size={24} />,
  }));

export const SelectWithFlag = () => {
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [, setCountryCode] = useState<string>();

  const selectedOption = useMemo(
    () => optionsWithFlag.find((_option) => _option.value === selected),
    [selected],
  );

  return (
    <Dropdown
      inputValue={(selectedOption?.label as string) ?? ''}
      options={optionsWithFlag}
      onSelectOption={(option) => {
        setSelected(option.value);
      }}
    >
      <CountryCodePicker onCountryCodeChange={(v) => setCountryCode(v)} />
    </Dropdown>
  );
};
