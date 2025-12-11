import { QUERY_KEYS } from "@/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserInfo, login, register, registerGuestToken } from "./user.api";

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.ME],
    queryFn: getUserInfo,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

export const useRegisterGuestToken = () => {
  return useMutation({
    mutationFn: registerGuestToken,
  });
};
