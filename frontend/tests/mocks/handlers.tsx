import { http, HttpResponse } from 'msw';
import { ILogin, ITokenStorage } from "./../../src/@types/auth"


export const handlers = [
  http.post<{}, ILogin, ITokenStorage, "http://127.0.0.1:8000/api/accounts/jwt/create">("http://127.0.0.1:8000/api/accounts/jwt/create", () => {
    return HttpResponse.json({
      'access': 'msw-access-token',
      'refresh': 'msw-refresh-token'
    })
  }),
  http.post<{}, ILogin, any, "http://127.0.0.1:8000/api/accounts/users/">(
    "http://127.0.0.1:8000/api/accounts/users/", () => {
      return HttpResponse.json({
        email: "user@example.com",
        id: 1
      }, {status: 201})
    }),
  http.get("http://127.0.0.1:8000/api/accounts/users/me", () => {
    return HttpResponse.json({
      email: "testuser@email.com",
      id: 1
    })
  })
];
