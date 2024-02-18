import { type TooltipPosition } from './types';

type GetTooltipPropsParams = {
  message: string;
  visible?: boolean;
  position?: TooltipPosition;
};

const getTooltipProps = ({
  message,
  visible,
  position = 'top-center',
}: GetTooltipPropsParams) => ({
  tooltipText: visible ? message : '',
  tooltipPosition: position,
});

export const ButtonUtils = {
  getTooltipProps,
};
