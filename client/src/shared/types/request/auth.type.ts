export type AuthSignInRequestQuery = {
  email: string;
  password: string;
};

export type AuthVerifyRequestQuery = {
  code: string;
}

export type AuthSignUpRequestQuery = {
  email: string;
  password: string;
};
