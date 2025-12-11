"use client";
import { useEffect, useRef, useState } from "react";
import { Send, ChevronDown, ChevronLeft, MessageSquareText, TextAlignJustify } from "lucide-react";

import Markdown from "react-markdown";

import { v4 as uuidv4 } from "uuid";

import Link from "next/link";
import { useAskAI, useGetMessageByConversationID, useUpdateConversation } from "@/api";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { ChatMessageType } from "@/types/chat.type";
import { useApp } from "@/providers";
import { useParams, useSearchParams } from "next/navigation";
import { Thinking } from "@/components/ui";

import Drawer from "@mui/material/Drawer";

export const ChatDetailsPage = () => {
  const { id: conversationId } = useParams();
  const searchParams = useSearchParams();
  const messageParam = searchParams.get("message");

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const { data: messagesByConversationID } = useGetMessageByConversationID(
    (conversationId as string) || ""
  );

  const { mutate: updateConversationMutation, isPending: isUpdatingConversation } =
    useUpdateConversation();
  const { mutate: sendMessage, isPending: isSendingMessage } = useAskAI();
  const { user, conversations } = useApp();

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

  const handleSendMessage = () => {
    if (!inputValue.trim() || !conversationId || !user) return;

    const newMessage: ChatMessageType = {
      id: uuidv4(),
      conversation_id: conversationId as string,
      sender_id: user.id,
      message: inputValue.trim(),
      message_type: "text",
      created_at: new Date().toISOString(),
    };
    setMessages((pre) => [...pre, newMessage]);

    setInputValue("");
    scrollToBottom();
    const payload = {
      conversation_id: conversationId as string,
      message: inputValue,
    };

    sendMessage(payload, {
      onSuccess: (data) => {
        if (!data) return;
        setMessages((pre) => [...pre, data]);
      },
      onError: (error) => {
        console.error("Failed to send message:", error);
      },
    });

    setTimeout(() => {
      scrollToBottom();
    }, 500);
  };

  const handleToggleDrawer = () => {
    setIsOpenDrawer((pre) => !pre);
  };

  useEffect(() => {
    if (messagesByConversationID) {
      setMessages(messagesByConversationID);
      setTimeout(() => {
        scrollToBottom();
      }, 500);
    }
  }, [messagesByConversationID, conversations]);

  useEffect(() => {
    if (!messageParam?.trim) return;
    setInputValue(messageParam.trim());
  }, [messageParam]);

  return (
    <>
      {/* Chat Area */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsOpenDrawer(true)} className="block p-2 md:hidden">
              <TextAlignJustify />
            </button>
            <h2 className="text-[#111827]">Trò chuyện với AI</h2>

            {/* AI Model Selector */}
            <div className="relative">
              <button
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="flex items-center gap-2 rounded-lg bg-[#F3F4F6] px-4 py-2 transition-colors hover:bg-gray-200"
              >
                <div className="h-2 w-2 rounded-full bg-[#3DDC84]"></div>
                <span className="text-sm text-[#111827]">
                  {selectedModel === "govai" ? "GovAI" : "GPT-4.5"}
                </span>
                <ChevronDown className="h-4 w-4 text-[#111827] opacity-70" />
              </button>

              {showModelDropdown && (
                <div className="absolute top-full left-0 z-10 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
                  <button
                    onClick={() => {
                      setSelectedModel("govai");
                      setShowModelDropdown(false);
                    }}
                    className={`w-full px-4 py-2 text-left transition-colors hover:bg-[#F3F4F6] ${
                      selectedModel === "govai"
                        ? "bg-[#0A4FD5]/10 text-[#0A4FD5]"
                        : "text-[#111827]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[#3DDC84]"></div>
                      <div>
                        <div className="text-sm">GovAI</div>
                        <div className="text-xs opacity-70">Chuyên về thủ tục hành chính</div>
                      </div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedModel("gpt4.5");
                      setShowModelDropdown(false);
                    }}
                    className={`w-full px-4 py-2 text-left transition-colors hover:bg-[#F3F4F6] ${
                      selectedModel === "gpt4.5"
                        ? "bg-[#0A4FD5]/10 text-[#0A4FD5]"
                        : "text-[#111827]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                      <div>
                        <div className="text-sm">GPT-4.5</div>
                        <div className="text-xs opacity-70">Model AI đa năng</div>
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {user &&
            messages.map((msg) => {
              if (msg.sender_id?.toString() === user?.id?.toString()) {
                return (
                  <div
                    key={msg.id}
                    className={cn(
                      "w-fit max-w-[70%] rounded-lg p-2.5",
                      "ml-auto rounded-br-none bg-[#0A4FD5] text-white"
                    )}
                  >
                    {msg.message}
                  </div>
                );
              }
              return (
                <div
                  className={cn(
                    "w-fit max-w-[70%] rounded-lg p-2.5 text-sm",
                    "rounded-tl-none bg-white text-[#111827]"
                  )}
                >
                  <Markdown key={msg.id}>{msg.message}</Markdown>
                </div>
              );
            })}
          {isSendingMessage && <Thinking />}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-gray-200 bg-white p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              disabled={isSendingMessage}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Nhập câu hỏi..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-[#0A4FD5] focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              disabled={isSendingMessage}
              className="rounded-lg bg-[#0A4FD5] px-6 py-3 text-white transition-colors hover:bg-[#083aa3]"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <Drawer open={isOpenDrawer} onClose={handleToggleDrawer}>
        <div className="flex h-full max-w-[350px] min-w-[300px] flex-col p-2">
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
          <div className="flex flex-col gap-1 overflow-y-auto">
            {conversations?.map((item) => {
              return (
                <Link
                  href={`/chat/${item.id}`}
                  key={item.id}
                  className={cn(
                    "flex w-full items-center justify-between gap-2",
                    conversationId === item.id
                      ? "rounded-lg bg-[#E0E7FF] p-2 text-[#0A4FD5]"
                      : "cursor-pointer rounded-lg p-2 text-[#111827] hover:bg-[#F3F4F6]"
                  )}
                  onClick={() => {
                    setIsOpenDrawer(false);
                  }}
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
      </Drawer>
    </>
  );
};
