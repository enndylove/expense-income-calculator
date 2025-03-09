export type AuthSignInResponseQuery = {
  access_token: string; // JWT_TOKEN
};

export type AuthSignUpResponseQuery = {
  email: string; // email,
  password: string; // hashing password
};
