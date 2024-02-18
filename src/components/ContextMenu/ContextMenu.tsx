import { useCallback, useRef, useState } from 'react';
import { Button } from '@/components/Button';
import {
  Dropdown,
  type DropdownProps,
  type DropdownTargetProps,
  type DropdownValueType,
} from '@/components/Dropdown';
import { Spinner } from '@/components/Spinner';
import { TSpan } from '@/components/Typography';
import { Spacer, Stack } from '@/layout';
import { useClickOutside } from '@/hooks';
import S from './styles';

interface ContextMenuTargetProps<TargetRef extends HTMLElement = HTMLElement>
  extends DropdownTargetProps<TargetRef> {
  open: () => void;
  close: () => void;
}

export type ContextMenuProps<
  ValueType = string,
  TargetRef extends HTMLElement = HTMLElement,
> = Pick<DropdownProps<ValueType, TargetRef>, 'containerWidth' | 'isMobile'> & {
  children: (props: ContextMenuTargetProps<TargetRef>) => JSX.Element;
  menuOptions: DropdownValueType<ValueType>[];
  loading?: boolean;
  onClick?: (value: ValueType) => void;
};

export const ContextMenu = <
  ValueType extends string,
  TargetRef extends HTMLElement = HTMLElement,
>({
  children,
  menuOptions,
  loading,
  isMobile,
  onClick,
  ...dropdownProps
}: ContextMenuProps<ValueType, TargetRef>) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useClickOutside(ref, true, () => setIsOpen(false));

  const handleClick = (value: DropdownValueType<ValueType>) => {
    if (onClick) {
      value.onClick?.();
      onClick(value.value);
    }
    toggle();
  };

  const optionsRenderer = () => {
    if (loading) {
      return (
        <S.SpinnerWrapper>
          <Spinner />
        </S.SpinnerWrapper>
      );
    }

    return (
      <Stack
        ref={ref}
        padding={isMobile ? 16 : 0}
        gap={isMobile ? 16 : 0}
        vertical
        overflow="hidden"
        fullWidth
        align="stretch"
      >
        {isMobile ? (
          <>
            {menuOptions.map((value) => (
              <Button
                key={value.value}
                size="full"
                intent={value.intent === 'danger' ? 'negative' : undefined}
                icon={value.icon ?? undefined}
                disabled={value.disabled}
                onClick={() => handleClick(value)}
              >
                {value.label}
              </Button>
            ))}
            <Spacer height={14} />
          </>
        ) : (
          menuOptions.map((value) => (
            <S.OptionContainer
              key={value.value}
              onClick={(e) => {
                e.stopPropagation();
                handleClick(value);
              }}
            >
              {value.icon}
              <TSpan
                font="body-m-bold"
                colorToken={
                  value.intent === 'danger'
                    ? '--text-tablecell-header-danger-primary-highlighted'
                    : value.intent === 'brand-primary'
                    ? '--text-tablecell-header-brand-primary-default'
                    : undefined
                }
              >
                {value.label}
              </TSpan>
            </S.OptionContainer>
          ))
        )}
      </Stack>
    );
  };

  return (
    <Dropdown<ValueType, TargetRef>
      {...dropdownProps}
      isOpen={isOpen}
      placement="auto"
      isAnimation={false}
      calRefTop={false}
      padding="0px"
      onSelectOption={() => {}}
      options={menuOptions}
      optionsRenderer={optionsRenderer}
      isMobile={isMobile}
      renderContainerFromBottom
    >
      {(dropdownRenderProps) =>
        children({
          ...dropdownRenderProps,
          toggle,
          open: () => setIsOpen(true),
          close: () => setIsOpen(false),
        })
      }
    </Dropdown>
  );
};
