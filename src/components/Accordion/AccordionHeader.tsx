import React from 'react';

import { TSpan } from '@/components/Typography';
import { type FontType } from '@/components/Typography/Typography';
import {
  AccordionHeaderContainer,
  AccordionTitleContainer,
  AccordionRightContainer,
  AccordionRightIcon,
  AccordionDropDownIcon,
} from './styles';
import { type AccordionProps } from './types';

interface Props
  extends Pick<
    AccordionProps,
    'title' | 'subtitle' | 'left' | 'right' | 'disabled' | 'isBoldTitle'
  > {
  uid: string;
  expanded?: boolean;
  headerGap?: number;
  padding?: string;
  onClick: () => void;
  onKeyDown: (ev: React.KeyboardEvent) => void;
  titleFont?: FontType;
}

export const AccordionHeader: React.FC<Props> = ({
  uid,
  title,
  isBoldTitle,
  headerGap,
  subtitle,
  expanded,
  disabled,
  left,
  padding,
  right,
  onClick,
  onKeyDown,
  titleFont,
}) => (
  <AccordionHeaderContainer
    id={`AccordionHeader_${uid}`}
    data-testid="accordion-heading"
    data-element="accordion-title-container"
    role="button"
    aria-expanded={expanded}
    aria-controls={`AccordionContent_${uid}`}
    tabIndex={0}
    gap={headerGap}
    disabled={disabled}
    expanded={expanded}
    onClick={onClick}
    onKeyDown={onKeyDown}
    padding={padding}
  >
    {!!left && left}
    <AccordionTitleContainer>
      <TSpan
        font={titleFont || (isBoldTitle ? 'body-l-bold' : 'body-l')}
        colorToken="--text-tablecell-header-neutral-highlighted"
        overflow="ellipsis"
      >
        {title}
      </TSpan>
      {!!subtitle &&
        (typeof subtitle === 'string' ? (
          <TSpan
            font="body-s"
            colorToken="--text-tablecell-header-neutral-default"
          >
            {subtitle}
          </TSpan>
        ) : (
          subtitle
        ))}
    </AccordionTitleContainer>
    <AccordionRightContainer>
      {!!right && (
        <AccordionRightIcon
          data-testid="accordion-right-icon"
          data-element="accordion-right-icon"
        >
          {right}
        </AccordionRightIcon>
      )}
      <AccordionDropDownIcon
        data-testid="accordion-dropdown-icon"
        data-element="accordion-icon"
        expanded={expanded}
        name="chevron_small_down_m"
        size={24}
        color="--icon-tablecell-neutral-highlighted"
      />
    </AccordionRightContainer>
  </AccordionHeaderContainer>
);
