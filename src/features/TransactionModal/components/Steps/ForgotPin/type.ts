export type TPayLoad = {
  securityQuestion: (TSecurityQuestion | null | undefined)[];
  passCode: string;
};

export enum InternalStates {
  RESET_PIN_ANSWER = 'RESET_PIN_ANSWER',
  RESET_PIN_NEW_PIN = 'RESET_PIN_NEW_PIN',
  RESET_PIN_DONE = 'RESET_PIN_DONE',
}

export type TSecurityQuestion = {
  id: string;
  answer: string;
};
