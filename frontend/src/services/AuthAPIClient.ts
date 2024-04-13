import { AxiosInstance, AxiosResponse } from "axios";
import APIClient from "./APIClient";
import { ILogin, ITokenStorage } from "../@types/auth";


class AuthAPIClient extends APIClient<ITokenStorage> {
  constructor(endpoint: string, axiosInstance: AxiosInstance) {
    super(endpoint, axiosInstance);
  }

  async login(credentials: ILogin): Promise<ITokenStorage> {
    try {
      const response: AxiosResponse<ITokenStorage> = await this.axiosInstance.post<ITokenStorage>(this.endpoint, credentials);
      return response.data;
    } catch (error) {
      // Handle error
      console.error("POST request error:", error);
      throw error;
    }
  }
   
}

export default AuthAPIClient;
