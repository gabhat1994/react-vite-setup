// Avoid retrying of below operations for Payments feature, retrying the operation is breaking the flow

const operationsToBeRistrictedForRetrying = [
  'createPayment',
  'verifyMicroDepositDwolla',
];

export default operationsToBeRistrictedForRetrying;
