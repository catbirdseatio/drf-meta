import APIClient, { axiosInstance } from "../APIClient";
import { ILogin } from "../../@types/auth";

  
  export default new APIClient<ILogin>('/accounts/users/', axiosInstance);