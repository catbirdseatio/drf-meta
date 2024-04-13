import { IUser } from "../../@types/auth";
import APIClient, { axiosInstance } from "../APIClient";

export default new APIClient<IUser>("/accounts/users/me", axiosInstance);
