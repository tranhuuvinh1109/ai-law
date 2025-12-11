"use client";

import { useCreateNewConversation } from "@/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const ChatPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isCreateNewParam = searchParams.get("isCreateNew");
  const messageParam = searchParams.get("message");

  const { mutate: createNewConversationMutation } = useCreateNewConversation();

  const handleCreateNewConversation = (message = "") => {
    createNewConversationMutation(undefined, {
      onSuccess: (data) => {
        const basePath = `/chat/${data?.id}`;

        const queryString = message.trim() ? `?${new URLSearchParams({ message }).toString()}` : "";

        router.push(`${basePath}${queryString}`);
      },
      onError: (error) => {
        console.error("Failed to create new conversation:", error);
      },
    });
  };

  useEffect(() => {
    if (!isCreateNewParam || !messageParam?.trim()) return;

    Promise.resolve().then(() => {
      handleCreateNewConversation(messageParam);
    });
  }, [isCreateNewParam, messageParam]);

  return <div className="flex-1 overflow-hidden">ChatPage</div>;
};
