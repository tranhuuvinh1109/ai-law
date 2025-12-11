import { API_ROUTES } from "@/constants/apiRoute";
import axiosClient from "../axiosInstant";
import {
  GetUserInfoDataType,
  LoginPayloadType,
  LoginReponseDataType,
  RegisterGuestTokenDataType,
  RegisterPayloadType,
} from "./user.type";

export const getUserInfo = async () => {
  try {
    const response = await axiosClient.get<GetUserInfoDataType>(API_ROUTES.ME);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};

export const login = async (payload: LoginPayloadType) => {
  try {
    const response = await axiosClient.post<LoginReponseDataType>(API_ROUTES.LOGIN, payload);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};

export const register = async (payload: RegisterPayloadType) => {
  try {
    const response = await axiosClient.post(API_ROUTES.REGISTER, payload);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};

export const registerGuestToken = async () => {
  try {
    const response = await axiosClient.post<RegisterGuestTokenDataType>(API_ROUTES.GUEST);
    return response.data;
  } catch (error) {
    console.error("Error creating guest info:", error);
  }
};
