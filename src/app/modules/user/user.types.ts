export type TUserPayload = {
  userName: string;
  email: string;
  password: string;
  role: string;
  id: string;
};

export type TUserLoginPayload = {
  email: string;
  password: string;
};
