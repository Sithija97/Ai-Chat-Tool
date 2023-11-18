export type registerInputs = {
  name: string;
  email: string;
  password: string;
};

export type loginInputs = { email: string; password: string };

export type loginWithGoogleInputs = {
  name: string;
  email: string;
  photo: string;
  authMethod: string;
};

export type userUpdateInputs = {
  name?: string;
  photo?: string;
};

export type changePasswordInputs = {
  oldPassword: string;
  password: string;
};

export type IUser = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  authMethod: string;
};

export type initialAuthState = {
  user: IUser | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
};
