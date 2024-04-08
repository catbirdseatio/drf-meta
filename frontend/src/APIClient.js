import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL,
});

// Add a request interceptor to attach the token to outgoing requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is due to an expired token
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Call your endpoint to refresh the token
      const refresh = localStorage.getItem("refresh");
      try {
        const response = await axios.post(`${baseURL}/accounts/jwt/refresh`, {
          refresh,
        });

        // If refresh successful, update tokens and retry original request
        localStorage.setItem("access", response.data.access);
        originalRequest.headers.Authorization = `JWT ${response.data.access}`;
        return axios(originalRequest);
      } catch (error) {
        // If refresh fails, redirect to login or handle as needed
        console.error("Token refresh failed:", error);
        localStorage.clear();
      }
    }
    return Promise.reject(error);
  }
);

export default class APIClient {
  get = (endpoint) => axiosInstance.get(endpoint);

  post = (endpoint, data) => axiosInstance.post(endpoint, data);

  login = async (email, password) => {
    // Login to user with the login endpoint. Successful login adds the
    // JWT tokens in localstorage and returns true; unsuccessful login returns
    // false.
    try {
      const { data } = await this.post("accounts/jwt/create", {
        email,
        password,
      });
      
      const { refresh, access } = data;
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("access", access);
      return true;
    } catch (error) {
      if (error.request.status === 401) return false;
      else return false;
    }
  };

  isAuthenticated = () => localStorage.getItem("access") !== null;

  logout = () => localStorage.clear();
}
