import { z, ZodType } from "zod";

export interface IUser {
    id:number;
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
}


export const UserSchema: ZodType<ILogin> = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});