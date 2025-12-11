"use client";
import { PropsWithChildren } from "react";
import { ChevronLeft, MessageSquareText, SquarePen } from "lucide-react";
import Link from "next/link";
import { useCreateNewConversation } from "@/api";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/providers";

type ChatLayoutProps = PropsWithChildren;

export const ChatLayout = ({ children }: ChatLayoutProps) => {
  const router = useRouter();
  const { conversations, refetchConversationList } = useApp();
  const { mutate: createNewConversationMutation } = useCreateNewConversation();

  const { id: activedConversation } = useParams();

  const handleCreateNewConversation = (message = "") => {
    createNewConversationMutation(undefined, {
      onSuccess: (data) => {
        const basePath = `/chat/${data?.id}`;

        const queryString = message.trim() ? `?${new URLSearchParams({ message }).toString()}` : "";

        router.push(`${basePath}${queryString}`);
        refetchConversationList();
      },
      onError: (error) => {
        console.error("Failed to create new conversation:", error);
      },
    });
  };

  return (
    <div className="flex h-screen bg-[#F3F4F6]">
      {/* Sidebar */}
      <div className="hidden w-[300px] flex-col border-r border-gray-200 bg-white p-6 md:flex">
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
        <div className="flex flex-1 flex-col space-y-2 overflow-hidden">
          <button
            onClick={() => handleCreateNewConversation()}
            className="hover:bg- flex w-full items-center gap-2 rounded-lg bg-[#3DDC84] px-4 py-2 text-sm font-medium text-white transition-colors hover:cursor-pointer hover:bg-[#2ac972]"
          >
            <SquarePen size={14} />
            Đoạn chat mới
          </button>
          <div className="flex-1 overflow-y-auto">
            {conversations?.map((item) => {
              return (
                <Link
                  href={`/chat/${item.id}`}
                  key={item.id}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 text-xs font-medium",
                    activedConversation === item.id
                      ? "rounded-lg bg-[#E0E7FF] p-2 text-[#0A4FD5]"
                      : "cursor-pointer rounded-lg p-2 text-[#111827] hover:bg-[#F3F4F6]"
                  )}
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
      </div>

      {/* Chat Area */}
      {children}
    </div>
  );
};
