export enum EStates {
  PAYEE_DETAILS = 'PAYEE_DETAILS',
  PAYEE_CONFRIM = 'PAYEE_CONFRIM',
}

export interface PayeeFormvalues {
  name: string;
  routingNumber: string;
  accountNumber: string;
}
