"use client";
import { use, useEffect, useState } from "react";
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

import { v4 as uuidv4 } from "uuid";

import Link from "next/link";
import {
  useAskAI,
  useCreateNewConversation,
  useGetAllConversation,
  useGetMessageByConversationID,
} from "@/api";
import { ConversationItemType } from "@/types/conversation.type";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { ChatMessageType } from "@/types/chat.type";
import { set } from "react-hook-form";
import { useApp } from "@/providers";

interface Message {
  from: "ai" | "user";
  text: string;
}

export const ChatPage = () => {
  const [conversationList, setConversationList] = useState<ConversationItemType[]>([]);
  const [activedConversation, setActivedConversation] = useState<ConversationItemType | null>(null);
  const { data: conversations, refetch } = useGetAllConversation();
  const { mutate } = useCreateNewConversation();
  const { data: messagesByConversationID } = useGetMessageByConversationID(
    activedConversation?.id || ""
  );
  const { mutate: sendMessage } = useAskAI();
  const { user } = useApp();

  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  console.log("Messages by conversation ID:", messagesByConversationID);

  const [inputValue, setInputValue] = useState("");
  const [selectedModel, setSelectedModel] = useState<"govai" | "gpt4.5">("govai");
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  const handleCreateNewConversation = () => {
    mutate(undefined, {
      onSuccess: (data) => {
        console.log("New conversation created:", data);
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

    const payload = {
      conversation_id: activedConversation.id,
      message: inputValue,
    };

    sendMessage(payload, {
      onSuccess: (data) => {
        console.log("Message sent successfully:", data);
        if (!data) return;
        setMessages((pre) => [...pre, data]);
        setInputValue("");
      },
      onError: (error) => {
        console.error("Failed to send message:", error);
      },
    });
  };

  useEffect(() => {
    if (conversations) {
      setConversationList(conversations);
    }
    if (messagesByConversationID) {
      setMessages(messagesByConversationID);
    }
  }, [conversations, messagesByConversationID]);
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

        {/* <div className="mb-4 text-sm text-[#111827] opacity-70">Lĩnh vực phổ biến</div>
        <div className="flex-1 space-y-2">
          {categories.map((cat, i) => (
            <button
              key={i}
              className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-[#F3F4F6]"
            >
              <cat.icon className="h-5 w-5 text-[#0A4FD5]" />
              <span className="text-[#111827]">{cat.label}</span>
            </button>
          ))}
        </div> */}

        <div className="mb-4 text-sm text-[#111827] opacity-70">Lịch sử chat</div>
        <div className="flex-1 space-y-2">
          <button onClick={handleCreateNewConversation}>Tạo mới cuộc trò chuyện</button>
          <div>
            {conversationList?.map((item) => {
              return (
                <div
                  key={item.id}
                  className={cn(
                    "flex items-center justify-between",
                    activedConversation?.id === item.id
                      ? "rounded-lg bg-[#E0E7FF] p-2 text-[#0A4FD5]"
                      : "cursor-pointer rounded-lg p-2 text-[#111827] hover:bg-[#F3F4F6]"
                  )}
                  onClick={() => handleSelectConversation(item)}
                >
                  <div className="flex flex-1 items-center gap-1">
                    <MessageSquareText size={14} />
                    <span>{item.title}</span>
                  </div>
                  <span>{dayjs(item.updated_at).format("HH:mm")}</span>
                </div>
              );
            })}
          </div>
        </div>

        <button className="mt-4 text-sm text-[#111827] opacity-70 transition-opacity hover:opacity-100">
          Xem lịch sử trò chuyện
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white p-4">
          <div className="flex items-center gap-4">
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
          <Link href={"/"} className="text-sm text-[#0A4FD5] hover:underline">
            Xem danh sách thủ tục
          </Link>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {user &&
            messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "max-w-[70%] rounded-lg p-4",
                  msg.sender_id?.toString() === user?.id?.toString()
                    ? "ml-auto bg-[#0A4FD5] text-white"
                    : "bg-white text-[#111827]"
                )}
              >
                {msg.message}
              </div>
            ))}
        </div>

        <div className="border-t border-gray-200 bg-white p-4">
          <div className="mb-3 flex gap-2">
            <button
              className="rounded-lg p-2 transition-colors hover:bg-[#F3F4F6]"
              title="Upload file"
            >
              <Upload className="h-5 w-5 text-[#111827] opacity-70" />
            </button>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Nhập câu hỏi..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-[#0A4FD5] focus:outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="rounded-lg bg-[#0A4FD5] px-6 py-3 text-white transition-colors hover:bg-[#083aa3]"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Info Panel */}
      <div className="w-[284px] overflow-y-auto border-l border-gray-200 bg-white p-6">
        <div className="mb-6">
          <h3 className="mb-3 text-[#111827]">Tóm tắt thủ tục</h3>
          <div className="text-sm text-[#111827] opacity-70">
            <p className="mb-2">
              Đăng ký kinh doanh là thủ tục bắt buộc để thành lập doanh nghiệp mới.
            </p>
            <p>Được thực hiện tại Phòng Đăng ký kinh doanh cấp Tỉnh/Thành phố.</p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 text-[#111827]">Giấy tờ cần chuẩn bị</h3>
          <ul className="space-y-2 text-sm text-[#111827] opacity-70">
            <li className="flex gap-2">
              <span>•</span>
              <span>CMND/CCCD (bản gốc)</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Giấy tờ thành lập</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Hợp đồng thuê địa điểm</span>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 text-[#111827]">Thời gian xử lý</h3>
          <div className="rounded-lg bg-[#3DDC84]/10 p-3">
            <div className="text-[#111827]">3-5 ngày làm việc</div>
          </div>
        </div>

        <Link href={"/thu-tuc/dang-ky-kinh-doanh"}>Xem chi tiết thủ tục</Link>
      </div>
    </div>
  );
};
