export type RegisterSchema = {
  phone_number: string;
};

export type ObtainRequestSchema = {
  phone_number: string;
  password: string;
};

export type ObtainResponseSchema = {
  access: string;
  refresh: string;
};
