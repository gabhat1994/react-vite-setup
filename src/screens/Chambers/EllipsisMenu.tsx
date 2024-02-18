import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Dropdown,
  type DropdownTargetProps,
  type DropdownValueType,
} from '@/components/Dropdown';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Spacer, Stack } from '@/layout';
import { TSpan } from '@/components/Typography';
import { Spinner } from '@/components/Spinner';
import { OptionContainer, SpinnerWrapper } from './styles';
import { type IEllipsisMenu } from './types';

const EllipsisMenu = <ValueType extends string>({
  isMobile,
  onClick,
  menuOptions,
  containerWidth,
  textOnly,
  size = 'small',
  tertiary = true,
  neutral,
  loadingLinked,
  iconColorToken = '--icon-button-neutral-default',
  placement,
}: IEllipsisMenu<ValueType>) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleClick = (value: DropdownValueType<ValueType>) => {
    if (onClick) {
      value.onClick?.();
      onClick(value.value);
    }
    toggle();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        !ref.current.contains(event.target as Node)
      ) {
        toggle();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, toggle]);

  return (
    <>
      <Dropdown
        placement={placement || 'auto'}
        onSelectOption={() => {}}
        containerWidth={containerWidth}
        isAnimation={false}
        calRefTop={false}
        onClose={() => setIsOpen(false)}
        optionsRenderer={() => (
          <>
            {!loadingLinked ? (
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
                        intent={
                          value.intent === 'danger' ? 'negative' : undefined
                        }
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
                    <OptionContainer
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
                            : undefined
                        }
                      >
                        {value.label}
                      </TSpan>
                    </OptionContainer>
                  ))
                )}
              </Stack>
            ) : (
              <SpinnerWrapper>
                <Spinner />
              </SpinnerWrapper>
            )}
          </>
        )}
        isOpen={isOpen}
        options={menuOptions}
        padding="0px"
        renderContainerFromBottom
        isMobile={isMobile}
      >
        {({ targetRef }: DropdownTargetProps<HTMLButtonElement>) => (
          <Button
            ref={targetRef}
            size={size}
            tertiary={tertiary}
            neutral={neutral}
            textOnly={textOnly}
            onClick={(event) => {
              event.stopPropagation();
              toggle();
            }}
          >
            <Icon size={24} name="more_m" color={iconColorToken} />
          </Button>
        )}
      </Dropdown>
    </>
  );
};

export default EllipsisMenu;
