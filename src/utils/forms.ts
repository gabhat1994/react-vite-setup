import {
  type ControllerFieldState,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

interface ErrorProps {
  error?: boolean;
  helperText?: string;
}

function getErrorPropsWhen(
  errorChecker: (fieldState: ControllerFieldState) => boolean,
) {
  function propsMaker(
    fieldState: ControllerFieldState,
    defaultHelperText?: string,
  ): ErrorProps {
    const hasError = errorChecker(fieldState);
    return {
      error: hasError,
      helperText: hasError ? fieldState.error?.message : defaultHelperText,
    };
  }

  return propsMaker;
}

export const getErrorProps = getErrorPropsWhen((state) => !!state.error);
export const getTouchedErrorProps = getErrorPropsWhen(
  (state) => !!state.error && state.isTouched,
);
export const numberTransformer = {
  fieldProps: <Values extends FieldValues, TName extends FieldPath<Values>>(
    props: ControllerRenderProps<Values, TName>,
  ) => ({
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      const eventValue = !Number.isNaN(Number(event.target.value))
        ? Number(event.target.value)
        : undefined;

      if (Number.isNaN(eventValue)) {
        return props.onChange(undefined);
      }
      return props.onChange(eventValue);
    },
    value: `${props.value ?? ''}`,
  }),
};
