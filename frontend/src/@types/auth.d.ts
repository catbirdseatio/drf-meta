import { z, ZodType } from "zod";

export interface IUser {
  id: number;
  email: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ITokenStorage {
  access: string | null;
  refresh: string | null;
}

export type AuthContextType = {
  user: IUser | undefined;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
};

export const UserSchema: ZodType<ILogin> = z.object({
  email: z.string().email("You must enter a valid email."),
  password: z
    .string()
    .min(5, "The password must be a minimum of 5 characters."),
});

interface IUserFormProps {
  onSubmit: (data: UserFormData) => void;
  formType: "Login" | "Register";
}
