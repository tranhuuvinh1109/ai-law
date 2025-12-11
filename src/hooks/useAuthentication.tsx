import { useGetUserInfo } from "@/api";
import { useApp } from "@/providers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuthenticaton = ({ isAllowRedirect = false }: { isAllowRedirect?: boolean }) => {
  const { data, error } = useGetUserInfo();
  const { user, setUser } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (user) return;
    if (data) {
      setUser(data);
    }
    if (error && isAllowRedirect) {
      router.replace("/dang-nhap");
    }
  }, [data, user, error, isAllowRedirect]);
};
