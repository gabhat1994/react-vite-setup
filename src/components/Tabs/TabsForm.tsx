import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import generate from 'uniqid';
import { useBasicChipsTabs } from '@/components/Tabs/useTabs';
import { isInteger } from '@/utils/strings';
import {
  LeftButton,
  StyledForm,
  StyledFormContainer,
  StyledMotion,
  Underline,
} from './Tabs.styles';
import BasicChipsTabs from './TabsInput';
import { type InputListTypes, type TabsFormProps } from './types';
import { Icon } from '../Icon';

export const BasicChipsTabsForm = <TabId extends string = string>({
  inputList,
  onChange,
  selectedId,
  fullWidth,
  mode = 'isBackground',
  isWithoutImage,
  iconSize,
  fontSize = '--font-link-xlarge-size',
  tabWidth,
  animateOnLoad = true,
  isMobile = false,
  windowSize = 0,
  manualScroll = false,
  tabCSS,
  textFont,
  maxHeight,
  justifyContent,
  gap,
}: TabsFormProps<TabId>) => {
  const ref = useRef<HTMLFormElement>(null);
  const [animate, setAnimate] = useState(animateOnLoad);
  const [x, setX] = useState(0);
  const [motionWidth, setMotionWidth] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  const motionUUID: string = useMemo(() => generate(), []);
  const stepWidth = useMemo(
    () => motionWidth / inputList.length,
    [motionWidth, inputList],
  );
  const remainLeft = useMemo(() => x < 0, [x]);
  const remainRight = useMemo(
    () => Math.abs(x) < motionWidth - clientWidth,
    [x, motionWidth, clientWidth],
  );

  const { underlineWidth, underlineLeft, handleSetUnderlineWidth } =
    useBasicChipsTabs({ inputList, selectedId, windowSize, isMobile });

  const handleChangeActiveTab = (e: React.FormEvent) => {
    const value = (e.target as HTMLInputElement).id as TabId;
    const isTab = !!inputList.find((inp) => inp.id === value);
    if (isTab || isInteger(value)) {
      onChange(value);
      setAnimate(true);
    }
  };

  const handleClickLeft = useCallback(() => {
    setX(x + stepWidth);
  }, [stepWidth, x]);

  const handleClickRight = useCallback(() => {
    setX((prevX) => prevX - stepWidth);
  }, [stepWidth]);

  const handleScroll = useCallback((ev: Event) => {
    ev.preventDefault();
    ev.stopPropagation();
    setX(-(ref.current?.scrollLeft || 0));
  }, []);

  useEffect(() => {
    if (manualScroll) {
      const styledMotion = document.getElementById(motionUUID);
      if (styledMotion?.clientWidth) {
        setMotionWidth(styledMotion?.clientWidth);
      }

      if (ref.current?.clientWidth) {
        setClientWidth(ref.current.clientWidth);
      }
    }
  }, [motionUUID, x, manualScroll]);

  useLayoutEffect(() => {
    if (manualScroll) {
      ref.current?.addEventListener('scroll', handleScroll, false);
    }
  }, [manualScroll, handleScroll]);

  return (
    <StyledFormContainer manualScroll={manualScroll}>
      <LeftButton
        onClick={handleClickLeft}
        position="left"
        visible={remainLeft && manualScroll}
      >
        <Icon
          name="chevron_left_m"
          color="--icon-button-neutral-default"
          size={14}
        />
      </LeftButton>
      <LeftButton
        onClick={handleClickRight}
        position="right"
        visible={remainRight && manualScroll}
      >
        <Icon
          name="chevron_right_m"
          color="--icon-button-neutral-default"
          size={14}
        />
      </LeftButton>
      <StyledForm
        onClick={handleChangeActiveTab}
        ref={ref}
        id="styledFormTabs"
        data-testid="tabs"
        fullWidth={fullWidth}
      >
        <StyledMotion
          animate={{ x }}
          id={motionUUID}
          manualScroll={manualScroll}
          justifyContent={justifyContent}
          gap={gap}
        >
          {inputList.map((el: InputListTypes, i) => {
            const localId = el.id ? el.id.toString() : i.toString();
            return (
              <BasicChipsTabs
                key={`tab-${String(i)}`}
                id={localId}
                name={el.name}
                text={el.text}
                isActive={localId === selectedId}
                justifyContent={justifyContent}
                isBackground={mode === 'isBackground'}
                isActiveBackgroundOnly={mode === 'isActiveBackgroundOnly'}
                labelSize={el.labelSize}
                handleSetUnderlineWidth={handleSetUnderlineWidth}
                image={el.image}
                isWithoutImage={isWithoutImage}
                iconSize={iconSize}
                fontSize={fontSize}
                fullWidth={fullWidth}
                tabWidth={tabWidth}
                tabCSS={tabCSS}
                isUnderline={mode === 'isUnderline'}
                textFont={textFont}
                showDot={el.showDot}
                dotColor={el.dotColor}
                maxHeight={maxHeight}
              />
            );
          })}
          {mode === 'isUnderline' &&
            selectedId &&
            justifyContent !== 'center' && (
              <Underline
                width={underlineWidth}
                left={(isMobile ? 3 : 6) + underlineLeft}
                animate={animate}
              />
            )}
        </StyledMotion>
      </StyledForm>
    </StyledFormContainer>
  );
};

export default BasicChipsTabsForm;
