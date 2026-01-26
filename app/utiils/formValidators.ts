import { UserRegisterPayload } from "../AppTypes";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRegisterForm(data: UserRegisterPayload): string | null {
  const { name, email, password, confirmPassword } = data;

  if (!name.trim()) {
    return "Name is required";
  }
  if (name.trim().length < 2) {
    return "Name must be at least 2 characters";
  }

  if (!email.trim()) {
    return "Email is required";
  }
  if (!emailRegex.test(email.trim())) {
    return "Email format is invalid";
  }

  if (!password) {
    return "Password is required";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  return null;
}