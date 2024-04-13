import {axiosInstance} from "../APIClient";
import AuthAPIClient from "../AuthAPIClient";


export default new AuthAPIClient("/accounts/jwt/create", axiosInstance);