import APIClient, { axiosInstance } from "./APIClient";

export interface Hello {
  message: string;
  }
  
  export default new APIClient<Hello>('/', axiosInstance);