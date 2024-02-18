import { type Property } from 'csstype';
import React from 'react';
import { type CSSProperties } from 'styled-components';
import { Icon } from '../Icon';
import { type Icons } from '../Icon/Icon';
import {
  Dot,
  InputRadio,
  StyledText,
  TabsContainer,
  Wrapper,
} from './Tabs.styles';

type Props = {
  name: string;
  text: string | React.ReactElement;
  isActive: boolean;
  isBackground?: boolean;
  image?: keyof typeof Icons;
  isWithoutImage?: boolean;
  iconSize?: number;
  id: string;
  labelSize: 'small' | 'medium' | 'large' | 'auto';
  handleSetUnderlineWidth: (val: number) => void;
  fontSize: string;
  fullWidth?: boolean;
  tabWidth?: string;
  isUnderline?: boolean;
  textFont?: string;
  showDot?: boolean;
  dotColor?: string;
  tabCSS?: CSSProperties;
  isActiveBackgroundOnly?: boolean;
  maxHeight?: Property.MaxHeight;
  justifyContent?: Property.JustifyContent;
};

const BasicChipsTabs = ({
  name,
  text,
  isActive,
  isBackground = false,
  isWithoutImage = false,
  iconSize = 24,
  image,
  id,
  labelSize,
  fontSize,
  fullWidth,
  tabWidth,
  handleSetUnderlineWidth,
  isUnderline = false,
  textFont,
  showDot = false,
  dotColor,
  tabCSS,
  isActiveBackgroundOnly = false,
  maxHeight,
  justifyContent,
}: Props) => (
  <Wrapper
    isActive={isActive}
    ref={(ref) => {
      if (ref && isActive) {
        handleSetUnderlineWidth(ref.offsetWidth);
      }
    }}
    fullWidth={fullWidth}
    tabWidth={tabWidth}
    style={tabCSS}
    justifyContent={justifyContent}
  >
    <TabsContainer
      isActive={isActive}
      size={labelSize}
      isBackground={isBackground}
      isUnderline={isUnderline}
      isActiveBackgroundOnly={isActiveBackgroundOnly}
      maxHeight={maxHeight}
    >
      {!isWithoutImage && (
        <Icon
          name={image}
          color={
            isActive
              ? '--text-tab-basic-brand-primary-selected'
              : isActiveBackgroundOnly
              ? 'unset'
              : '--text-tab-basic-neutral-default'
          }
          size={iconSize}
        />
      )}
      <InputRadio
        isActive={isActive}
        id={id}
        type="radio"
        name={name}
        data-testid={`tab-${id}`}
      />
      <StyledText
        isActive={isActive}
        isWithoutImage={isWithoutImage}
        fontSize={fontSize}
        isChips={!isUnderline}
        font={textFont}
      >
        {text}
      </StyledText>
    </TabsContainer>
    {showDot && <Dot dotColor={dotColor} />}
  </Wrapper>
);
export default BasicChipsTabs;
