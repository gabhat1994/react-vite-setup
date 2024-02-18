export type AlertType = 'success' | 'error' | 'primary' | 'subtle';

export type AlertButtonType = 'none' | 'icon' | 'label';

export type AlertProps = {
  id: string;
  message: string;
  type: AlertType;
  buttonType?: AlertButtonType;
  autoHideTime?: number;
  autoHideDisable?: boolean;
  width?: number;
};
