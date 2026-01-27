/* APP */
export type ToastStatus = "success" | "error" | "info";

export type Toast = {
  message: string;
  status: ToastStatus;
  show: boolean;
};

export type ApiResponse = {
  message?: string;
  error?: string;
  user?: User;
  token?: string;
  status?: number;
};

/* USER */
export type User = {
  id?: string;
  name: string;
  email: string;
  password: string;
};

export type UserRegisterPayload = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type UserAuth = {
  email: string;
  password: string;
};

export type UserAuthenticated = {
  id: string;
  name: string;
  email: string;
}
