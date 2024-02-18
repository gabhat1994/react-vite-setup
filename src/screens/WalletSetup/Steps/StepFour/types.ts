export enum EPinCodeStates {
  SETTING_THE_PIN = 'SETTING_THE_PIN',
  CONFIRMING_THE_PIN = 'CONFIRMING_THE_PIN',
}

export const PIN_CODE_LENGTH = 6;

export interface PassCodeProps {
  /*
  Screen heading while setting up the pin
 */
  setupPinMainHeading: string;
  /*
  Screen heading while confirming up the pin
 */
  confirmPinMainHeading: string;
  /*
  Sub heading
 */
  subHeading: string;

  /*
  Callback function for on click of back button (typically to go to previous screen)
  */
  onBackButtonClick: () => void;
  /*
  Callback function for on click of continue button (typically to go to next screen)
  */
  onContinueButtonClick: () => void;
  /*
  Callback function for getting the passcode after successfull confrimation 
  */
  onPassCodeConfirm: (passCode: string) => void;

  isMobile?: boolean;

  loadingState?: boolean;
}
