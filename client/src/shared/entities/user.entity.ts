export type User = {
  id: string; // uuid
  email: string; // email
  password?: string; // hashing password(optional in client)
};
