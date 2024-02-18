import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useImperativeHandle,
} from 'react';
import generate from 'uniqid';

import useResizeObserver from '@/hooks/useResizeObserver';

import { AccordionHeader } from './AccordionHeader';

import { AccordionContainer, AccordionContent } from './styles';
import { type AccordionProps, type IAccordionControl } from './types';

export const Accordion = React.forwardRef<IAccordionControl, AccordionProps>(
  (
    {
      accordionRef,
      borders = ['bottom'],
      disabled,
      expanded,
      expandedOffsetBottom = 0,
      contentHeightKey,
      expandedOffsetTop = 0,
      left = null,
      offsetBottom = 0,
      offsetTop = 0,
      preExpanded,
      headerPadding,
      right,
      shadowOnExpand,
      subtitle,
      testId,
      title,
      isBoldTitle,
      titleFont,
      headerGap,
      width = '100%',
      onToggle,
      children,
    },
    controlRef,
  ) => {
    const [isInternalExpanded, setIsInternalExpanded] = useState<
      boolean | undefined
    >();

    const [contentHeight, setContentHeight] = useState<string>(
      isInternalExpanded ? 'auto' : '0',
    );

    const uid = useRef<string>(generate());
    const contentRef = useRef<HTMLDivElement>(null);

    useResizeObserver(contentRef, () => {
      setContentHeight(`${contentRef?.current?.scrollHeight || 0}px`);
    });

    useEffect(() => {
      setContentHeight(`${contentRef?.current?.scrollHeight || 0}px`);
    }, [contentHeightKey]);

    /** Set initial expand status */
    useEffect(() => {
      if (isInternalExpanded === undefined) {
        setIsInternalExpanded(preExpanded);
      }
    }, [isInternalExpanded, preExpanded]);

    const isControlled = useMemo(
      () => preExpanded === undefined && expanded !== undefined,
      [expanded, preExpanded],
    );

    const isExpanded = useMemo(
      () => (isControlled ? expanded : isInternalExpanded),
      [expanded, isControlled, isInternalExpanded],
    );

    const onChange = useCallback(() => {
      if (disabled) return;

      if (isControlled) {
        if (onToggle) onToggle(!isExpanded);
      } else {
        setIsInternalExpanded(!isInternalExpanded);
      }
    }, [disabled, isControlled, isExpanded, isInternalExpanded, onToggle]);

    const onClose = useCallback(() => {
      if (isControlled) {
        if (onToggle) onToggle(false);
      } else {
        setIsInternalExpanded(false);
      }
    }, [isControlled, onToggle]);

    const onKeyDown = useCallback(
      (ev: React.KeyboardEvent) => {
        if (disabled) return;

        if (ev.key === 'Enter' || ev.key === ' ') {
          onChange();
        } else if (ev.key === 'Escape') {
          onClose();
        }
      },
      [disabled, onChange, onClose],
    );

    useImperativeHandle(
      controlRef,
      () => ({
        toggle() {
          onChange();
        },
      }),
      [onChange],
    );

    return (
      <AccordionContainer
        ref={accordionRef}
        data-testid={testId || 'accordion'}
        data-component="accordion"
        id={`accordion_${uid.current}`}
        borders={borders}
        expanded={isExpanded}
        expandedOffsetBottom={expandedOffsetBottom}
        expandedOffsetTop={expandedOffsetTop}
        offsetBottom={offsetBottom}
        offsetTop={offsetTop}
        shadowOnExpand={shadowOnExpand}
        width={width}
      >
        <AccordionHeader
          headerGap={headerGap}
          padding={headerPadding}
          uid={uid.current}
          title={title}
          titleFont={titleFont}
          isBoldTitle={isBoldTitle}
          subtitle={subtitle}
          expanded={isExpanded}
          disabled={disabled}
          left={left}
          right={right}
          onClick={onChange}
          onKeyDown={onKeyDown}
        />
        <AccordionContent
          ref={contentRef}
          maxHeight={contentHeight}
          expanded={isExpanded}
          role="region"
          data-element="accordion-content"
          id={`AccordionContent_${uid.current}`}
          aria-labelledby={`AccordionHeader_${uid.current}`}
        >
          {children}
        </AccordionContent>
      </AccordionContainer>
    );
  },
);
