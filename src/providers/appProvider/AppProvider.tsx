"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { useGetAllConversation, useGetUserInfo, useRegisterGuestToken } from "@/api";
import { UserInfoType } from "@/types/user.type";
import { E_LOCAL_STORAGE } from "@/enum";
import { ConversationItemType } from "@/types/conversation.type";
import { Header } from "@/components";

interface AppContextProps {
  user: UserInfoType | undefined;
  setUser: (user: UserInfoType | undefined) => void;
  conversations: ConversationItemType[];
  setConversations: Dispatch<SetStateAction<ConversationItemType[]>>;
  refetchConversationList: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserInfoType | undefined>(undefined);
  const [conversations, setConversations] = useState<ConversationItemType[]>([]);
  const effectRan = useRef(false);

  const { data: conversationsData, refetch: refetchConversationList } = useGetAllConversation();
  const { data: userFromApi } = useGetUserInfo();
  const { mutate: registerGuest } = useRegisterGuestToken();

  const getStoredUser = () => {
    try {
      const raw = localStorage.getItem(E_LOCAL_STORAGE.APP_NAME);
      return raw ? JSON.parse(raw) : undefined;
    } catch {
      return undefined;
    }
  };

  useEffect(() => {
    if (conversationsData) {
      setConversations(conversationsData);
    }

    if (userFromApi) {
      setUser(userFromApi);
      return;
    }
  }, [userFromApi, conversationsData]);

  useEffect(() => {
    if (effectRan.current) return;
    effectRan.current = true;

    const storedUser = getStoredUser();
    if (storedUser?.access_token) return;

    registerGuest(undefined, {
      onSuccess: (guestUser) => {
        if (!guestUser) return;
        setUser(guestUser.data);
        localStorage.setItem(
          E_LOCAL_STORAGE.APP_NAME,
          JSON.stringify({ access_token: guestUser.data.access_token })
        );
      },
    });
  }, []);

  return (
    <AppContext.Provider
      value={{ user, setUser, conversations, setConversations, refetchConversationList }}
    >
      <Header />
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return ctx;
};
