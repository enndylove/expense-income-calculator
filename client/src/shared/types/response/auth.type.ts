export type AuthSignInResponseQuery = {
  message: string;
  statusCode: number; // http code
};

export type AuthSignUpResponseQuery = {
  email: string; // email,
  password: string; // hashing password
};

export type AuthDecoderResult = {
  id: string; // uuid
  email: string; //uuid
};
