import { UserInfoType } from "@/types/user.type";
import { ApiReponseType } from "../common.type";

export type RegisterPayloadType = {
  username: string;
  password: string;
  email: string;
  role?: number;
};

export type LoginPayloadType = {
  email: string;
  password: string;
};

export type LoginReponseDataType = {
  access_token: string;
  user: UserInfoType;
  refresh_token: string;
};
export type LoginReponseType = ApiReponseType<LoginReponseDataType>;

export type GetUserInfoDataType = UserInfoType;
export type GetUserInfoReponseType = ApiReponseType<GetUserInfoDataType>;

export type RegisterGuestTokenDataType = {
  data: UserInfoType;
};
export type RegisterGuestTokenReponseType = ApiReponseType<RegisterGuestTokenDataType>;
