"use client";
import { createContext, useContext, useState, ReactNode, useEffect, use } from "react";
import { useGetUserInfo } from "@/api";
import { UserInfoType } from "@/types/user.type";

interface AppContextProps {
  user: UserInfoType | undefined;
  setUser: (user: UserInfoType) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfoType | undefined>(undefined);

  const { data } = useGetUserInfo();

  console.log("User info fetched:", data, user);

  useEffect(() => {
    if (user) return;
    if (data) {
      setUser(data);
    }
  }, [data, user]);

  return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return ctx;
};
