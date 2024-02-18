import {
  forwardRef,
  useState,
  useEffect,
  type ChangeEvent,
  useRef,
  useCallback,
} from 'react';
import {
  HelperText,
  LengthHelperText,
  RightIcon,
  StyledTextArea,
  TextAreaContainer,
} from './styles';
import { type FieldValue, type ITextArea } from './types';

export const TextArea = forwardRef<HTMLTextAreaElement, ITextArea>(
  (props, ref) => {
    const {
      id,
      label,
      disabled = false,
      noBorder,
      error = false,
      resize = true,
      value,
      helperText,
      onChange,
      maxLength,
      maxLengthPosition,
      autoResize = false,
      maxHeight,
      lineHeight,
      showMaxLengthText = true,
      showScroll,
      hasRightIcon,
      rightIcon,
      ...rest
    } = props;
    const [fieldValue, setFieldValue] = useState<FieldValue>(value);
    const [contentHeight, setContentHeight] = useState<number | undefined>(56);
    const areaRef = useRef<HTMLDivElement>(null);

    const resizeHandler = useCallback(() => {
      setContentHeight(0);
      const { current } = areaRef;
      setContentHeight(current?.firstElementChild?.scrollHeight);
    }, []);

    useEffect(() => {
      setFieldValue(value);
    }, [value]);

    useEffect(() => {
      const { current } = areaRef;
      if (current && autoResize) {
        current.addEventListener('change', resizeHandler);
        current.addEventListener('keydown', resizeHandler);
        current.addEventListener('paste', resizeHandler);
      }
      return () => {
        if (current && autoResize) {
          current.removeEventListener('change', resizeHandler);
          current.removeEventListener('keydown', resizeHandler);
          current.removeEventListener('paste', resizeHandler);
        }
      };
    }, [autoResize, resizeHandler]);

    const onValueChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      resizeHandler();

      setFieldValue(e.target.value);
      if (onChange) onChange(e);
    };

    useEffect(() => {
      if (!value) setContentHeight(0);
    }, [contentHeight, value]);

    return (
      <TextAreaContainer>
        <StyledTextArea
          data-testid="Styled-TextArea"
          value={value ?? fieldValue}
          error={error}
          disabled={disabled}
          label={label}
          resize={resize}
          ref={areaRef}
          autoResize={autoResize}
          noBorder={noBorder}
          showScroll={showScroll}
          maxHeight={maxHeight}
          lineHeight={lineHeight}
          hasRightIcon={hasRightIcon}
        >
          <textarea
            data-testid="TextArea"
            ref={ref}
            id={id}
            disabled={disabled}
            value={fieldValue}
            onChange={onValueChange}
            {...rest}
            maxLength={maxLength}
            style={{
              height:
                contentHeight && !Number.isNaN(+contentHeight)
                  ? `${contentHeight}px`
                  : 'auto',
              overflow:
                (contentHeight ?? 0) < (maxHeight ?? 0) ? 'hidden' : 'auto',
            }}
            rows={autoResize ? 1 : 3}
          />

          {rightIcon && <RightIcon>{rightIcon}</RightIcon>}

          <fieldset>
            <legend>
              <span>{label}</span>
            </legend>
          </fieldset>
          <label data-testid="labelTestId" htmlFor={id}>
            {label}
          </label>
        </StyledTextArea>
        <HelperText
          data-testid="pTestId"
          error={error}
          disabled={disabled}
          position={maxLengthPosition}
        >
          {helperText ?? ''}{' '}
          {showMaxLengthText && typeof maxLength === 'number' && (
            <LengthHelperText
              error={String(value || '').length > maxLength}
            >{`${String(value || '').length}/${maxLength}`}</LengthHelperText>
          )}
        </HelperText>
      </TextAreaContainer>
    );
  },
);
export default TextArea;
