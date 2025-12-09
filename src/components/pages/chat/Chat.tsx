"use client";
import { use, useEffect, useRef, useState } from "react";
import {
  Send,
  Upload,
  FileText,
  Building2,
  Landmark,
  Home as HomeIcon,
  ChevronDown,
  ChevronLeft,
  MessageSquareText,
} from "lucide-react";

import Markdown from "react-markdown";

import { v4 as uuidv4 } from "uuid";

import Link from "next/link";
import {
  useAskAI,
  useCreateNewConversation,
  useGetAllConversation,
  useGetMessageByConversationID,
  useUpdateConversation,
} from "@/api";
import { ConversationItemType } from "@/types/conversation.type";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { ChatMessageType } from "@/types/chat.type";
import { set } from "react-hook-form";
import { useApp } from "@/providers";
import { useParams } from "next/navigation";
import { Thinking } from "@/components/ui";

interface Message {
  from: "ai" | "user";
  text: string;
}

export const ChatPage = () => {
  const { id: conversationId } = useParams();

  const [conversationList, setConversationList] = useState<ConversationItemType[]>([]);
  const [activedConversation, setActivedConversation] = useState<ConversationItemType | null>(null);
  const { data: conversations, refetch } = useGetAllConversation();
  const { mutate } = useCreateNewConversation();
  const { data: messagesByConversationID } = useGetMessageByConversationID(
    activedConversation?.id || ""
  );

  const { mutate: updateConversationMutation, isPending: isUpdatingConversation } =
    useUpdateConversation();
  const { mutate: sendMessage, isPending: isSendingMessage } = useAskAI();
  const { user } = useApp();

  const [messages, setMessages] = useState<ChatMessageType[]>([]);

  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [inputValue, setInputValue] = useState("");
  const [selectedModel, setSelectedModel] = useState<"govai" | "gpt4.5">("govai");
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  const handleCreateNewConversation = () => {
    mutate(undefined, {
      onSuccess: (data) => {
        refetch();
      },
      onError: (error) => {
        console.error("Failed to create new conversation:", error);
      },
    });
  };

  const handleSelectConversation = (conversation: ConversationItemType) => {
    setActivedConversation(conversation);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || !activedConversation || !user) return;

    const newMessage: ChatMessageType = {
      id: uuidv4(),
      conversation_id: activedConversation.id,
      sender_id: user.id,
      message: inputValue.trim(),
      message_type: "text",
      created_at: new Date().toISOString(),
    };
    setMessages((pre) => [...pre, newMessage]);

    setInputValue("");
    scrollToBottom();
    const payload = {
      conversation_id: activedConversation.id,
      message: inputValue,
    };

    sendMessage(payload, {
      onSuccess: (data) => {
        if (!data) return;
        setMessages((pre) => [...pre, data]);
        if (activedConversation.title === "Untitled") {
          updateConversationMutation(
            {
              id: activedConversation.id,
              title: inputValue.trim(),
              user_id: user.id,
            },
            {
              onSuccess: () => {
                setActivedConversation((pre) =>
                  pre ? { ...pre, title: inputValue.trim() } : null
                );
                setConversationList((pre) =>
                  pre.map((item) =>
                    item.id === activedConversation.id
                      ? { ...item, title: inputValue.trim() }
                      : item
                  )
                );
              },
            }
          );
        }
      },
      onError: (error) => {
        console.error("Failed to send message:", error);
      },
    });

    setTimeout(() => {
      scrollToBottom();
    }, 500);
  };

  useEffect(() => {
    if (conversations) {
      setConversationList(conversations);
    }
    if (messagesByConversationID) {
      setMessages(messagesByConversationID);
      setTimeout(() => {
        scrollToBottom();
      }, 500);
    }
  }, [conversations, messagesByConversationID]);

  useEffect(() => {
    if (conversationId) {
      const conversation = conversationList.find((item) => item.id === conversationId);
      if (conversation) {
        handleSelectConversation(conversation);
      }
    }
  }, [conversationId, conversationList]);

  return (
    <div className="flex h-screen bg-[#F3F4F6]">
      {/* Sidebar */}
      <div className="flex w-[300px] flex-col border-r border-gray-200 bg-white p-6">
        <Link href={"/"} className="mb-8 text-[#0A4FD5]">
          <ChevronLeft />
        </Link>

        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#0A4FD5] to-[#3DDC84] text-white">
            AI
          </div>
          <div>
            <div className="text-[#111827]">AI Assistant</div>
            <div className="text-sm text-[#111827] opacity-50">Luôn sẵn sàng hỗ trợ</div>
          </div>
        </div>

        <div className="mb-4 text-sm text-[#111827] opacity-70">Lịch sử chat</div>
        <div className="flex-1 space-y-2">
          <button onClick={handleCreateNewConversation}>Tạo mới cuộc trò chuyện</button>
          <div>
            {conversationList?.map((item) => {
              return (
                <Link
                  href={`/chat/${item.id}`}
                  key={item.id}
                  className={cn(
                    "flex w-full items-center justify-between gap-2",
                    activedConversation?.id === item.id
                      ? "rounded-lg bg-[#E0E7FF] p-2 text-[#0A4FD5]"
                      : "cursor-pointer rounded-lg p-2 text-[#111827] hover:bg-[#F3F4F6]"
                  )}
                  onClick={() => handleSelectConversation(item)}
                >
                  <div className="flex max-w-[70%] flex-1 items-center gap-1">
                    <MessageSquareText size={14} />
                    <span className="truncate">{item.title}</span>
                  </div>
                  <span className="text-xs">{dayjs(item.updated_at).format("HH:mm")}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <button className="mt-4 text-sm text-[#111827] opacity-70 transition-opacity hover:opacity-100">
          Xem lịch sử trò chuyện
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col"></div>
    </div>
  );
};
