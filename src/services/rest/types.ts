export type ResponseError = {
  errorMessage?: string;
  errorStatus?: number | null;
};

export type ResponseSuccess<T> = T & {
  isSuccess: true;
};

export type Response<T> = Promise<ResponseError | ResponseSuccess<T>>;

export type ResetPassword = {
  email: string;
  password: string;
  otp: string;
  token: string;
};
export type VerifyPasswordOtp = {
  email: string;
  otp: string;
  token: string;
};

export type NonNoumenaSignupPayload = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  guestToken: string;
  token: string;
};
