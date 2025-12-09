"use client";
import { createContext, useContext, useState, ReactNode, useEffect, use } from "react";
import { useGetUserInfo } from "@/api";
import { UserInfoType } from "@/types/user.type";
import { useRouter } from "next/navigation";

interface AppContextProps {
  user: UserInfoType | undefined;
  setUser: (user: UserInfoType | undefined) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfoType | undefined>(undefined);

  const { data, error } = useGetUserInfo();
  const router = useRouter();

  useEffect(() => {
    if (user) return;
    if (data) {
      setUser(data);
    }
    if (error) {
      console.error("Failed to fetch user info:", error);
      router.replace("/dang-nhap");
    }
  }, [data, user, error]);

  return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return ctx;
};
