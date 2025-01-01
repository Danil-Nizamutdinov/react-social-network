import { AxiosResponse } from "axios";
import { api, apiDefault } from "./index";
import { AuthResponse, User } from "@src/types/main";

const authApi = {
  async login(
    login: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    try {
      return api.post<AuthResponse>("/user/login", { login, password });
    } catch (error) {
      console.log(error);
    }
  },

  async registration(
    login: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    try {
      return api.post<AuthResponse>("/user/registration", { login, password });
    } catch (error) {
      console.log(error);
    }
  },

  async logout(): Promise<void> {
    try {
      return api.post("/user/logout");
    } catch (error) {
      console.log(error);
    }
  },
  async refresh(): Promise<AxiosResponse<AuthResponse>> {
    try {
      return apiDefault.get<AuthResponse>("/user/refresh");
    } catch (error) {
      console.log(error);
    }
  },
  async getUsers(login: string): Promise<AxiosResponse<User[]>> {
    try {
      return api.get<User[]>("/user/users", {
        params: {
          login: login,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default authApi;
