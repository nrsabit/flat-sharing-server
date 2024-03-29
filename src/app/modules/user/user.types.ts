export type TUserPayload = {
  name: string;
  email: string;
  password: string;
  bio: string;
  profession: string;
  address: string;
};

export type TUserLoginPayload = {
  email: string;
  password: string;
};
