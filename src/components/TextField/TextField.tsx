import { forwardRef, useState, useEffect } from 'react';

import { getMaskedString } from '@/utils/strings';
import { EMPTY_SPACE_REGEX } from '@/constants/regex';
import {
  type FieldValue,
  HelperText,
  LeftIcon,
  LengthHelperText,
  RightIcon,
  StyledTextField,
  Container,
  Prefix,
  Suffix,
} from './styles';
import { type ITextField } from './types';
import { ALPHANUMERIC_REGEX, INTEGER_REGEX } from './utils';

export const TextField = forwardRef<HTMLInputElement, ITextField>(
  (props, ref) => {
    const {
      id,
      label,
      inputMask,
      disabled = false,
      spellCheck = true,
      numberOnly = false,
      integerOnly = false,
      onlyAlphanumeric = false,
      isCurrency = false,
      noBorder,
      isAlwaysFocus,
      inputSize,
      leftIcon,
      rightIcon,
      rightIconColor,
      error = false,
      value,
      helperText,
      onChange,
      maxLength,
      hideLengthHelperText = false,
      helperTextAbsolute = false,
      fullWidth = true,
      centerHelperText = false,
      hideLeftIconPlace = false,
      prefix,
      suffix,
      disabledIconColor = true,
      readOnly,
      blockEmptySpaces,
      ...rest
    } = props;
    const [fieldValue, setFieldValue] = useState<FieldValue>(value);

    useEffect(() => {
      setFieldValue(value);
    }, [value]);

    const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const processedVal = getMaskedString(e.target.value, inputMask);

      if (blockEmptySpaces && EMPTY_SPACE_REGEX.test(processedVal)) {
        return;
      }

      if (
        onlyAlphanumeric &&
        !!processedVal &&
        !processedVal.match(ALPHANUMERIC_REGEX)
      )
        return;

      if (integerOnly && processedVal && !INTEGER_REGEX.test(processedVal)) {
        return;
      }

      if (numberOnly && Number.isNaN(+processedVal)) {
        return;
      }
      if (
        isCurrency &&
        Number.isNaN(+processedVal.replaceAll(',', '').replaceAll('$', ''))
      )
        return;
      if (!processedVal.replace(/\s/g, '')) {
        setFieldValue('');
      } else {
        setFieldValue(processedVal);
      }
      if (inputMask) {
        e.target.value = processedVal;
      }
      if (onChange) onChange(e);
    };

    const shouldDisplayHelperText =
      !!helperText || (!hideLengthHelperText && !!maxLength);

    return (
      <Container fullWidth={fullWidth} centerHelperText={centerHelperText}>
        <StyledTextField
          data-testid="Styled-TextField"
          inputSize={inputSize}
          isAlwaysFocus={isAlwaysFocus}
          value={fieldValue ?? value ?? undefined}
          error={error}
          disabled={disabled}
          leftIcon={!!leftIcon}
          rightIcon={!!rightIcon}
          label={label}
          noBorder={noBorder}
          prefix={prefix}
          suffix={suffix}
          hideLeftIconPlace={hideLeftIconPlace}
          disabledIconColor={disabledIconColor}
        >
          {leftIcon && <LeftIcon>{leftIcon}</LeftIcon>}
          {rightIcon && (
            <RightIcon iconColor={rightIconColor}>{rightIcon}</RightIcon>
          )}
          {prefix && <Prefix>{prefix}</Prefix>}
          {suffix && <Suffix>{suffix}</Suffix>}
          <input
            spellCheck={spellCheck}
            ref={ref}
            id={id}
            value={fieldValue ?? undefined}
            onChange={onValueChange}
            readOnly={readOnly}
            disabled={disabled}
            maxLength={hideLengthHelperText ? maxLength : undefined}
            {...rest}
          />
          <fieldset>
            <legend>
              <span>{label}</span>
            </legend>
          </fieldset>
          <label data-testid="labelTestId" htmlFor={id}>
            {label}
          </label>
        </StyledTextField>
        {shouldDisplayHelperText && (
          <HelperText
            data-testid="pTestId"
            error={error}
            disabled={disabled}
            absolute={helperTextAbsolute}
          >
            {helperText ?? ''}{' '}
            {!hideLengthHelperText && maxLength && (
              <LengthHelperText
                error={String(value || '').length > maxLength}
              >{`${String(value || '').length}/${maxLength}`}</LengthHelperText>
            )}
          </HelperText>
        )}
      </Container>
    );
  },
);
export default TextField;
